import { FilterFacetField, iSelectedFilter } from '@/app/[...slug]/slug.helper';
import ZoneDropDown from './ZoneDropDown';

interface iProps {
  isMobile: boolean;
  field: FilterFacetField;
  toggleDropdown: (facetToOpen: string | null) => void;
  checkedFilters: iSelectedFilter[];
  handleFilterCheckbox: (
    option: any,
    dropdownName: string,
    isMobile: boolean,
    allowToRemoveFromChip: boolean,
  ) => void;
  isDropdownOpen: boolean;
}

const CommonDropdown: React.FC<iProps> = ({
  isMobile,
  isDropdownOpen,
  field,
  toggleDropdown,
  checkedFilters,
  handleFilterCheckbox,
}) => {
  if (field.filterFacetFieldName === 'Zone') {
    return (
      <ZoneDropDown
        isMobile={isMobile}
        field={field}
        isDropdownOpen={isDropdownOpen}
        toggleDropdown={toggleDropdown}
        handleFilterCheckbox={handleFilterCheckbox}
        checkedFilters={checkedFilters}
      />
    );
  }

  return (
    <div
      key={field.filterFacetFieldId}
      className='border border-transparent border-b border-b-gray-border mb-[20px] pb-[20px]'
    >
      <button
        type='button'
        className='flex items-center justify-between w-full group'
        aria-expanded={isDropdownOpen}
        onClick={() => toggleDropdown(field.sename || null)}
      >
        <div className='text-normal-text font-semibold block text-primary font-sub'>
          {field.filterFacetFieldName}
        </div>
        <span className='material-icons-outlined text-default-text font-semibold'>
          {isDropdownOpen ? 'remove' : 'add'}
        </span>
      </button>

      <div
        className='text-default-text pt-[15px]'
        style={{ display: isDropdownOpen ? 'block' : 'none' }}
      >
        <div>
          <ul>
            {field.filterFacetFieldsValues
              ?.slice()
              // .sort((a, b) => {
              //   return a.filterFacetFieldValue.localeCompare(
              //     b.filterFacetFieldValue,
              //   );
              // })
              .map((option) => {
                let allowFilterToRemove = true;
                const checked =
                  checkedFilters?.find((e) => {
                    if (
                      e.filterFacetFieldValueId ===
                      option.filterFacetFieldValueId
                    ) {
                      if (!e.allowToRemoveFromChip) {
                        allowFilterToRemove = false;
                      }
                      return true;
                    }
                    return false;
                  }) !== undefined;

                return (
                  <li
                    key={option.filterFacetFieldValueId}
                    className='flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0'
                  >
                    <div className='flex items-center'>
                      <input
                        id={`PlantType-${option.filterFacetFieldValueId}`}
                        type='checkbox'
                        value={option.filterFacetFieldValue}
                        name={`plantType-checkbox-${option.filterFacetFieldValueId}`}
                        className='h-4 w-4 border-gray-300 rounded'
                        disabled={!allowFilterToRemove}
                        onChange={() => {
                          if (!allowFilterToRemove) return;

                          handleFilterCheckbox(
                            option,
                            field.sename || '',
                            isMobile,
                            allowFilterToRemove,
                          );
                        }}
                        checked={checked}
                      />
                      <label
                        htmlFor={`PlantType-${option.filterFacetFieldValueId}`}
                        className='ml-[10px] font-sub text-small-text font-semibold'
                      >
                        {option.filterFacetFieldValue}
                      </label>
                    </div>
                    <div className='font-sub text-small-text font-semibold'>
                      <span className='text-[#7D826C]'>
                        ({Number(option.productCount)})
                      </span>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CommonDropdown;
