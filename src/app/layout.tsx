import '@/app/globals.css';
// import '@/assets/styles/main.css';
import { Inter } from 'next/font/google';
import Script from 'next/script';

//
import React from 'react';
import { Providers } from './redux/Provider';

//
import {
  getStaticHeaderSubMenu,
  getStaticStoreDetails,
} from '@/helper/staticfile.helper';
import ModalWrapper from '@/shared/Components/ModalWrapper';
import { ICmsStoreThemeConfig } from '@/shared/types/cmsThemeConfig';
import { getStoreId } from '@/shared/utils/cookie.helper';
import Footer from '@/stores/annies/widgets/footer';
import Header from '@/stores/annies/widgets/header';
import { Metadata } from 'next';
//

const inter = Inter({ subsets: ['latin'] });

const GTM_CODE = 'GTM-5G8GCWZ';

export const metadata: Metadata = {
  title: 'Annies Annuals',
  description: 'Annies Annuals',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeId = getStoreId();
  const mediaBaseUrl =
    process.env.NEXT_PUBLIC_MEDIA_URL ||
    process.env.NEXT_PUBLIC_EXTRA_MEDIA_URL_DETAIL_MAIN ||
    process.env.NEXT_PUBLIC_REDEFINE_MEDIA ||
    '';
  let storeDetails = await getStaticStoreDetails();
  let headerSubMenu = await getStaticHeaderSubMenu();

  const headerConfig = JSON.parse(
    storeDetails?.cmsStoreThemeConfigsViewModel?.find(
      (item: ICmsStoreThemeConfig) => item.config_name === 'header_config',
    )?.config_value || '',
  );

  const ORGANIZATION_SCRIPT_DATA = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    image: `${mediaBaseUrl}/annies/1/store/5/images/garden-education-2_638375408983920411.png`,
    url: 'https://www.anniesannuals.com/',
    sameAs: [
      'https://www.facebook.com/anniesannuals/',
      'https://twitter.com/AnniesAnnuals',
      'https://www.instagram.com/anniesannuals',
      'https://www.pinterest.com/anniesannuals/',
      'https://www.anniesannuals.com/',
    ],
    logo: `${mediaBaseUrl}/annies/1/store/logo_5.png`,
    name: 'Annies Annuals & Perennials',
    description:
      'Specializing in rare and unusual annual and perennial plants, including cottage garden heirlooms and hard to find California native wildflowers.',
    email: 'contact@anniesannuals.com',
    telephone: '+1-510-215-3301',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '740 Market Ave',
      addressLocality: 'Richmond',
      addressRegion: 'California',
      postalCode: '94801',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-510-215-3301',
      email: 'contact@anniesannuals.com',
    },
  };

  return (
    <html lang='en'>
      <head>
        {/*<------------- GTM START (Don't Touch) ------------->*/}
        <Script
          id='google-tag-manager'
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','${GTM_CODE}');`,
          }}
          strategy='lazyOnload'
        ></Script>
        {/*<------------- GTM END ------------->*/}
        {/* <link
          href='https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Round|Material+Icons+Sharp|Material+Icons+Two+Tone|Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200'
          rel='stylesheet'
          type='text/css'
          charSet='UTF-8'
        /> */}
        <link
          href={`/assets/styles/skeleton.css`}
          rel='stylesheet'
          as='style'
          type='text/css'
        />

        <link
          href={`${process.env.NEXT_PUBLIC_REDEFINE_MEDIA}/annies/1/store/${storeId}/css/${storeId}.css`}
          rel='preload stylesheet'
          as='style'
          type='text/css'
        />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Round|Material+Icons+Sharp|Material+Icons+Two+Tone'
        />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200,24,400,0,0'
        />
        <link
          href={`/assets/styles/main.css`}
          rel='stylesheet'
          as='style'
          type='text/css'
        />
        <link
          href={`${process.env.NEXT_PUBLIC_REDEFINE_MEDIA}/annies/1/store/tailwin-css.css`}
          rel='preload stylesheet'
          as='style'
          type='text/css'
        />
        <link
          href={`${
            process.env.NEXT_PUBLIC_REDEFINE_MEDIA
          }/annies/1/store/${storeId}/css/custom.css?${Math.random()}`}
          rel='preload stylesheet'
          as='style'
          type='text/css'
        />
        {/* Script for Klevu
         <Script src='https://js.klevu.com/core/v2/klevu.js' />
        <Script src='https://js.klevu.com/theme/default/v2/quick-search.js' />
        <Script src='https://js.klevu.com/theme/default/v2/search-results-page.js' />
        <Script src={`/assets/annies-klevu.js?${Math.random()}`} />
         */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              'document.addEventListener("DOMContentLoaded", () => {const iconArr={keyboard_arrow_up:"keyboard_arrow_down",keyboard_arrow_down:"keyboard_arrow_up",remove_circle_outline:"add_circle_outline",add_circle_outline:"remove_circle_outline",add:"remove",remove:"add"},acc=document.querySelectorAll(".accordion-box");console.log(acc),acc.forEach((e,r)=>{e.querySelectorAll("li").forEach((e,r)=>{e.addEventListener("click",()=>{let r=e.querySelector(".pointer-class");if(r){r.innerHTML=iconArr[r.innerHTML];let o=e.querySelector(".ac-description");o&&(o.classList.contains("hidden")?o.classList.remove("hidden"):o.classList.add("hidden"))}})})}); const carousel=document.querySelectorAll(".carousel");carousel.forEach(t=>{let e=t.querySelector(".carousel-slider"),s=t.querySelector(".prev"),r=t.querySelector(".next"),l=t.querySelector(".carousel-status"),i=t.querySelector(".carousel-dots");if(e){let a=e.querySelectorAll(".carousel-slide"),n=t.clientWidth||1920,o=0,c=Object.keys(a).length,d,u=()=>{if(i){let t=i.querySelectorAll("li");t.forEach((t,e)=>{o===e?t.setAttribute("class","active"):t.removeAttribute("class")})}};if(i)for(let f=0;f<c;f++){let y=document.createElement("li");o===f&&y.setAttribute("class","active"),i.append(y),y.addEventListener("click",()=>{d=o,o=f,e.setAttribute("style",`transform: translateX(-${n}px)`),e.insertBefore(a[o],e.firstChild),setTimeout(()=>{l&&(l.innerHTML=`${o+1} of ${c}`),u(),e.setAttribute("style",`transform: translateX(-${n}px)`),e.style.transform="",e.classList.add("sliding-transition")},150),setTimeout(()=>{e.classList.remove("sliding-transition")},490)})}l&&(l.innerHTML=`${o+1} of ${c}`),s&&r&&(s.addEventListener("click",()=>{d=o,o=(o-1+c)%c,e.setAttribute("style",`transform: translateX(-${n}px)`),e.insertBefore(a[o],e.firstChild),setTimeout(()=>{l&&(l.innerHTML=`${o+1} of ${c}`),u(),e.setAttribute("style",`transform: translateX(-${n}px)`),e.style.transform="",e.classList.add("sliding-transition")},150),setTimeout(()=>{e.classList.remove("sliding-transition")},490)}),r.addEventListener("click",()=>{e.classList.add("sliding-transition"),d=o,o=(o+1)%c,e.style.transform=`translateX(-${n}px)`,l&&(l.innerHTML=`${o+1} of ${c}`),u(),setTimeout(()=>{e.appendChild(a[d]),e.classList.remove("sliding-transition"),e.style.transform=""},500)}))}});});',
          }}
        />
        <Script
          async={true}
          src={`${process.env.NEXT_KLAVIYO_URL}?company_id=${process.env.NEXT_KLAVIYO_PUBLIC_KEY}`}
        ></Script>
        {/* ORGANIZATION_SCRIPT_DATA */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ORGANIZATION_SCRIPT_DATA),
          }}
        ></script>
        {/* Facebook Pixel Code */}
        <Script
          id='facebook-pixel'
          dangerouslySetInnerHTML={{
            __html: `
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
              n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
              document,'script','//connect.facebook.net/en_US/fbevents.js');
              fbq('init', ${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID});
              fbq('track', 'PageView');
              `,
          }}
        />
        {/* End Facebook Pixel Code */}
      </head>

      <body className={inter.className}>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<img height='1' width='1' style={{ display: 'none' }} src={https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1} />`,
          }}
        />
        <Providers>
          <Header
            cmsStoreThemeConfigsViewModel={
              storeDetails?.cmsStoreThemeConfigsViewModel
            }
            cmsMenuConfigViewModel={storeDetails?.cmsMenuConfigViewModel}
            headerConfig={headerConfig}
            headerSubMenu={headerSubMenu}
          />
          <div style={{ minHeight: '450px' }}>{children}</div>
          <Footer />
          <ModalWrapper />
        </Providers>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_CODE}`}
            height='0'
            width='0'
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
      </body>
    </html>
  );
}
