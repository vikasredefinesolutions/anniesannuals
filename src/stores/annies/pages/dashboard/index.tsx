'use client';

import CustomLink from '@/shared/Components/CustomLink';
import { getUserId } from '@/shared/utils/cookie.helper';
import { paths } from '@/utils/paths.constant';
import { useRouter } from 'next/navigation';
import SideLayout from '../../shared/components/myAccountLayout';

const Dasboard: React.FC = () => {
  const userId = getUserId();
  const router = useRouter();

  if (!userId) {
    router.push('sign-in.html');
    return;
  }
  return (
    <SideLayout>
      <div>
        <h1 className='text-2xl-text mb-[20px] font-bold font-sub'>
          Dashboard
        </h1>
        <div className='mb-[40px] border-t border-t-gray-border'></div>
        <div className='flex flex-wrap mx-[-15px] lg:mb-[30px] mb-0'>
          <div className='w-full xl:w-4/12 lg:w-6/12 md:w-6/12 px-[15px] mb-[30px]'>
            <div className='h-full bg-[#ffffff] p-[20px] lg:p-[30px] drop-shadow-md rounded-sm'>
              <div className='flex gap-x-[20px]'>
                <div>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='45'
                    height='50.284'
                    viewBox='0 0 45 50.284'
                  >
                    <path
                      id='Union_11'
                      data-name='Union 11'
                      d='M-2047.84,50.239c-.024-.007-.045-.021-.072-.03a1.293,1.293,0,0,1-.25-.1l-21.176-12.252A1.322,1.322,0,0,1-2070,36.71V13.227a1.342,1.342,0,0,1,.059-.347c.011-.038.031-.069.044-.106a1.265,1.265,0,0,1,.088-.211c.022-.037.054-.068.079-.1a1.27,1.27,0,0,1,.132-.169c.029-.029.066-.05.1-.076a1.167,1.167,0,0,1,.168-.132h.013L-2048.142.17a1.318,1.318,0,0,1,1.3,0l21.177,11.912h.013a1.2,1.2,0,0,1,.168.132,1.212,1.212,0,0,1,.1.076,1.275,1.275,0,0,1,.133.169c.025.036.056.067.078.1a1.355,1.355,0,0,1,.088.211c.013.037.033.068.044.106a1.294,1.294,0,0,1,.047.347V36.71a1.323,1.323,0,0,1-.662,1.145l-21.176,12.252a1.3,1.3,0,0,1-.25.1c-.026.008-.049.023-.071.03a1.33,1.33,0,0,1-.341.045A1.314,1.314,0,0,1-2047.84,50.239Zm-19.513-14.292,18.53,10.721V25.913l-18.53-10.423Zm21.177-10.034V46.667l18.53-10.721V15.49Zm-9.794-7.061,8.47,4.768,18.476-10.393-8.478-4.765Zm-10.006-5.625,7.3,4.1L-2040.2,6.936l-7.3-4.1Zm22.447,27.794V38.374h2.647V41.02Zm5.295-2.647V35.727h2.646v2.647Zm5.293-2.647V33.079h2.647v2.648Z'
                      transform='translate(2070 0)'
                      fill='#273721'
                    ></path>
                  </svg>
                </div>
                <div className='text-small-text'>
                  <div className='mb-[5px] font-bold font-sub text-medium-text'>
                    Orders &amp; Returns
                  </div>
                  <div className='text-small-text mb-[20px]'>
                    Check order status, make a return or write a review
                  </div>
                  <div>
                    <ul>
                      <li className='mb-[10px] last:mb-0'>
                        <CustomLink
                          href={paths.orders}
                          className='flex items-center gap-x-[10px] text-[#634B91] hover:text-primary'
                        >
                          <span className='material-icons-outlined'>
                            chevron_right{' '}
                          </span>
                          <span className='font-semibold'>
                            View your purchase history
                          </span>
                        </CustomLink>
                      </li>
                      <li className='mb-[10px] last:mb-0'>
                        <CustomLink
                          href={paths.orders}
                          className='flex items-center gap-x-[10px] text-[#634B91] hover:text-primary'
                        >
                          <span className='material-icons-outlined'>
                            chevron_right{' '}
                          </span>
                          <span className='font-semibold'>
                            Track your package
                          </span>
                        </CustomLink>
                      </li>
                      <li className='mb-[10px] last:mb-0'>
                        <CustomLink
                          href={paths.orders}
                          className='flex items-center gap-x-[10px] text-[#634B91] hover:text-primary'
                        >
                          <span className='material-icons-outlined'>
                            chevron_right{' '}
                          </span>
                          <span className='font-semibold'>
                            Return or replace items
                          </span>
                        </CustomLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full xl:w-4/12 lg:w-6/12 md:w-6/12 px-[15px] mb-[30px]'>
            <div className='h-full bg-[#ffffff] p-[20px] lg:p-[30px] drop-shadow-md rounded-sm'>
              <div className='flex gap-x-[20px]'>
                <div>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='45'
                    height='50.688'
                    viewBox='0 0 45 50.688'
                  >
                    <g
                      id='Group_6291'
                      data-name='Group 6291'
                      transform='translate(-8 -3)'
                    >
                      <path
                        id='Path_7'
                        data-name='Path 7'
                        d='M27.374,3A11.938,11.938,0,0,1,35.71,6.436a11.83,11.83,0,0,1,0,16.671,12.137,12.137,0,0,1-3.379,2.365,19.416,19.416,0,0,1,4.337,1.746,1.286,1.286,0,0,1-1.239,2.253,15.9,15.9,0,0,0-3.942-1.521,17.232,17.232,0,0,0-4.168-.507,16.923,16.923,0,0,0-16.84,16.783v2.309a1.573,1.573,0,0,0,.451,1.126,1.753,1.753,0,0,0,1.239.451H28.332a1.3,1.3,0,0,1,0,2.591H12.28A4.031,4.031,0,0,1,9.3,49.464,4.077,4.077,0,0,1,8,46.479V44.17a19.407,19.407,0,0,1,14.362-18.7,11.537,11.537,0,0,1-3.323-2.365,11.83,11.83,0,0,1,0-16.671A11.938,11.938,0,0,1,27.374,3Zm17.29,29.456.113.056a1.671,1.671,0,0,0,.9.113,1.915,1.915,0,0,0,.845-.394l.394-.282a1.228,1.228,0,0,1,1.69.113h0l1.746,1.8a1.258,1.258,0,0,1,0,1.8l-.225.282a1.915,1.915,0,0,0-.394.845,1.945,1.945,0,0,0,.113.957l.056.113a1.83,1.83,0,0,0,.563.732,2.151,2.151,0,0,0,.9.338l.507.056A1.243,1.243,0,0,1,53,40.284v2.534a1.34,1.34,0,0,1-1.239,1.3h-.338a2.488,2.488,0,0,0-.9.338,1.83,1.83,0,0,0-.563.732L49.9,45.3a1.662,1.662,0,0,0,.282,1.746l.282.394a1.228,1.228,0,0,1-.113,1.69h0l-1.746,1.8a1.258,1.258,0,0,1-1.8,0l-.282-.225a1.915,1.915,0,0,0-.845-.394,1.877,1.877,0,0,0-.957.113l-.113.169a1.83,1.83,0,0,0-.732.563,2.151,2.151,0,0,0-.338.9l-.056.507a1.243,1.243,0,0,1-1.3,1.126H39.652a1.34,1.34,0,0,1-1.3-1.239l-.056-.394a2.488,2.488,0,0,0-.338-.9,1.83,1.83,0,0,0-.732-.563l-.113-.056a1.671,1.671,0,0,0-.9-.113,2.107,2.107,0,0,0-.9.394l-.394.282a1.284,1.284,0,0,1-1.69-.056h0l-1.8-1.8a1.258,1.258,0,0,1,0-1.8l.225-.282a1.915,1.915,0,0,0,.394-.845,1.518,1.518,0,0,0-.169-.957l-.056-.113a1.942,1.942,0,0,0-.563-.732,2.151,2.151,0,0,0-.9-.338l-.507-.056a1.243,1.243,0,0,1-1.126-1.3V40.284a1.34,1.34,0,0,1,1.239-1.3l.394-.056a2.488,2.488,0,0,0,.9-.338,1.83,1.83,0,0,0,.563-.732l.056-.169a1.606,1.606,0,0,0,.113-.9,1.67,1.67,0,0,0-.394-.845l-.338-.394a1.368,1.368,0,0,1,.113-1.746h0l1.8-1.746a1.258,1.258,0,0,1,1.8,0l.282.225a1.851,1.851,0,0,0,.9.394,1.945,1.945,0,0,0,.957-.113l.113-.056a1.511,1.511,0,0,0,.732-.563,2.488,2.488,0,0,0,.338-.9l.056-.507a1.243,1.243,0,0,1,1.3-1.126h2.534a1.34,1.34,0,0,1,1.3,1.239l.056.394a2.488,2.488,0,0,0,.338.9,1.83,1.83,0,0,0,.732.563Zm-.957,2.422-.056-.056a3.915,3.915,0,0,1-1.859-1.408,4.759,4.759,0,0,1-.732-1.521h-.338a4.758,4.758,0,0,1-.732,1.521,3.915,3.915,0,0,1-1.859,1.408l-.056.056a4.6,4.6,0,0,1-2.309.282,4.087,4.087,0,0,1-1.577-.563l-.225.225a4.087,4.087,0,0,1,.563,1.577,4.252,4.252,0,0,1-.282,2.2l-.056.169a4.207,4.207,0,0,1-1.408,1.859,5.1,5.1,0,0,1-1.464.732v.282a3.979,3.979,0,0,1,1.464.732,3.915,3.915,0,0,1,1.408,1.859l.056.056a4.633,4.633,0,0,1,.338,2.309,4.087,4.087,0,0,1-.563,1.577l.225.225a4.087,4.087,0,0,1,1.577-.563,4.464,4.464,0,0,1,2.253.282l.113.056a4.546,4.546,0,0,1,1.859,1.408,4.759,4.759,0,0,1,.732,1.521h.338a4.758,4.758,0,0,1,.732-1.521,4.305,4.305,0,0,1,1.859-1.408l.056-.056a4.633,4.633,0,0,1,2.309-.338,4.087,4.087,0,0,1,1.577.563l.225-.225a4.087,4.087,0,0,1-.563-1.577,4.464,4.464,0,0,1,.282-2.253l.056-.113a4.546,4.546,0,0,1,1.408-1.859,4.759,4.759,0,0,1,1.521-.732V41.3a4.758,4.758,0,0,1-1.521-.732,4.207,4.207,0,0,1-1.408-1.859h0l-.056-.056a4.35,4.35,0,0,1,.282-3.886l-.225-.225a5.283,5.283,0,0,1-1.577.563,4.252,4.252,0,0,1-2.2-.282Zm-2.816,1.859a4.541,4.541,0,0,1,3.379,1.408h0a4.727,4.727,0,0,1,1.408,3.379A4.864,4.864,0,0,1,44.27,44.9l-.056.056a4.681,4.681,0,0,1-3.323,1.352A4.762,4.762,0,0,1,37.512,44.9a4.759,4.759,0,0,1,0-6.758h0a4.632,4.632,0,0,1,3.379-1.408Zm1.577,3.21a2.178,2.178,0,0,0-3.154,0h0a2.212,2.212,0,0,0-.62,1.577,2.31,2.31,0,0,0,2.253,2.253,2.4,2.4,0,0,0,1.521-.563l.056-.056a2.212,2.212,0,0,0,.62-1.577,2.291,2.291,0,0,0-.676-1.633ZM33.851,8.294a9.2,9.2,0,0,0-6.477-2.7,8.967,8.967,0,0,0-6.477,2.7,9.2,9.2,0,0,0-2.7,6.477,8.967,8.967,0,0,0,2.7,6.477,9.3,9.3,0,0,0,6.477,2.7,8.967,8.967,0,0,0,6.477-2.7,9.3,9.3,0,0,0,2.7-6.477,8.967,8.967,0,0,0-2.7-6.477Z'
                        fill='#273721'
                      ></path>
                    </g>
                  </svg>
                </div>
                <div className='text-small-text'>
                  <div className='mb-[5px] font-bold font-sub text-medium-text'>
                    Account Setting
                  </div>
                  <div className='text-small-text mb-[20px]'>
                    Change personal information &amp; update address book
                  </div>
                  <div>
                    <ul>
                      <li className='mb-[10px] last:mb-0'>
                        <CustomLink
                          href={paths.accountSetting}
                          className='flex items-center gap-x-[10px] text-[#634B91] hover:text-primary'
                        >
                          <span className='material-icons-outlined'>
                            chevron_right{' '}
                          </span>
                          <span className='font-semibold'>
                            Personal information
                          </span>
                        </CustomLink>
                      </li>
                      <li className='mb-[10px] last:mb-0'>
                        <CustomLink
                          href={paths.address}
                          className='flex items-center gap-x-[10px] text-[#634B91] hover:text-primary'
                        >
                          <span className='material-icons-outlined'>
                            chevron_right{' '}
                          </span>
                          <span className='font-semibold'>
                            Manage your address book
                          </span>
                        </CustomLink>
                      </li>
                      <li className='mb-[10px] last:mb-0'>
                        <CustomLink
                          href={paths.changesPassword}
                          className='flex items-center gap-x-[10px] text-[#634B91] hover:text-primary'
                        >
                          <span className='material-icons-outlined'>
                            chevron_right{' '}
                          </span>
                          <span className='font-semibold'>Change password</span>
                        </CustomLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className='w-full xl:w-4/12 lg:w-6/12 md:w-6/12 px-[15px] mb-[30px]'></div> */}
          {/* <div className='w-full xl:w-4/12 lg:w-6/12 md:w-6/12 px-[15px] mb-[30px]'>
            <div className='h-full bg-[#ffffff] p-[20px] lg:p-[30px] drop-shadow-md rounded-sm'>
              <div className='flex gap-x-[20px]'>
                <div>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='45'
                    height='40.9'
                    viewBox='0 0 45 40.9'
                  >
                    <g
                      id='Group_33'
                      data-name='Group 33'
                      transform='translate(-9.42 -30.72)'
                    >
                      <path
                        id='Union_9'
                        data-name='Union 9'
                        d='M-3477.069-271.826h11.974v-5.256h-12.862a12.587,12.587,0,0,1,.9,4.69C-3477.056-272.2-3477.061-272.013-3477.069-271.826Zm-18.593,1.525a1.074,1.074,0,0,1,0-1.518,1.074,1.074,0,0,1,1.518,0l2.264,2.264,6.569-7.951a1.073,1.073,0,0,1,1.51-.143,1.073,1.073,0,0,1,.143,1.51l-7.388,8.936a1.074,1.074,0,0,1-1.518,0l-3.1-3.1Zm15.1-7.266a.9.9,0,0,1-.06-.1,10.526,10.526,0,0,0-1.6-2.088l-.056-.052a10.457,10.457,0,0,0-7.418-3.072,10.458,10.458,0,0,0-7.418,3.072,10.458,10.458,0,0,0-3.072,7.418,10.458,10.458,0,0,0,3.072,7.418,10.447,10.447,0,0,0,7.418,3.072,10.464,10.464,0,0,0,7.421-3.071,10.467,10.467,0,0,0,3.071-7.421,10.463,10.463,0,0,0-1.361-5.176Zm1.5-1.661h15.044a1.074,1.074,0,0,1,1.073,1.073v6.329h2.291a1.074,1.074,0,0,1,1.073,1.073v9.581a5.31,5.31,0,0,1,.522.3,3.5,3.5,0,0,1,1.734,2.89,3.5,3.5,0,0,1-1.733,2.892,5.3,5.3,0,0,1-.522.3v9.58a1.074,1.074,0,0,1-1.073,1.073h-34.313a4.157,4.157,0,0,1-2.948-1.226,4.16,4.16,0,0,1-1.225-2.948v-11.348a1.073,1.073,0,0,1,1.073-1.073,1.074,1.074,0,0,1,1.073,1.073V-248.3a2.018,2.018,0,0,0,.6,1.429,2.021,2.021,0,0,0,1.431.6h33.24v-7.863a7.568,7.568,0,0,1-.944.06,6.625,6.625,0,0,1-3.613-1.007,3.5,3.5,0,0,1-1.733-2.892,3.5,3.5,0,0,1,1.734-2.89,6.62,6.62,0,0,1,3.612-1.007,7.568,7.568,0,0,1,.944.06v-7.863h-15.618a12.614,12.614,0,0,1-3.408,6.219l0,0a12.6,12.6,0,0,1-8.932,3.7,12.594,12.594,0,0,1-8.932-3.7,12.587,12.587,0,0,1-3.706-8.936,12.6,12.6,0,0,1,3.7-8.936,12.6,12.6,0,0,1,8.936-3.7,12.6,12.6,0,0,1,8.936,3.7l.06.066a12.8,12.8,0,0,1,1.631,2.035Zm18.109,19.789a.992.992,0,0,1-.115-.04,5.013,5.013,0,0,0-1.6-.25,4.464,4.464,0,0,0-2.43.647,1.45,1.45,0,0,0-.77,1.1,1.45,1.45,0,0,0,.768,1.106,4.466,4.466,0,0,0,2.431.647,5.041,5.041,0,0,0,1.6-.249,1.263,1.263,0,0,1,.129-.046,3.445,3.445,0,0,0,.7-.353,1.446,1.446,0,0,0,.768-1.106,1.446,1.446,0,0,0-.77-1.1,3.451,3.451,0,0,0-.713-.356Z'
                        transform='translate(3511.75 315.75)'
                        fill='#273721'
                      ></path>
                    </g>
                  </svg>
                </div>
                <div className='text-small-text'>
                  <div className='mb-[5px] font-bold font-sub text-medium-text'>
                    Payments &amp; Balance
                  </div>
                  <div className='text-small-text mb-[20px]'>
                    View and manage your payment methods
                  </div>
                  <div>
                    <ul>
                      <li className='mb-[10px] last:mb-0'>
                        <CustomLink
                          href={paths.paymentMethods}
                          className='flex items-center gap-x-[10px] text-[#634B91] hover:text-primary'
                        >
                          <span className='material-icons-outlined'>
                            chevron_right{' '}
                          </span>
                          <span className='font-semibold'>
                            View all payment methods
                          </span>
                        </CustomLink>
                      </li>
                      <li className='mb-[10px] last:mb-0'>
                        <CustomLink
                          href={paths.paymentMethods}
                          className='flex items-center gap-x-[10px] text-[#634B91] hover:text-primary'
                        >
                          <span className='material-icons-outlined'>
                            chevron_right{' '}
                          </span>
                          <span className='font-semibold'>
                            Add a payment method
                          </span>
                        </CustomLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          */}
          <div className='w-full xl:w-4/12 lg:w-6/12 md:w-6/12 px-[15px] mb-[30px]'>
            <div className='h-full bg-[#ffffff] p-[20px] lg:p-[30px] drop-shadow-md rounded-sm'>
              <div className='flex gap-x-[20px]'>
                <div>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='43.54'
                    height='37.227'
                    viewBox='0 0 43.54 37.227'
                  >
                    <path
                      id='Path_49134'
                      data-name='Path 49134'
                      d='M22.77,3.75V38.477M2.25,21.113H43.29M10.932,32.163A10.26,10.26,0,0,0,21.192,21.9v-.789M34.609,32.163A10.26,10.26,0,0,1,24.349,21.9v-.789M5.407,38.477H40.134A3.157,3.157,0,0,0,43.29,35.32V6.907A3.157,3.157,0,0,0,40.134,3.75H5.407A3.157,3.157,0,0,0,2.25,6.907V35.32A3.157,3.157,0,0,0,5.407,38.477ZM31.97,18.609c-2.965,2.968-8.928,2.233-8.928,2.233s-.735-5.962,2.231-8.928a4.735,4.735,0,1,1,6.7,6.7ZM20.188,11.916c2.965,2.965,2.231,8.928,2.231,8.928s-5.962.732-8.926-2.233a4.735,4.735,0,0,1,6.7-6.7Z'
                      transform='translate(-1 -2.5)'
                      fill='none'
                      stroke='#273721'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2.5'
                    ></path>
                  </svg>
                </div>
                <div className='text-small-text'>
                  <div className='mb-[5px] font-bold font-sub text-medium-text'>
                    Gift Cards/Store Credits
                  </div>
                  <div className='text-small-text mb-[20px]'>
                    View your store credit balance &amp; Check your giftcard
                    balance
                  </div>
                  <div>
                    <ul>
                      <li className='mb-[10px] last:mb-0'>
                        <CustomLink
                          href={paths.gifts}
                          className='flex items-center gap-x-[10px] text-[#634B91] hover:text-primary'
                        >
                          <span className='material-icons-outlined'>
                            chevron_right{' '}
                          </span>
                          <span className='font-semibold'>
                            View your store credits
                          </span>
                        </CustomLink>
                      </li>
                      <li className='mb-[10px] last:mb-0'>
                        <CustomLink
                          href={paths.gifts}
                          className='flex items-center gap-x-[10px] text-[#634B91] hover:text-primary'
                        >
                          <span className='material-icons-outlined'>
                            chevron_right{' '}
                          </span>
                          <span className='font-semibold'>
                            Check your gift card balance
                          </span>
                        </CustomLink>
                      </li>
                      {/* <li className='mb-[10px] last:mb-0'>
                        <CustomLink
                          href={paths.gifts}
                          className='flex items-center gap-x-[10px] text-[#634B91] hover:text-primary'
                        >
                          <span className='material-icons-outlined'>
                            chevron_right{' '}
                          </span>
                          <span className='font-semibold'>
                            Check your giftcard balance
                          </span>
                        </CustomLink>
                      </li> */}
                      {/* <li className='mb-[10px] last:mb-0'>
                        <CustomLink
                          href={paths.gifts}
                          className='flex items-center gap-x-[10px] text-[#634B91] hover:text-primary'
                        >
                          <span className='material-icons-outlined'>
                            chevron_right{' '}
                          </span>
                          <span className='font-semibold'>Add gift card</span>
                        </CustomLink>
                      </li> */}
                      {/* <li className='mb-[10px] last:mb-0'>
                        <CustomLink
                          href={paths.gifts}
                          className='flex items-center gap-x-[10px] text-[#634B91] hover:text-primary'
                        >
                          <span className='material-icons-outlined'>
                            chevron_right{' '}
                          </span>
                          <span className='font-semibold'>
                            Add gift voucher
                          </span>
                        </CustomLink>
                      </li> */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full xl:w-4/12 lg:w-6/12 md:w-6/12 px-[15px] mb-[30px]'>
            <div className='h-full bg-[#ffffff] p-[20px] lg:p-[30px] drop-shadow-md rounded-sm'>
              <div className='flex gap-x-[20px]'>
                <div>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='39.602'
                    height='46.348'
                    viewBox='0 0 39.602 46.348'
                  >
                    <path
                      id='Path_49135'
                      data-name='Path 49135'
                      d='M15.555,24.174h8.432M15.555,30.92h8.432m-8.432,6.746h8.432m6.746,1.686h5.059a5.059,5.059,0,0,0,5.059-5.059V10.925A4.9,4.9,0,0,0,36.409,6q-1.261-.1-2.525-.18m-13.044,0a5.042,5.042,0,0,0-.225,1.493A1.687,1.687,0,0,0,22.3,9H32.42a1.686,1.686,0,0,0,1.686-1.686,5.059,5.059,0,0,0-.225-1.493m-13.042,0A5.062,5.062,0,0,1,25.674,2.25h3.373a5.06,5.06,0,0,1,4.834,3.566m-13.042,0q-1.268.078-2.527.18a4.9,4.9,0,0,0-4.443,4.929v4.816m0,0H6.28a2.531,2.531,0,0,0-2.53,2.53v25.3A2.531,2.531,0,0,0,6.28,46.1H28.2a2.531,2.531,0,0,0,2.53-2.53v-25.3a2.531,2.531,0,0,0-2.53-2.53ZM10.5,24.174h.018v.018H10.5Zm0,6.746h.018v.018H10.5Zm0,6.746h.018v.018H10.5Z'
                      transform='translate(-2.5 -1)'
                      fill='none'
                      stroke='#273721'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2.5'
                    ></path>
                  </svg>
                </div>
                <div className='text-small-text'>
                  <div className='mb-[5px] font-bold font-sub text-medium-text'>
                    Wishlist
                  </div>
                  <div className='text-small-text mb-[20px]'>
                    Manage and save your favorite items to look at later
                  </div>
                  <div>
                    <ul>
                      <li className='mb-[10px] last:mb-0'>
                        <CustomLink
                          href={paths.wishList}
                          className='flex items-center gap-x-[10px] text-[#634B91] hover:text-primary'
                        >
                          <span className='material-icons-outlined'>
                            chevron_right{' '}
                          </span>
                          <span className='font-semibold'>
                            View your Wishlist
                          </span>
                        </CustomLink>
                      </li>
                      {/* <li className='mb-[10px] last:mb-0'>
                        <CustomLink
                          href={paths.wishList}
                          className='flex items-center gap-x-[10px] text-[#634B91] hover:text-primary'
                        >
                          <span className='material-icons-outlined'>
                            chevron_right{' '}
                          </span>
                          <span className='font-semibold'>
                            Create a new wishlist
                          </span>
                        </CustomLink>
                      </li> */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SideLayout>
  );
};

export default Dasboard;
