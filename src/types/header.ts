import { tHeaderSubMenuFile } from '@/helper/staticfile.helper';

export interface Category {
  collectionImageURl: string;
  createdBy: number;
  createdDate: string;
  description: string;
  id: number;
  ipAddress: string;
  location: string;
  macAddress: string;
  modifiedBy: string | null;
  modifiedDate: string | null;
  name: string;
  recStatus: string | null;
  rowVersion: string;
}

// type Subcategory = {
//   id: number;
//   categoryName: string;
//   seName: string;
//   customSEName: string | null;
//   categoryImagePath: string | null;
//   displayOrder: number;
//   isPopular: boolean;
// };

// export type SubCategoryList = Record<string, Subcategory[]>
export type SubCategoryList = tHeaderSubMenuFile;
