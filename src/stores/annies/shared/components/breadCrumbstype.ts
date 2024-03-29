export interface IBreadCrumbProps {
    breadCrumbs: Array<{
        name: string;
        url: string;
    }>;
    bgColor?:string
}
export interface IBreadCrumbsData{
    name: string;
    url: string;
};