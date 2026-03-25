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

const MAX_FILE_SIZE = 50 * 1024 * 1024;
const API_SIZE_LIMIT = 4 * 1024 * 1024; // Vercel Hobby body limit

const ALLOWED_EXTENSIONS = new Set([
  "jpg", "jpeg", "png", "webp", "gif", "heic", "heif",
  "mp4", "mov", "webm",
]);

const IMAGE_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp", "gif", "heic", "heif"]);

function isVideoUrl(url: string): boolean {
  return /\.(mp4|mov|webm)(\?|$)/i.test(url) || url.includes("/videos/");
}

function getExt(name: string): string {
  return (name.split(".").pop() || "").toLowerCase();
}

interface UploadingItem {
  id: string;
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

  const updateProgress = (id: string, progress: number) => {
    setUploading((prev) => prev.map((u) => (u.id === id ? { ...u, progress } : u)));
  };

  const uploadFile = useCallback(
    async (file: File): Promise<string | null> => {
      const uploadId = `${Date.now()}-${file.name}`;
      const ext = getExt(file.name);
      const isSmallImage = IMAGE_EXTENSIONS.has(ext) && ext !== "gif" && file.size < API_SIZE_LIMIT;

      setUploading((prev) => [
        ...prev,
        { id: uploadId, name: file.name, progress: 5, status: "uploading" },
      ]);

      try {
        let resultUrl: string;

        if (isSmallImage) {
          // Small images: /api/upload for sharp optimization (HEIC→WebP, resize)
          resultUrl = await uploadViaApi(file, uploadId);
        } else {
          // Large images, videos, GIFs: signed URL → direct to Supabase Storage
          resultUrl = await uploadViaSignedUrl(file, uploadId);
        }

        setUploading((prev) =>
          prev.map((u) => (u.id === uploadId ? { ...u, progress: 100, status: "done" } : u))
        );
        setTimeout(() => setUploading((prev) => prev.filter((u) => u.id !== uploadId)), 1500);
        return resultUrl;
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Upload failed";
        setUploading((prev) =>
          prev.map((u) => (u.id === uploadId ? { ...u, status: "error", error: msg } : u))
        );
        setTimeout(() => setUploading((prev) => prev.filter((u) => u.id !== uploadId)), 4000);
        return null;
      }
    },
    [token]
  );

  // Small images → /api/upload (sharp converts HEIC→WebP)
  async function uploadViaApi(file: File, uploadId: string): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);

    return new Promise<string>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) updateProgress(uploadId, Math.round((e.loaded / e.total) * 90));
      };
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          const data = JSON.parse(xhr.responseText);
          data.url ? resolve(data.url) : reject(new Error(data.error || "No URL"));
        } else {
          try { reject(new Error(JSON.parse(xhr.responseText).error)); }
          catch { reject(new Error(`HTTP ${xhr.status}`)); }
        }
      };
      xhr.onerror = () => reject(new Error("Network error"));
      xhr.open("POST", "/api/upload");
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
      xhr.send(formData);
    });
  }

  // Large files → get signed URL → upload directly to Supabase Storage
  async function uploadViaSignedUrl(file: File, uploadId: string): Promise<string> {
    updateProgress(uploadId, 10);

    // 1. Get signed upload URL from our API
    const ext = getExt(file.name);
    const contentType = file.type || (IMAGE_EXTENSIONS.has(ext) ? `image/${ext}` : `video/${ext}`);

    const urlRes = await fetch("/api/upload-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ fileName: file.name, contentType }),
    });

    if (!urlRes.ok) {
      const err = await urlRes.json();
      throw new Error(err.error || "Failed to get upload URL");
    }

    const { signedUrl, token: uploadToken, publicUrl } = await urlRes.json();
    updateProgress(uploadId, 20);

    // 2. Upload directly to Supabase Storage via signed URL
    return new Promise<string>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          updateProgress(uploadId, 20 + Math.round((e.loaded / e.total) * 75));
        }
      };
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(publicUrl);
        } else {
          reject(new Error(`Storage upload failed: HTTP ${xhr.status}`));
        }
      };
      xhr.onerror = () => reject(new Error("Storage upload failed"));
      xhr.open("PUT", signedUrl);
      xhr.setRequestHeader("Content-Type", contentType);
      if (uploadToken) xhr.setRequestHeader("x-upsert", "true");
      xhr.send(file);
    });
  }

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setError(null);
      const oversized = acceptedFiles.filter((f) => f.size > MAX_FILE_SIZE);
      if (oversized.length > 0) setError(t("admin.file_too_large"));

      const validFiles = acceptedFiles.filter((f) => f.size <= MAX_FILE_SIZE);
      if (validFiles.length === 0) return;

      const urls = await Promise.all(validFiles.map(uploadFile));
      const successUrls = urls.filter(Boolean) as string[];
      if (successUrls.length > 0) onImagesChange([...images, ...successUrls]);
    },
    [images, onImagesChange, uploadFile, t]
  );

  const handleDrop = useCallback(
    (accepted: File[]) => {
      const valid = accepted.filter((f) => ALLOWED_EXTENSIONS.has(getExt(f.name)));
      if (valid.length < accepted.length) setError("Desteklenmeyen dosya formatı");
      if (valid.length > 0) onDrop(valid);
    },
    [onDrop]
  );

  const removeImage = (index: number) => onImagesChange(images.filter((_, i) => i !== index));

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    multiple: true,
    maxSize: MAX_FILE_SIZE,
  });

  const isUploading = uploading.some((u) => u.status === "uploading");

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        {...getRootProps()}
        className={[
          "relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200",
          isDragActive ? "border-olive-500 bg-olive-100/50"
            : isUploading ? "border-amber-400 bg-amber-50/30"
            : "border-sand-300 bg-sand-100/50 hover:border-olive-400 hover:bg-sand-100",
        ].join(" ")}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-3">
          <div className={["w-14 h-14 rounded-full flex items-center justify-center transition-colors",
            isUploading ? "bg-amber-100 text-amber-600" : isDragActive ? "bg-olive-200 text-olive-700" : "bg-sand-200 text-espresso-400"
          ].join(" ")}>
            {isUploading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Upload className="w-6 h-6" />}
          </div>
          <p className="font-medium text-espresso-600">
            {isUploading ? `${uploading.filter((u) => u.status === "uploading").length} dosya yükleniyor...`
              : isDragActive ? "Bırak — yüklenecek" : t("admin.drag_drop")}
          </p>
          <p className="text-xs text-espresso-400/70">{t("admin.drag_drop_limit_v2")}</p>
        </div>
      </div>

      {/* Progress bars */}
      {uploading.length > 0 && (
        <div className="space-y-2">
          {uploading.map((u) => (
            <div key={u.id} className="flex items-center gap-3 text-sm">
              <div className="flex-1 min-w-0">
                <p className="text-espresso-600 truncate">{u.name}</p>
                <div className="mt-1 h-1.5 bg-sand-200 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-300 ${
                    u.status === "error" ? "bg-brick-500" : u.status === "done" ? "bg-olive-500" : "bg-amber-400"
                  }`} style={{ width: `${u.progress}%` }} />
                </div>
              </div>
              <span className={`text-xs font-medium ${u.status === "error" ? "text-brick-500" : "text-espresso-400"}`}>
                {u.status === "error" ? u.error : u.status === "done" ? "✓" : `${u.progress}%`}
              </span>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-brick-600 text-sm bg-brick-300/10 rounded-lg px-3 py-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Media grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {images.map((src, index) => (
            <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border border-sand-200 bg-cream-50">
              {isVideoUrl(src) ? (
                <div className="w-full h-full relative bg-espresso-700/10">
                  <video src={src} className="w-full h-full object-cover" muted preload="metadata" />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Film className="w-8 h-8 text-white drop-shadow-lg" />
                  </div>
                </div>
              ) : (
                <img src={src} alt={`${index + 1}`} className="w-full h-full object-cover" />
              )}
              <button type="button" onClick={() => removeImage(index)}
                className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-espresso-700/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brick-600">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
