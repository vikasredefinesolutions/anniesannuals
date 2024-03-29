import dynamic from "next/dynamic";
import { activeStoreName } from "@/shared/configs";

const DynamicForgotPasswordPage = dynamic(
  () => import(`../../${activeStoreName}/pages/forgotPassword`),
);

export default function ProductListing() {
  return <DynamicForgotPasswordPage />;
}
