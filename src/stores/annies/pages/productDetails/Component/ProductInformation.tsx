import ProductDetailInfoController from '@/features/product/productDetail/productDetailInfo.ts/controller';
import { ICustomField, IFilterFacetFields } from '@/shared/types/product';

interface IProps {
  productCustomField: Array<ICustomField>;
  producFilterFacetFields: Array<IFilterFacetFields>;
  productId: string | number;
}

const ProductInformation: React.FC<IProps> = ({
  productCustomField,
  producFilterFacetFields,
  productId,
}) => {
  return (
    <ProductDetailInfoController
      config={{}}
      productData={{
        productCustomField,
        producFilterFacetFields,
      }}
      cases={{
        view: ({ activeDropDown, setActiveDropDown, informationField }) => {
          const informationDate =
            informationField !== undefined &&
            new Date(informationField['Plant Info Date']!)
              .toDateString()
              .split(' ');
          return (
            <>
              <div
                className='text-title-text font-sub font-semibold flex items-center justify-between mb-[10px] pt-[15px] border-t border-gray-border cursor-pointer'
                onClick={() => setActiveDropDown(!activeDropDown)}
              >
                <div>Information</div>
                <div className=''>
                  <span className='material-icons-outlined'>
                    {activeDropDown ? 'remove' : 'add'}
                  </span>
                </div>
              </div>
              {activeDropDown && (
                <div className='' x-show='open'>
                  <div className='bg-primary text-white text-default-text font-semibold p-[30px] lg:rounded-tl-xl lg:rounded-br-xl mb-[15px] mx-[-15px] lg:mx-0'>
                    <div className='flex flex-wrap mx-[-15px] mb-[20px] last:mb-0'>
                      <div className='w-1/3 px-[15px] font-semibold font-sub'>
                        Item ID
                      </div>
                      <div className='w-2/3 px-[15px]'>{productId}</div>
                    </div>
                    {informationField && (
                      <>
                        {informationField['Plant Type'] && (
                          <div className='flex flex-wrap mx-[-15px] mb-[20px] last:mb-0'>
                            <div className='w-1/3 px-[15px] font-semibold font-sub'>
                              Plant Type
                            </div>
                            <h3 className='w-2/3 px-[15px]'>
                              {informationField['Plant Type']}
                            </h3>
                          </div>
                        )}
                        {informationField['Pot Size'] && (
                          <div className='flex flex-wrap mx-[-15px] mb-[20px] last:mb-0'>
                            <div className='w-1/3 px-[15px] font-semibold font-sub'>
                              Pot Size
                            </div>
                            <div className='w-2/3 px-[15px]'>
                              {informationField['Pot Size']}
                            </div>
                          </div>
                        )}
                        {informationField.LifeSpan && (
                          <div className='flex flex-wrap mx-[-15px] mb-[20px] last:mb-0'>
                            <div className='w-1/3 px-[15px] font-semibold font-sub'>
                              LifeSpan
                            </div>
                            <h3 className='w-2/3 px-[15px]'>
                              {informationField.LifeSpan}
                            </h3>
                          </div>
                        )}
                        {informationField['Flower Colors'] && (
                          <div className='flex flex-wrap mx-[-15px] mb-[20px] last:mb-0'>
                            <div className='w-1/3 px-[15px] font-semibold font-sub'>
                              Flower Colors
                            </div>
                            <h3 className='w-2/3 px-[15px]'>
                              {informationField['Flower Colors']}
                            </h3>
                          </div>
                        )}
                        {informationField['Night Color'] && (
                          <div className='flex flex-wrap mx-[-15px] mb-[20px] last:mb-0'>
                            <div className='w-1/3 px-[15px] font-semibold font-sub'>
                              Night Color
                            </div>
                            <h3 className='w-2/3 px-[15px]'>
                              {informationField['Night Color']}
                            </h3>
                          </div>
                        )}
                        {informationField['Bloom Time'] && (
                          <div className='flex flex-wrap mx-[-15px] mb-[20px] last:mb-0'>
                            <div className='w-1/3 px-[15px] font-semibold font-sub'>
                              Bloom Time
                            </div>
                            <div className='w-2/3 px-[15px]'>
                              {informationField['Bloom Time']}
                            </div>
                          </div>
                        )}
                        {informationField.Zones && (
                          <div className='flex flex-wrap mx-[-15px] mb-[20px] last:mb-0'>
                            <div className='w-1/3 px-[15px] font-semibold font-sub'>
                              Zones
                            </div>
                            <h3 className='w-2/3 px-[15px]'>
                              {informationField.Zones}
                            </h3>
                          </div>
                        )}
                        {informationField['Sun Exposure'] && (
                          <div className='flex flex-wrap mx-[-15px] mb-[20px] last:mb-0'>
                            <div className='w-1/3 px-[15px] font-semibold font-sub'>
                              Sun Exposure
                            </div>
                            <h3 className='w-2/3 px-[15px]'>
                              {informationField?.['Sun Exposure']}
                            </h3>
                          </div>
                        )}
                        {informationField['Water Needs'] && (
                          <div className='flex flex-wrap mx-[-15px] mb-[20px] last:mb-0'>
                            <div className='w-1/3 px-[15px] font-semibold font-sub'>
                              Water Needs
                            </div>
                            <h3 className='w-2/3 px-[15px]'>
                              {informationField['Water Needs']}
                            </h3>
                          </div>
                        )}
                        {informationField['Product Date'] && (
                          <div className='flex flex-wrap mx-[-15px] mb-[20px] last:mb-0'>
                            <div className='w-1/3 px-[15px] font-semibold font-sub'>
                              Product Date
                            </div>
                            <div className='w-2/3 px-[15px]'>
                              {new Date(
                                informationField['Product Date']!,
                              ).toLocaleDateString()}
                            </div>
                          </div>
                        )}
                        {informationField['Product Availability'] && (
                          <div className='flex flex-wrap mx-[-15px] mb-[20px] last:mb-0'>
                            <div className='w-1/3 px-[15px] font-semibold font-sub'>
                              Product Availability
                            </div>
                            <div className='w-2/3 px-[15px]'>
                              {informationField['Product Availability']}
                            </div>
                          </div>
                        )}
                        {informationField['Plant Info Date'] &&
                          informationDate && (
                            <div className='flex flex-wrap mx-[-15px] mb-[20px] last:mb-0'>
                              <div className='w-1/3 px-[15px] font-semibold font-sub'>
                                Plant Info Date
                              </div>
                              <div className='w-2/3 px-[15px]'>
                                {`${informationDate[1]} ${informationDate[2]} ${informationDate[3]}`}
                              </div>
                            </div>
                          )}
                      </>
                    )}
                  </div>
                </div>
              )}
            </>
          );
        },
      }}
    />
  );
};

export default ProductInformation;
