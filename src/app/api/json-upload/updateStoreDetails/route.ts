import { updateHeaderSubmenu } from '@/api/jsonServices/updateHeaderSubmenu';
import { updateHomePageDetails } from '@/api/jsonServices/updateHomePageDetails';
import { updateHomePageMetaData } from '@/api/jsonServices/updateHomePageMetaData';
import { updateStoreDetails } from '@/api/jsonServices/updateStoreDetails';
import { revalidatePath } from 'next/cache';
import { NextRequest } from 'next/server';
import { nextResponse } from '../../cors/cors';

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.text();
    const data = !requestBody ? null : JSON.parse(requestBody);
    const isStoreUpdated = await updateStoreDetails(data);

    if (!isStoreUpdated) {
      return nextResponse(400, {
        error: 'Failed to update store details',
      });
    }

    await updateHomePageDetails();

    await Promise.all([
      updateHeaderSubmenu(),
      updateHomePageMetaData(isStoreUpdated.storeId),
    ]);
    revalidatePath('/');
    revalidatePath('*');

    return nextResponse(200, {
      message: 'Store details and header submenu updated successfully',
    });
  } catch (err: any) {
    return nextResponse(400, {
      error: err?.message || 'Failed to replace file',
    });
  }
}

export async function OPTIONS(request: Request) {
  return new Response(null, {
    status: 204,
  });
}
