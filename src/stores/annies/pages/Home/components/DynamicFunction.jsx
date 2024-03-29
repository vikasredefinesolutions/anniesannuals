export const dynamicHalfSizeBoxes = (dataArr, selectedObj) => {
  let strHTML = '';
  if (dataArr.length > 0) {
    let cnt = 1;
    dataArr.forEach(function (item) {
      strHTML += '<div class="w-full md:w-1/2 p-px">';
      strHTML +=
        '<div class="text-center h-full bg-gray-50 p-6 lg:py-12 lg:px-16 md:rounded-tl-lg ' +
        (item.ImageNumber === 'Number' ? ' relative' : '') +
        ' ' +
        (item.HOverColor ? item.HOverColor : '') +
        '" style="' +
        (item.BlockBg ? 'background: ' + item.BlockBg + ';' : '') +
        '">';

      if (item.ImageNumber === 'Number') {
        strHTML +=
          '<div class="inset-x-0 flex justify-center items-center w-12 h-12 mx-auto rounded-full bg-gray-500 text-gray-50 font-bold font-heading -top-6 absolute">';
        strHTML += cnt;
        strHTML += '</div>';
      } else if (item.ImageNumber === 'Image') {
        strHTML +=
          '<span class="inline-block mx-auto mb-6 flex items-center justify-center bg-gray-400 rounded-full w-16 h-16">';
        strHTML += '<img src="' + item.ImageNumber_image + '" />';
        strHTML += '</span>';
      } else {
        let icon;
        let iconFontSize;
        let iconFontWeight;
        let iconTextAlignment;
        let iconFontColor;
        let iconType;

        let className = '';
        if (item.ImageNumber_icon_color) {
          iconFontColor = item.ImageNumber_icon_color;
        }
        if (item.ImageNumber_icon_font_size) {
          className += item.ImageNumber_icon_font_size;
        }
        if (item.ImageNumber_icon_font_weight) {
          className += item.ImageNumber_icon_font_weight;
        }
        if (item.ImageNumber_icon_alignment) {
          className += item.ImageNumber_icon_alignment;
        }
        if (item.ImageNumber_icon_type === 'googlematerial') {
          className += ' material-icons-outlined';
        } else if (item.ImageNumber_icon_type === 'fontawesome') {
          className += '';
        } else if (item.ImageNumber_icon_type === 'googlesymbol') {
          className += ' material-symbols-outlined';
        }

        strHTML +=
          '<div class="text-center h-full bg-gray-50 p-6 lg:py-12 lg:px-16 md:rounded-tl-lg">';
        strHTML +=
          '<span class="' +
          className +
          '" style="color: ' +
          iconFontColor +
          '">' +
          item.ImageNumber_icon_symbol +
          '</span>';
        strHTML += '</div>';
      }
      // strHTML += '<div class="inset-x-0 -mt-6 flex justify-center items-center w-12 h-12 mx-auto rounded-full bg-gray-500 text-gray-50 font-bold font-heading">';
      // if(item.ImageNumber === "Number")
      //     strHTML += cnt;
      // else
      //     strHTML += "<img src='"+item.ImageNumber_image+"' />";
      cnt++;

      strHTML +=
        '<div class="mb-4 text-box-h2 font-heading">' +
        item.Headline +
        '</div>';
      strHTML += '<div class="text-box-p mt-4 leading-loose">';
      strHTML += item.Description;
      strHTML += '</div>';
      strHTML += '</div>';
      strHTML += '</div>';
      strHTML += '</div>';
    });
  }

  return strHTML;
};

export const scrollableImages = (dataArr, selectedObj) => {
  let strHTML = '';
  // if(dataArr.length > 0)
  // {
  //     strHTML += '<div class="justify-between flex">';
  //     dataArr.forEach(function (item)
  //     {

  //         if(item.Image !== undefined)
  //         {
  //             strHTML += '<div class="swiper-slide" style="width: 170px; margin-right: 30px;">';
  //             strHTML += '<a href="'+item.Image_link+'">';
  //             strHTML += '<img class="w-full mx-auto" alt="'+item?.Image_alt + '" title="' + item?.Image_alt + '" src="'+item.Image+'"/>';
  //             strHTML += '</a>';
  //             strHTML += '</div>';
  //         }

  //     });
  //     strHTML += '</div>';
  // }
  return strHTML;
};

export const portfolioBox = (dataArr, selectedObj) => {
  let strHTML = '';
  if (dataArr.length > 0) {
    let count = 1;

    dataArr.forEach(function (item) {
      strHTML +=
        '<div class="w-full md:w-3/12 sm:w-6/12 text-center px-[15px]">';
      strHTML += '<div class=""><img src="' + item.Image + '"></div>';
      if (item.Headline)
        strHTML +=
          '<div class="mt-[20px] text-[18px] font-bold">' +
          item.Headline +
          '</div>';
      if (item.Description)
        strHTML +=
          '<div class="text-[#3f5364] text-[18px] leading-[26px] tracking-wider mb-[30px]">' +
          item.Description +
          '</div>';

      strHTML += '</div>';
    });
  }
  return strHTML;
};

export const imageGallery = (dataArr, selectedObj) => {
  let strHTML = '';
  if (dataArr.length > 0) {
    strHTML +=
      '<div class="max-w-[950px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 gallery">';
    dataArr.forEach(function (item) {
      strHTML += '<div>';
      strHTML +=
        '<a href="' +
        item.Image_link +
        '" title="' +
        item.Image_alt +
        '"><img src="' +
        item.Image +
        '" title="' +
        item.Image_alt +
        '"></a>';
      strHTML += '</div>';
    });
    strHTML += '</div>';
  }
  return strHTML;
};

export const smallBoxes = (dataArr, selectedObj) => {
  let strHTML = '';
  if (dataArr.length > 0) {
    let count = 1;
    dataArr.forEach(function (item) {
      strHTML +=
        '<div class="w-full md:w-3/12 sm:w-6/12 text-center px-[15px]">';

      strHTML += `<a href="${item.Image_link}" class="block mb-[30px] shadow-[5px_5px_20px_0_rgba(40,48,112,0.2)] rounded-md py-[30px] px-[20px] text-center transition-500 duration-500 ease-[ease-in-out] hover:scale-105 cursor-pointer" style="box-shadow: 5px 5px 20px 0px rgba(40,48,112,0.2)" >`;
      strHTML +=
        '<div><img class="inline-block" src="' +
        item.Image +
        '" alt="' +
        item.Image_alt +
        '"></div>';

      if (item.Headline)
        strHTML +=
          '<div class="text-[#72a84b] mt-[15px]">' + item.Headline + '</div>';
      strHTML += '</a>';
      strHTML += '</div>';
    });
  }
  return strHTML;
};

export const numberdescriptionblock = (dataArr, selectedObj) => {
  let strHTML = '';
  if (dataArr.length > 0) {
    let count = 1;
    dataArr.forEach(function (item) {
      strHTML += '<div class="w-full lg:w-1/3 px-4 mb-8">';
      strHTML +=
        '<div class="g-gray-50 text-center p-6 rounded' +
        (item.ImageNumber === 'Number' ? ' relative' : '') +
        ' ' +
        (item.HOverColor ? item.HOverColor : '') +
        '" style="' +
        (item.BlockBg ? 'background: ' + item.BlockBg + ';' : '') +
        '">';

      if (item.ImageNumber === 'Number') {
        strHTML +=
          '<div class="inset-x-0 flex justify-center items-center w-12 h-12 mx-auto rounded-full bg-gray-500 text-gray-50 font-bold font-heading -top-6 absolute">';
        strHTML += count;
        strHTML += '</div>';
      } else if (item.ImageNumber === 'Image') {
        strHTML +=
          '<div class="inset-x-0 -mt-6 flex justify-center items-center w-12 h-12 mx-auto rounded-full bg-gray-500 text-gray-50 font-bold font-heading">';
        strHTML += '<img src="' + item.ImageNumber_image + '" />';
        strHTML += '</div>';
      } else {
        let icon;
        let iconFontSize;
        let iconFontWeight;
        let iconTextAlignment;
        let iconFontColor;
        let iconType;

        let className = '';
        if (item.ImageNumber_icon_color) {
          iconFontColor = item.ImageNumber_icon_color;
        }
        if (item.ImageNumber_icon_font_size) {
          className += item.ImageNumber_icon_font_size;
        }
        if (item.ImageNumber_icon_font_weight) {
          className += item.ImageNumber_icon_font_weight;
        }
        if (item.ImageNumber_icon_alignment) {
          className += item.ImageNumber_icon_alignment;
        }
        if (item.ImageNumber_icon_type === 'googlematerial') {
          className += ' material-icons-outlined';
        } else if (item.ImageNumber_icon_type === 'fontawesome') {
          className += '';
        } else if (item.ImageNumber_icon_type === 'googlesymbol') {
          className += ' material-symbols-outlined';
        }

        strHTML +=
          '<div class="text-center h-full bg-gray-50 p-6 lg:py-12 lg:px-16 md:rounded-tl-lg">';
        strHTML +=
          '<span class="' +
          className +
          '" style="color: ' +
          iconFontColor +
          '">' +
          item.ImageNumber_icon_symbol +
          '</span>';
        strHTML += '</div>';
      }
      // strHTML += '<div class="inset-x-0 -mt-6 flex justify-center items-center w-12 h-12 mx-auto rounded-full bg-gray-500 text-gray-50 font-bold font-heading">';
      // if(item.ImageNumber === "Number")
      //     strHTML += cnt;
      // else
      //     strHTML += "<img src='"+item.ImageNumber_image+"' />";
      count++;
      let hclassNameName = '';

      if (selectedObj.selectedVal.Headline_final_class != undefined) {
        hclassNameName = selectedObj.selectedVal.Headline_final_class.value;
      } else {
        hclassNameName = 'text-box-h4 mt-4';
      }

      strHTML +=
        '<div class="' + hclassNameName + '">' + item.Headline + '</div>';
      strHTML += '<div class="text-box-h4 mt-4">';
      strHTML += item.Description;
      strHTML += '</div>';
      strHTML += '</div>';
      strHTML += '</div>';
      strHTML += '</div>';
    });
  }

  return strHTML;
};
export const numberingdiv = (dataArr, selectedObj) => {
  let strHTML = '';
  if (dataArr?.length) {
    dataArr.forEach(function (item, index) {
      strHTML += '<div class="flex items-start mb-6">';
      strHTML += `<div class="mr-10 flex-shrink-0 flex justify-center items-center w-12 h-12 rounded-full bg-gray-500 text-gray-50 font-bold font-heading">${
        index + 1
      }</div>`;
      strHTML += '<div class="max-w-xs">';
      strHTML += '<div class="text-box-p leading-loose">';
      strHTML += item.Description;
      strHTML += '</div>';
      strHTML += '</div>';
      strHTML += '</div>';
    });
  }
  return strHTML;
};

export const multipleBrands = (dataArr, selectedObj) => {
  let strHTML = '';
  if (dataArr.length > 0) {
    let cnt = 1;
    dataArr.forEach(function (item) {
      if (item.Image !== undefined) {
        strHTML += '<div class="w-full lg:w-1/4 px-3 mt-3 mb-3">';
        strHTML +=
          '<div class="border bg-[] hover:bg-[] relative" style="background-color:' +
          (item.BgColor ? item.BgColor : '#003a70') +
          ' ">';
        strHTML += '<div class="flex justify-center items-center">';
        strHTML += '<a href="' + item?.Image_link + '">';
        strHTML +=
          '<img class="w-full mx-auto" alt="' +
          item?.Image_alt +
          '" title="' +
          item?.Image_alt +
          '" src="' +
          item.Image +
          '"/>';
        strHTML += '</a>';
        strHTML += '</div>';
        strHTML += '</div>';
        strHTML += '</div>';
      }
    });
  }
  return strHTML;
};

export const boximage = (dataArr, selectedObj) => {
  let strHTML = '';
  if (dataArr.length > 0) {
    dataArr.forEach(function (item) {
      let classNameName;
      if (item.colcount == 2) classNameName = 'md:w-1/2';
      else if (item.colcount == 3) classNameName = 'md:w-1/3';
      else classNameName = 'md:w-1/2 lg:w-1/4';
      strHTML +=
        '<div class="w-full ' + classNameName + ' px-[15px] mt-[30px]">';
      // strHTML += '<div classNameName="flex justify-center pb-5">';
      // strHTML += '<div classNameName="btn-primary rounded-full w-10 h-10 flex justify-center items-center text-base text-white font-semibold">'+item.index+'</div>';
      // strHTML += '</div>';

      strHTML += '<div class="">';
      let clName = 'flex justify-center';
      let aprData = {};
      let textPos = 'bottom';
      let headLine = '';
      let textBg = 'text-center bg-white w-full';

      let fontSize = 'text-base ';
      let bgOpacity = 1;
      let bgColor = '';
      let textHPos = '';
      let textVPos = '';
      let sectionWidth = '';
      let onBottom = false;
      var buttonHTML = '';
      if (
        item.Button_display != undefined &&
        item.Button_display == 'Yes' &&
        item.Button_text != '' &&
        item.Button_text != null
      ) {
        let btnclassName = item.Button_class;
        buttonHTML += '<div class="mt-5 mb-5 ' + item.Button_alignment + '">';
        buttonHTML += '<a target="" href="' + item.Button_link + '"';
        if (item.Button_alt) {
          buttonHTML += ' title="' + item.Button_alt + '" ';
        }
        buttonHTML += ' class="' + btnclassName + '">';
        buttonHTML += item.Button_text;
        buttonHTML += '</a>';
        buttonHTML += '</div>';
      }

      //flex items-center absolute text-3xl inset-0 p-1 lg:p-4 text-white justify-center
      //console.log("ARD", selectedObj.selectedVal);
      if (selectedObj.selectedVal.TextAppearance != undefined) {
        aprData = selectedObj.selectedVal.TextAppearance.value;
        textPos = aprData.text_pos ?? '';
        fontSize = aprData.font_size ?? '';
        bgOpacity = aprData.bg_opacity ?? '';
        bgColor = aprData.text_bg_color ?? '';
        textHPos = aprData.text_hpos ?? '';
        textVPos = aprData.text_vpos ?? '';
        sectionWidth = aprData.section_width ?? '';
        if (sectionWidth === '') sectionWidth = 'max-w-3xl';
      }

      if (selectedObj.selectedVal.TextAppearance_on_bottom) {
        onBottom = selectedObj.selectedVal.TextAppearance_on_bottom.value;
      }

      let themeclassName = '';
      let fontColor = '';
      if (selectedObj.selectedVal.Headline_final_class != undefined) {
        themeclassName = selectedObj.selectedVal.Headline_final_class.value;
      }
      if (selectedObj.selectedVal.Headline_font_color != undefined) {
        fontColor = selectedObj.selectedVal.Headline_font_color.value;
      }

      if (
        item.Headline !== undefined &&
        item.Headline !== '' &&
        item.Headline !== null
      ) {
        let abClass = '';
        if (!onBottom) {
          clName = 'flex relative w-full text-white';
          abClass = 'flex absolute ';
        } else {
          clName = 'w-full text-white';
        }

        headLine +=
          '<div class="' +
          abClass +
          ' inset-0 p-1 lg:p-4 text-white' +
          sectionWidth +
          ' ' +
          textHPos +
          ' ' +
          textVPos +
          '">';
        headLine +=
          '<div class="" style="background: rgba(' +
          bgColor +
          ',' +
          bgOpacity +
          '); padding: 20px;">';
        headLine +=
          '<div class="' +
          themeclassName +
          '" style="color:' +
          fontColor +
          '">' +
          item.Headline +
          '</div>';
        headLine += '<div>';
        headLine += buttonHTML;
        headLine += '</div>';
        headLine += '</div>';
        headLine += '</div>';
      } else if (buttonHTML) {
        clName = 'flex relative w-full text-white';
        headLine +=
          '<div class="flex absolute ' +
          sectionWidth +
          ' ' +
          textHPos +
          ' ' +
          textVPos +
          ' inset-0 p-1 lg:p-4 text-white">';
        headLine +=
          '<div class="" style="background: rgba(' +
          bgColor +
          ',' +
          bgOpacity +
          '); padding: 20px;">';
        headLine += '<div>';
        headLine += buttonHTML;
        headLine += '</div>';
        headLine += '</div>';
        headLine += '</div>';
      }

      if (textPos == 'top') {
        strHTML += headLine;
      }

      if (item.Image !== undefined) {
        strHTML += '<div class="' + clName + '">';
        strHTML +=
          '<a title="' + item.Image_alt + '" href="' + item.Image_link + '">';
        strHTML +=
          '<img class="w-full" alt="' +
          item?.Image_alt +
          '" alt="' +
          item?.Image_alt +
          '" title="' +
          item?.Image_alt +
          '"  src="' +
          item.Image +
          '"/>';
        strHTML += '</a>';
        if (textPos != 'top' && textPos != 'bottom') {
          strHTML += headLine;
        }
        strHTML += '</div>';
      }

      if (textPos == 'bottom') {
        strHTML += headLine;
      }
      if (textPos == 'top' || textPos == 'bottom') {
        strHTML += buttonHTML;
      }
      strHTML += '</div>';
      strHTML += '</div>';
    });
  }

  return strHTML;
  // <div classNameName="w-full lg:w-1/4 px-3 md:w-1/3 mt-6 isinput">
  //   <div classNameName="border border-gray-50 px-2 py-2">
  //     <div classNameName="flex justify-center">
  //       Image
  //     </div>
  //     <div classNameName="text-center bg-white w-full">
  //       <div classNameName="text-base p-4">Headline</div>
  //       <div classNameName="mb-5">
  //         Button
  //       </div>
  //     </div>
  //   </div>
  // </div>
};

export const multipleImages = (dataArr, selectedObj) => {
  let strHTML = '';
  if (dataArr.length > 0) {
    let cnt = 1;
    dataArr.forEach(function (item) {
      let textPos = '';
      let fontSize = '';
      let bgOpacity = '';
      let bgColor = '';
      let headLine = '';
      let clName = '';
      let aprData = {};
      let buttonHTML = '';
      let textHPos = '';
      let textVPos = '';
      let sectionWidth = '';

      if (
        item.Button_display != undefined &&
        item.Button_display == 'Yes' &&
        item.Button_text !== '' &&
        item.Button_text !== null
      ) {
        let btnclassName = item.Button_class;
        buttonHTML += '<div class="mt-5 mb-5 ' + item.Button_alignment + '">';
        buttonHTML += '<a target="" href="' + item.Button_link + '"';
        if (item.Button_alt) {
          buttonHTML += ' title="' + item.Button_alt + '" ';
        }
        buttonHTML += ' class="' + btnclassName + '">';
        buttonHTML += item.Button_text;
        buttonHTML += '</a>';
        buttonHTML += '</div>';
      }

      if (selectedObj.selectedVal.TextAppearance != undefined) {
        aprData = selectedObj.selectedVal.TextAppearance.value;
        textPos = aprData.text_pos ?? '';
        fontSize = aprData.font_size ?? '';
        bgOpacity = aprData.bg_opacity ?? '';
        bgColor = aprData.text_bg_color ?? '';
        textHPos = aprData.text_hpos ?? '';
        textVPos = aprData.text_vpos ?? '';
        sectionWidth = aprData.section_width ?? '';
      }
      if (!textPos) textPos = 'center';
      //fontSize = item.Headline_font_size ?? '';

      let themeclassName = '';
      let fontColor = '';
      if (selectedObj.selectedVal.Headline_final_class != undefined) {
        themeclassName = selectedObj.selectedVal.Headline_final_class.value;
      }
      if (selectedObj.selectedVal.Headline_font_color != undefined) {
        fontColor = selectedObj.selectedVal.Headline_font_color.value;
      }

      if (
        item.Headline != undefined &&
        item.Headline != '' &&
        item.Headline != null
      ) {
        // if(textPos != 'top' && textPos != 'bottom' && textPos != '')
        // {
        clName = 'flex relative w-full text-white';
        headLine +=
          '<div class="flex absolute inset-0 p-1 lg:p-4 text-white ' +
          textHPos +
          ' ' +
          textVPos +
          '">';
        headLine +=
          '<div class="" style="background: rgba(' +
          bgColor +
          ',' +
          bgOpacity +
          '); padding: 20px;">';
        headLine +=
          '<div class="pb-2 ' +
          themeclassName +
          '" style="color:' +
          fontColor +
          '">' +
          item.Headline +
          '</div>';
        headLine += '<div>';
        headLine += buttonHTML;
        headLine += '</div>';
        headLine += '</div>';
        headLine += '</div>';
        // }
        // else
        // {
        //     headLine += '<div class="text-center bg-white w-full">';
        //     headLine += '<div class="p-4 '+fontSize+'">'+item.Headline+'</div>';
        //     headLine += '</div>';
        // }
      } else {
        clName = 'flex relative w-full text-white';
        headLine +=
          '<div class="flex absolute inset-0 p-1 lg:p-4 text-white ' +
          textHPos +
          ' ' +
          textVPos +
          '">';
        headLine +=
          '<div class="" style="background: rgba(' +
          bgColor +
          ',' +
          bgOpacity +
          '); padding: 20px;">';
        headLine += '<div>';
        headLine += buttonHTML;
        headLine += '</div>';
        headLine += '</div>';
        headLine += '</div>';
      }

      strHTML += '<div class="w-full lg:w-1/4">';
      cnt = cnt + 1;
      strHTML += '<div class="border border-gray-50 px-2 py-2">';

      if (textPos === 'top') {
        strHTML += headLine;
      }

      if (item.Image !== undefined) {
        strHTML += '<div class="' + clName + '">';
        strHTML += '<div class="flex justify-center">';
        strHTML +=
          '<a href="' +
          item.Image_link +
          '" title="' +
          item.Image_link +
          '" style="z-index: 9;">';
        strHTML +=
          '<img class="w-full" alt="' +
          item?.Image_alt +
          '" title="' +
          item?.Image_alt +
          '" src="' +
          item.Image +
          '"/>';
        strHTML += '</a>';
        strHTML += '</div>';
        if (textPos === 'center') {
          strHTML += headLine;
        }
        strHTML += '</div>';
      }

      if (textPos === 'bottom') {
        strHTML += headLine;
      }

      if (textPos === 'top' || textPos === 'bottom') {
        strHTML += buttonHTML;
      }

      strHTML += '</div>';
      strHTML += '</div>';
    });
  }
  return strHTML;
};
