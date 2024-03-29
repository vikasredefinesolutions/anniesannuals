import React from 'react';

interface iProps {
  loading: boolean;
  loadMoreHandler: () => void;
  availableProductsCount: number;
  itemsPerPage: number;
  currentPage: number;
}
const LoadMoreButton: React.FC<iProps> = ({
  loading,
  itemsPerPage,
  currentPage,
  availableProductsCount,
  loadMoreHandler,
}) => {
  if (availableProductsCount < itemsPerPage * currentPage) return null;

  return (
    <div
      className='w-full text-center pb-[30px] px-[15px] cursor-pointer'
      id='more'
    >
      <button
        onClick={loadMoreHandler}
        className='btn btn-primary btn-sm uppercase !font-sub '
      >
        {loading ? 'Loading' : 'Load More'}
      </button>
    </div>
  );
};

export default LoadMoreButton;
