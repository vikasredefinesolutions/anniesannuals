import { activeStoreName } from '@/shared/configs';
import { writeFile } from 'fs/promises';
import { nextResponse } from '../cors/cors';
import { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const fileName = request.headers.get('filename');
    const folderName = request.headers.get('foldername');

    if (!fileName || !data) {
      return nextResponse(400, { error: 'Failed to replace file' });
    }

    if (folderName === 'cmsData') {
      const jsonFilePath =
        process.cwd() + `/src/${activeStoreName}/cmsData/${fileName}`;

      await writeFile(jsonFilePath, JSON.stringify(data, null, 2));
      revalidatePath('/');

      return nextResponse(200, { message: 'File replaced successfully' });
    } else {
      return nextResponse(404, { error: 'Failed to replace file' });
    }
  } catch (err) {
    return nextResponse(500, { error: 'Failed to replace file' });
  }
}

export async function OPTIONS(request: Request) {
  return new Response(null, {
    status: 204,
  });
}
