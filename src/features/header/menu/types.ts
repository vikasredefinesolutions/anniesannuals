export interface ISubCategory {
    popular: ISubmenuCategories[];
    nonPopular: ISubmenuCategories[]
}

export interface ISubmenuCategories {
    id: number;
    categoryName: string;
    seName: string;
    displayOrder: number,
    isPopular: boolean
    customSEName: string | null
}

export interface IBestSellingProducts { imageUrl: string; title: string; link: string }[]