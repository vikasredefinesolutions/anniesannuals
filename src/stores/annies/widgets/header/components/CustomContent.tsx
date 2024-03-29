import React from 'react';

interface iProps {
  category: {
    title: string;
    backgroudClass: string;
    seName: string;
  };
  subMenuString: string;
  onRequestClose: () => void;
}

const CustomContent: React.FC<iProps> = ({ subMenuString }) => {
  return <div dangerouslySetInnerHTML={{ __html: subMenuString }}></div>;
};

export default CustomContent;
