export interface IGiftCard {
  id: number;
  customerId: number;
  customerName: string;
  serialNo: string;
  storeId: number;
  isGiftCardVoucher: boolean;
  expirationDate: string;
  recStatus: string;
  location: string;
  ipAddress: string;
  macAddress: string;
}

const GiftCard: React.FC<{ cardInfo: IGiftCard }> = ({ cardInfo }) => {
  const expirationDate = cardInfo?.expirationDate
    ? new Date(cardInfo.expirationDate)
    : null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };
  const isexpiredDate = expirationDate && expirationDate <= new Date();

  return (
    <div
      className={`p-[15px] lg:p-[30px] drop-shadow-md rounded-sm 
      ${isexpiredDate ? 'bg-[#EDEDED]' : 'bg-[#FCFFF5] '} 
      mb-[30px] last:mb-0 max-w-4xl`}
    >
      <div className='flex flex-wrap justify-between'>
        <div className=' '>
          <div className='flex gap-x-[15px]'>
            <div className=''>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='35.467'
                height='27.628'
                viewBox='0 0 35.467 27.628'
              >
                <path
                  id='Path_12'
                  data-name='Path 12'
                  d='M2.25,11.032H36.217M2.25,12.339H36.217M7.476,21.483H17.927M7.476,25.4H12.7M6.169,30.628H32.3a3.919,3.919,0,0,0,3.919-3.919V8.419A3.919,3.919,0,0,0,32.3,4.5H6.169A3.919,3.919,0,0,0,2.25,8.419v18.29a3.919,3.919,0,0,0,3.919,3.919Z'
                  transform='translate(-1.5 -3.75)'
                  fill='none'
                  stroke='#cdcdcd'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='1.5'
                />
              </svg>
            </div>
            <div className=''>
              <div className='text-default-text mb-[15px]'>
                <span className='text-anchor-hover'>
                  GIFT CARD (****{`${cardInfo?.serialNo?.slice(-4)}`})
                </span>
              </div>
              <div className='text-small-text'>
                Issue Date{' '}
                {expirationDate
                  ? `${expirationDate.getMonth()}/${expirationDate.getFullYear()}`
                  : ''}
              </div>
            </div>
          </div>
        </div>
        <div className=''>
          <div className='mb-[15px]'>
            <button
              className='btn btn-outline-primary btn-xs uppercase !font-body !rounded-xs !inline-flex gap-[10px] items-center'
              onClick={() =>
                !isexpiredDate && copyToClipboard(cardInfo?.serialNo)
              }
            >
              <span>Copy</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GiftCard;
