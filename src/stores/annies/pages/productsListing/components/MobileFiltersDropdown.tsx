import {
  FilterFacetField,
  FilterFacetFieldsValues,
  iSelectedFilter,
} from '@/app/[...slug]/slug.helper';
import { Dispatch, SetStateAction } from 'react';
import CommonDropdown from './CommonDropdown';
import FilterCapsules from './FilterCapsules';

interface iProps {
  checkedFilters: iSelectedFilter[];
  removeFilters: ({
    type,
    filterFacetFieldValueId,
    ignoreZone,
  }: {
    type: 'individual' | 'all';
    filterFacetFieldValueId: number | null;
    ignoreZone: boolean;
  }) => void;
  filterOptions: FilterFacetField[];
  applyAllFiltersAtOnce: () => void;
  //
  openfilterFacetName: string | null;
  seName: string;
  facetsFoundInURl: boolean;
  //
  toggleDropdown: (facetToOpen: string | null) => void;
  handleFilterCheckbox: (
    option: FilterFacetFieldsValues,
    dropdownName: string,
    isMobile: boolean,
    allowToRemoveFromChip: boolean,
  ) => void;
  //
  setDropDownValue: Dispatch<SetStateAction<'filter' | 'sort' | null>>;
}

const FIlterDropdownMobile: React.FC<iProps> = ({
  checkedFilters,
  removeFilters,
  filterOptions,
  applyAllFiltersAtOnce,
  //
  openfilterFacetName,
  //
  toggleDropdown,
  handleFilterCheckbox,
  seName,
  facetsFoundInURl,
  //
  setDropDownValue,
}) => {
  return (
    <div
      className={`fixed inset-0 transition-all duration-500 bg-tertiary z-[100]  filter-box overflow-auto top-0 `}
    >
      <div className='p-[15px] pb-[80px]'>
        <div className='sticky top-0 pb-[20px] z-20'>
          <div className='relative text-default-text font-semibold mb-[20px] pb-[5px]'>
            <a
              onClick={() => setDropDownValue(null)}
              className='absolute right-0 top-0 filter-close-btn text-[#ffffff] bg-primary hover:bg-[#8a2c9b] rounded-full w-[30px] h-[30px] text-[12px] p-[5px]'
            >
              <span className='material-icons-outlined text-[20px] leading-none'>
                close
              </span>
            </a>
          </div>
        </div>
        <div className='mb-[40px]'>
          <FilterCapsules
            removeFilters={removeFilters}
            checkedFilters={checkedFilters}
            isMobile={true}
            seName={seName}
            facetsFoundInURl={facetsFoundInURl}
          />
        </div>
        <div className='w-full'>
          <div className='pb-[20px] text-normal-text font-sub font-bold'>
            Filter by:
          </div>
          <div className='w-full  md:px-0'>
            {filterOptions?.map((filter, filterPosition) => {
              let isDropdownOpen = openfilterFacetName === filter.sename;

              if (
                openfilterFacetName === 'open-first' &&
                filterPosition === 1
              ) {
                isDropdownOpen = true;
              }

              return (
                <div key={filter.sename}>
                  <CommonDropdown
                    isMobile
                    field={filter}
                    isDropdownOpen={isDropdownOpen}
                    toggleDropdown={toggleDropdown}
                    handleFilterCheckbox={handleFilterCheckbox}
                    checkedFilters={checkedFilters}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className='text-center w-full bg-[#EDFFFA] py-[30px] fixed bottom-0 left-0 right-0 z-50'>
          <button
            onClick={() => applyAllFiltersAtOnce()}
            className='bg-primary py-[15px] px-[30px] text-[14px] text-[#ffffff] font-extrabold uppercase rounded-sm'
          >
            apply filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FIlterDropdownMobile;
