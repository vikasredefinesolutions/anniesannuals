'use client';
import * as helper from '@/helper/home';
import React from 'react';

interface AccordionArray {
  desc: string;
  icon: string;
  index: string;
  openstatus: string;
  secure: 'Yes' | 'No';
  title: string;
  titleheadtag: string;
}
interface Props {
  accordionValue: any;
  accordionValueArray: AccordionArray[];
}

const ElementAccordionDisplay: React.FC<Props> = ({
  accordionValue,
  accordionValueArray,
}) => {
  const iconArr = {
    keyboard_arrow_up: 'keyboard_arrow_down',
    keyboard_arrow_down: 'keyboard_arrow_up',
    remove_circle_outline: 'add_outline',
    add_circle_outline: 'remove_outline',
    add_circle: 'remove_circle',
    remove_circle: 'add_circle',
    add: 'remove',
    remove: 'add',
  };
  const showHideAccordion = (event: any) => {
    const parentselector = document.querySelectorAll('.ac-description');
    parentselector.forEach((el) => {
      if (!el.classList.contains('hidden')) {
        el.classList.add('hidden');
      }
    });
    let symbolobj = event.target.querySelector('.pointer-class');
    let existH = symbolobj.innerHTML;
    const accordionButtons = document.querySelectorAll('.pointer-class');
    accordionButtons?.forEach((el) => {
      if (symbolobj && symbolobj !== el) {
        switch (el.innerHTML) {
          case 'remove_outline':
            el.innerHTML = iconArr.remove_circle_outline;
            break;
          case 'remove_circle':
            el.innerHTML = iconArr.remove_circle;
            break;
          case 'remove':
            el.innerHTML = iconArr.remove;
            break;
          case 'keyboard_arrow_down':
            el.innerHTML = iconArr.keyboard_arrow_down;
            break;
          default:
            break;
        }
      }
    });

    if (symbolobj) {
      switch (existH) {
        case iconArr.remove_circle_outline:
          event.target
            .querySelector('.ac-description')
            .classList.remove('hidden');
          symbolobj.innerHTML = iconArr.add_circle_outline;
          break;
        case iconArr.remove_circle:
          event.target
            .querySelector('.ac-description')
            .classList.remove('hidden');
          symbolobj.innerHTML = iconArr.add_circle;
          break;
        case iconArr.add_circle:
          event.target.querySelector('.ac-description').classList.add('hidden');
          symbolobj.innerHTML = iconArr.remove_circle;
          break;
        case iconArr.add:
          event.target.querySelector('.ac-description').classList.add('hidden');
          symbolobj.innerHTML = iconArr.remove;
          break;
        case iconArr.remove:
          event.target
            .querySelector('.ac-description')
            .classList.remove('hidden');
          symbolobj.innerHTML = iconArr.add;
          break;
        case iconArr.keyboard_arrow_up:
          event.target.querySelector('.ac-description').classList.add('hidden');
          symbolobj.innerHTML = iconArr.keyboard_arrow_down;
          break;
        case iconArr.keyboard_arrow_down:
          event.target
            .querySelector('.ac-description')
            .classList.remove('hidden');
          symbolobj.innerHTML = iconArr.keyboard_arrow_up;
          break;
        default:
          event.target.querySelector('.ac-description').classList.add('hidden');
          symbolobj.innerHTML = iconArr.remove_circle_outline;
          break;
      }
    }
  };

  return (
    <div className='container mx-auto'>
      {accordionValueArray?.length > 0 && (
        <>
          {accordionValueArray.map((acValue: AccordionArray, index: any) => {
            let tmpTitleBg;
            let tmpTitleBgOption;
            let tmpTitleBorderType;
            let tmpTitleBorderColor;
            let tmpTitleBorderSize;
            let titleClass;
            let descClass;
            let descColor;
            let titleColor;
            let tmpBorderRadius;
            let liClass: any;
            const mapping: any = {
              FullAccordion_title_bg: (value: string) => (tmpTitleBg = value),
              FullAccordion_title_bg_option: (value: string) =>
                (tmpTitleBgOption = value),
              FullAccordion_title_border_type: (value: string) =>
                (tmpTitleBorderType = value),
              FullAccordion_title_border_color: (value: string) =>
                (tmpTitleBorderColor = value),
              FullAccordion_title_border_size: (value: string) =>
                (tmpTitleBorderSize = value),
              AccordionTitle_final_class: (value: string) =>
                (titleClass = value),
              AccordionDescription_final_class: (value: string) =>
                (descClass = value),
              AccordionContainer_final_class: (value: string) =>
                (liClass = value),
              AccordionDescription_font_color: (value: string) =>
                (descColor = value),
              AccordionTitle_font_color: (value: string) =>
                (titleColor = value),
              FullAccordion_border_radius: (value: string) =>
                (tmpBorderRadius = value),
            };

            if (accordionValue !== undefined) {
              Object.entries(accordionValue).forEach(
                ([key, value]: [any, any]) => {
                  const mapFunction = mapping[key];
                  if (mapFunction) {
                    mapFunction(value.value);
                  }
                },
              );
            }
            let liStyle: any = '';
            let titleStyle = '';
            if (tmpTitleBorderType === 'box')
              liClass += ' border-[' + tmpTitleBorderSize + 'px]';
            else if (tmpTitleBorderType === 'single')
              liClass += ' border-b-[' + tmpTitleBorderSize + 'px]';
            if (tmpBorderRadius !== '')
              liClass += ' rounded-[' + tmpBorderRadius + 'px]';
            if (tmpTitleBgOption === 'Color')
              titleStyle += 'background: ' + tmpTitleBg + '; ';
            if (tmpTitleBorderColor !== '')
              liStyle += 'border-color: ' + tmpTitleBorderColor + '; ';
            const { accordionEndIcon } = helper.getSymbol(
              acValue.icon,
              acValue.openstatus,
            );

            return (
              <div
                key={index}
                className={`mb-[10px] overflow-hidden last:mb-0 cursor-pointer bg-white drop-shadow-md rounded-tl-lg rounded-br-lg ${liClass}`}
                style={{ borderColor: tmpTitleBorderColor }}
                onClick={showHideAccordion}
              >
                {acValue.secure === 'Yes' ? (
                  <>
                    <button
                      className={`w-full flex justify-between items-center ${titleClass} pointer-events-none`}
                      style={{
                        background:
                          tmpTitleBgOption === 'Color' ? tmpTitleBg : '',
                        color: titleColor,
                      }}
                    >
                      {acValue?.titleheadtag ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: `<${acValue.titleheadtag}>${acValue.title}</${acValue.titleheadtag}>`,
                          }}
                          className='text-defaule-text pointer-events-none'
                        ></div>
                      ) : (
                        <div className='text-defaule-text pointer-events-none'>
                          {acValue?.title}
                        </div>
                      )}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className={`w-full flex justify-between items-center ${titleClass} pointer-events-none p-[20px]`}
                      style={{
                        background:
                          tmpTitleBgOption === 'Color' ? tmpTitleBg : '',
                        color: titleColor,
                      }}
                    >
                      {acValue?.titleheadtag ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: `<${acValue.titleheadtag}>${acValue.title}</${acValue.titleheadtag}>`,
                          }}
                          className='font-bold font-sub text-normal-text'
                        ></div>
                      ) : (
                        <div className='font-bold font-sub text-normal-text pointer-events-none'>
                          <h5>{acValue?.title}</h5>
                        </div>
                      )}
                      <span className='material-icons-outlined ml-3 pointer-class pointer-events-none w-[30px]'>
                        {accordionEndIcon}
                      </span>
                    </button>
                  </>
                )}

                <div
                  className={`ac-description ${
                    acValue.openstatus !== 'Yes' ? 'hidden' : ''
                  } ${descClass}`}
                  style={{ color: descColor }}
                >
                  <div
                    className='text-descrition pt-[0px] p-[30px]'
                    dangerouslySetInnerHTML={{ __html: acValue.desc }}
                  ></div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default ElementAccordionDisplay;
