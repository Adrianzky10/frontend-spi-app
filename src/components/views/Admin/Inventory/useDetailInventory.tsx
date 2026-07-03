import { useQuery } from "@tanstack/react-query";
import inventoryServices from "@/services/inventory.service";

const useDetailInventory = (id: string) => {
  const getInventoryById = async () => {
    const result = await inventoryServices.getInventoryById(id);

    if (result.data?.status === "error") {
      throw new Error(result.data.message);
    }

    return result.data.data;
  };

  const {
    data: inventory,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["inventory", id],
    queryFn: getInventoryById,
    enabled: !!id,
  });

  return {
    inventory,
    isLoading,
    error,
    refetch,
  };
};

export default useDetailInventory;