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
  isCdnUrlAdded?: boolean;
}
const Image: React.FC<IProps> = ({
  isStatic = false,
  src,
  className,
  alt,
  height,
  width,
  title,
  mediaType,
  isCdnUrlAdded = false,
}) => {
  if (isStatic) {
    return (
      <img
        src={src}
        alt={alt}
        height={height}
        width={width}
        title={title}
        className={className}
      />
    );
  }
  const updatedMediaUrl = isCdnUrlAdded
    ? process.env.NEXT_PUBLIC_CDN_IMAGE != undefined &&
      process.env.NEXT_PUBLIC_CDN_IMAGE != ''
      ? process.env.NEXT_PUBLIC_CDN_IMAGE + mediaBaseUrl
      : mediaBaseUrl
    : mediaBaseUrl;
  if (!mediaType)
    return (
      <img
        src={`${updatedMediaUrl}${src}`}
        alt={alt}
        title={title}
        height={height}
        width={width}
        className={className}
      />
    );
  const mediaUrl = mediaUrlList[mediaType];
  const heightRegex = /height=(\d+)/;
  const widthRegex = /width=(\d+)/;
  const heightDetail = heightRegex.exec(mediaUrl) || [];
  const widthDetail = widthRegex.exec(mediaUrl) || [];
  const imageHeight = height || parseInt(heightDetail[1] || '348', 10);
  const imageWidth = width || parseInt(widthDetail[1] || '254', 10);

  return (
    <NextImage
      width={imageWidth}
      height={imageHeight}
      src={`${mediaUrl}${mediaBaseUrl}${src}`}
      alt={alt}
      title={title}
      className={className}
    />
  );
};

export default Image;
