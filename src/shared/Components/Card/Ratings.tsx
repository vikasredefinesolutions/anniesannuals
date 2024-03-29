export const Ratings = (count:number) => {
    const yellowStars = Math.floor(count); 
    const hasHalfStar = count % 1 !== 0; 
    const starIcons = [];


    for (let i = 0; i < yellowStars; i++) {
      starIcons.push(
        <span
          key={`star-${i}`}
          className='material-icons-outlined text-[#FFC607] text-sm tracking-normal'
        >
          star
        </span>
      );
    }


    if (hasHalfStar) {
      starIcons.push(
        <span
          key='half-star'
          className='material-icons-outlined text-[#FFC607] text-sm tracking-normal'
        >
          star_half
        </span>
      );
    }


    const remainingStars = 5 - Math.ceil(count); 
    for (let i = 0; i < remainingStars; i++) {
      starIcons.push(
        <span
          key={`border-star-${i}`}
          className={`material-icons-outlined ${count === 0 ? 'text-dark-gray' : 'text-[#FFC607]'} text-sm tracking-normal`}
        >
          star_border
        </span>
      );
    }

    return starIcons;
  };