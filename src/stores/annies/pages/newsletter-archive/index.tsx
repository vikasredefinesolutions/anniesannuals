'use client';
import NewsletterArchiveController, {
  _Newsletters,
} from '@/features/newsletterArchive/controller';
import CustomLink from '@/shared/Components/CustomLink';
import Image from '@/shared/Components/Image';
import { paths } from '@/utils/paths.constant';
import { Fragment } from 'react';

const NewsletterArchive = () => {
  return (
    <NewsletterArchiveController
      configs={null}
      cases={{
        empty: () => <h2>Empty</h2>,
        loading: () => <h2>Loading</h2>,
        ready: ({ newsletters }) => {
          return (
            <>
              <section className='bg-tertiary'>
                <div className='container-fluid md:container mx-auto'>
                  <div className='relative w-full pt-[100px] overflow-hidden'>
                    <div className='text-center absolute inset-0'>
                      <Image
                        isStatic
                        src='/assets/images/newsletter-banner.jpg'
                        alt='newsletter'
                        className='block w-full object-cover min-h-[235px]'
                      />
                    </div>
                    <div className='px-[30px] lg:px-[60px] py-[15px] lg:py-[30px] max-w-[1100px] bg-tertiary xl:mx-auto rounded-tl-lg rounded-tr-lg pt-[50px] mx-[20px] relative z-10'>
                      <div className='text-center relative'>
                        <div className='text-2xl-text mb-[15px] font-sub font-bold relative inline-block'>
                          <h1>Newsletters</h1>
                          <div className='absolute top-[-40px] left-[100%] w-[70px] h-[70px] z-20 lg:block hidden'>
                            <Image
                              src='/annies/1/store/5/images/butterfly-2.png'
                              className='w-[50%] lg:w-auto ml-auto'
                              width={undefined}
                              alt=''
                            />
                          </div>
                        </div>
                      </div>
                      <div className=''>
                        <div className='font-sub text-center text-default-text font-semibold !leading-6'>
                          A newsletter is a printed or electronic report
                          containing news concerning the activities of a
                          business or an organization that is sent to its
                          members, customers, employees or other subscribers.
                          Newsletters generally contain one main topic of
                          interest to its recipients. A newsletter may be
                          considered grey literature.
                        </div>
                        <div className='text-[#9F2D3C] uppercase text-[16px] font-semibold text-center underline block md:hidden'>
                          More
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className='bg-tertiary'>
                <div className='container-fluid md:container mx-auto'>
                  <div className='container mx-auto relative'>
                    <div className='py-[20px]'>
                      <div>
                        <ul className='flex flex-wrap items-center gap-[10px] text-[14px] font-semibold font-sub'>
                          <li>
                            <CustomLink
                              href={paths.home}
                              className='text-anchor'
                            >
                              <Image
                                src='/assets/images/homeIcon.svg'
                                alt='home'
                                isStatic={true}
                              />
                            </CustomLink>
                          </li>
                          <li>/</li>
                          <li>Newsletters</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-wrap mx-[-15px] bg-tertiary'>
                    <div className='w-full px-[15px]'>
                      <div className='flex flex-wrap mx-[-15px]'>
                        {newsletters?.map((news: _Newsletters) => {
                          return (
                            <Fragment key={news.id}>
                              <div className='w-full sm:w-6/12 pb-[30px] px-[30px]'>
                                <div className='relative'>
                                  <div className='overflow-hidden rounded-tl-lg rounded-br-lg group'>
                                    <CustomLink
                                      href={news?.pageUrl}
                                      addDotHtmlAndSlash
                                    >
                                      <Image
                                        src={news?.imagePath}
                                        className='group-hover:scale-125 transition-all object-cover duration-700 w-auto h-auto max-w-[630px] max-h-[345px]'
                                        alt={news.title}
                                      />
                                    </CustomLink>
                                  </div>
                                  <div className='relative py-[15px] sm:bg-opacity-80 bg-opacity-100 group-hover:bg-opacity-100 inset-x-0 bottom-0 transition-all duration-700 overflow-hidden'>
                                    <div className='h-full w-full'>
                                      <div className='mb-[10px]'>
                                        <CustomLink
                                          href={news?.pageUrl}
                                          addDotHtmlAndSlash
                                          className='text-large-text font-bold font-sub w-full truncate overflow-hidden break-words'
                                        >
                                          {news?.title}
                                        </CustomLink>
                                      </div>
                                      <div className='w-full'>
                                        <p className='text-normal-text !font-[600] mb-[10px]'>
                                          {news?.subTitle}
                                        </p>
                                        {
                                          <p
                                            className='text-normal-text'
                                            dangerouslySetInnerHTML={{
                                              __html: news?.description,
                                            }}
                                          ></p>
                                        }
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Fragment>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          );
        },
      }}
    />
  );
};

export default NewsletterArchive;
