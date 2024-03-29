import Link from 'next/link';
import React from 'react';

interface IProps {
  href: string | undefined;

  className?: string;
  children: React.ReactNode;
  target?: '_blank' | '_self';
  title?: string;
  prefetch?: boolean;
  onClick?: () => void;
  style?: any;
  addDotHtmlAndSlash?: boolean;
  itemProp?: string;
}
const CustomLink: React.FC<IProps> = ({
  href = undefined,
  className,
  children,
  target = '_self',
  title = '',
  addDotHtmlAndSlash = false,
  prefetch = false,
  onClick,
  style,
  itemProp,
}) => {
  if (!href) {
    return (
      <div className={className} title={title} onClick={onClick} style={style}>
        {children}
      </div>
    );
  }

  const modifiedHref = addDotHtmlAndSlash ? '/' + href + '.html' : href;

  return (
    <Link
      itemProp={itemProp}
      prefetch={prefetch}
      href={modifiedHref}
      className={className}
      target={target}
      title={title}
      onClick={onClick}
      style={style}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
