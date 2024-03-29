'use client'
import { ReactElement } from "react"

interface _DetailsHelpers {
  config: {
    showMoreInfo: boolean,
    showReviewsRatings: boolean,
    showYouMayAsloLike: boolean,
    showRandomReview: boolean
  }
}
interface _Props {
  config: {
    showMoreInfo: boolean,
    showReviewsRatings: boolean,
    showYouMayAsloLike: boolean,
    showRandomReview: boolean,  
    showRecentlyViewedProduct:boolean
  }
  cases: {
    view: (helpers: _DetailsHelpers) => ReactElement<any, any>;
  };
}
const ProductController: React.FC<_Props> = ({ cases, config }) => {
  return cases.view({ config })
}

export default ProductController