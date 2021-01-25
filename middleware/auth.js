export default async ({ redirect, route, store }) => {
  // if user not authenticated
  if (!store.getters.isAuthenticated) {
    redirect("/login");
  }

  const whiteList = ["/login", "/register", "", "/"];
  if (whiteList.includes(route.path)) {
    redirect("/convert-book");
  }
};
