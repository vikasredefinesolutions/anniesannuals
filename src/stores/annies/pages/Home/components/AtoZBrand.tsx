import { getStoreId } from '@/utils/cookie.helper';
import { useEffect, useState } from 'react';
import Br_Alphabets from './Br_Alphabets';
import { _Brand } from './home.type';
import { removeDuplicates } from './home2.helper';
import { fetchAllBrands } from '@/api/services/home';

const AtoZBrand = () => {
  const [brands, setBrands] = useState<_Brand[] | null>(null);
  const storeId = getStoreId();
  const albhabetSet = new Set();
  const [alphabets, setAlphabets] = useState<string[]>([]);

  const getBrands = async () => {
    await fetchAllBrands({ storeId: storeId }).then((result: any) => {
      if (!result?.brands) {
        return;
      }
      let brand = result.brands.sort(
        (a: { brandName: string }, b: { brandName: string }) => {
          return a.brandName
            .toLowerCase()
            .localeCompare(b.brandName.toLowerCase());
        },
      );
      // done as sort is not working same in firefox
      brand.map((a: { brandName: string }) => {
        albhabetSet.add(a.brandName[0].trim().toLowerCase());
      });
      if (brand) {
        brand = removeDuplicates(brand);
        brand = brand.map((brd: _Brand) => {
          const firstLetter = brd.brandName.charAt(0).toUpperCase();
          const remainingLetter = brd.brandName.slice(1);
          return { ...brd, brandName: firstLetter + remainingLetter };
        });
      }

      setBrands(brand);

      let alphabet = albhabetSet?.size
        ? (Array.from(albhabetSet) as string[])
        : [];

      setAlphabets(alphabet);
    });
  };

  useEffect(() => {
    if (storeId) {
      getBrands();
    }
  }, [storeId]);
  return (
    <>
      <Br_Alphabets brands={brands} alphabets={alphabets} />
    </>
  );
};

export default AtoZBrand;
