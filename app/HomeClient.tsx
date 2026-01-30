"use client";

import Card from "@/components/Card";
import ConfirmDialog from "@/components/ConfirmDialog";
import ModalForm from "@/components/ModalForm";
import { useGalleryState } from "@/hooks/useGalleryState";
import type { Gallery } from "@/types";
import { Plus } from "lucide-react";

interface HomeClientProps {
  initialData: Gallery[];
}

const HomeClient = ({ initialData }: HomeClientProps) => {
  const {
    data,
    isDialogOpen,
    isModalOpen,
    setIsDialogOpen,
    setIsModalOpen,
    setOperatingUserId,
    operatingUserId,
    handleDeleteData,
    actionForm,
    editingData,
    setEditingData,
    validasiError,
    setValidationError,
  } = useGalleryState(initialData);

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
    setValidationError({});
    setEditingData(null);
  };

  return (
    <>
      {/* Header */}
      <section className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl    font-semibold tracking-tight">
            My Projects
          </h1>
          <p className="text-sm       text-zinc-400 mt-1">
            Manage and organize your items efficiently
          </p>
        </div>

        <button
          className="inline-flex items-center gap-2 rounded-xl bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-200 transition "
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={18} />
          Add New
        </button>
      </section>

      {/* Cards Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((cardData, i) => (
          <Card
            key={i}
            data={cardData}
            operatingUserId={operatingUserId || undefined}
            onEdit={(data: Gallery) => {
              setEditingData(data);
              setIsModalOpen(true);
            }}
            onDelete={(id: string) => {
              setIsDialogOpen(true);
              setOperatingUserId(id);
            }}
          />
        ))}
      </section>

      {isModalOpen && (
        <ModalForm
          actionForm={actionForm}
          validasiError={validasiError}
          formData={editingData || undefined}
          onClose={handleCloseModal}
        />
      )}

      {isDialogOpen && (
        <ConfirmDialog
          title="Delete User"
          message="Are you sure you want to delete?"
          onCancel={() => {
            setIsDialogOpen(false);
            setOperatingUserId(null);
          }}
          onConfirm={handleDeleteData}
        />
      )}
    </>
  );
};

export default HomeClient;
