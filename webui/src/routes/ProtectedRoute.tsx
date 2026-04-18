import { useEffect } from "react";
import { withAuthenticationRequired } from "react-oidc-context";
import { Outlet } from "react-router";

interface Props {
  isPublic?: boolean;
  isAuthorized?: boolean;
}

const ProtectedOutlet = withAuthenticationRequired(Outlet, {
  OnRedirecting: () => <div>Redirecting to the login page...</div>,
});

const ProtectedRoute = ({ isPublic = false, isAuthorized = false }: Props) => {
  const canAccess = isPublic || isAuthorized;

  useEffect(() => {
    if (!canAccess) {
      // Before redirecting, store the page in sessionStorage
      sessionStorage.setItem("returnUrl", window.location.href);
    }
  }, [canAccess]);

  return canAccess ? <Outlet /> : <ProtectedOutlet />;
};

export default ProtectedRoute;
