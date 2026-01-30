import type { Gallery } from "@/types";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";

interface CardProps {
  data: Gallery;
  operatingUserId?: string;
  onDelete: (id: string) => void;
  onEdit: (data: Gallery) => void;
}

const Card = ({ data, operatingUserId, onDelete, onEdit }: CardProps) => {
  const disabled = operatingUserId === data.id ? true : false;

  return (
    <div className="rounded-2xl bg-zinc-900/70 border border-zinc-800 overflow-hidden shadow-sm hover:shadow-md transition">
      {/* Image */}
      <Image
        src={data.image}
        width={160}
        height={90}
        alt=""
        className="aspect-video w-full"
      />

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold">{data.name}</h3>
        <p className="mt-2 text-sm text-zinc-400 line-clamp-3">
          {data.description}
        </p>

        {/* Actions */}
        <div className="mt-4 flex items-center gap-3">
          <button
            className="inline-flex items-center gap-2 rounded-lg bg-zinc-800 px-3 py-2 text-xs text-zinc-200 hover:bg-zinc-700 transition disabled:cursor-not-allowed"
            disabled={disabled}
            onClick={() => onEdit(data)}
          >
            <Pencil size={14} />
            Update
          </button>

          <button
            className="inline-flex items-center gap-2 rounded-lg bg-red-500/30 px-3 py-2 text-xs text-red-400 hover:bg-red-500/20 transition disabled:cursor-not-allowed"
            disabled={disabled}
            onClick={() => onDelete(data.id)}
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
