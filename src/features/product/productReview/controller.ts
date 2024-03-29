'use client';
import { uploadMedia } from '@/shared/apis/common/common';
import { postProductReview } from '@/shared/apis/product/product';
import { getUserId } from '@/shared/utils/cookie.helper';
import { getLocation } from '@/shared/utils/helper';
import StoreDetails from '@/staticData/storeDetails.json';
import { FormikProps, useFormik } from 'formik';
import { uniqueId } from 'lodash';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, ReactElement, useState } from 'react';
import * as Yup from 'yup';
import { openAlertModal } from '@/app/redux/slices/modalSlice';

interface IFormikField {
  commentTitle: string;
  comment: string;
}

type _Files = Array<{ file: File; preview: string }>;

interface IWriteReviewHelpers {
  config: {
    showReviewForm?: boolean;
  };
  starRate: number;
  setStarRate: (rate: number) => void;
  getRatingText: () => string;
  fileChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  files: _Files;
  setFiles: (files: _Files) => void;
  reviewForm: FormikProps<IFormikField>;
}
interface IProps {
  config: {
    showReviewForm?: boolean;
  };
  productId: number;
  cases: {
    view: (helpers: IWriteReviewHelpers) => ReactElement<any, any>;
  };
}
const WriteReviewController: React.FC<IProps> = ({
  cases,
  config,
  productId,
}) => {
  const [starRate, setStarRate] = useState(5);
  const router = useRouter();
  const dispatch = useDispatch();

  const [files, setFiles] = useState<Array<{ file: File; preview: string }>>(
    [],
  );

  const validationSchema = Yup.object().shape({
    comment: Yup.string()
      .trim()
      .min(3, 'Comment must be 3 characters at minimum')
      .max(200, 'Comment cannot be exceed more than 200 character maximum')
      .required('Comment is required'),
    commentTitle: Yup.string()
      .trim()
      .min(3, 'Heading must be 3 characters at minimum')
      .max(60, 'Heading cannot be exceed more than 60 character maximum')
      .required('Heading is required'),
  });

  const reviewForm: FormikProps<IFormikField> = useFormik({
    initialValues: {
      commentTitle: '',
      comment: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => submitHandler(values),
  });

  const getRatingText = () => {
    switch (starRate) {
      case 1:
        return 'I HATE IT';
      case 2:
        return `I DON'T LIKE IT`;
      case 3:
        return `IT'S OK`;
      case 4:
        return 'I LIKE IT';
      case 5:
        return 'I LOVE IT';
      default:
        return '';
    }
  };

  const fileChangeHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    const inputFiles: FileList | null = event.target.files;
    const files = [];
    if (inputFiles) {
      for (let i = 0; i < inputFiles.length; i++) {
        if (!inputFiles[i].type.includes('image')) continue;
        const file = inputFiles[i];
        const src = URL.createObjectURL(file);
        files.push({ file, preview: src });
      }
      setFiles(files);
    }
  };

  const submitHandler = async (values: IFormikField) => {
    try {
      const { storeId } = StoreDetails;
      const userId = getUserId();
      let images = [];
      if (files) {
        images = await Promise.all(
          files.map(async (item) => {
            const file = item.file;
            const folderPath = `temp/1/Store/${storeId}/writereview/${uniqueId(
              'review',
            )}`;
            return await uploadMedia(folderPath, file);
          }),
        );
      }

      const data = getLocation();
      const imagesA = images.map((url) => ({
        id: 0,
        rowVersion: '',
        location: `${data.city}, ${data.region}, ${data.country}, ${data.postal_code}`,
        ipAddress: data.ip_address,
        macAddress: '00-00-00-00-00-00',
        reviewId: 0,
        imageName: `${url}`,
        displayOrder: 0,
        recStatus: 'A',
      }));

      const payload: any = {
        reviewModel: {
          id: 0,
          rowVersion: '',
          location: `${data.city}, ${data.country}, ${data.postal_code}`,
          ipAddress: data.ip_address,
          macAddress: '00-00-00-00-00-00',
          productId: productId || 0,
          customerId: userId,
          storeId: storeId,
          commentHeading: values.commentTitle,
          comment: values.comment,
          rating: starRate,
          helpFullCount: 0,
          notHelpFullCount: 0,
          recStatus: 'A',
          images: imagesA,
        },
      };

      await postProductReview(payload);
      return dispatch(
        openAlertModal({
          title: 'Success',
          description: 'Review added successfully',
          isAlertModalOpen: true,
        }),
      );
      return router.back();
    } catch (error: any) {
      const errorMsg = Object.keys(error).length
        ? error[Object.keys(error)[0]]
        : 'Something went wrong';
      return dispatch(
        openAlertModal({
          title: 'Error',
          description: errorMsg,
          isAlertModalOpen: true,
        }),
      );
    }
  };

  return cases.view({
    config,
    starRate,
    setStarRate,
    getRatingText,
    reviewForm,
    fileChangeHandler,
    setFiles,
    files,
  });
};

// export default WriteReviewController;
