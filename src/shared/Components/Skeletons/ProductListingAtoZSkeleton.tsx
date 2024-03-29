import { alphabets } from '@/utils/helpers';
import { paths } from '@/utils/paths.constant';
import Image from '../Image';

type Props = { filterChar: string };

const ProductListingAtoZSkeleton = () => {
  const filterChar = 'A';
  const isAtoZ = true;
  const isSubcategory = false;
  const iswishlist = true;
  const brandName = 'skeleton';

  // console.log('I am coming here');
  return (
    <div>
      <div className='container mx-auto relative'>
        <div className='py-[20px]'>
          <div className=''>
            <ul className='flex flex-wrap items-center gap-[10px] text-[14px] font-semibold font-sub'>
              <li className=''>
                <a href='index.html' className='text-anchor'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='21.621'
                    height='19.897'
                    viewBox='0 0 21.621 19.897'
                  >
                    <path
                      id='Path_48756'
                      data-name='Path 48756'
                      d='M2.25,12,11.2,3.045a1.126,1.126,0,0,1,1.591,0L21.75,12M4.5,9.75V19.875A1.125,1.125,0,0,0,5.625,21H9.75V16.125A1.125,1.125,0,0,1,10.875,15h2.25a1.125,1.125,0,0,1,1.125,1.125V21h4.125A1.125,1.125,0,0,0,19.5,19.875V9.75M8.25,21H16.5'
                      transform='translate(-1.189 -1.853)'
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='1.5'
                    />
                  </svg>
                </a>
              </li>
              <li className=''>/</li>
              <li className=''>Shop by A – Z</li>
            </ul>
          </div>
        </div>
        <div className='flex border-b border-b-[#96A898] mb-[30px] text-normal-text font-sub overflow-x-auto'>
          {alphabets.map((item) => {
            return (
              <a
                key={item}
                href={paths.productListingAtoZ + `?filter=${item}`}
                className={`text-primary border-b-[5px] hover:border-b-primary ${
                  item == filterChar
                    ? 'border-b-primary'
                    : 'border-b-transparent'
                } font-bold px-[16px] pb-[5px] cursor-pointer`}
              >
                {item}
              </a>
            );
          })}
        </div>
        <div className='flex flex-wrap mx-[-15px]'>
          <div className='w-full'>
            <div className='flex flex-wrap'>
              {new Array(20).fill(0).map((item, index) => {
                return (
                  <div
                    key={index}
                    className={
                      isSubcategory
                        ? 'w-6/12 md:w-6/12 lg:w-4/12 pb-[20px] lg:pb-[30px] px-[8px] lg:px-[15px] divmore'
                        : `w-6/12 ${
                            isAtoZ ? 'lg:w-3/12' : 'lg:w-4/12'
                          } pb-[30px] px-[15px]`
                    }
                  >
                    <div className='relative overflow-hidden rounded-tl-lg rounded-br-lg group'>
                      <div
                        style={{
                          width: '100%',
                          height: '426px',
                          background:
                            'linear-gradient(90deg, #fff9ef 25%, #FFF3E0 50%, #fff9ef 75%)',
                          animation: 'shimmer 1.5s infinite',
                          backgroundSize: '200% 100%',
                        }}
                      >
                        <style>
                          {`@keyframes shimmer{
                            0%{
                                background-position:200% 0;
                            }
                            100%{
                                background-position:-200% 0;
                            }
                        }`}
                        </style>
                        <a></a>
                      </div>
                      <div className='absolute left-4 top-4 cursor-pointer h-10 w-10 rounded-full'>
                        {' '}
                        <Image
                          isStatic
                          src={'/assets/images/wishlist.png'}
                          alt='Wishlist Selected'
                          title='Wishlist Selected'
                        />
                      </div>
                      <div
                        className={
                          isSubcategory
                            ? 'lg:absolute p-[15px] bg-[#9C331C] lg:bg-opacity-80 group-hover:bg-opacity-100 inset-x-0 bottom-0 transition-all duration-700'
                            : `absolute p-[15px] bg-opacity-80 group-hover:bg-opacity-100 inset-x-0 bottom-0 transition-all duration-700`
                        }
                        style={{
                          backgroundColor: 'rgb(128,128,128)',
                          opacity: '80%',
                        }}
                      >
                        <div>
                          <div>
                            <div
                              style={{
                                //   backgroundColor: '#323232',
                                //   color: '#323232',
                                height: '1.2rem',
                                width: '9rem',
                                borderRadius: '1rem',
                                margin: '0.5rem 0',
                                background:
                                  'linear-gradient(90deg, #fff9ef 25%, #FFF3E0 50%, #fff9ef 75%)',
                                backgroundSize: '200% 100%',
                                animation: 'shimmer 1.5s infinite',
                              }}
                            >
                              <style>
                                {`@keyframes shimmer{
                                0%{
                                    background-position:200% 0;
                                }
                                100%{
                                    background-position:-200% 0;
                                }
                        }`}
                              </style>
                            </div>
                          </div>
                          {isSubcategory ? (
                            <div className='text-default-text text-gray-800 mb-[10px] truncate w-full'>
                              {'brandName'}
                              <div className='absolute p-[15px] bg-opacity-80 right-0 bottom-0 mb-[10px] transition-all duration-700'>
                                <a className='h-[25px] w-[25px] flex justify-center items-center text-gray bg-[#000000] bg-opacity-20 rounded-full'>
                                  <span className='material-icons-outlined'>
                                    chevron_right
                                  </span>
                                </a>
                              </div>
                            </div>
                          ) : (
                            brandName && (
                              <div className='text-default-text text-gray-800 mb-[10px] w-full h-full'></div>
                            )
                          )}
                          {!isSubcategory && (
                            <>
                              <div className='flex flex-wrap w-full'>
                                <div className=''>
                                  <div
                                    className='extra-small-text'
                                    style={{
                                      // backgroundColor: '#323232',
                                      // color: '#323232',
                                      height: '1rem',
                                      width: '6rem',
                                      borderRadius: '1rem',
                                      background:
                                        'linear-gradient(90deg, #fff9ef 25%, #FFF3E0 50%, #fff9ef 75%)',
                                      backgroundSize: '200% 100%',
                                      animation: 'shimmer 1.5s infinite',
                                    }}
                                  >
                                    <style>
                                      {`@keyframes shimmer{
                                    0%{
                                        background-position:200% 0;
                                    }
                                    100%{
                                        background-position:-200% 0;
                                    }
                            }`}
                                    </style>
                                  </div>
                                </div>
                              </div>

                              <div
                                style={{
                                  height: '1.2rem',
                                  width: '4rem',
                                  borderRadius: '1rem',
                                  margin: '0.5rem 0',
                                  background:
                                    'linear-gradient(90deg, #fff9ef 25%, #FFF3E0 50%, #fff9ef 75%)',
                                  backgroundSize: '200% 100%',
                                  animation: 'shimmer 1.5s infinite',
                                }}
                              >
                                <style>
                                  {`@keyframes shimmer{
                                0%{
                                    background-position:200% 0;
                                }
                                100%{
                                    background-position:-200% 0;
                                }
                        }`}
                                </style>
                              </div>
                            </>
                          )}
                        </div>
                        {!isSubcategory && (
                          <div className='absolute bottom-[15px] right-[20px]'>
                            <a
                              href='product-page.html'
                              className='h-[25px] w-[25px] flex justify-center items-center text-gray-800 bg-[#000000] bg-opacity-20 rounded-full'
                            >
                              <span className='material-icons-outlined'>
                                chevron_right
                              </span>
                            </a>
                          </div>
                        )}
                        {isSubcategory && (
                          <div className='text-default-text text-gray-800 mb-[10px] truncate w-full'>
                            Spring & Early Summer Gardens
                            <div className='absolute p-[15px] bg-opacity-80 group-hover:bg-opacity-100 right-0 bottom-0 mb-[10px] transition-all duration-700'>
                              <a className='h-[25px] w-[25px] flex justify-center items-center text-gray-800 bg-[#000000] bg-opacity-20 group-hover:bg-opacity-100 rounded-full'>
                                <span className='material-icons-outlined'>
                                  chevron_right
                                </span>
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className='w-full text-center pb-[30px] px-[15px]'>
            <a
              // onClick={handlePageChange}
              className='btn btn-primary btn-sm uppercase !font-sub'
            >
              Load More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListingAtoZSkeleton;
