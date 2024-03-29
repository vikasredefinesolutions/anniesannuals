import Image from '../Image';

interface Props {
  id: number;
  name: string;
  sename: string;
  categoryImageList: any;
  categoryCustomFields: any;
  iswishlist: boolean;
}

const SubcategoryCard = ({
  id,
  name,
  sename,
  categoryImageList,
  categoryCustomFields,
  iswishlist,
}: Props) => {
  return (
    <div
      className={
        'w-6/12 md:w-6/12 lg:w-3/12 pb-[20px] lg:pb-[30px] px-[8px] lg:px-[15px] divmore box-color-main'
      }
    >
      <div className='relative overflow-hidden rounded-tl-lg rounded-br-lg group'>
        <div className=''>
          <a href={`/${sename}.html`}>
            <Image
              src={
                categoryImageList[0].categoryImage
                  ? `${categoryImageList[0].categoryImage}`
                  : '/annies/1/category/81/category_12.jpg'
              }
              className='group-hover:scale-125 transition-all duration-700 h-[350px] w-full'
              alt={''}
            />
          </a>
        </div>
        <div className='absolute left-4 top-4 cursor-pointer'>
          <Image
            isStatic
            src={
              iswishlist
                ? '/assets/images/wishlist-selected.png'
                : '/assets/images/wishlist.png'
            }
            alt='Wishlist Selected'
            title='Wishlist Selected'
          />
        </div>
        <div
          className={
            'lg:absolute p-[15px] box-color bg-[#9C331C] lg:bg-opacity-80 group-hover:bg-opacity-100 inset-x-0 bottom-0 transition-all duration-700'
          }
          //   style={{ backgroundColor: containerBg, opacity: '80%' }}
        >
          <div className='h-full w-full'>
            <div className='truncate text-white'>
              <a
                href={`/${sename}.html`}
                className='text-normal-text text-white font-bold font-sub w-full '
              >
                {name}
              </a>
            </div>
          </div>
          <div className='text-default-text text-white mb-[10px] truncate w-full'>
            Spring & Early Summer Gardens
            <div className='absolute p-[15px] bg-opacity-80 group-hover:bg-opacity-100 right-0 bottom-0 mb-[10px] transition-all duration-700'>
              <a
                href={`/${sename}.html`}
                className='h-[25px] w-[25px] flex justify-center items-center text-white bg-[#000000] bg-opacity-20 group-hover:bg-opacity-100 rounded-full'
              >
                <span className='material-icons-outlined'>chevron_right</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubcategoryCard;
