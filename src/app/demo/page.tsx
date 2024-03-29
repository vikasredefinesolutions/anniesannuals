import React from 'react';

const Demo = () => {
  return (
    <>
      <section className='bg-tertiary'>
        <div className='container-fluid md:container mx-auto'>
          <div className='relative w-full pt-[50px] overflow-hidden min-h-[235px]'>
            <div className='text-center absolute inset-0'>
              <img
                src=''
                alt=''
                className='block w-full object-cover min-h-[235px]'
                style={{ backgroundColor: '#f5f5f6' }}
              />
            </div>
          </div>
        </div>
        <div className='container mx-auto bg-[FF0000]'>
          <div className='flex flex-wrap justify-center mx-[-15px] cat-main-slider pt-[30px]'>
            <div className='lg:w-2/12 md:w-3/12 sm:w-4/12 w-6/12 px-[15px] pb-[30px] box-color-main'>
              <div className='relative overflow-hidden rounded-tl-lg rounded-br-lg group'>
                <div
                  className='w-[236px] h-[272px] block'
                  style={{ backgroundColor: '#f5f5f6' }}
                ></div>
              </div>
            </div>
            <div className='lg:w-2/12 md:w-3/12 sm:w-4/12 w-6/12 px-[15px] pb-[30px] box-color-main'>
              <div className='relative overflow-hidden rounded-tl-lg rounded-br-lg group'>
                <div
                  className='w-[236px] h-[272px] block'
                  style={{ backgroundColor: '#f5f5f6' }}
                ></div>
              </div>
            </div>
            <div className='lg:w-2/12 md:w-3/12 sm:w-4/12 w-6/12 px-[15px] pb-[30px] box-color-main'>
              <div className='relative overflow-hidden rounded-tl-lg rounded-br-lg group'>
                <div
                  className='w-[236px] h-[272px] block'
                  style={{ backgroundColor: '#f5f5f6' }}
                ></div>
              </div>
            </div>
            <div className='lg:w-2/12 md:w-3/12 sm:w-4/12 w-6/12 px-[15px] pb-[30px] box-color-main'>
              <div className='relative overflow-hidden rounded-tl-lg rounded-br-lg group'>
                <div
                  className='w-[236px] h-[272px] block'
                  style={{ backgroundColor: '#f5f5f6' }}
                ></div>
              </div>
            </div>
            <div className='lg:w-2/12 md:w-3/12 sm:w-4/12 w-6/12 px-[15px] pb-[30px] box-color-main'>
              <div className='relative overflow-hidden rounded-tl-lg rounded-br-lg group'>
                <div
                  className='w-[236px] h-[272px] block'
                  style={{ backgroundColor: '#f5f5f6' }}
                ></div>
              </div>
            </div>
            <div className='lg:w-2/12 md:w-3/12 sm:w-4/12 w-6/12 px-[15px] pb-[30px] box-color-main'>
              <div className='relative overflow-hidden rounded-tl-lg rounded-br-lg group'>
                <div
                  className='w-[236px] h-[272px] block'
                  style={{ backgroundColor: '#f5f5f6' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='bg-tertiary bg-top bg-contain bg-no-repeat overflow-x-hidden 2xl:overflow-x-visible'>
        <div className='container mx-auto relative'>
          <div className='md:flex flex-wrap justify-between items-center w-full pt-[20px] pb-[30px] hidden'>
            <div className='font-sub font-bold text-2xl-text py-2 sm:py-0'>
              1520 Results
            </div>
            <div className='py-2 sm:py-0'>
              <div className='relative inline-block text-left z-10'>
                <div className='flex items-center'>
                  <button
                    type='button'
                    className='group inline-flex items-center justify-between text-default-text bg-tertiary w-[250px] px-2 py-3 leading-none border border-primary rounded-xs'
                    id='menu-button'
                    aria-expanded='false'
                    aria-haspopup='true'
                  >
                    <span>Sort by:</span>
                    <span>Most Popular</span>
                    <span className='material-icons-outlined text-lg leading-none'>
                      expand_more
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-wrap mx-[-15px]'>
            <div className='md:w-4/12 xl:w-3/12 w-full px-[15px] md:block hidden'>
              <div className='w-full'>
                <div className='pb-[30px] text-normal-text font-sub font-bold'>
                  Filter by:
                </div>
                <div
                  className='w-full px-[15px] md:px-0'
                  style={{ backgroundColor: '#f5f5f6' }}
                >
                  <div
                    className='border border-transparent border-b border-b-gray-border mb-[20px] p-[15px] bg-[#f5f5f6] !border-[#D4D4D4] rounded-tl-sm rounded-br-sm'
                    style={{ minHeight: '500px' }}
                  ></div>
                </div>
              </div>
            </div>
            <div className='md:w-8/12 xl:w-9/12 w-full px-[15px]'>
              <div className='md:flex flex-wrap items-center gap-[5px] pb-[20px]'>
                <div
                  className='flex flex-wrap items-center gap-[5px] bg-[#FCEEFF] rounded-sm px-[10px] py-[5px] text-[#634B91] border border-[#694D84]'
                  style={{ backgroundColor: '#f5f5f6' }}
                >
                  <button className='text-[12px] capitalize'>Perennial</button>
                  <span className='material-icons-outlined text-[12px] leading-none'>
                    close
                  </span>
                </div>
                <div
                  className='flex flex-wrap items-center gap-[5px] bg-[#FCEEFF] rounded-sm px-[10px] py-[5px] text-[#634B91] border border-[#694D84]'
                  style={{ backgroundColor: '#f5f5f6' }}
                >
                  <button className='text-[12px] capitalize'>Biennial</button>
                  <span className='material-icons-outlined text-[12px] leading-none'>
                    close
                  </span>
                </div>
                <button
                  className='text-[12px] text-[#634B91] uppercase'
                  style={{ textDecoration: 'underline', cursor: 'pointer' }}
                >
                  Clear All
                </button>
              </div>
              <div className='flex flex-wrap mx-[-8px] lg:mx-[-15px] theme-color'>
                <div className='w-6/12 lg:w-4/12 pb-[30px] px-[15px] box-color-main'>
                  <div
                    className='relative overflow-hidden rounded-tl-lg rounded-br-lg group'
                    style={{ backgroundColor: '#f5f5f6' }}
                  >
                    <div
                      className='w-[370px] h-[445px] block'
                      style={{ backgroundColor: '#f5f5f6' }}
                    ></div>
                  </div>
                </div>
                <div className='w-6/12 lg:w-4/12 pb-[30px] px-[15px] box-color-main'>
                  <div
                    className='relative overflow-hidden rounded-tl-lg rounded-br-lg group'
                    style={{ backgroundColor: '#f5f5f6' }}
                  >
                    <div
                      className='w-[370px] h-[445px] block'
                      style={{ backgroundColor: '#f5f5f6' }}
                    ></div>
                  </div>
                </div>
                <div className='w-6/12 lg:w-4/12 pb-[30px] px-[15px] box-color-main'>
                  <div
                    className='relative overflow-hidden rounded-tl-lg rounded-br-lg group'
                    style={{ backgroundColor: '#f5f5f6' }}
                  >
                    <div
                      className='w-[370px] h-[445px] block'
                      style={{ backgroundColor: '#f5f5f6' }}
                    ></div>
                  </div>
                </div>
                <div className='w-6/12 lg:w-4/12 pb-[30px] px-[15px] box-color-main'>
                  <div
                    className='relative overflow-hidden rounded-tl-lg rounded-br-lg group'
                    style={{ backgroundColor: '#f5f5f6' }}
                  >
                    <div
                      className='w-[370px] h-[445px] block'
                      style={{ backgroundColor: '#f5f5f6' }}
                    ></div>
                  </div>
                </div>
                <div className='w-6/12 lg:w-4/12 pb-[30px] px-[15px] box-color-main'>
                  <div
                    className='relative overflow-hidden rounded-tl-lg rounded-br-lg group'
                    style={{ backgroundColor: '#f5f5f6' }}
                  >
                    <div
                      className='w-[370px] h-[445px] block'
                      style={{ backgroundColor: '#f5f5f6' }}
                    ></div>
                  </div>
                </div>
                <div className='w-6/12 lg:w-4/12 pb-[30px] px-[15px] box-color-main'>
                  <div
                    className='relative overflow-hidden rounded-tl-lg rounded-br-lg group'
                    style={{ backgroundColor: '#f5f5f6' }}
                  >
                    <div
                      className='w-[370px] h-[445px] block'
                      style={{ backgroundColor: '#f5f5f6' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Demo;
