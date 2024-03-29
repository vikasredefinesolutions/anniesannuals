import React from 'react';

interface IProps {
  text: string;
  ratingCount: number;
  ratingPercent: number;
}
const RatingBarSection: React.FC<IProps> = ({
  text,
  ratingCount,
  ratingPercent,
}) => {
  return (
    <div className='flex items-center justify-between mx-[-15px] mb-[15px]'>
      <div className='px-[15px]'>{text}</div>
      <div className='grow px-[15px]'>
        <div className="bg-[#EEC9C3] h-[10px] w-full overflow-hidden relative">
          <div
            className='bg-[#A62152] absolute h-[10px] top-0 bottom-0 left-0'
            style={{ right: `${100-ratingPercent}%` }}
          ></div>
        </div>
      </div>
      <div className='px-[15px] text-right w-[50px]'>{ratingCount}</div>
    </div>
  );
};

export default RatingBarSection;
