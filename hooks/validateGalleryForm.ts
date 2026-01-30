import {
  GallerySchema,
  OptionalImageSchema,
  RequiredImageSchema,
} from "@/schemas/gallery.schema";
import { safeParse } from "valibot";

interface ValidateResult {
  data: {
    id?: string;
    name: string;
    description: string;
    image?: File;
  };
  previewImage?: string;
}

export function validateGalleryForm(
  formData: FormData,
):
  | { success: true; result: ValidateResult }
  | { success: false; errors: Record<string, string> } {
  const rawData = Object.fromEntries(formData.entries());
  const file = formData.get("image");

  // 1️⃣ validate text fields
  const galleryResult = safeParse(GallerySchema, rawData);
  if (!galleryResult.success) {
    const errors: Record<string, string> = {};
    galleryResult.issues.forEach((i) => {
      const key = i.path?.[0].key as string;
      errors[key] = i.message;
    });
    return { success: false, errors };
  }

  const isEdit = Boolean(galleryResult.output.id);

  // 2️⃣ validate image
  if (file instanceof File && file.size > 0) {
    const imageResult = safeParse(
      isEdit ? OptionalImageSchema : RequiredImageSchema,
      { image: file },
    );

    if (!imageResult.success) {
      const errors: Record<string, string> = {};
      imageResult.issues.forEach((i) => {
        const key = i.path?.[0].key as string;
        errors[key] = i.message;
      });
      return { success: false, errors };
    }

    return {
      success: true,
      result: {
        data: { ...galleryResult.output, image: imageResult.output.image },
        previewImage: imageResult.output.image
          ? URL.createObjectURL(imageResult.output.image)
          : "",
      },
    };
  }

  // 3️⃣ image required ONLY on create
  if (!isEdit) {
    return {
      success: false,
      errors: { image: "Image is required" },
    };
  }

  return {
    success: true,
    result: { data: galleryResult.output },
  };
}
