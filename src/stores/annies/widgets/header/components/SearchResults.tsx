import { _CustomField } from '@/shared/apis/header/globalSearch';

interface SearchResultsProps {
  customFields?: _CustomField[] | null;
}

function SearchResults({ customFields }: SearchResultsProps) {
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

  const secondaryCommonName =
    customFields?.find(
      (field: { label: string; value: string }) =>
        field.label === 'SECONDARY COMMON NAME',
    )?.value || '';

  return (
    <>
      {cultivar || prefferedCommonName || secondaryCommonName ? (
        <>
          ({cultivar}
          {cultivar && (prefferedCommonName || secondaryCommonName) && ', '}
          {prefferedCommonName}
          {secondaryCommonName && prefferedCommonName && ', '}
          {secondaryCommonName})
        </>
      ) : (
        <>
          {cultivar}
          {cultivar && (prefferedCommonName || secondaryCommonName) && ', '}
          {prefferedCommonName}
          {secondaryCommonName && ', '}
          {secondaryCommonName}
        </>
      )}
    </>
  );
}

export default SearchResults;
