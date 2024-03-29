/*Component Name: ElementAccordionDisplay
Component Functional Details: User can create or update ElementAccordionDisplay master details from here.
Created By: Vikas Patel
Created Date: 16th September 2022
Modified By: <Modified By Name>
Modified Date: <Modified Date> */
//import { useEffect, useState } from 'react';

const ElementTwoButtons = (data) => {
  return (
    <>
      <div
        class={`flex flex-wrap ${
          data?.RightButtonText?.value ? 'justify-end' : 'justify-start'
        }`}
      >
        {data?.LeftButtonText && data?.LeftButtonText?.value && (
          <div className='w-full md:w-1/2'>
            <a
              href={data?.LeftButtonLink?.value}
              className='mt-[10px] mb-[10px] text-anchor hover:text-anchor-hover text-[20px] font-normal flex items-center justify-center md:justify-start'
            >
              <span className='material-icons-outlined mr-[5px]'>west</span>
              <span>{data?.LeftButtonText?.value}</span>
            </a>
          </div>
        )}

        {data?.RightButtonText && data?.RightButtonText?.value && (
          <div class='w-full md:w-1/2'>
            <a
              href={data?.RightButtonLink?.value}
              className='mt-[10px] mb-[10px] text-anchor hover:text-anchor-hover text-[20px] font-normal flex items-center justify-center md:justify-end'
            >
              {data?.RightButtonText?.value}{' '}
              <span class='material-icons-outlined ml-[5px]'>east</span>
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default ElementTwoButtons;
