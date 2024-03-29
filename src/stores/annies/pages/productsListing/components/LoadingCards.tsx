import Image from '@/shared/Components/Image';
import React from 'react';

interface iProps {
  cardsToShow: number;
  isSubcategory: boolean;
}

export const LoadingCard: React.FC<{
  isSubcategory: boolean;
}> = ({ isSubcategory }) => {
  return (
    <div
      className={
        isSubcategory
          ? 'w-6/12 md:w-6/12 lg:w-4/12 pb-[20px] lg:pb-[30px] px-[8px] lg:px-[15px] divmore'
          : `w-6/12 lg:w-4/12 pb-[30px] px-[15px] box-color-main'`
      }
    >
      <div className='relative overflow-hidden rounded-tl-lg rounded-br-lg group'>
        <div
          style={{
            width: '100%',
            height: '445px',
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
              false && (
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
                <span className='material-icons-outlined'>chevron_right</span>
              </a>
            </div>
          )}
          {isSubcategory && (
            <div className='text-default-text text-gray-800 mb-[10px] truncate w-full'>
              Spring & Early Summer Gardens
              <div className='absolute p-[15px] bg-opacity-80 group-hover:bg-opacity-100 right-0 bottom-0 mb-[10px] transition-all duration-700'>
                <a className='h-[25px] w-[25px] flex justify-center items-center text-gray-800 bg-[#000000] bg-opacity-20 group-hover:bg-opacity-100 rounded-full'>
                  <span className='material-icons-outlined'>chevron_right</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const LoadingCards: React.FC<iProps> = ({ cardsToShow, isSubcategory }) => {
  return new Array(cardsToShow)
    .fill(0)
    .map((_, index) => (
      <LoadingCard key={index} isSubcategory={isSubcategory} />
    ));
};

export default LoadingCards;
