import Input from '@/components/common/input';
import React from 'react';
import VerificationController from '@/features/user/verification/controller';
import { _Payload } from '@/features/myAccount/deleteAccount/controller';

interface _Props {
  verificationPayload: _Payload | undefined;
  onRequestClose?: () => void;
}

const Verification: React.FC<_Props> = (_Props) => {
  const { onRequestClose, verificationPayload } = _Props;
  return (
    <>
      <VerificationController
        verificationPayload={verificationPayload}
        cases={{
          view: ({
            verificationError,
            hookForm: { errors, register, handleSubmit },
            onSubmit,
          }) => {
            return (
              <form
                className='overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center h-modal inset-0 text-default-text'
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className='w-full h-full bg-[#000000] bg-opacity-50 flex items-center justify-center'>
                  <div className='relative bg-[#FCEDFF] mx-[15px] shadow overflow-y-auto w-full max-w-3xl rounded-sm overflow-hidden'>
                    <div className='flex justify-between  items-start p-[25px] rounded-t sticky top-0 left-0 bg-[#FCEDFF]'>
                      <div className='font-[600] text-large-text'></div>
                      <div className='flex items-center gap-x-2'>
                        <button
                          type='button'
                          className='text-[#ffffff] bg-primary hover:bg-secondary hover:text-[#ffffff] rounded-lg text-[14px] p-[6px] ml-auto inline-flex items-center'
                          onClick={onRequestClose}
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
                    <div className='p-[25px]'>
                      <div className='font-sub text-center font-bold text-2xl-text pb-[20px]'>
                        Enter the Code We Emailed You
                      </div>
                      <div className='text-small-text text-center pb-[20px]'>
                        <p>
                          To continue, type in the 6-digit code we just emailed
                          you.
                        </p>
                      </div>
                      <div className='md:w-9/12 mx-auto pb-[40px]'>
                        <Input
                          name='verificationCode'
                          type='text'
                          label=''
                          register={register}
                          error={
                            !!errors?.verificationCode
                              ? errors?.verificationCode?.message
                              : verificationError
                          }
                          placeholder='Enter the verification code'
                          autocomplete={false}
                        />
                      </div>
                      <div className='max-w-sm mx-auto mb-[30px]'>
                        <div className='md:flex md:items-center md:justify-center gap-4'>
                          <div className='w-full md:w-auto mb-[20px]'>
                            <button className='w-full btn btn-primary btn-sm uppercase !font-body !rounded-xs'>
                              Request new code
                            </button>
                          </div>
                          <div className='w-full md:w-auto mb-[20px]'>
                            <button
                              type='submit'
                              className='w-full hover:btn-primary hover:text-white btn btn-outline-primary btn-sm uppercase !font-body !rounded-xs !inline-flex gap-[10px] align-middle justify-center'
                            >
                              Continue
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            );
          },
        }}
      />
    </>
  );
};

export default Verification;
