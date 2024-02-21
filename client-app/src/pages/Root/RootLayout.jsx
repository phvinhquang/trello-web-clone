import { Outlet, useLocation } from "react-router-dom";

import AppBar from "~/components/AppBar/AppBar";

export default function RootLayout() {
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  return (
    <>
      <AppBar homePage={isHomePage} />
      <Outlet />
    </>
  );
}
