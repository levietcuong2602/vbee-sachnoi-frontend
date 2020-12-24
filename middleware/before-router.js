export default async ({ redirect, route, app }) => {
  if (route.path === "/" || route.path === "") {
    redirect("/convert-book");
  }
  if (route.path === "/logout") {
    app.$auth.setUserToken("");
    redirect({ path: "/login", query: { redirect: route.path } });
  }
  const whiteList = ["/login", "/register"]; // no redirect whitelist
  // determine whether the user has logged in
  const hasToken = app.$auth.getToken("local");
  if (hasToken) {
    if (whiteList.indexOf(route.path) !== -1) {
      // if is logged in, redirect to the home page
      redirect("/convert-book");
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(route.path) === -1) {
      // in the free login whitelist, go directly
      redirect({ path: "/login", query: { redirect: route.path } });
    }
  }
};
