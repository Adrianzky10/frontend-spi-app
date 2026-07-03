"use client";
import { Button, InputGroup, Spinner, Table, TextField } from "@heroui/react";
import { FaRegTrashAlt } from "react-icons/fa";
import useCreateCategory from "./useCreateCategory";
import { Controller } from "react-hook-form";
import { FieldError } from "react-aria-components";
import { LuCircleAlert } from "react-icons/lu";
import useCategory from "./useCategory";
import useDeleteCategory from "./useDeleteCategory";

const Categories = () => {
  const { categories, isLoading } = useCategory();
  const {
    control,
    handleSubmit,
    handleCreateCategory,
    isPendingCreateCategory,
    errors,
  } = useCreateCategory();
  const { handleDeleteCategory, isPendingDeleteCategory, errorTable } =
    useDeleteCategory();
  return (
    <>
      <div className="mb-5 flex flex-col">
        <div>
          <h2 className="text-2xl font-bold">Kategori Inventaris</h2>

          <p className="mt-1 text-sm text-slate-500">
            Kelola kategori inventaris yang tersedia pada sistem.
          </p>
        </div>

        {errorTable && (
          <div className="bg-danger/10 text-danger mt-3 mb-3 flex items-center gap-2 rounded-lg p-3 text-xs">
            <LuCircleAlert className="text-lg" />
            {errorTable}
          </div>
        )}

        <form
          onSubmit={handleSubmit(handleCreateCategory)}
          className="mt-4 flex items-start justify-center gap-2"
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                isInvalid={!!errors.name}
                className="w-full"
                aria-label="Nama Kategori"
              >
                <FieldError className="bg-danger/10 text-danger mb-3 flex items-center gap-2 rounded-lg p-3 text-xs">
                  <LuCircleAlert className="text-lg" />
                  {errors.name?.message}
                </FieldError>
                <InputGroup className="rounded-full border border-slate-200 bg-slate-50 transition-colors focus-within:border-[#0066FF] focus-within:bg-white">
                  <InputGroup.Input
                    {...field}
                    placeholder="Nama Kategori"
                    autoComplete="off"
                    type="text"
                    className="bg-transparent px-4 text-slate-900 placeholder:text-slate-400"
                  />
                  <Button type="submit">
                    {isPendingCreateCategory ? <Spinner /> : "Tambah Kategori"}
                  </Button>
                </InputGroup>
              </TextField>
            )}
          />
        </form>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <Table>
          <Table.ScrollContainer>
            <Table.Content aria-label="Data Kategori" className="min-w-[600px]">
              <Table.Header>
                <Table.Column isRowHeader>ID</Table.Column>

                <Table.Column>Nama Kategori</Table.Column>

                <Table.Column className="text-start">Aksi</Table.Column>
              </Table.Header>

              <Table.Body items={categories}>
                {categories.map((category) => (
                  <Table.Row key={category.id} id={category.id}>
                    <Table.Cell>{category.id}</Table.Cell>

                    <Table.Cell>{category.name}</Table.Cell>

                    <Table.Cell>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="danger-soft"
                        onClick={() => {
                          const confirmed = window.confirm(
                            `Yakin ingin menghapus kategori "${category.name}"?`,
                          );

                          if (!confirmed) return;

                          handleDeleteCategory(category.id);
                        }}
                      >
                        {isPendingDeleteCategory ? (
                          <Spinner />
                        ) : (
                          <FaRegTrashAlt />
                        )}
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      )}
    </>
  );
};

export default Categories;
