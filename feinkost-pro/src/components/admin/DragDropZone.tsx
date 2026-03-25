"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, AlertCircle, Film } from "lucide-react";
import { useLang } from "@/lib/i18n";

interface DragDropZoneProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
}

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB

const ACCEPTED_TYPES: Record<string, string[]> = {
  "image/*": [".jpg", ".jpeg", ".png", ".webp", ".gif", ".heic", ".heif"],
  "video/*": [".mp4", ".mov", ".webm"],
};

function isVideoFile(file: File): boolean {
  return file.type.startsWith("video/") || /\.(mp4|mov|webm)$/i.test(file.name);
}

function isVideoUrl(url: string): boolean {
  return url.startsWith("data:video/") || /\.(mp4|mov|webm)(\?|$)/i.test(url);
}

function isHeicFile(file: File): boolean {
  return (
    file.type === "image/heic" ||
    file.type === "image/heif" ||
    /\.(heic|heif)$/i.test(file.name)
  );
}

export function DragDropZone({ images, onImagesChange }: DragDropZoneProps) {
  const { t } = useLang();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setError(null);

      const oversized = acceptedFiles.filter((f) => {
        const limit = isVideoFile(f) ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;
        return f.size > limit;
      });

      if (oversized.length > 0) {
        setError(t("admin.file_too_large"));
      }

      const validFiles = acceptedFiles.filter((f) => {
        const limit = isVideoFile(f) ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;
        return f.size <= limit;
      });

      if (validFiles.length === 0) return;

      setProcessing(true);

      try {
        const results: string[] = [];

        for (const file of validFiles) {
          if (isHeicFile(file)) {
            // HEIC: Canvas-based conversion (no heavy library needed)
            try {
              const dataUrl = await readFileAsDataUrl(file);
              // Try rendering via browser's native support first
              const converted = await convertImageViaCanvas(dataUrl, file.name);
              results.push(converted);
            } catch {
              // Fallback: just read as-is, server will handle it
              const dataUrl = await readFileAsDataUrl(file);
              results.push(dataUrl);
            }
          } else {
            const dataUrl = await readFileAsDataUrl(file);
            results.push(dataUrl);
          }
        }

        onImagesChange([...images, ...results]);
      } catch (e) {
        setError("Upload failed");
      } finally {
        setProcessing(false);
      }
    },
    [images, onImagesChange, t]
  );

  const removeImage = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    multiple: true,
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={[
          "relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200",
          isDragActive
            ? "border-olive-500 bg-olive-100/50"
            : "border-sand-300 bg-sand-100/50 hover:border-olive-400 hover:bg-sand-100",
        ].join(" ")}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-3">
          <div
            className={[
              "w-14 h-14 rounded-full flex items-center justify-center transition-colors",
              isDragActive ? "bg-olive-200 text-olive-700" : "bg-sand-200 text-espresso-400",
            ].join(" ")}
          >
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <p className="font-medium text-espresso-600">
              {processing ? t("admin.converting_heic") : isDragActive ? "..." : t("admin.drag_drop")}
            </p>
            <p className="text-sm text-espresso-400 mt-1">
              {t("admin.drag_drop_sub")}
            </p>
          </div>
          <p className="text-xs text-espresso-400/70">
            {t("admin.drag_drop_limit_v2")}
          </p>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-brick-600 text-sm bg-brick-300/10 rounded-lg px-3 py-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {images.map((src, index) => (
            <div
              key={index}
              className="relative group aspect-square rounded-lg overflow-hidden border border-sand-200 bg-cream-50"
            >
              {isVideoUrl(src) ? (
                <div className="w-full h-full relative bg-espresso-700/10">
                  <video src={src} className="w-full h-full object-cover" muted />
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

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function convertImageViaCanvas(dataUrl: string, fileName: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) { reject(new Error("Canvas not supported")); return; }
      ctx.drawImage(img, 0, 0);
      const jpeg = canvas.toDataURL("image/jpeg", 0.85);
      resolve(jpeg);
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = dataUrl;
  });
}
