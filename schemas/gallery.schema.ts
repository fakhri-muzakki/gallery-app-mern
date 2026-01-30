import {
  object,
  string,
  array,
  InferOutput,
  boolean,
  pipe,
  minLength,
  file,
  mimeType,
  maxSize,
  optional,
} from "valibot";

export const ProductSchema = object({
  id: string(),
  name: string(),
  description: string(),
  image: string(),
});

export const ProductsResponseSchema = object({
  success: boolean(),
  data: array(ProductSchema),
});

// ⬇️ type hasil validasi (INI yang dipakai di app)
export type ProductsResponse = InferOutput<typeof ProductsResponseSchema>;

export const GallerySchema = object({
  id: optional(string(), ""),
  name: pipe(string(), minLength(5, "name minimum 5 characters")),
  description: pipe(
    string(),
    minLength(10, "Minimum description 10 characters"),
  ),
});

export type GalleryResponse = InferOutput<typeof GallerySchema>;

export const RequiredImageSchema = object({
  image: pipe(
    file("Image wajib diisi"),
    mimeType(
      ["image/png", "image/jpeg", "image/webp"],
      "Image format not supported",
    ),
    maxSize(2 * 1024 * 1024, "Maximum image size 2MB"),
  ),
});

export const OptionalImageSchema = object({
  image: optional(
    pipe(
      file("Image wajib diisi"),
      mimeType(
        ["image/png", "image/jpeg", "image/webp"],
        "Image format not supported",
      ),
      maxSize(2 * 1024 * 1024, "Maximum image size 2MB"),
    ),
  ),
});

// export const RequiredImageSchema = object({
//   image: file([
//     mimeType(["image/png", "image/jpeg", "image/webp"]),
//     maxSize(2 * 1024 * 1024),
//   ]),
// });

// export const OptionalImageSchema = object({
//   image: file([
//     mimeType(["image/png", "image/jpeg", "image/webp"]),
//     maxSize(2 * 1024 * 1024),
//   ]).optional(),
// });

// export type ImageResponse = InferOutput<typeof ImageSchema>;
