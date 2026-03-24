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

function isVideoFile(file: File | string): boolean {
  if (typeof file === "string") {
    return file.startsWith("data:video/") || file.match(/\.(mp4|mov|webm)(\?|$)/i) !== null;
  }
  return file.type.startsWith("video/");
}

function isVideoUrl(url: string): boolean {
  return url.startsWith("data:video/") || /\.(mp4|mov|webm)(\?|$)/i.test(url);
}

export function DragDropZone({ images, onImagesChange }: DragDropZoneProps) {
  const { t } = useLang();
  const [error, setError] = useState<string | null>(null);
  const [converting, setConverting] = useState(false);

  const convertHeicToJpeg = async (file: File): Promise<File> => {
    // Dynamic import heic2any only when needed
    try {
      const heic2any = (await import("heic2any")).default;
      const blob = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.85 }) as Blob;
      return new File([blob], file.name.replace(/\.heic$/i, ".jpg").replace(/\.heif$/i, ".jpg"), {
        type: "image/jpeg",
      });
    } catch {
      // If conversion fails, return original file
      return file;
    }
  };

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

      let validFiles = acceptedFiles.filter((f) => {
        const limit = isVideoFile(f) ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;
        return f.size <= limit;
      });

      if (validFiles.length === 0) return;

      // Convert HEIC/HEIF files to JPEG
      const heicFiles = validFiles.filter(
        (f) => f.type === "image/heic" || f.type === "image/heif" ||
               f.name.toLowerCase().endsWith(".heic") || f.name.toLowerCase().endsWith(".heif")
      );

      if (heicFiles.length > 0) {
        setConverting(true);
        const converted = await Promise.all(
          validFiles.map(async (f) => {
            if (
              f.type === "image/heic" || f.type === "image/heif" ||
              f.name.toLowerCase().endsWith(".heic") || f.name.toLowerCase().endsWith(".heif")
            ) {
              return convertHeicToJpeg(f);
            }
            return f;
          })
        );
        validFiles = converted;
        setConverting(false);
      }

      const readers = validFiles.map(
        (file) =>
          new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          })
      );

      Promise.all(readers).then((dataUrls) => {
        onImagesChange([...images, ...dataUrls]);
      });
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
              {converting ? t("admin.converting_heic") : isDragActive ? "..." : t("admin.drag_drop")}
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
                <div className="w-full h-full flex items-center justify-center bg-espresso-700/10">
                  <video
                    src={src}
                    className="w-full h-full object-cover"
                    muted
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Film className="w-8 h-8 text-white drop-shadow-lg" />
                  </div>
                </div>
              ) : (
                <img
                  src={src}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover"
                />
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
