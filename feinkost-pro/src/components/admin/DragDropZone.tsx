"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, AlertCircle, Film, Loader2 } from "lucide-react";
import { useAdminStore } from "@/store/admin-store";
import { useLang } from "@/lib/i18n";

interface DragDropZoneProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
}

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

// NO accept filter — iOS sends HEIC with empty/wrong MIME type
// Validation happens server-side in /api/upload
const ALLOWED_EXTENSIONS = new Set([
  "jpg", "jpeg", "png", "webp", "gif", "heic", "heif",
  "mp4", "mov", "webm",
]);

function isVideoUrl(url: string): boolean {
  return /\.(mp4|mov|webm)(\?|$)/i.test(url) || url.includes("/videos/");
}

interface UploadingItem {
  name: string;
  progress: number;
  status: "uploading" | "done" | "error";
  error?: string;
}

export function DragDropZone({ images, onImagesChange }: DragDropZoneProps) {
  const { t } = useLang();
  const token = useAdminStore((s) => s.token);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState<UploadingItem[]>([]);

  const uploadFile = useCallback(
    async (file: File): Promise<string | null> => {
      const item: UploadingItem = { name: file.name, progress: 0, status: "uploading" };
      setUploading((prev) => [...prev, item]);

      try {
        const formData = new FormData();
        formData.append("file", file);

        // Use XMLHttpRequest for progress tracking
        const result = await new Promise<string>((resolve, reject) => {
          const xhr = new XMLHttpRequest();

          xhr.upload.onprogress = (e) => {
            if (e.lengthComputable) {
              const pct = Math.round((e.loaded / e.total) * 100);
              setUploading((prev) =>
                prev.map((u) => (u.name === file.name ? { ...u, progress: pct } : u))
              );
            }
          };

          xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              const data = JSON.parse(xhr.responseText);
              if (data.url) {
                resolve(data.url);
              } else {
                reject(new Error(data.error || "No URL returned"));
              }
            } else {
              try {
                const errData = JSON.parse(xhr.responseText);
                reject(new Error(errData.error || `HTTP ${xhr.status}`));
              } catch {
                reject(new Error(`HTTP ${xhr.status}`));
              }
            }
          };

          xhr.onerror = () => reject(new Error("Network error"));
          xhr.open("POST", "/api/upload");
          xhr.setRequestHeader("Authorization", `Bearer ${token}`);
          xhr.send(formData);
        });

        setUploading((prev) =>
          prev.map((u) => (u.name === file.name ? { ...u, progress: 100, status: "done" } : u))
        );

        // Clear from uploading list after 1s
        setTimeout(() => {
          setUploading((prev) => prev.filter((u) => u.name !== file.name));
        }, 1000);

        return result;
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Upload failed";
        setUploading((prev) =>
          prev.map((u) => (u.name === file.name ? { ...u, status: "error", error: msg } : u))
        );
        setTimeout(() => {
          setUploading((prev) => prev.filter((u) => u.name !== file.name));
        }, 3000);
        return null;
      }
    },
    [token]
  );

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setError(null);

      const oversized = acceptedFiles.filter((f) => f.size > MAX_FILE_SIZE);
      if (oversized.length > 0) {
        setError(t("admin.file_too_large"));
      }

      const validFiles = acceptedFiles.filter((f) => f.size <= MAX_FILE_SIZE);
      if (validFiles.length === 0) return;

      // Upload all files in parallel
      const urls = await Promise.all(validFiles.map(uploadFile));
      const successUrls = urls.filter(Boolean) as string[];

      if (successUrls.length > 0) {
        onImagesChange([...images, ...successUrls]);
      }
    },
    [images, onImagesChange, uploadFile, t]
  );

  const removeImage = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index));
  };

  const handleDrop = useCallback(
    (accepted: File[]) => {
      // Filter by extension since MIME types are unreliable (iOS HEIC)
      const valid = accepted.filter((f) => {
        const ext = f.name.split(".").pop()?.toLowerCase() || "";
        return ALLOWED_EXTENSIONS.has(ext);
      });
      if (valid.length < accepted.length) {
        setError("Desteklenmeyen dosya formatı");
      }
      if (valid.length > 0) onDrop(valid);
    },
    [onDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    multiple: true,
    maxSize: MAX_FILE_SIZE,
  });

  const isUploading = uploading.some((u) => u.status === "uploading");

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={[
          "relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200",
          isDragActive
            ? "border-olive-500 bg-olive-100/50"
            : isUploading
            ? "border-amber-400 bg-amber-50/30"
            : "border-sand-300 bg-sand-100/50 hover:border-olive-400 hover:bg-sand-100",
        ].join(" ")}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-3">
          <div
            className={[
              "w-14 h-14 rounded-full flex items-center justify-center transition-colors",
              isUploading
                ? "bg-amber-100 text-amber-600"
                : isDragActive
                ? "bg-olive-200 text-olive-700"
                : "bg-sand-200 text-espresso-400",
            ].join(" ")}
          >
            {isUploading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <Upload className="w-6 h-6" />
            )}
          </div>
          <div>
            <p className="font-medium text-espresso-600">
              {isUploading
                ? `${uploading.filter((u) => u.status === "uploading").length} dosya yükleniyor...`
                : isDragActive
                ? "Bırak — yüklenecek"
                : t("admin.drag_drop")}
            </p>
            <p className="text-sm text-espresso-400 mt-1">{t("admin.drag_drop_sub")}</p>
          </div>
          <p className="text-xs text-espresso-400/70">{t("admin.drag_drop_limit_v2")}</p>
        </div>
      </div>

      {/* Upload progress */}
      {uploading.length > 0 && (
        <div className="space-y-2">
          {uploading.map((u, i) => (
            <div key={i} className="flex items-center gap-3 text-sm">
              <div className="flex-1 min-w-0">
                <p className="text-espresso-600 truncate">{u.name}</p>
                <div className="mt-1 h-1.5 bg-sand-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      u.status === "error" ? "bg-brick-500" : u.status === "done" ? "bg-olive-500" : "bg-amber-400"
                    }`}
                    style={{ width: `${u.progress}%` }}
                  />
                </div>
              </div>
              <span className={`text-xs font-medium ${u.status === "error" ? "text-brick-500" : "text-espresso-400"}`}>
                {u.status === "error" ? u.error : u.status === "done" ? "✓" : `${u.progress}%`}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 text-brick-600 text-sm bg-brick-300/10 rounded-lg px-3 py-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Preview grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {images.map((src, index) => (
            <div
              key={index}
              className="relative group aspect-square rounded-lg overflow-hidden border border-sand-200 bg-cream-50"
            >
              {isVideoUrl(src) ? (
                <div className="w-full h-full relative bg-espresso-700/10">
                  <video src={src} className="w-full h-full object-cover" muted preload="metadata" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Film className="w-8 h-8 text-white drop-shadow-lg" />
                  </div>
                </div>
              ) : (
                <img src={src} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
              )}
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-espresso-700/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brick-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
