import { _CustomField } from '@/shared/apis/header/globalSearch';

interface SearchResultsProps {
  customFields?: _CustomField[] | null;
  dark: boolean;
}

function ProductNames({ customFields, dark }: SearchResultsProps) {
  const cultivar =
    customFields?.find(
      (field: { label: string; value: string }) =>
        field.label === 'CULTIVAR NAME',
    )?.value || '';

  const prefferedCommonName =
    customFields?.find(
      (field: { label: string; value: string }) =>
        field.label === 'PREFERRED COMMON NAME',
    )?.value || '';

  return (
    <>
      <div
        className={`text-small-text text-${
          dark ? 'gray' : 'white'
        } w-full font-bold mb-[5px] leading-none`}
        style={{ height: '14px' }}
      >
        {cultivar}
      </div>
      <div
        className={`text-small-text text-${
          dark ? 'gray' : 'white'
        } mb-[5px] w-full leading-none`}
        style={{ height: '14px' }}
      >
        {prefferedCommonName}
      </div>
    </>
  );
}

export default ProductNames;
