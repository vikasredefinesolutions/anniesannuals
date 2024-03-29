import React from 'react';
import SideLayout from '../../shared/components/myAccountLayout';
import CustomLink from '@/shared/Components/CustomLink';
const PaymentMethod = () => {
  return (
    <SideLayout>
      <div className='lg:w-9/12 w-full px-[15px]'>
        <div x-data='{activeTab:01}'>
          <h1 className='text-2xl-text mb-[20px] font-bold font-sub'>
            Payment Methods
          </h1>
          <div className='mb-[40px] border-t border-t-gray-border'></div>
          <div className='mb-[40px]'>
            <div className='flex flex-wrap gap-[20px] items-center w-full'>
              <div className='md:w-9/12 w-full mb-[0]'>
                <div className='bg-[#ffffff] border border-gray-border rounded-sm p-[30px] mb-[10px] last:mb-0'>
                  <div className='flex items-center'>
                    <input
                      id='AddACreditCard-0'
                      name='Card[]'
                      value=''
                      type='radio'
                      className='h-4 w-4 border-gray-300 rounded'
                    />
                    <label
                      htmlFor='AddACreditCard-0'
                      className='ml-[10px] text-normal-text flex justify-start items-center'
                    >
                      <span className='mr-[10px]'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='35.467'
                          height='27.628'
                          viewBox='0 0 35.467 27.628'
                        >
                          <path
                            id='Path_12'
                            data-name='Path 12'
                            d='M2.25,11.032H36.217M2.25,12.339H36.217M7.476,21.483H17.927M7.476,25.4H12.7M6.169,30.628H32.3a3.919,3.919,0,0,0,3.919-3.919V8.419A3.919,3.919,0,0,0,32.3,4.5H6.169A3.919,3.919,0,0,0,2.25,8.419v18.29a3.919,3.919,0,0,0,3.919,3.919Z'
                            transform='translate(-1.5 -3.75)'
                            fill='none'
                            stroke='#cdcdcd'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='1.5'
                          />
                        </svg>{' '}
                      </span>
                      <span className='text-[#634B91]'>
                        Add a Credit or Debit Card
                      </span>
                    </label>
                  </div>
                  <div className='pt-[30px]'>
                    <div className='text-small-text mb-[20px]'>
                      We accepts all major credit and debit cards. Your card
                      will be saved for future purchases.
                    </div>
                    <div className='text-small-text mb-[20px]'>* Required</div>
                    <div className='flex flex-wrap mx-[-10px]'>
                      <div className='mb-[20px] px-[10px]'>
                        <img src='/assets/images/card-visa.png' />
                      </div>
                      <div className='mb-[20px] px-[10px]'>
                        <img src='/assets/images/card-american-express.png' />
                      </div>
                      <div className='mb-[20px] px-[10px]'>
                        <img src='/assets/images/card-master-card.png' />
                      </div>
                      <div className='mb-[20px] px-[10px]'>
                        <img src='/assets/images/card-discover.png' />
                      </div>
                    </div>
                    <div className='w-full mb-[20px]'>
                      <label
                        htmlFor='NameOnTheCard'
                        className='block text-small-text mb-[5px] ml-[15px] font-bold'
                      >
                        NAME ON THE CARD
                      </label>
                      <input
                        id='NameOnTheCard'
                        name='NameOnTheCard'
                        placeholder='Enter the name on the card'
                        value=''
                        className='form-input'
                      />
                    </div>
                    <div className='w-full mb-[20px]'>
                      <label
                        htmlFor='CardNumber'
                        className='block text-small-text mb-[5px] ml-[15px] font-bold'
                      >
                        CREDIT CARD NUMBER
                      </label>
                      <input
                        id='CardNumber'
                        name='CardNumber'
                        placeholder='Enter card Number'
                        value=''
                        className='form-input'
                      />
                    </div>
                    <div className='flex flex-wrap mx-[-15px]'>
                      <div className='md:w-4/12 w-full px-[15px] mb-[20px]'>
                        <label
                          htmlFor='Month'
                          className='block text-small-text mb-[5px] ml-[15px] font-bold'
                        >
                          MONTH
                        </label>
                        <select className='form-input'>
                          <option>Select the Month</option>
                          <option>Month 1</option>
                          <option>Month 2</option>
                          <option>Month 3</option>
                          <option>Month 4</option>
                        </select>
                      </div>
                      <div className='md:w-4/12 w-full px-[15px] mb-[20px]'>
                        <label
                          htmlFor='LastName'
                          className='block text-small-text mb-[5px] ml-[15px] font-bold'
                        >
                          YEAR
                        </label>
                        <select className='form-input'>
                          <option>Select the Year</option>
                          <option>Year 1</option>
                          <option>Year 2</option>
                          <option>Year 3</option>
                          <option>Year 4</option>
                        </select>
                      </div>
                      <div className='md:w-4/12 w-full px-[15px] mb-[20px]'>
                        <label
                          htmlFor='CVV'
                          className='block text-small-text mb-[5px] ml-[15px] font-bold'
                        >
                          CVV
                          <span className='bg-primary text-[#ffffff] rounded-full inline-block text-center text-[14px] w-[18px] leading-[18px] h-[18px]'>
                            i
                          </span>
                        </label>
                        <input
                          id='CVV'
                          name='CVV'
                          placeholder='Enter the CVV'
                          value=''
                          className='form-input'
                        />
                      </div>
                    </div>
                    <div className='w-full'>
                      <div className='flex gap-x-[15px]'>
                        <CustomLink
                          href='save-payment-methods.html'
                          className='btn btn-primary btn-sm uppercase !font-body !rounded-xs'
                        >
                          SAVE
                        </CustomLink>
                        <CustomLink
                          href={undefined}
                          className='btn btn-outline-primary btn-sm uppercase !font-body !rounded-xs !inline-flex gap-[10px] items-center'
                        >
                          CANCEL
                        </CustomLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SideLayout>
  );
};

export default PaymentMethod;
