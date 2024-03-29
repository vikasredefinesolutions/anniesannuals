import React from 'react';
import Image from './Image';

const Loader = () => {
  return (
    <div className='loader-wrapper'>
      <div className='loader'>
        <Image src={'/assets/images/borboletas-butterflies.gif' }  alt={''} isStatic={true}/>
      </div>
    </div>
  );
};

export default Loader;
