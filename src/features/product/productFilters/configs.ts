export type Filter = {
  id: number;
  title: string;
};

// Описываем здесь датасет фильтров "Закрытые" / "Открытые" и т.п.
export const filters: Record<number, Filter> = {
  1: {
    id: 1,
    title: "All",
  },
};

export const DEFAULT_FILTER = 1;

export const filtersList = Object.values(filters);

export const getFilterById = (id: number) => filters[id];
