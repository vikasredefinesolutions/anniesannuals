'use client'

import { createContext } from "react";

type _ProductDetailContext = {
    altImages: { imageUrl: string, alt: string }[];
    colors?: { productId: number, name: string, altTag: string, imageUrl: string, attributeOptionId: number, seName: string }[];
    product: { id: string, name: string, sku: string, price: number, qty: number } | null,
}
export const ProductDetailContext = createContext<_ProductDetailContext>({ altImages: [], product: null });
