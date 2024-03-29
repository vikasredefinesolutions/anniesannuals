import React from 'react';
import CustomLink from '@/shared/Components/CustomLink';
import { paths } from '@/utils/paths.constant';
import { cancelOrderByOrderNumber } from '@/shared/apis/orders/cancelOrder';
import { useRouter } from 'next/navigation';
interface _Props {
  onRequestCancelOrder: () => void;
  orderNumber?: number;
}
const CancelOrderPopUp: React.FC<_Props> = (_Props) => {
  const { onRequestCancelOrder, orderNumber } = _Props;
  const router = useRouter();

  const cancellOrderFunction = async () => {
    try {
      const deleteOrder = await cancelOrderByOrderNumber(+orderNumber!);
    } catch (error) {
      console.log(error, '<---errors');
    } finally {
      onRequestCancelOrder();
      window.location.reload();
    }
  };

  return (
    <div className='overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center h-modal inset-0 text-default-text'>
      <div className='w-full h-full bg-[#000000] bg-opacity-[0.50] flex items-center justify-center'>
        <div className='relative px-[16px] w-full max-w-3xl h-auto'>
          <div className='relative bg-[#FCEDFF] shadow max-h-screen overflow-y-auto h-full rounded-sm overflow-hidden'>
            <div className='flex justify-between items-start p-[25px] rounded-t sticky top-0 left-0 bg-[#FCEDFF]'>
              <div className='font-[600] text-large-text'></div>
              <div className='flex items-center gap-x-2'>
                <button
                  type='button'
                  className='text-[#ffffff] bg-primary hover:bg-secondary hover:text-[#ffffff] rounded-lg text-[14px] p-[6px] ml-auto inline-flex items-center'
                  onClick={onRequestCancelOrder}
                >
                  <span className='material-icons-outlined text-[19px]'>
                    close
                  </span>
                </button>
              </div>
            </div>
            <div className='p-[25px]'>
              <div className='font-sub text-center font-bold text-2xl-text pb-[20px]'>
                Are you sure?
              </div>
              <div className='text-small-text text-center pb-[20px]'>
                <p>
                  Are you sure you want to completely remove your current order?
                </p>
              </div>
              <div className='max-w-md mx-auto mb-[30px]'>
                <div className='flex items-center justify-center gap-2'>
                  <div onClick={onRequestCancelOrder}>
                    <button className='inline-block text-[14px] font-extrabold bg-transparent text-primary border-primary border rounded-xs px-[30px] py-[12px] uppercase'>
                      cancel
                    </button>
                  </div>
                  <div onClick={cancellOrderFunction}>
                    <button className='inline-block text-[14px] font-extrabold bg-transparent text-primary border-primary border rounded-xs px-[30px] py-[12px] uppercase'>
                      cancel Order
                    </button>
                  </div>
                  <div>
                    {/* <CustomLink
                      href={`${paths.orderReturn}?orderNumber=${orderNumber}&type=cancelled`}
                      className='inline-block text-[14px] font-bold bg-primary text-white rounded-xs px-[25px] py-[14px] uppercase'
                    >
                      yes, i want to cancel the order
                    </CustomLink> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelOrderPopUp;
