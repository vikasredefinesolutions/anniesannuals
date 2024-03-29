import { SendAsync } from "@/shared/utils/axios";

export const uploadMedia = async (folder: string, files: never[] | File) => {
  try {
    const url = `/upload/image?folderPath=${folder}`;
    const res = await SendAsync<any>({
      url,
      method: 'POST',
      data: { files },
    });
    return res;
  } catch (error) {
    return null;
  }
};
