import { useAppDispatch } from '@/app/redux/hooks';
import { showLoader } from '@/app/redux/slices/commonSlice';
import { openAlertModal } from '@/app/redux/slices/modalSlice';
import { uploadMedia } from '@/shared/apis/common/uploadMedia';
import {
  IAddReviewPayload,
  IProductReviewMedia,
  fetchProductReviewsByUserId,
  postProductReview,
  postProductUpdateReview,
} from '@/shared/apis/product/product';
import {
  IProductReviewsByUserId,
  IProductReviewsImage,
} from '@/shared/types/product';
import { getUserDetails, getUserId } from '@/shared/utils/cookie.helper';
import {
  default as StoreDetails,
  default as storeDetails,
} from '@/staticData/storeDetails.json';
import { getLocation } from '@/utils/helpers';
import { imageFolder } from '@/utils/paths.constant';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

type _Files = Array<{ file: File; preview: string }>;
interface _Props {
  configs: null;
  cases: {
    loading: () => ReactElement<any, any>;
    empty: () => ReactElement<any, any>;
    ready: (helper: _Helper) => ReactElement<any, any>;
  };
  productId: number;
  reviewId?: number;
}
interface _Values {
  description: string;
  commentHeading: string;
  images: _FileDetails[];
}
interface _FileDetails {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}
interface _Helper {
  checkRating: () => void;
  handleUploadImage: (index: number) => void;
  handleReviewImage: (index: number) => void;
  setUploadInput: React.Dispatch<React.SetStateAction<boolean>>;
  uploadInput: boolean;
  reviewedImage: Array<IProductReviewsImage> | undefined;
  setReviewImage: React.Dispatch<
    React.SetStateAction<IProductReviewsImage[] | undefined>
  >;
  handleChangeImage: (e: ChangeEvent<HTMLInputElement>) => void;
  files: _Files;
  userFirstName: string | undefined;
  userLastName: string | undefined;
  handleRating: (event: ChangeEvent<HTMLInputElement>) => void;
  showRatingValidation: boolean;
  reviewStatus: string[];
  onSubmit: (values: _Values) => void;
  hookForm: { errors: any; register: any; handleSubmit: any };
  handleClear: () => void;
  rating: number;
  hover: number;
  setHover: React.Dispatch<React.SetStateAction<number>>;
  totalStars: number;
  setTotalStars: React.Dispatch<React.SetStateAction<number>>;
}

const ProductWriteReviewController: React.FC<_Props> = (_Props) => {
  const { cases, productId, reviewId } = _Props;
  const [files, setFiles] = useState<Array<{ file: File; preview: string }>>(
    [],
  );
  const [hover, setHover] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);
  const [productReview, setProductReview] = useState<IProductReviewsByUserId>();
  const [reviewedImage, setReviewImage] =
    useState<Array<IProductReviewsImage>>();
  const [showRatingValidation, setRatingValidation] = useState<boolean>(false);
  const [uploadInput, setUploadInput] = useState<boolean>(true);
  const [status, setStatus] = useState<'loading' | 'empty' | 'ready'>('ready');
  const [totalStars, setTotalStars] = useState<number>(5);
  const dispatch = useAppDispatch();
  const [focusSet, setFocusSet] = useState(false);
  const router = useRouter();
  const user = getUserDetails();
  const userId = getUserId();
  const userFirstName = user?.firstName;
  const userLastName = user?.lastName;
  const storeId = storeDetails.storeId;
  const reviewStatus = [
    'Not satisfied',
    'Not satisfied',
    '',
    'I LOVE IT',
    'I LOVE IT',
  ];

  const schema = yup.object({
    commentHeading: yup
      .string()
      .trim()
      .min(3, 'Heading must be 3 characters at minimum')
      .max(60, 'Heading cannot be exceed more than 60 character maximum')
      .required('Heading is required'),
    description: yup
      .string()
      .trim()
      .min(3, 'Description must be 3 characters at minimum')
      .max(200, 'Description cannot be exceed more than 200 character maximum')
      .required('Description is required'),
  });

  const hookForm = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      commentHeading: '',
      description: '',
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setFocus,
  } = hookForm;

  const handleRating = (event: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(event.target.value));
    setRatingValidation(false);
  };

  const handleClear = () => {
    setRating(0);
    reset({
      commentHeading: '',
      description: '',
    });
    setFiles([]);
    setReviewImage([]);
    setUploadInput(true);
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const inputFiles: FileList | null = e.target.files;
    const isValidImage = (file: File): boolean => {
      const imageFormats = ['png', 'webp', 'jpeg', 'jpg'];
      const extension = file.name.split('.').pop()?.toLowerCase();
      return extension ? imageFormats.includes(extension) : false;
    };

    const isValidVideo = (file: File): boolean => {
      const videoFormats = ['mp4'];
      const extension = file.name.split('.').pop()?.toLowerCase();
      return extension ? videoFormats.includes(extension) : false;
    };

    const files = [];
    if (inputFiles) {
      for (let i = 0; i < inputFiles.length; i++) {
        const file = inputFiles[i];
        if (isValidImage(file) || isValidVideo(file)) {
          const src = URL.createObjectURL(file);
          files.push({ file, preview: src });
        } else {
          dispatch(
            openAlertModal({
              title: 'Error',
              description: `Invalid file format: ${file.name}`,
              isAlertModalOpen: true,
            }),
          );
        }
      }
    }
    setFiles(files);
    setUploadInput(false);
  };

  const handleFileChange = async (images: Array<any> | null) => {
    try {
      if (images) {
        const file: any = images || [];
        const imageFolderPath = imageFolder?.folderPath;
        const uploadedPath = await uploadMedia(imageFolderPath, file);
        return uploadedPath;
      }
    } catch (error: any) {
      console.log(error?.message || 'something missing for uploading img');
    }
    return 'Something went wrong';
  };

  const getProductReviewByuserId = async () => {
    try {
      const payload = {
        storeId: storeId,
        customerId: userId,
        reviewId: reviewId,
      };
      const data: IProductReviewsByUserId | undefined =
        await fetchProductReviewsByUserId(payload);
      data && setProductReview(data);
    } catch (error: any) {
      console.log(error?.message || 'Id missing for get product review');
    }
  };

  const handleReviewImage = (index: number) => {
    setReviewImage(reviewedImage?.filter((file, ind) => ind !== index));
    if (reviewedImage?.length === 1) {
      setUploadInput(true);
    }
  };

  const handleUploadImage = (index: number) => {
    setFiles(files.filter((file, ind) => ind !== index));
    if (files.length === 1) {
      setUploadInput(true);
    }
  };

  const checkRating = () => {
    if (rating === 0) {
      setRatingValidation(true);
      dispatch(showLoader(false));
      return dispatch(
        openAlertModal({
          title: '',
          description: 'Rating is required',
          isAlertModalOpen: true,
        }),
      );
    }
  };

  const onSubmit = async (values: any) => {
    dispatch(showLoader(true));
    const { storeId } = StoreDetails;
    const location = await getLocation();
    const imageUrl = [];

    if (!!reviewedImage) {
      for (let img of reviewedImage) {
        imageUrl.push(img.imageName);
      }
    }

    if (!!files) {
      for (let file of files) {
        dispatch(showLoader(true));
        const uploadedPath = await handleFileChange([file]);
        imageUrl.push(uploadedPath);
      }
    }

    const imagesA: IProductReviewMedia[] = imageUrl.map((url, index) => {
      let isVideoType: boolean = false;

      if (url.endsWith('.mp4')) {
        isVideoType = true;
      }

      return {
        id: index || 0,
        rowVersion: '',
        location: `${location.city}, ${location.region}, ${location.country}, ${location.postal_code}`,
        ipAddress: location.ip_address,
        macAddress: '00-00-00-00-00-00',
        reviewId: reviewId || 0,
        imageName: url,
        displayOrder: 0,
        recStatus: 'A',
        isVideoType: isVideoType,
      };
    });
    let payload: IAddReviewPayload = {
      reviewModel: {
        id: reviewId || 0,
        rowVersion: '',
        location: `${location.city}, ${location.country}, ${location.postal_code}`,
        ipAddress: location.ip_address,
        macAddress: '00-00-00-00-00-00',
        productId: productId,
        customerId: userId,
        storeId: storeId,
        commentHeading: values.commentHeading,
        comment: values.description,
        rating: rating,
        helpFullCount: 0,
        notHelpFullCount: 0,
        recStatus: 'A',
        images: imagesA,
      },
    };

    if (rating !== 0) {
      if (!!reviewId) {
        try {
          await postProductUpdateReview(payload);
          dispatch(showLoader(false));
          return router.back();
        } catch (error: any) {
          console.log(
            error?.message || 'something missing in update review payload',
          );
        }
      } else {
        try {
          await postProductReview(payload);
          dispatch(showLoader(false));
          return router.back();
        } catch (error: any) {
          console.log(
            error?.message || 'something missing in create review payload',
          );
        }
      }
    } else {
      checkRating();
    }
  };

  useEffect(() => {
    getProductReviewByuserId();
  }, []);

  useEffect(() => {
    if (!!productReview?.commentHeading) {
      setRating(productReview?.rating);
      setReviewImage(productReview?.images);
      reset({
        commentHeading: productReview ? productReview?.commentHeading : '',
        description: productReview ? productReview?.comment : '',
      });
      if (!productReview?.images.length) {
        setUploadInput(true);
      } else {
        setReviewImage(productReview?.images);
      }
    }
  }, [productReview]);

  if (status === 'ready') {
    return cases.ready({
      checkRating,
      handleUploadImage,
      handleReviewImage,
      setUploadInput,
      uploadInput,
      reviewedImage,
      setReviewImage,
      handleChangeImage,
      files,
      userFirstName,
      userLastName,
      handleRating,
      showRatingValidation,
      reviewStatus,
      onSubmit,
      hookForm: { register, errors, handleSubmit },
      handleClear,
      rating,
      hover,
      setHover,
      totalStars,
      setTotalStars,
    });
  }
  return 'null';
};

export default ProductWriteReviewController;
