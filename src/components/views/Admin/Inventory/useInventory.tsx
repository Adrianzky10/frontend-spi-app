import inventoryServices from "@/services/inventory.service";
import { IInventory } from "@/Types/Inventory";
import { useQuery } from "@tanstack/react-query";

const useInventory = () => {
  const getInventories = async (): Promise<IInventory[]> => {
    const result = await inventoryServices.getInventories();
    return result.data.data;
  };

  const {
    data: inventories = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["inventories"],
    queryFn: getInventories,
  });

  return {
    inventories,
    isLoading,
    error,
    refetch,
  };
};

export default useInventory;