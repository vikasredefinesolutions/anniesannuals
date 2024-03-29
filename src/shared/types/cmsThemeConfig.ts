export interface ICmsStoreThemeConfig {
    id: number;
    store_id: number;
    config_name: string;
    config_value: string;
    status: string;
}

export interface IHeaderMenuConfig {
    id: number,
    topic_Id: number,
    type: string,
    open_In_New_Tab: string,
    menu_Info: string,
    store_Id: number,
    created_By: string,
    category: string,
    se_Name: string,
    title: string,
    menu_Type: string,
    categoryCustomFields: { value: string, label: string }[],
    customCollectionUrl: string,
    landingPage: string
}
