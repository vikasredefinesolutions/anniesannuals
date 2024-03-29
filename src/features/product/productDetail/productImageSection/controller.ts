import { useRouter } from 'next/navigation';
import React, { ReactElement, useEffect, useState } from 'react';

interface _ImageHelpers {
  selectedImage: { imageUrl: string; alt: string; id: number,   videoUrl: string; };
  handleImageChange: (
    imgUrl: string,
    alt: string,
    id: number,
    videoUrl: string,
  ) => void;
  altImages: {
    displayOrder: number;
    imageUrl: string;
    altTag: string;
    videoUrl: string;
  }[];
}

interface _Props {
  configs: any;
  altImages: {
    displayOrder: number;
    imageUrl: string;
    altTag: string;
    videoUrl: string;
  }[];
  cases: {
    view: (helpers: _ImageHelpers) => ReactElement<any, any>;
  };
}

const ProductImageController: React.FC<_Props> = ({ cases, altImages }) => {
  const router = useRouter();

  useEffect(() => {
    if (altImages?.length)
      setSelectedImage({
        imageUrl: altImages[0].imageUrl,
        alt: altImages[0].altTag,
        id: 0,
        videoUrl: altImages[0].videoUrl,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [altImages]);

  const [selectedImage, setSelectedImage] = useState<{
    imageUrl: string;
    alt: string;
    id: number;
    videoUrl: string;
  }>({ imageUrl: '', alt: '', id: 0, videoUrl: '' });

  const handleImageChange = (
    imgUrl: string,
    alt: string,
    id: number,
    videoUrl: string,
  ) => {
    setSelectedImage({ imageUrl: imgUrl, alt, id, videoUrl });
  };

  return cases.view({ selectedImage, handleImageChange, altImages });
};

export default ProductImageController;
