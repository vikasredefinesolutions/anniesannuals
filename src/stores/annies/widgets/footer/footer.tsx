'use client';

import { useEffect, useRef } from 'react';

const FooterComponent = ({ footerHtml }: { footerHtml: string }) => {
  const footerRef = useRef(null);
  const initialized = useRef(false);

  const onLoadFooter = () => {
    if (footerRef.current) {
      const footer = footerRef.current as HTMLElement;
      const ftMenus = footer.querySelectorAll('.ft-menu');
      ftMenus.forEach((menu) => {
        menu.addEventListener('click', () => {
          menu.children[1].classList.toggle('hidden');
        });
      });
    }
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      onLoadFooter();
    }
  }, []);

  return (
    <footer ref={footerRef}>
      {footerHtml && (
        <div dangerouslySetInnerHTML={{ __html: footerHtml }}></div>
      )}
    </footer>
  );
};

export default FooterComponent;
