interface _props {
  message: string;
  removeItems: () => void;
  editAddress: () => void;
}

const CheckoutModal = ({ message, removeItems, editAddress }: _props) => {
  return (
    <div
      id='ShowModal'
      className='overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center h-modal inset-0 text-default-text'
    >
      <div className='w-full h-full bg-[#000000] bg-opacity-[0.50] flex items-center justify-center'>
        <div className='relative px-[16px] w-full max-w-3xl h-auto'>
          <div className='relative bg-[#FCEDFF] shadow max-h-screen overflow-y-auto h-full rounded-sm overflow-hidden'>
            <div className='p-[25px] '>
              <div className='text-default-text mb-[30px] text-center max-w-xl mx-auto'>
                {message}
              </div>
              <div className='flex items-center justify-end'>
                <button
                  type='button'
                  className='btn btn-secondary btn-sm uppercase !font-body !rounded-xs mx-[20px]'
                  onClick={editAddress}
                >
                  CANCEL
                </button>
                <button
                  type='button'
                  className='btn btn-primary btn-sm uppercase !font-body !rounded-xs'
                  onClick={removeItems}
                >
                  OKAY
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
