import { __pagesConstant } from '../../home.contant';
import { _SelectedTab } from '../../components/home.type';

interface _props {
  data: _SelectedTab[];
  footerTabing: string;
  footerTabColorName: string;
  value: string;
  handleChange: (arg: string, arg2: string) => void;
}

export const FeaturedProductTabs = ({
  data,
  footerTabing,
  footerTabColorName,
  value,
  handleChange,
}: _props) => {
  return (
    <>
      {footerTabing == __pagesConstant?.show?.Yes && (
        <ul className='w-full flex justify-center max-w-4xl mx-auto flex-wrap'>
          <li className=''>
            <div
              className={`inline-block bg-[${footerTabColorName}] h-[8px] w-[96px] mt-[8px] mb-[8px]`}
            />
          </li>
        </ul>
      )}
      <div>
        <div className='tab-container'>
          <div className='tab-wrapper'>
            {data.map((product, index) => {
              const activeClass =
                value === product.index
                  ? 'text-anchor hover:text-anchor-hover border-[#006CD1] border-b-[2px]'
                  : 'rounded-sm';

              return (
                <div
                  key={product?.index}
                  className='mr-[2px] md:mr-0 font-[600]'
                >
                  <button
                    onClick={() =>
                      handleChange(product.index, product?.footerTabColorName)
                    }
                    className={
                      `tab pt-[8px] pb-[8px] pl-[8px] pr-[8px] mr-[4px] block hover:text-anchor focus:outline-none font-[600] border-anchor ` +
                      activeClass
                    }
                  >
                    {product?.tabName}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
