import { useMemo } from "react";
import { Queries } from "../../Api/Queries";
import type { ProductItem } from "../../Types";

export const useFeaturedProducts = (excludeId?: string) => {
  const { data, isLoading, isFetching } = Queries.useGetProducts({ FeaturedFilter: true });

  const products = useMemo(() => {
    const list: ProductItem[] = data?.data?.product_data ?? [];
    return list.filter((item) => {
      const isFeatured = (item as any)?.isFeatured;
      const ok = isFeatured === true || isFeatured === "true";
      if (!ok) return false;
      return excludeId ? item?._id !== excludeId : true;
    });
  }, [data, excludeId]);

  return { products, isLoading: isLoading || isFetching };
};
