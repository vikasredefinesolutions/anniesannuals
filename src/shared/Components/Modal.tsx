import { useAppSelector } from '@/app/redux/hooks';
import { openAlertModal } from '@/app/redux/slices/modalSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Modal = () => {
  const dispatch = useDispatch();
  const { modalDetails } = useAppSelector((state) => state.modal);

  useEffect(() => {
    return () => {
      if (modalDetails.description === 'Rating is required') {
        window.scroll(0, 75);
      }
    };
  }, [modalDetails.description]);

  return (
    <div
      id='ShowModal'
      aria-hidden='true'
      className='overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center h-modal inset-0 text-default-text'
    >
      <div className='w-full h-full bg-[#000000] bg-opacity-[0.50] flex items-center justify-center'>
        <div className='relative px-[16px] w-full max-w-3xl h-auto'>
          <div className='relative bg-[#FCEDFF] shadow max-h-screen overflow-y-auto h-full rounded-sm overflow-hidden'>
            <div className='flex justify-between items-start p-[25px] rounded-t border-b sticky top-0 left-0 bg-[#FCEDFF]'>
              <div className='font-[600] text-large-text'>
                {modalDetails.title}
              </div>
              <div className='flex items-center gap-x-2'>
                <button
                  onClick={() =>
                    dispatch(
                      openAlertModal({
                        title: '',
                        description: '',
                        isAlertModalOpen: false,
                      }),
                    )
                  }
                  type='button'
                  className='text-[#ffffff] bg-[#295B4C] hover:bg-[#8a2c9b] hover:text-[#ffffff] rounded-lg text-[14px] p-[6px] ml-auto inline-flex items-center'
                  data-modal-toggle='ShowModal'
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
            </div>
            {modalDetails.description !== '' && (
              <div className='p-[25px]'>
                <div className='text-default-text mb-[30px] text-center max-w-xl mx-auto'>
                  {modalDetails.description}
                </div>
              </div>
            )}
            {modalDetails.isShowButton && (
              <div className='p-[25px]'>
                <button
                  className='bg-[#295B4C] text-white min-w-[100px] px-4 py-2'
                  onClick={() => {
                    modalDetails?.onConfirm?.();
                    dispatch(
                      openAlertModal({
                        title: '',
                        description: '',
                        isAlertModalOpen: false,
                      }),
                    );
                  }}
                >
                  Ok
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
