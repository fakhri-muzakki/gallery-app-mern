"use client";

import { X, Image as ImageIcon } from "lucide-react";
import { useEffect, useState } from "react";
import ImagePreview from "./ImagePreview";
import type { Gallery } from "@/types";

interface ModalFormProps {
  actionForm: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  formData?: Gallery;
  validasiError: Record<string, string>;
  onClose: () => void;
}

export default function ModalForm({
  onClose,
  actionForm,
  formData,
  validasiError,
}: ModalFormProps) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-4xl rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <h2 className="text-lg font-semibold text-zinc-100">Add New Item</h2>
          <button
            type="button"
            className="text-zinc-400 hover:text-zinc-200 transition"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Container */}
        <form className="px-6 py-5" onSubmit={actionForm}>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left: Form Fields - Takes 2/3 on desktop */}
            <div className="lg:w-2/3 space-y-5">
              {/* Name */}

              {formData?.id && (
                <input
                  type="text"
                  name="id"
                  placeholder=""
                  className="hidden"
                  defaultValue={formData.id}
                />
              )}
              <div>
                <label className="block mb-2 text-sm text-zinc-300">Name</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  defaultValue={formData?.name}
                  className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600"
                  required
                />
                {validasiError.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {validasiError.name}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block mb-2 text-sm text-zinc-300">
                  Description
                </label>
                <textarea
                  rows={6}
                  name="description"
                  defaultValue={formData?.description}
                  placeholder="Write a detailed description"
                  className="w-full resize-none rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600"
                  required
                />
                {validasiError.description && (
                  <p className="mt-1 text-sm text-red-500">
                    {validasiError.description}
                  </p>
                )}
              </div>
            </div>

            {/* Right: Image Upload - Takes 1/3 on desktop */}
            <div className="lg:w-1/3">
              <label className="block mb-2 text-sm text-zinc-300">Image</label>
              <label className="block cursor-pointer">
                <div className="rounded-xl border-2 border-dashed border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 transition min-h-62.5 flex flex-col items-center justify-center p-4">
                  {preview ? (
                    <ImagePreview preview={preview} />
                  ) : formData?.image ? (
                    <ImagePreview preview={formData.image} />
                  ) : (
                    <div className="text-center py-8">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-700 mb-3">
                        <ImageIcon size={20} className="text-zinc-400" />
                      </div>
                      <p className="text-sm text-zinc-300 mb-1">Upload image</p>
                      <p className="text-xs text-zinc-500">
                        PNG, JPG up to 2MB
                      </p>
                    </div>
                  )}
                </div>

                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    // console.log(e.target.files);

                    if (file) {
                      if (preview) URL.revokeObjectURL(preview);
                      setPreview(URL.createObjectURL(file));
                    }
                  }}
                />
              </label>
              {/* Image info jika ada preview */}
              {preview && (
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-xs text-zinc-400">Image selected</span>
                  <button
                    type="button"
                    onClick={() => {
                      URL.revokeObjectURL(preview);
                      setPreview(null);
                    }}
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              )}

              {validasiError.image && (
                <p className="mt-1 text-sm text-red-500">
                  {validasiError.image}
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-zinc-800">
            <button
              type="button"
              className="rounded-xl border border-zinc-700 px-5 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 transition"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-zinc-100 px-5 py-2.5 text-sm font-medium text-zinc-900 hover:bg-zinc-200 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
