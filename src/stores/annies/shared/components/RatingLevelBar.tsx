import React from 'react';

interface IProps {
  text: string;
  ratingCount: number;
}
const RatingLevelBarSection: React.FC<IProps> = ({ text, ratingCount }) => {
  const rating = ratingCount ? Math.floor(+ratingCount) : 0;
  const colorArray = new Array(rating).fill(0);
  const withoutColor = new Array(5 - rating).fill(0);

  return (
    <div className='flex items-center justify-between mx-[-5px] mb-[15px]'>
      <div className='px-[5px] w-[150px]'>{text}</div>
      <div className='grow px-[5px]'>
        <div className='grid grid-cols-5 divide-x'>
          {colorArray.map((el, index) => (
            <div className='bg-[#A62152] h-[10px]' key={index}>
              &nbsp;
            </div>
          ))}
          {withoutColor.map((el, index) => (
            <div className='bg-[#EEC9C3] h-[10px]' key={index}>
              &nbsp;
            </div>
          ))}
        </div>
      </div>
      <div className='px-[5px] text-right w-[40px]'>{rating}</div>
    </div>
  );
};

export default RatingLevelBarSection;
