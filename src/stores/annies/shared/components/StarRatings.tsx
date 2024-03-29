import React, { ReactElement } from 'react';

interface IProps {
  rating: number;
  textsize: string;
}
const StarRatings: React.FC<IProps> = ({ rating, textsize }) => {
  const renderRatingsStars = () => {
    let ratingsArray: ReactElement[] = [];
    for (let i = 0; i < Math.floor(rating); i++) {
      ratingsArray.push(
        <span
          key={`star_${i}`}
          className={`material-icons-outlined text-[#FFC607] ${textsize} tracking-normal cursor-pointer`}
        >
          star
        </span>,
      );
    }
    const isRatingInDecimal = String(rating).split('.')?.length > 1;
    if (isRatingInDecimal)
      ratingsArray = ratingsArray.concat(
        <span
          key='half_star'
          className={`material-icons-outlined text-[#FFC607] ${textsize} tracking-normal cursor-pointer`}
        >
          star_half
        </span>,
      );
    if (ratingsArray.length < 5) {
      for (let i = ratingsArray.length; i < 5; i++) {
        ratingsArray.push(
          <span
            key={`star_${i}`}
            className={`material-icons-outlined ${
              rating === 0 ? 'text-dark-gray' : 'text-[#FFC607]'
            } ${textsize} tracking-normal cursor-pointer`}
          >
            star_border
          </span>,
        );
      }
    }
    return ratingsArray;
  };

  return <>{renderRatingsStars()}</>;
};

export default StarRatings;
