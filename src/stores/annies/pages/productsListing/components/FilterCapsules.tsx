import { iSelectedFilter } from '@/app/[...slug]/slug.helper';
import { useEffect, useState } from 'react';
import { LISTING_APPLIED_FILTERS } from '../filter.helper';

interface iProps {
  checkedFilters: iSelectedFilter[];
  isMobile: boolean;
  removeFilters: (inputs: {
    type: 'individual' | 'all';
    filterFacetFieldValueId: null | number;
    ignoreZone: boolean;
  }) => void;
  seName: string;
  facetsFoundInURl: boolean;
}

function FilterCapsules({
  checkedFilters,
  removeFilters,
  isMobile = false,
  seName,
  facetsFoundInURl,
}: iProps) {
  let filtersCount = 0;
  const [locallyStoredFilters, setLocallyStoredFilters] =
    useState<iSelectedFilter[]>(checkedFilters);

  const removeFitlerMiddleware = (
    filterFacetFieldValueId: number | null,
    facetName: string,
  ) => {
    if (!filterFacetFieldValueId) {
      removeFilters({
        type: 'all',
        filterFacetFieldValueId: null,
        ignoreZone: true,
      });
      return;
    }

    removeFilters({
      type: 'individual',
      filterFacetFieldValueId,
      ignoreZone: facetName === 'zone',
    });
  };

  const extractFiltersFromLocalStorage = () => {
    const string = localStorage.getItem(LISTING_APPLIED_FILTERS);

    if (!string) return;
    const filtersWithSeName = JSON.parse(string) as {
      filters: iSelectedFilter[];
      seName: string;
    };

    if (filtersWithSeName.seName !== seName) return;

    setLocallyStoredFilters(filtersWithSeName.filters);
  };

  useEffect(() => {
    if (!checkedFilters || checkedFilters.length === 0) {
      if (!facetsFoundInURl) return;
      extractFiltersFromLocalStorage();
      return;
    }

    setLocallyStoredFilters(checkedFilters);
  }, [checkedFilters]);

  return (
    <>
      <div className='md:hidden font-sub font-bold mb-[10px] text-[14px] capitalize'>
        Applied Filters
      </div>
      <div
        className={
          !isMobile
            ? 'flex flex-wrap items-center gap-[5px] pb-[20px]'
            : 'flex flex-wrap items-center gap-[5px]'
        }
      >
        {locallyStoredFilters?.map((option, index) => {
          if (option.allowToRemoveFromChip) return null;
          return (
            <div
              key={index}
              style={{ width: 'fit-content' }}
              className={
                !isMobile
                  ? 'flex flex-wrap items-center gap-[5px] bg-[#FCEEFF] rounded-sm px-[10px] py-[5px] text-[#634B91] border border-[#694D84]'
                  : 'flex flex-wrap items-center gap-[10px] bg-[#FCEEFF] rounded-sm px-[10px] py-[5px] text-[#634B91] border border-[#694D84]'
              }
            >
              <div className='text-[12px] capitalize'>
                {option.filterFacetFieldValue}
              </div>
            </div>
          );
        })}

        {locallyStoredFilters?.map((option, index) => {
          if (!option.allowToRemoveFromChip) return null;
          filtersCount += 1;

          return (
            <div
              key={index}
              style={{ width: 'fit-content' }}
              className={
                !isMobile
                  ? 'flex flex-wrap items-center gap-[5px] bg-[#FCEEFF] rounded-sm px-[10px] py-[5px] text-[#634B91] border border-[#694D84]'
                  : 'flex flex-wrap items-center gap-[10px] bg-[#FCEEFF] rounded-sm px-[10px] py-[5px] text-[#634B91] border border-[#694D84]'
              }
            >
              <button className='text-[12px] capitalize'>
                {option.filterFacetFieldValue}
              </button>
              <span
                className='material-icons-outlined text-[12px] leading-none'
                onClick={() =>
                  removeFitlerMiddleware(
                    option.filterFacetFieldValueId,
                    option.facetName,
                  )
                }
                style={{ cursor: 'pointer' }}
              >
                close
              </span>
            </div>
          );
        })}
        {filtersCount > 1 && (
          <button
            className='text-[12px] text-[#634B91] uppercase'
            onClick={() => removeFitlerMiddleware(null, 'zone')}
            style={{ textDecoration: 'underline', cursor: 'pointer' }}
          >
            Clear All
          </button>
        )}
      </div>
    </>
  );
}

export default FilterCapsules;
