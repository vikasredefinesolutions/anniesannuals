import { paths } from '@/utils/paths.constant';
import Link from 'next/link';

const CalendyThankyou = () => {
  return (
    <div className='w-full lg:w-1/2 px-0 lg:pr-[20px] pb-[20px]'>
      <div className='rounded-lg bg-white shadow-2xl pt-[12px] pb-[12px] lg:min-h-[1040px]'>
        <div className='flex flex-wrap'>
          <div className='w-full px-[15px] lg:px-[30px] my-[15px]'>
            <div className='w-full text-center'>
              <span className='material-icons text-primary text-[40px]'>
                groups
              </span>
            </div>
            <div className='w-full text-[20px] lg:text-[24px] font-semibold text-center mb-[25px] leading-[14px] sm:leading-[21px] lg:leading-[30px]'>
              Thank you! Your request has been received.
            </div>
            <div className='w-full text-[16px] text-center mb-[18px]'>
              One of our customer service representatives will contact you
              shortly.
            </div>
            <div className='w-full text-center mb-[30px]'>
              <div className='btn btn-md btn-secondary w-auto'>
                <Link href={paths.BOOKCONSULT}>BOOK CONSULTATION</Link>
              </div>
            </div>
            <div className='w-full text-[20px] font-semibold text-center mb-[15px]'>
              OVER 1 MILLION PRODUCTS DECORATED
            </div>
            <div className='w-full text-[14px] text-center px-[20px] mb-[30px]'>
              We are here to help Monday through Friday from 9 am to 5 pm EST.
            </div>
            <div className='w-full flex flex-wrap justify-between items-center gap-y-5'>
              <div className='w-1/2 text-center'>
                <div className='w-[74px] h-[74px] mx-auto mb-[8px] rounded-full flex items-center justify-center'>
                  <div
                    className='text-[#000000] cursor-pointer'
                    data-reamaze-lightbox='contact'
                    data-reamaze-lightbox-anchored='true'
                    title='CHAT'
                    dangerouslySetInnerHTML={{
                      __html: ` <a href='javascript:void(0)' onclick="if (!window.__cfRLUnblockHandlers) return false; openWidgett()">
                        <div class='w-20 h-20 mx-auto mb-2 rounded-full flex items-center justify-center border-2 border-black'>
                          <span class='material-icons-outlined text-4xl'>chat</span>
                        </div>
                        <div class='text-base font-semibold uppercase'>Chat</div>
                      </a>`,
                    }}
                  ></div>
                </div>
              </div>
              <div className='w-1/2 text-center'>
                <div className='bg-white border-2 border-black w-[74px] h-[74px] mx-auto mb-[8px] rounded-full flex items-center justify-center'>
                  <a
                    className='text-[#000000]'
                    href='tel:888-293-5648'
                    title='CALL'
                  >
                    <span className='material-icons text-[40px] leading-[54px]'>
                      phone
                    </span>
                  </a>
                </div>
                <div className='text-[16px] leading-[24px] font-semibold uppercase'>
                  <a
                    className='text-[#000000]'
                    href='tel:888-293-5648'
                    title='CALL'
                  >
                    Call
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendyThankyou;
