import React from 'react';
import Ratting from '../../Ratting';
import PriceLabel from '@/shared/Components/PriceLabel';
import Image from '@/shared/Components/Image';
import CustomLink from '@/shared/Components/CustomLink';

type CardProps = {
  name: string;
  seName: string;
  ratting: number;
  price: number;
  reviews: number;
  url: string;
};
const BuyItCard: React.FC<CardProps> = ({
  name,
  seName,
  ratting,
  price,
  reviews,
  url,
}) => {
  return (
    <div
      className={`max-w-full relative overflow-hidden rounded-tl-lg rounded-br-lg group bg-[#2E631D] flex flex-wrap`}
      style={{ minHeight: '174px' }}
    >
      <div className='w-1/2 flex overflow-hidden'>
        <div>
          <CustomLink href={url}>
            <Image
              src='/annies/1/attributeimages/4801-_1.jpg'
              className='group-hover:scale-125 transition-all duration-700 h-full'
              alt='attribute-Image'
            />
          </CustomLink>
        </div>
      </div>
      <div className='w-1/2 flex items-center'>
        <div className='p-[15px] transition-all duration-700 w-full'>
          <div>
            <div className='text-normal-text text-white font-semibold font-sub w-full overflow-hidden'>
              {name}
            </div>
          </div>
          <div className='text-default-text text-white mt-1 text-sm'>
            {seName}
          </div>
          <div className='flex flex-wrap gap-1 w-full'>
            <Ratting ratting={ratting} />
            <div className=''>
              <div
                className={`${
                  reviews === 0 ? 'text-dark-gray' : 'text-white'
                }  extra-small-text`}
                style={{ fontSize: '10px' }}
              >
                {reviews || 0} {reviews > 1 ? 'Reviews' : 'Review'}
              </div>
            </div>
          </div>
          <div className='flex flex-wrap justify-between items-center w-full'>
            <div className='text-default-text text-white font-bold mt-1'>
              <PriceLabel className='' price={price} />
            </div>
            <div className='text-right'>
              <a
                href={url}
                className='h-[25px] w-[25px] flex justify-center items-center text-white bg-[#000000] bg-opacity-20 group-hover:bg-opacity-100 rounded-full'
                tabIndex={0}
              >
                <span className='material-icons-outlined'>chevron_right</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BuyItCard;
