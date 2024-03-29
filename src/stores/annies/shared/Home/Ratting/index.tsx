const Ratting = ({ ratting }: { ratting: number }) => {
  const renderStars = (num: number) => {
    const filledStars = Array.from({ length: num }, (_, index) => (
      <span
        key={index}
        className='material-icons-outlined text-[#FFC607] text-sm tracking-normal'
      >
        star
      </span>
    ));

    const emptyStars = Array.from({ length: 5 - num }, (_, index) => (
      <span
        key={index + num}
        className={`material-icons-outlined ${
          ratting === 0 ? 'text-dark-gray' : 'text-[#FFC607]'
        } text-sm tracking-normal`}
      >
        star_border
      </span>
    ));

    return [...filledStars, ...emptyStars];
  };
  return (
    <div className='flex flex-wrap w-full items-center text-sm tracking-normal'>
      <div className='mr-[10px] flex gap-1'>{renderStars(ratting)}</div>
    </div>
  );
};

export default Ratting;
