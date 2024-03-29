export interface IFilterFacetFields {
    name: 'Uses' | 'Features/Category' | 'Life Span' | {} & string;
    values: Array<{ value: string, imagePath: string | null }>
} 