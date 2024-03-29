import { SORT } from '@/shared/apis/product/productList';
import { useRouter, useSearchParams } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

export const SortingMethod: { name: string; type: SORT }[] = [
  {
    name: 'Most Popular',
    type: SORT.popular,
  },
  {
    name: 'Price (Low-High)',
    type: SORT.lowPrice,
  },
  {
    name: 'Price (High-Low)',
    type: SORT.highPrice,
  },
  {
    name: 'Name (A - Z)',
    type: SORT.AtoZ,
  },
  {
    name: 'Name (Z - A)',
    type: SORT.ZtoA,
  },
  {
    name: 'Highest Rated',
    type: SORT.highlyRated,
  },
];

interface iProps {
  isMobile: boolean;
  setDropDownValue: Dispatch<SetStateAction<'filter' | 'sort' | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  sortedBy: SORT;
  currentPage: number;
}

const SortFilter: React.FC<iProps> = ({
  isMobile = false,
  setDropDownValue,
  setLoading,
  sortedBy,
  currentPage,
}) => {
  const ignoreZoneFromQueryParams =
    useSearchParams().get('ignorezone') === 'true';
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(
    SortingMethod.find((e) => Number(sortedBy) === e.type) || SortingMethod[0],
  );
  //
  const optionsRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  //
  const handleButtonClick = () => {
    setOpen((open) => !open);
  };

  const handleItemClick = (option: { name: string; type: number }) => {
    setLoading(true);
    const query = `?sort=${option.type}&page=${Number(
      currentPage,
    )}&ignorezone=${ignoreZoneFromQueryParams}`;
    setSelected(option);
    setOpen(false);
    router.push(query);
  };

  useEffect(() => {
    setSelected(
      SortingMethod.find((e) => Number(sortedBy) === e.type) ||
        SortingMethod[0],
    );
  }, [sortedBy]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      const target = (event.target || {}) as Element;
      if (
        optionsRef.current &&
        !optionsRef.current.contains(target) &&
        !(target.closest && target.closest('#menu-button'))
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      {!isMobile ? (
        <div className='py-2 sm:py-0'>
          <div className='relative inline-block text-left z-10'>
            <div className='flex items-center'>
              <button
                type='button'
                className='group inline-flex items-center justify-between text-default-text bg-tertiary w-[250px] px-2 py-3 leading-none border border-primary rounded-xs'
                id='menu-button'
                onClick={handleButtonClick}
                aria-expanded={open}
                aria-haspopup='true'
              >
                <span>Sort by:</span>
                <span>{selected.name}</span>
                <span className='material-icons-outlined text-lg leading-none'>
                  expand_more
                </span>
              </button>
            </div>
            {open && (
              <div
                className='origin-top-right absolute right-0 mt-0 w-[250px] border border-primary bg-tertiary ring-1 ring-black ring-opacity-5 focus:outline-none rounded-xs'
                ref={optionsRef}
              >
                <div className='py-1'>
                  {SortingMethod.map((option, index) => (
                    <button
                      key={option.type + index}
                      type='button'
                      className={`w-full text-left px-2 py-1 text-default-text flex items-center gap-2 ${
                        selected.type === option.type
                          ? 'text-black'
                          : 'text-black'
                      }`}
                      onClick={() => handleItemClick(option)}
                    >
                      <span
                        className={`material-icons-outlined text-default-text text-default ${
                          selected.type === option.type ? '' : 'opacity-0'
                        }`}
                      >
                        check
                      </span>
                      <span>{option.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className='fixed inset-0 transition-all flex duration-500 bg-black bg-opacity-60 z-[100] items-end sort-box'>
          <div className='relative w-full'>
            <div className='bg-tertiary rounded-t-[30px] pb-[30px]'>
              <div className='p-[15px]'>
                <div className='relative text-default-text font-semibold mb-[20px] pb-[10px]'>
                  <a
                    onClick={() => setDropDownValue(null)}
                    className='absolute right-0 top-0 sort-close-btn text-[#ffffff] bg-primary hover:bg-[#8a2c9b] rounded-full w-[30px] h-[30px] text-[12px] p-[5px]'
                  >
                    <span className='material-icons-outlined text-[20px] leading-none'>
                      close
                    </span>
                  </a>
                </div>
                <div className='text-[anchor]'>
                  <div className='text-normal-text font-semibold block text-anchor mb-[15px] font-sub'>
                    Sort by:
                  </div>
                  <ul>
                    {SortingMethod.map((option) => (
                      <li key={option.type}>
                        <label
                          htmlFor='filter_mobile01'
                          className='px-[6px] py-[1px] cursor-pointer flex items-center gap-2'
                        >
                          <input
                            type='radio'
                            id='filter_mobile01'
                            name='filter_mobile'
                            checked={selected.type === option.type}
                            onClick={() => {
                              handleItemClick(option);
                              setDropDownValue && setDropDownValue(null);
                            }}
                            className='h-4 w-4 border-gray-300 rounded'
                          />
                          <span className='whitespace-nowrap'>
                            {option.name}
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SortFilter;
