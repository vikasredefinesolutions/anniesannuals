"use client";
import React, { ReactElement } from "react";

interface IListingHelpers {
    config: {
        showListingBanner?: boolean;
        isProductListEmpty: boolean;
        showEvaluation?: boolean;
        showTranscript?: boolean;
    };
}
interface IProps {
    config: {
        showListingBanner?: boolean;
        isProductListEmpty: boolean;
        showEvaluation?: boolean;
        showTranscript?: boolean;
    };
    cases: {
        view: (helpers: IListingHelpers) => ReactElement<any, any>;
    };
}
const ProductListingController: React.FC<IProps> = ({ cases, config }) => {
    return cases.view({ config });
};

export default ProductListingController;
