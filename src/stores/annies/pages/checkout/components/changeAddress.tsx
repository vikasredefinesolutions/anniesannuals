import { useAppSelector } from '@/app/redux/hooks';
import { ModalScreens } from '@/features/checkout/checkoutController/config';
import { CustomerAddress } from '@/shared/types/user';

interface props {
  onChangeHandler: (name: ModalScreens, item?: CustomerAddress) => void;
  address: CustomerAddress[];
  modal: 'SHIPPING' | 'BILLING';
  addressClickHandler: (
    item: CustomerAddress,
    name: 'SHIPPING' | 'BILLING',
  ) => void;
}
const ChangeAddressModal = ({
  onChangeHandler,
  address,
  modal,
  addressClickHandler,
}: props) => {
  const { shipping, billing } = useAppSelector(
    (state) => state.checkout.address,
  );

  const selectedAddress = modal === 'BILLING' ? billing : shipping;
  return (
    <div
      id='billingaddressModal'
      className='overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center h-modal inset-0'
    >
      <div className='w-full h-full bg-[#000000] bg-opacity-[0.50] flex items-center justify-center'>
        <div className='relative px-[16px] w-full max-w-4xl h-full md:h-auto'>
          <div className='relative bg-[#ffffff] shadow max-h-screen overflow-y-auto h-full'>
            <div className='flex justify-between items-start p-[25px] rounded-t border-b sticky top-0 left-0 bg-[#ffffff]'>
              <div className='font-[600] text-sub-text'>
                Change {modal === 'SHIPPING' ? 'Shipping' : 'Billing'} Address
              </div>
              <button
                type='button'
                className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-[14px] p-[6px] ml-auto inline-flex items-center'
                data-modal-toggle='billingaddressModal'
                onClick={() => onChangeHandler(null)}
              >
                <svg
                  className='w-[24px] h-[24px]'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clip-rule='evenodd'
                  ></path>
                </svg>
              </button>
            </div>
            <div className='p-[25px]'>
              <div className='flex flex-wrap -mx-3 gap-y-6'>
                {address.map((item, index) => {
                  return item.id !== selectedAddress?.id ? (
                    <div
                      className='w-full lg:w-1/2 pl-[12px] pr-[12px]'
                      key={index}
                    >
                      <div className='pl-[8px] pr-[8px] pt-[8px] pb-[8px] border-[#e5e7eb]'>
                        <div className='mb-[12px]'>
                          {item.firstname} {item.lastName}
                          <br />
                          {item.address1}
                          <br />
                          {item.city},
                          <br />
                          {item.state} {item.postalCode}.
                          <br />
                          Ph: {item.phone}
                        </div>
                        <div className='mb-[20px]'>
                          <button
                            onClick={() => {
                              if (modal === 'BILLING') {
                                onChangeHandler('EDITBILLING', item);
                              } else {
                                onChangeHandler('EDITSHIPPING', item);
                              }
                            }}
                            className='btn btn-primary btn-xs !font-sub uppercase'
                          >
                            EDIT ADDRESS
                          </button>
                        </div>
                        <div className=''>
                          <button
                            onClick={() => addressClickHandler(item, modal)}
                            className='btn btn-primary btn-xs !font-sub uppercase'
                          >
                            {modal === 'BILLING' ? 'BILL' : 'SHIP'} TO THIS
                            ADDRESS
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <></>
                  );
                })}
              </div>
            </div>
            <div className='p-[25px] text-center border-t flex justify-end gap-2'>
              <button
                data-modal-toggle='billingaddressModal'
                type='button'
                className='btn btn-secondary btn-sm uppercase !font-body !rounded-xs cursor-pointer'
                onClick={() => onChangeHandler(null)}
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeAddressModal;
