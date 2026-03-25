import { useCallback, useMemo, useState } from "react";
import type { HomeFilters, ProductsQueryParams, UseDataGridOptions } from "../../Types";

const cleanParams = (obj: Record<string, any>) =>
  Object.fromEntries(Object.entries(obj).filter(([, value]) => value !== undefined && value !== null && value !== "" && (!Array.isArray(value) || value.length > 0)));

export const useDataGrid = ({ defaultFilters = { sort: "new" }, page = 0, pageSize = 20, pagination = true }: UseDataGridOptions = {}) => {
  const [filters, setFilters] = useState<HomeFilters>(defaultFilters);
  const [paginationModel, setPaginationModel] = useState<{ page: number; pageSize: number }>({ page, pageSize });

  const updateFilter = (key: keyof HomeFilters, value?: string) => {
    setFilters((prev) => {
      const next = { ...prev, [key]: value };
      if (!value) delete next[key];
      return next;
    });
  };

  const params = useMemo<ProductsQueryParams>(() => {
    const p: ProductsQueryParams = {};
    if (pagination) {
      p.page = paginationModel.page + 1;
      p.limit = paginationModel.pageSize;
    }
    if (filters.scent) p.scentFilter = filters.scent;
    if (filters.season) p.seasonFilter = filters.season;
    if (filters.gender) p.genderFilter = filters.gender;
    if (filters.collectionFilter) p.collectionFilter = filters.collectionFilter;
    if (typeof filters.TrendingFilter !== "undefined") p.TrendingFilter = filters.TrendingFilter;
    if (filters.sortByFilter) p.sortByFilter = filters.sortByFilter;
    return cleanParams(p) as ProductsQueryParams;
  }, [filters.gender, filters.scent, filters.season, filters.collectionFilter, filters.sortByFilter, filters.TrendingFilter, pagination, paginationModel.page, paginationModel.pageSize]);

  const resetModels = useCallback(() => {
    setPaginationModel({ page, pageSize });
    setFilters(defaultFilters);
  }, [defaultFilters, page, pageSize]);

  return {
    filters,
    setFilters,
    updateFilter,
    paginationModel,
    setPaginationModel,
    params,
    resetModels,
  };
};
