"use client";

import type { SortDescriptor } from "@heroui/react";

import { Button, Chip, Spinner, Table } from "@heroui/react";
import { useMemo, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import useUsers from "./useUsers";
import useDeleteUser from "./useDeleteUser";

export default function Users() {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });
  const { users, isLoading } = useUsers();
  const { handleDeleteUser, isPendingDeleteUser } = useDeleteUser();

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => {
      const column = sortDescriptor.column as keyof typeof a;

      const first = String(a[column] ?? "");
      const second = String(b[column] ?? "");

      let compare = first.localeCompare(second);

      if (sortDescriptor.direction === "descending") {
        compare *= -1;
      }

      return compare;
    });
  }, [users, sortDescriptor]);

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Data Pengguna</h2>

          <p className="mt-1 text-sm text-slate-500">
            Kelola data pengguna yang terdaftar pada sistem.
          </p>
        </div>

        <Button>Tambah Pengguna</Button>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <Table>
          <Table.ScrollContainer>
            <Table.Content
              aria-label="Table with custom cells"
              className="min-w-[800px]"
              sortDescriptor={sortDescriptor}
              onSortChange={setSortDescriptor}
            >
              <Table.Header>
                <Table.Column allowsSorting id="full_name" isRowHeader>
                  {({ sortDirection }) => (
                    <Table.SortableColumnHeader sortDirection={sortDirection}>
                      Nama Lengkap
                    </Table.SortableColumnHeader>
                  )}
                </Table.Column>

                <Table.Column allowsSorting id="nim">
                  {({ sortDirection }) => (
                    <Table.SortableColumnHeader sortDirection={sortDirection}>
                      NIM
                    </Table.SortableColumnHeader>
                  )}
                </Table.Column>

                <Table.Column allowsSorting id="email">
                  {({ sortDirection }) => (
                    <Table.SortableColumnHeader sortDirection={sortDirection}>
                      Email
                    </Table.SortableColumnHeader>
                  )}
                </Table.Column>

                <Table.Column allowsSorting id="role">
                  {({ sortDirection }) => (
                    <Table.SortableColumnHeader sortDirection={sortDirection}>
                      Peran
                    </Table.SortableColumnHeader>
                  )}
                </Table.Column>

                <Table.Column allowsSorting id="status">
                  {({ sortDirection }) => (
                    <Table.SortableColumnHeader sortDirection={sortDirection}>
                      Status
                    </Table.SortableColumnHeader>
                  )}
                </Table.Column>

                <Table.Column className="text-start">Aksi</Table.Column>
              </Table.Header>
              <Table.Body items={sortedUsers}>
                {sortedUsers.map((user) => (
                  <Table.Row key={user.id} id={user.id}>
                    <Table.Cell>{user.full_name}</Table.Cell>

                    <Table.Cell>{user.nim}</Table.Cell>

                    <Table.Cell>{user.email}</Table.Cell>

                    <Table.Cell>{user.role_name}</Table.Cell>

                    <Table.Cell>
                      <Chip color={user.is_verified ? "success" : "danger"}>
                        {user.is_verified ? "Active" : "Inactive"}
                      </Chip>
                    </Table.Cell>

                    <Table.Cell>
                      <div className="flex items-center gap-1">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="danger-soft"
                          onClick={() => {
                            const confirmed = window.confirm(
                              `Yakin ingin menghapus pengguna "${user.full_name}"?`,
                            );

                            if (!confirmed) return;

                            handleDeleteUser(user.id);
                          }}
                          isDisabled={isPendingDeleteUser}
                        >
                          {isPendingDeleteUser ? (
                            <Spinner color="danger" />
                          ) : (
                            <FaRegTrashAlt />
                          )}
                        </Button>
                      </div>
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
}
