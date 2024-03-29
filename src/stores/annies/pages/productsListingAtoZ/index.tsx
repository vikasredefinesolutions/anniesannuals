'use client';

import ProductListingAtoZController from '@/features/productListingAtoZ/controller';
import { tStoreDetailsFile } from '@/helper/staticfile.helper';
import Card from '@/shared/Components/Card';
import { getBackGroundColor } from '@/shared/Components/Card/CardColors';
import ProductListingAtoZSkeleton from '@/shared/Components/Skeletons/ProductListingAtoZSkeleton';
import { productListData } from '@/shared/types/product';
import { getPriceWithMsrpAndSalePrice } from '@/shared/utils/helper';
import { paths } from '@/utils/paths.constant';
import useModel from '../../shared/hooks/use-model';
import HeaderCart from '../../widgets/header/components/headerCart';
import PaginationBar from '../productsListing/components/Pagination';
interface IProductListProps {
  productList: productListData;
  jumpBy: number;
  totalAvailable: number;
  currentPage: number;
  cmsStoreThemeConfigsViewModel: tStoreDetailsFile['cmsStoreThemeConfigsViewModel'];
}
const ProductsListingAtoZ = (props: IProductListProps) => {
  const {
    productList,
    cmsStoreThemeConfigsViewModel,
    jumpBy,
    totalAvailable,
    currentPage,
  } = props;

  const { openModel, isOpen, onRequestClose } = useModel();

  return (
    <ProductListingAtoZController
      productListData={productList}
      jumpBy={jumpBy}
      totalAvailable={totalAvailable}
      currentPage={currentPage}
      cases={{
        empty: () => {
          return <div>No Data</div>;
        },
        loading: ({ alphabets, filterChar }) => (
          <>
            <ProductListingAtoZSkeleton />
          </>
        ),
        ready: ({
          alphabets,
          productListData,
          totalPages,
          currentPage,
          handlePageChange,
          handleFilterChar,
          goToPageHandler,
          filterChar,
          userWishList,
        }) => {
          return (
            <>
              <section className='bg-tertiary'>
                <div className='container mx-auto relative'>
                  <div className='py-[20px]'>
                    <div className=''>
                      <ul className='flex flex-wrap items-center gap-[10px] text-[14px] font-semibold font-sub'>
                        <li className=''>
                          <a href={paths.home} className='text-anchor'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='21.621'
                              height='19.897'
                              viewBox='0 0 21.621 19.897'
                            >
                              <path
                                id='Path_48756'
                                data-name='Path 48756'
                                d='M2.25,12,11.2,3.045a1.126,1.126,0,0,1,1.591,0L21.75,12M4.5,9.75V19.875A1.125,1.125,0,0,0,5.625,21H9.75V16.125A1.125,1.125,0,0,1,10.875,15h2.25a1.125,1.125,0,0,1,1.125,1.125V21h4.125A1.125,1.125,0,0,0,19.5,19.875V9.75M8.25,21H16.5'
                                transform='translate(-1.189 -1.853)'
                                fill='none'
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='1.5'
                              />
                            </svg>
                          </a>
                        </li>
                        <li className=''>/</li>
                        <li className=''>Shop by A – Z</li>
                      </ul>
                    </div>
                  </div>
                  <div className='flex border-b border-b-[#96A898] mb-[30px] text-normal-text font-sub overflow-x-auto'>
                    {alphabets.map((item) => {
                      return (
                        <a
                          key={item}
                          href={paths.productListingAtoZ + `?filter=${item}`}
                          className={`text-primary border-b-[5px] hover:border-b-primary ${
                            item == filterChar
                              ? 'border-b-primary'
                              : 'border-b-transparent'
                          } font-bold px-[16px] pb-[5px] cursor-pointer`}
                        >
                          {item}
                        </a>
                      );
                    })}
                  </div>
                  <div className='flex flex-wrap mx-[-15px]'>
                    <div className='w-full px-[15px]'>
                      <div className='flex flex-wrap mx-[-15px]'>
                        {productListData?.map((product, cardIndex) => {
                          const containerBg = getBackGroundColor(cardIndex);
                          return (
                            <Card
                              product={product}
                              productCustomField={product.productCustomFields}
                              key={product.id}
                              id={product.id || 0}
                              name={product.name}
                              openModel={openModel}
                              sename={product.sename}
                              // price={product.msrp}
                              price={getPriceWithMsrpAndSalePrice(
                                +product?.salePrice,
                                +product?.msrp,
                              )}
                              containerBg={containerBg}
                              image={
                                product.getProductImageOptionList[0]?.imageName
                              }
                              cmsStoreThemeConfigsViewModel={
                                cmsStoreThemeConfigsViewModel
                              }
                              reviews={product.productRatingAverage}
                              reviewCount={+product.productReviewsCount}
                              productTagViewModel={product.productTagViewModel}
                              imageAltTag={''}
                              getProductImageOptionList={[]}
                              isSubcategory={false}
                              isAtoZ={true}
                              userWishList={userWishList}
                            />
                          );
                        })}
                      </div>
                      {isOpen && (
                        <HeaderCart
                          closeCart={onRequestClose}
                          cmsStoreThemeConfigsViewModel={
                            cmsStoreThemeConfigsViewModel
                          }
                        />
                      )}
                    </div>
                    {/* <div className='w-full text-center pb-[30px] px-[15px]'>
                      <a
                        onClick={handlePageChange}
                        className='btn btn-primary btn-sm uppercase !font-sub cursor-pointer'
                      >
                        Load More
                      </a>
                    </div> */}
                    {totalPages > 1 && (
                      <div className='w-full text-center pb-[30px] px-[15px]'>
                        <PaginationBar
                          currentPage={currentPage}
                          totalPages={totalPages}
                          onPageChange={goToPageHandler}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </section>
            </>
          );
        },
      }}
    />
  );
};

export default ProductsListingAtoZ;
