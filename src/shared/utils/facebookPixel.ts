

declare const fbq: (command: string, ...args: any[]) => void;
//Track facebook conversion event
export const PixelTracker = async (
    eventName: string,
    eventType: string,
    payload: Record<string, string | number | boolean | undefined | number[] | string[]>,
) => {

    fbq(eventName, eventType, payload);
    return null;
};