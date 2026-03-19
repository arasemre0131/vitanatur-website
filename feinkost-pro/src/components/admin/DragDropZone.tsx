"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, AlertCircle } from "lucide-react";
import { useLang } from "@/lib/i18n";

interface DragDropZoneProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function DragDropZone({ images, onImagesChange }: DragDropZoneProps) {
  const { t } = useLang();
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError(null);

      const oversized = acceptedFiles.filter((f) => f.size > MAX_FILE_SIZE);
      if (oversized.length > 0) {
        setError(t("admin.file_too_large"));
      }

      const validFiles = acceptedFiles.filter((f) => f.size <= MAX_FILE_SIZE);
      if (validFiles.length === 0) return;

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
    [images, onImagesChange]
  );

  const removeImage = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
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
              {isDragActive ? "..." : t("admin.drag_drop")}
            </p>
            <p className="text-sm text-espresso-400 mt-1">
              {t("admin.drag_drop_sub")}
            </p>
          </div>
          <p className="text-xs text-espresso-400/70">
            {t("admin.drag_drop_limit")}
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
              <img
                src={src}
                alt={`Upload ${index + 1}`}
                className="w-full h-full object-cover"
              />
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
