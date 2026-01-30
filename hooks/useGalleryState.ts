import { addData, deleteData, updateData } from "@/libs/api";
import type { Gallery } from "@/types";
import { useState } from "react";
import { validateGalleryForm } from "./validateGalleryForm";
import toast from "react-hot-toast";

export function useGalleryState(initialData: Gallery[]) {
  const [data, setData] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingData, setEditingData] = useState<Gallery | null>(null);
  const [operatingUserId, setOperatingUserId] = useState<string | null>(null);
  const [validasiError, setValidationError] = useState<Record<string, string>>(
    {},
  );

  console.log(data);

  function optimisticUpdate(
    prev: Gallery[],
    payload: {
      id?: string;
      name: string;
      description: string;
      image?: string;
    },
  ): Gallery[] {
    // UPDATE
    if (payload.id) {
      setOperatingUserId(payload.id);
      return prev.map((item) =>
        item.id === payload.id
          ? {
              ...item,
              name: payload.name,
              description: payload.description,
              image: payload.image ?? item.image,
            }
          : item,
      );
    }

    // ADD
    const id = "";
    console.log(id, "ini id palsu");

    setOperatingUserId(id);

    return [
      {
        id,
        name: payload.name,
        description: payload.description,
        image: payload.image ?? "",
      },
      ...prev,
    ];
  }

  const actionForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const validation = validateGalleryForm(formData);

    if (!validation.success) {
      setValidationError(validation.errors);
      return;
    }

    setValidationError({});

    const { data, previewImage } = validation.result;
    const isEdit = Boolean(data.id);

    setIsModalOpen(false);

    // optimistic update
    setData((prev) =>
      optimisticUpdate(prev, {
        ...data,
        image: previewImage,
      }),
    );

    try {
      if (isEdit && data.id) {
        await updateData(formData, data.id);
        toast.success("Update user successfuly");
      } else {
        const res = await addData(formData);

        // Change the ID of the newly added data from dummy to the same ID as the one in the database.
        setData((prev) => [res.data, ...prev.slice(1, prev.length)]);
        toast.success("Add user successfuly");
      }
    } catch (error) {
      if (error instanceof Error) {
        if (isEdit && data.id) {
          toast.error("Failed to edit user");
        } else {
          toast.error("Failed to create user");
        }
      }
    } finally {
      setOperatingUserId(null);
    }
  };

  const handleDeleteData = async () => {
    if (operatingUserId) {
      const prevData = data;

      if (prevData) {
        // Optimistik update
        setData((prev) => prev.filter((p) => p.id !== operatingUserId));

        // Reset
        setIsDialogOpen(false);
        setOperatingUserId(null);

        try {
          await deleteData(operatingUserId);
          toast.success("Delete data successfuly");
        } catch (error) {
          if (error instanceof Error) {
            toast.error("Failed to delete user");
            setData(() => prevData);
          }
        }
      }
    }
  };

  return {
    data,
    isModalOpen,
    setIsModalOpen,
    isDialogOpen,
    setIsDialogOpen,
    operatingUserId,
    setOperatingUserId,
    handleDeleteData,
    actionForm,
    editingData,
    setEditingData,
    validasiError,
    setValidationError,
  };
}
