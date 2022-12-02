import * as Sentry from "@sentry/nextjs";

import { NextPageContext } from "next";
import NextErrorComponent from "next/error";

interface CustomErrorComponentsProps {
  statusCode: number;
}

const CustomErrorComponent = ({ statusCode }: CustomErrorComponentsProps) => {
  return <NextErrorComponent statusCode={statusCode} />;
};

CustomErrorComponent.getInitialProps = async (ctx: NextPageContext) => {
  await Sentry.captureUnderscoreErrorException(ctx);

  return NextErrorComponent.getInitialProps(ctx);
};

export default CustomErrorComponent;
