import { useQuery } from "@tanstack/react-query";
import categoryServices from "@/services/category.service";
import { ICategory } from "@/Types/Category";

const useCategory = () => {
  const getCategories = async (): Promise<ICategory[]> => {
    const result = await categoryServices.getCategories();

    if (result.data?.status === "error") {
      throw new Error(result.data?.message || "Gagal mengambil data kategori");
    }

    return result.data.data;
  };

  const {
    data: categories = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return {
    categories,
    isLoading,
    isError,
    error,
    refetch,
  };
};

export default useCategory;
