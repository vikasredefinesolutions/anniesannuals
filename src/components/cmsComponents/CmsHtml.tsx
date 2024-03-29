import BreadCrumbs from '@/stores/annies/shared/components/BreadCrumbs';
import { IBreadCrumbsData } from '@/stores/annies/shared/components/breadCrumbstype';
import SideLayout from '@/stores/annies/shared/components/myAccountLayout';
import { VisibleComponents } from '@/types/home';
import { paths } from '@/utils/paths.constant';
import HomeComponents from '../HomeComponents';
import filteredComponents from '../filteredComponents';

interface CmsHtmlProps {
  htmlComponents: VisibleComponents[] | null;
  breadCrumbs: IBreadCrumbsData[] | [];
  mainSlug?: string;
}

function CmsHtml({ htmlComponents, breadCrumbs, mainSlug }: CmsHtmlProps) {
  const componentsView = () => {
    if (!htmlComponents?.length && typeof htmlComponents === 'string') {
      return (
        <div
          className='cms-static-shadow'
          dangerouslySetInnerHTML={{ __html: htmlComponents || '' }}
        ></div>
      );
    }

    return htmlComponents?.map((component, index) => {      
      if (component?.id) {
        const cmsComponent = filteredComponents({
          visibleComponents: [component],
        });

        return (
          <HomeComponents key={component.id} homeComponents={cmsComponent} />
        );
      }
      return (
        <div
          key={component.name}
          className='cms-static-shadow'
          dangerouslySetInnerHTML={{ __html: component.html || '' }}
        ></div>
      );
    });
  };
  return (
    <>
      <BreadCrumbs breadCrumbs={breadCrumbs} />

      {`/${mainSlug}` == paths.helpCentre ? (
        <SideLayout>{componentsView()}</SideLayout>
      ) : (
        <>{componentsView()}</>
      )}
    </>
  );
}

export default CmsHtml;
