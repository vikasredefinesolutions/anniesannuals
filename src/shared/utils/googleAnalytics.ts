import { getGTMHomeScript, postGTMScript } from "../apis/google-analytics";

declare global {
    interface Window {
        dataLayer: any;
    }
}
//Track GA event using APIs
export const GoogleAnalyticsTracker = async (
    eventScript: string,
    payload: Record<string, any>,
) => {
    if (!eventScript) {
        if (payload) {
            pushToDataLayerUtil(payload);
        }
        return;
    }
    const eventResponse = await postGTMScript(eventScript, payload);
    if (eventResponse) {
        pushToDataLayerUtil(eventResponse);
    }
};

export const GTMHomeScriptForCG = async (
    eventScript: string,
    storeId: number,
    customerId: number,
) => {
    const eventResponse = await getGTMHomeScript(
        storeId,
        eventScript,
        customerId,
    );
    if (eventResponse) {
        pushToDataLayerUtil(eventResponse);
    }
};

const pushToDataLayerUtil = (payload: Record<string, any>) => {
    const dataLayer = window?.dataLayer || null;
    if (dataLayer) {
        dataLayer.push({ ecommerce: null }); //For clearing ecommerce data layer
        if (payload?.pageDataLayer) {
            dataLayer.push({ ...JSON.parse(payload?.pageDataLayer) });
        }
        if (payload?.userDetails) {
            dataLayer.push({ ...JSON.parse(payload?.userDetails) });
        }
        if (payload?.pageDataLayer2) {
            dataLayer.push({ ...JSON.parse(payload?.pageDataLayer2) });
        }
        if (payload?.pageDataLayer3) {
            dataLayer.push({ ...JSON.parse(payload?.pageDataLayer3) });
        }
        if (payload?.pageItemDetails) {
            dataLayer.push({ ...JSON.parse(payload?.pageItemDetails) });
        }
    }
};
