import { ImageIcon } from "lucide-react";
import Image from "next/image";

const ImagePreview = ({ preview }: { preview: string }) => {
  return (
    <div className="relative w-full h-48 rounded-lg overflow-hidden">
      <Image
        src={preview}
        fill
        alt="Preview"
        className="object-contain" // atau object-cover dengan container yang benar
        sizes="(max-width: 768px) 100vw, 400px"
        // Priority untuk LCP jika diperlukan
      />

      <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
        <div className="text-center">
          <ImageIcon className="mx-auto mb-1" size={20} />
          <span className="text-xs">Click to replace</span>
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
