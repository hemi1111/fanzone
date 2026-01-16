import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";

import { ErrorBoundary } from "react-error-boundary";
import {
  FallbackErrorBoundary,
  type FallbackErrorBoundaryProps,
} from "./FallbackErrorBoundary";

const OutletPage = () => {
  const ErrorBoundaryComponent = ErrorBoundary as any;
  return (
    <>
      <Navbar />
      <ErrorBoundaryComponent
        fallbackRender={(props: FallbackErrorBoundaryProps) => (
          <FallbackErrorBoundary {...props} />
        )}
      >
        <Outlet />
      </ErrorBoundaryComponent>
    </>
  );
};

export default OutletPage;
