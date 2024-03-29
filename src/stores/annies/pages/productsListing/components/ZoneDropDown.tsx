import {
  FilterFacetField,
  FilterFacetFieldsValues,
  iSelectedFilter,
} from '@/app/[...slug]/slug.helper';
import useModel from '@/stores/annies/shared/hooks/use-model';
import AddShippingZipcode from '@/stores/annies/widgets/header/components/AddShippingZipcode';
import { useEffect, useRef, useState } from 'react';

interface iProps {
  isMobile: boolean;
  field: FilterFacetField;
  isDropdownOpen: boolean;
  toggleDropdown: (facetToOpen: string | null) => void;
  handleFilterCheckbox: (
    option: any,
    dropdownName: string,
    isMobile: boolean,
    allowToRemoveFromChip: boolean,
    delayRouteUpdation: boolean,
  ) => void;
  checkedFilters: iSelectedFilter[];
}

interface iModifiedZone extends FilterFacetFieldsValues {
  selected: boolean;
}

const all = {
  filterFacetFieldValueId: -1,
  filterFacetFieldValue: 'All',
  imagePath: '',
  productCount: 0,
  sename: 'all',
  selected: false,
};

const initialSelectedZones = ({
  zones,
  checkedFilters,
}: {
  zones: FilterFacetFieldsValues[];
  checkedFilters: iSelectedFilter[];
}): { arr: iModifiedZone[]; str: string } => {
  const selectedZonesArr: string[] = [];
  let selectedZonesStr: string = '';
  let noZoneFound = true;

  checkedFilters.forEach((filter, index) => {
    if (filter.facetName === 'zone') {
      noZoneFound = false;
      all.selected = false; // as 'all' variable is out of function it's value will not be reinitialized therefore needs to updated here.
      selectedZonesArr.push(filter.sename);
      selectedZonesStr += filter.sename + ', ';
    }

    if (index === checkedFilters.length - 1) {
      const length = selectedZonesStr.length;
      selectedZonesStr = selectedZonesStr.slice(0, length - 2);
    }
  });

  if (noZoneFound) {
    selectedZonesArr.push(all.sename);
  }

  // this will decide the selected status as false for other zones
  const allIsSelected = selectedZonesArr.includes(all.sename);

  if (allIsSelected) {
    all.selected = true;
    selectedZonesStr = all.filterFacetFieldValue;
  }

  const modifiedZones: iModifiedZone[] = zones.map((zone) => {
    if (allIsSelected) {
      // here the remaining zones which will not include 'all' zone will be returned as not selected
      return {
        ...zone,
        selected: false,
      };
    }

    const selected = selectedZonesArr.includes(zone.sename);
    return {
      ...zone,
      selected: selected,
    };
  });

  return { arr: [all, ...modifiedZones], str: selectedZonesStr };
};

const ZoneDropDown: React.FC<iProps> = ({
  isMobile,
  field,
  isDropdownOpen,
  toggleDropdown,
  handleFilterCheckbox,
  checkedFilters,
}) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const {
    isOpen: isShippingModalOpen,
    openModel: openShippingModal,
    onRequestClose: closeShippingModal,
  } = useModel(false);

  const [selectedZones, setSelectedZones] = useState<{
    arr: iModifiedZone[];
    str: string;
  }>(
    initialSelectedZones({
      zones: field?.filterFacetFieldsValues,
      checkedFilters,
    }),
  );

  const handleSelectZone = (input: FilterFacetFieldsValues) => {
    const applyAllZonesAtDelay = isMobile ? false : true;
    const allIsSelected = input.sename === all.sename;
    let selectedZonesStr = '';

    if (selectedZones.str === 'All' && allIsSelected) return;

    const zones = selectedZones.arr.map((zone) => {
      // if 'all' option is selected then only all selected status should be true
      if (allIsSelected) {
        selectedZonesStr = all.filterFacetFieldValue;
        return {
          ...zone,
          selected: zone.sename === all.sename,
        };
      }

      // if 'all' option is selected then others selected status should be false
      if (zone.sename === all.sename) {
        return {
          ...zone,
          selected: false,
        };
      }

      if (zone.sename === input.sename) {
        zone.selected
          ? null
          : (selectedZonesStr += zone.filterFacetFieldValue + ', ');
        return {
          ...zone,
          selected: !zone.selected,
        };
      }
      zone.selected
        ? (selectedZonesStr += zone.filterFacetFieldValue + ', ')
        : null;

      return zone;
    });

    setSelectedZones({
      arr: zones,
      str: allIsSelected
        ? selectedZonesStr
        : selectedZonesStr.slice(0, length - 2),
    });

    handleFilterCheckbox(
      input,
      field?.sename || '',
      isMobile,
      true,
      applyAllZonesAtDelay,
    );
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (!isDropdownOpen) return;
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      toggleDropdown(field.sename || null);
      closeShippingModal();
    }
  };

  //
  useEffect(() => {
    setSelectedZones(
      initialSelectedZones({
        zones: field?.filterFacetFieldsValues,
        checkedFilters,
      }),
    );
  }, [checkedFilters.length]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      key={field.filterFacetFieldId}
      className='border border-transparent border-b border-b-gray-border mb-[20px] p-[15px] bg-[#EDFBFF] !border-[#D4D4D4] rounded-tl-sm rounded-br-sm'
    >
      <button className='flex items-center justify-between w-full group'>
        <div className='text-normal-text font-semibold block text-primary mb-[15px] font-sub'>
          {field.filterFacetFieldName}
        </div>
      </button>
      <div ref={dropdownRef} className='text-default-text mb-[15px]'>
        <div className='relative text-left z-10 mb-[15px]'>
          <div className='flex items-center'>
            <button
              type='button'
              className='group inline-flex items-center justify-between text-default-text bg-[#EDFBFF] w-full px-2 py-3 leading-none border border-primary rounded-xs'
              id='menu-button1'
              aria-haspopup='true'
              aria-expanded={isDropdownOpen}
              onClick={() => toggleDropdown(field?.sename || null)}
            >
              <span>{selectedZones.str}</span>
              <span className='material-icons-outlined text-lg leading-none'>
                expand_more
              </span>
            </button>
          </div>
          <div
            className='origin-top-right absolute right-0 mt-0 w-full border border-primary bg-[#EDFBFF] ring-1 ring-black ring-opacity-5 focus:outline-none rounded-xs'
            style={{ display: !isDropdownOpen ? 'none' : '' }}
          >
            <div className='p-[15px]' x-ref='options'>
              <ul className='max-h-[400px] overflow-y-auto'>
                {selectedZones.arr.map((option, index) => (
                  <li
                    key={option.filterFacetFieldValueId}
                    // onClick={() => toggleDropdown(field?.sename || null)}
                    className='flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0'
                  >
                    <div className='flex items-center'>
                      <input
                        id={`Zone-${option.filterFacetFieldValueId}`}
                        name='Zone[]'
                        value={option.filterFacetFieldValue}
                        type={'checkbox'}
                        checked={option.selected}
                        className='h-5 w-5 border-gray-300 rounded'
                        onChange={() => handleSelectZone(option)}
                      />
                      <label
                        htmlFor={`Zone-${option.filterFacetFieldValueId}`}
                        className='ml-[10px] font-sub text-small-text font-semibold'
                      >
                        {option.filterFacetFieldValue}
                      </label>
                    </div>
                    <div className='font-sub text-small-text font-semibold mr-[5px]'>
                      <span className='text-[#7D826C]'>
                        {option.filterFacetFieldValue !== 'All' &&
                          `(${Number(option.productCount)})`}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button
          onClick={openShippingModal}
          className='text-default-text text-primary underline font-sub cursor-pointer'
        >
          FIND MY ZONE
        </button>
      </div>
      {isShippingModalOpen && (
        <AddShippingZipcode closeModal={closeShippingModal} />
      )}
    </div>
  );
};

export default ZoneDropDown;
