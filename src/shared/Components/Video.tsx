import NextImage from 'next/image';
import React from 'react';

const mediaBaseUrl =
  process.env.NEXT_PUBLIC_MEDIA_URL ||
  process.env.NEXT_PUBLIC_EXTRA_MEDIA_URL_DETAIL_MAIN ||
  process.env.NEXT_PUBLIC_REDEFINE_MEDIA ||
  '';

export enum MEDIA_URL_TYPE {
  DETAIL_MAIN = 'detail-main',
  DETAIL_THUMBNAIL = 'detail-thumbnail',
  LISTING_MAIN = 'listing-main',
  LISTING_THUMBNAIL = 'listing-thumbnail',
}

export type MediaUrlType = `${MEDIA_URL_TYPE}`;

const mediaUrlList: Record<MediaUrlType, string> = {
  'detail-main': process.env.NEXT_PUBLIC_EXTRA_MEDIA_URL_DETAIL_MAIN || '',
  'detail-thumbnail':
    process.env.NEXT_PUBLIC_EXTRA_MEDIA_URL_DETAIL_THUMBNAIL || '',
  'listing-main': process.env.NEXT_PUBLIC_EXTRA_MEDIA_URL_LISTING_MAIN || '',
  'listing-thumbnail':
    process.env.NEXT_PUBLIC_EXTRA_MEDIA_URL_LISTING_THUMBNAIL || '',
};

interface IProps {
  isStatic?: boolean;
  src: string;
  className?: string;
  height?: number;
  width?: number;
  alt: string;
  title?: string;
  mediaType?: MediaUrlType;
  allow:string
}
const Video: React.FC<IProps> = ({
  isStatic = false,
  src,
  className,
  alt,
  height,
  width,
  title,
  mediaType,
  allow
}) => {

  if (isStatic) {
    return (
      <iframe
      src={`${src}`}
      title={title}
      className={className}
      allow={allow}
      allowFullScreen
      // loading='lazy'
      style={{ pointerEvents: "none"}}
    />

    );
  }

  if (!mediaType)
    return (
      <iframe
        src={`${mediaBaseUrl}${src}`}
        title={title}
        className={className}
        allow={allow}
        allowFullScreen
        loading='lazy'
      />
    );
};

export default Video;
