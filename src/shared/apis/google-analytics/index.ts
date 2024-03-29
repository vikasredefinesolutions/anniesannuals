import { SendAsync } from "@/shared/utils/axios";

export const getGTMHomeScript = async (
    storeId: number,
    scriptType: string,
    customerId: number,
): Promise<any | null> => {
    const url = `ga4cg/DataLayer/${scriptType}/${storeId}/${customerId}.json`;
    const resposne = await SendAsync<any>({
        url: url,
        method: 'GET',
    });
    return resposne;
};

export const postGTMScript = async (
    scriptName: string,
    payload: Record<string, any>,
    customerId?: number | string | null,
) => {
    try {
        const url = `ga4forallstore/${scriptName}${customerId ? '/' + customerId : ''
            }.json`;
        const response = await SendAsync<any>({
            url,
            method: 'POST',
            data: payload,
        });
        return response;

    } catch (error) {
        return 'Something went wrong in GA4'
    }

};