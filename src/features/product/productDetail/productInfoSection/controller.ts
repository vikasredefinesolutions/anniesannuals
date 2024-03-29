'use client';
import { useAppSelector } from '@/app/redux/hooks';
import { addCartData } from '@/app/redux/slices/cartSlice';
import { openAlertModal } from '@/app/redux/slices/modalSlice';
import { setWishlistData } from '@/app/redux/slices/userSlice';
import { addToCart } from '@/shared/apis/cart/addToCart';
import { getCartDetails } from '@/shared/apis/cart/fetchCartProducts';
import { getWishlist } from '@/shared/apis/cart/getWishlistItems';
import { moveToWishlist } from '@/shared/apis/cart/moveToWishlist';
import { removeWishlist } from '@/shared/apis/cart/removeFromWishlist';
import {
  FetchCustomerQuantityByProductId,
  FetchDiscountTablePrices,
  FetchInventoryById,
  _ProductDiscountTable,
} from '@/shared/apis/product/product';
import {
  IProductColor,
  IProductDetails,
  IProductInventory,
  IProductInventoryTransfomed,
} from '@/shared/types/product';
import {
  TEMPUSER_ID,
  getTempUserId,
  getUserId,
} from '@/shared/utils/cookie.helper';
import { PixelTracker } from '@/shared/utils/facebookPixel';
import { GoogleAnalyticsTracker } from '@/shared/utils/googleAnalytics';
import { getLocation } from '@/shared/utils/helper';
import useModel from '@/stores/annies/shared/hooks/use-model';
import { setCookie } from 'cookies-next';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

interface _DetailsHelpers {
  config: {
    showDescription?: boolean;
    showRatings?: boolean;
  };
  handleQuantityChange: (value: number) => void;
  handleAddToCart: (product: IProductDetails) => void;
  quantity: number;
  changeColorHandler: (value: IProductColor) => void;
  selectedColor: IProductColor | null;
  inventoryData: IProductInventoryTransfomed | null;
  setSelectedSize: (value: IProductInventory) => void;
  selectedSize: IProductInventory | null;
  addToWishlist: (productId: number, name: string) => void;
  removeFromWishlist: (wishlistId: number) => void;
  wishListId: number;
  isOpen: boolean;
  onRequestClose: () => void;
  DiscountPriceTable: _ProductDiscountTable | null;
  productPrice: number;
}
interface _Props {
  config: {
    showDescription?: boolean;
    showRatings?: boolean;
    productPage?: boolean;
  };
  cases: {
    view: (helpers: _DetailsHelpers) => ReactElement<any, any>;
  };
  productColor?: IProductColor[] | null;
  product: IProductDetails | null;
  setQuantityHandler?: any;
  setgardenData?: (
    gardenDataArray: Array<IProductDetails & { buyQuantity: number }>,
  ) => void;
  gardenData?: Array<IProductDetails & { buyQuantity: number }>;
}
const ProductInfoController: React.FC<_Props> = ({
  cases,
  config,
  productColor,
  product,
  setQuantityHandler,
  setgardenData,
  gardenData,
}) => {
  const [quantity, setQuantity] = useState(1);
  const { wishlistData } = useAppSelector((state) => state.user);
  const { cartData } = useAppSelector((state) => state.cart);
  const [wishListId, setWishListId] = useState<number>(0);
  const [presentCartQty, setPresentCartQty] = useState<number>(0);
  const [selectedColor, setSelectedcolor] = useState<IProductColor | null>(
    null,
  );
  const [productPrice, setProductPrice] = useState(
    product?.salePrice! != 0 ? product?.salePrice! : product?.msrp! || 0,
  );
  const [DiscountPriceTable, setDiscountPriceTable] =
    useState<_ProductDiscountTable | null>(null);
  const [selectedSize, setSelectedSize] = useState<IProductInventory | null>(
    null,
  );
  const { openModel, isOpen, onRequestClose } = useModel();
  const dispatch = useDispatch();

  const [inventoryData, setInventoryData] =
    useState<IProductInventoryTransfomed | null>(null);
  const userId = getUserId();
  const tempId = getTempUserId();
  const changeColorHandler = (value: IProductColor) => {
    setSelectedcolor(value);
  };

  useEffect(() => {
    if (productColor?.length) {
      setSelectedcolor(productColor[0]);
    }
    if (gardenData && product) {
      setQuantity(product?.quantity);
    }
  }, []);

  useEffect(() => {
    if (config.productPage) {
      FetchDiscountTablePrices({
        storeId: product?.storeId!,
        seName: product?.seName!,
        customerId: userId,
        attributeOptionId: product?.sizes
          ? 0
          : selectedColor?.attributeOptionId || 0,
      }).then((res) => {
        setDiscountPriceTable(res);
      });

      FetchCustomerQuantityByProductId({
        ShoppingCartItemsId: 0,
        ProductId: product?.id!,
        CustomerId: +userId || +tempId || 0!,
      }).then((res) => {
        setPresentCartQty(res!);
      });
    }
  }, [selectedColor?.attributeOptionId]);

  useEffect(() => {
    if (config.productPage) {
      FetchCustomerQuantityByProductId({
        ShoppingCartItemsId: 0,
        ProductId: product?.id!,
        CustomerId: +userId || +tempId || 0!,
      }).then((res) => {
        setPresentCartQty(res!);
      });
    }
  }, [cartData]);

  useEffect(() => {
    if (config.productPage) {
      const DiscountPriceTableData = DiscountPriceTable?.subRows;
      DiscountPriceTableData?.map((el) => {
        const displayQuantity = +el.displayQuantity.replace('+', '');
        const minimumUnits = +DiscountPriceTableData[0].displayQuantity.replace(
          '+',
          '',
        );
        if (+displayQuantity <= quantity + presentCartQty) {
          setProductPrice(+el.discountPrice);
        } else if (quantity + presentCartQty <= minimumUnits) {
          setProductPrice(product?.msrp!);
        }
      });
    }
  }, [quantity, presentCartQty, DiscountPriceTable?.subRows]);

  // useEffect(() => {
  //   if (gardenData) {
  //     setQuantity();
  //   }
  // }, []);

  const updateGardenData = async () => {
    if (gardenData) {
      const updateGardenData = gardenData.map((el) => {
        console.log(
          el.seName,
          product?.seName,
          'product.seName==product?.seName',
        );
        if (el.seName == product?.seName) {
          if (product?.quantity == 0) {
            el.buyQuantity = 0;
          } else {
            el.buyQuantity = quantity;
            setQuantity(quantity);
          }
        }
        return el;
      });
      setgardenData && setgardenData([...updateGardenData]);
    }
  };
  useEffect(() => {
    updateGardenData();
  }, [quantity]);

  useEffect(() => {
    if (selectedColor) {
      const payload = {
        productId: selectedColor.productId,
        attributeOptionId: [selectedColor?.attributeOptionId!],
      };
      FetchInventoryById(payload).then((res) => {
        setInventoryData(res);
        // res?.sizes.map((el) => {
        //   if (el.colorAttributeOptionId == selectedColor.attributeOptionId) {
        //     setSelectedSize(el.sizeArr[0]);
        //   }
        // });
      });
    }
  }, [selectedColor]);

  useEffect(() => {
    if (wishlistData.length > 0) {
      checkProductInWishlist();
    }
  }, [wishlistData]);

  const checkProductInWishlist = () => {
    const wishlist = wishlistData.filter((wishlistItem) => {
      if (wishlistItem.productId === product?.id!) return wishlistItem;
    });
    if (wishlist[0]) {
      setWishListId(wishlist[0].id);
    } else setWishListId(0);
  };
  const addToWishlist = async (productId: number, name: string) => {
    const data = await getLocation();

    const requestObject = {
      storeproductWishListModel: {
        id: 0,
        name: name,
        quantity: 1,
        color: '',
        price: product!.msrp,
        recStatus: 'A',
        rowVersion: '',
        productId: productId ? productId : 0,
        ipAddress: data.ip_address,
        customerId: +userId || 0,
        macAddress: '00-00-00-00-00-00',
        location: `${data?.city}, ${data?.region}, ${data?.country}, ${data?.postal_code}`,
        // attributeColorOptionId: 0,
        // attributeColorOptionValue: '',
        // attributeSizeOptionId: 0,
        // attributeSizeOptionValue: '',
      },
    };
    try {
      await moveToWishlist(requestObject);
      const pixelPaylod = {
        value: product!.msrp,
        currency: 'USD',
        content_name: product?.name,
        content_category: 'snippet',
        content_ids: product?.id,
      };
      PixelTracker('track', 'AddToWishlist', pixelPaylod);
      fetchWishlistData();
    } catch (err) {
      dispatch(
        openAlertModal({
          title: 'Error',
          description: err,
          isAlertModalOpen: true,
        }),
      );
    }
  };

  const fetchWishlistData = async () => {
    const wishlistData = await getWishlist(+userId);
    if (wishlistData) {
      dispatch(setWishlistData(wishlistData));
    }
  };
  const removeFromWishlist = async (wishlistId: number) => {
    try {
      const removed = await removeWishlist(wishlistId);
      if (removed) {
        setWishListId(0);
        await fetchWishlistData();
      }
    } catch (err) {
      dispatch(
        openAlertModal({
          title: 'Error',
          description: err,
          isAlertModalOpen: true,
        }),
      );
    }
  };
  const handleAddToCart = async (product: IProductDetails) => {
    // if (!userId) return router.push(`${paths.login}?redirect=/product/${product.seName}.html`)
    if (!quantity) return alert('Quantity must be greater than 0');
    try {
      const isPreOrder = () => {
        if (
          (product?.sizes && selectedSize?.inventory) ||
          (!product?.sizes && product?.quantity)
        ) {
          return false;
        } else if (
          product?.futureInventoryDate &&
          product?.futureInventory &&
          product?.isAddToCart
        ) {
          return true;
        }
        return false;
      };
      const payload = {
        addToCartModel: {
          customerId: userId || +tempId,
          productId: product!.id,
          storeId: product?.storeId,
          ipAddress: getLocation().ip_address,

          shoppingCartItemModel: {
            price: productPrice,
            quantity: quantity,
            // color image details don't get confused with name
            logoTitle: '',
            logogImagePath: !product.sizes
              ? product?.imageUrl ||
                product.attributeImagesViewModels[0].imageUrl
              : selectedColor?.imageUrl!,
            // not to touch
            id: 0,
            weight: 0,
            productType: 0,
            discountPrice: 0,
            perQuantity: 0,
            appQuantity: 0,
            status: 0,
            discountPercentage: 0,
            productCustomizationId: 0,
            itemNotes: '',
            isEmployeeLoginPrice: false,
            futureInventoryShipDate: product.futureInventoryDate!,
            isPreOrder: isPreOrder(),
          },
          shoppingCartItemsDetailModels: !product.sizes
            ? []
            : [
                {
                  attributeOptionName: 'Color',
                  attributeOptionValue: selectedColor?.name!,
                  attributeOptionId: selectedColor?.attributeOptionId!,
                },
              ],
          cartLogoPersonModel: !product.sizes
            ? []
            : [
                {
                  id: 0,
                  attributeOptionId: selectedSize?.attributeOptionId!,
                  attributeOptionValue: selectedSize?.name!,
                  code: '',
                  price: product?.msrp!,
                  quantity: quantity,
                  estimateDate: new Date(),
                  isEmployeeLoginPrice: 0,
                },
              ],
          // Static

          isempLogin: false,
          isForm: false,
        },
      };
      const data = await addToCart(payload);
      setQuantity(1);
      openModel();
      const cartGaPayload = {
        storeId: product?.storeId,
        customerId: userId || 0,
        value: quantity * product?.msrp,
        coupon: '',
        shoppingCartItemsModel: [
          {
            productId: product?.id,
            productName: product?.name,
            colorVariants: productColor?.length
              ? productColor.find((clr) => clr.productId === product.id)
                  ?.attributeOptionId
              : '',
            price: quantity * product?.msrp,
            quantity: quantity,
          },
        ],
      };
      const pixelPaylod = {
        value: quantity * product?.msrp,
        currency: 'USD',
        content_name: product.name,
        content_type: 'product', // Required for Dynamic Product Ads
        content_ids: product.id, // Required for Dynamic Product Ads
      };
      PixelTracker('track', 'AddToCart', pixelPaylod);
      GoogleAnalyticsTracker('GoogleAddToCartScript', cartGaPayload);
      if (userId == 0) setCookie(TEMPUSER_ID, '' + data);
      //TODO: need to add modal later
      // alert('Added to cart successfully');
      getCartDetails(+userId || +tempId, false)
        .then((res) => {
          if (res && res.length > 0) {
            dispatch(addCartData(res));
          }
        })
        .catch((err) => {
          dispatch(
            openAlertModal({
              title: 'Error',
              description: err,
              isAlertModalOpen: true,
            }),
          );
        });
    } catch (error: any) {
      //TODO: need to add modal later
      dispatch(
        openAlertModal({
          title: 'Error',
          description: error[Object.keys(error)[0]],
          isAlertModalOpen: true,
        }),
      );
    }
  };
  return cases.view({
    config,
    handleQuantityChange: (value) => setQuantity(value),
    quantity,
    handleAddToCart,
    changeColorHandler,
    selectedColor,
    inventoryData,
    setSelectedSize,
    selectedSize,
    addToWishlist,
    removeFromWishlist,
    wishListId,
    isOpen,
    onRequestClose,
    DiscountPriceTable,
    productPrice,
  });
};

export default ProductInfoController;
