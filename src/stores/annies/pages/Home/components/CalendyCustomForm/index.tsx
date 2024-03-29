import { useState } from 'react';
import CalendyForm from './components/CalendyForm';
import CalendyThankyou from './components/CalendyThankYou';

const CalendyCustomForm = ({ componentValue }: any) => {
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const { selectedVal } = componentValue;

  const classesName = [
    '_header_tag',
    '_font_family',
    '_final_class',
    '_font_size',
    '_font_weight',
    '_line_height',
    '_letter_spacing',
    '_text_alignment',
    '_font_style',
    '_text_transform',
    '_top_margin',
    '_top_padding',
    '_left_margin',
    '_left_padding',
    '_right_padding',
    '_right_margin',
    '_bottom_padding',
    '_bottom_margin',
    '_font_color',
  ];

  const getHeadline = (headline: any, headNO: number) => {
    // if (headline && headline[`Headline${headNO}`]) {
    //   let className = '';

    //   classesName.forEach((classN) => {
    //     if (headline[`Headline${headNO}${classN}`]) {
    //       className += ` ${headline[`Headline${headNO}${classN}`].value}`;
    //     }
    //   });

    //   let HeadlineTag = 'div';
    //   if (headline[`Headline${headNO}_header_tag`]) {
    //     HeadlineTag = headline[`Headline${headNO}_header_tag`].value;
    //   }

    //   return `
    //     <${HeadlineTag} className="${className}">${
    //     headline[`Headline${headNO}`].value
    //   }</${HeadlineTag}>
    //   `;
    // }
    return '';
  };

  return (
    <div className='w-full calendy-form'>
      <div className='pl-[15px] pr-[15px] mx-auto relative max-w-[920px]'>
        <div className='flex flex-wrap w-full py-[30px]'>
          {!formSubmitted ? (
            <CalendyForm setFormSubmit={setFormSubmitted} />
          ) : (
            <CalendyThankyou />
          )}
          <div className='w-full lg:w-1/2 px-0 lg:pl-[20px] pb-[0px] items-start justify-center pt-[30px]'>
            <div
              className='w-full text-[16px] font-semibold leading-[20px] mb-[20px]'
              dangerouslySetInnerHTML={{
                __html: getHeadline(selectedVal, 1),
              }}
            ></div>
            <div
              className='w-full text-[14px] leading-[18px] mb-[20px]'
              dangerouslySetInnerHTML={{
                __html: getHeadline(selectedVal, 2),
              }}
            ></div>
            <div
              className='w-full mb-[30px]'
              dangerouslySetInnerHTML={{
                __html: selectedVal?.Description1?.value,
              }}
            ></div>
            <div
              className='w-full text-[16px] font-semibold leading-[20px] mb-[20px]'
              dangerouslySetInnerHTML={{
                __html: getHeadline(selectedVal, 3),
              }}
            ></div>
            <div
              className='w-full'
              dangerouslySetInnerHTML={{
                __html: selectedVal?.Description2?.value,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CalendyCustomForm;
