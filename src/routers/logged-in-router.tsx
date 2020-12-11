import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Header } from "../components/header";
import { useMe } from "../hooks/useMe";
import { NotFound } from "../pages/404";
import { Restaurant } from "../pages/client/restaurant";
import { Restaurants } from "../pages/client/restaurants";
import { MyRestaurants } from "../pages/owner/my-restaurants";
import { Search } from "../pages/client/search";
import { SearchCategory } from "../pages/client/search-category";
import { ConfirmEmail } from "../pages/user/confirm-email";
import { EditProfile } from "../pages/user/edit-profile";
import { AddRestaurant } from "../pages/owner/add-restaurant";

const clientRoutes = [
  { path: "/", component: <Restaurants />, exact: true },
  { path: "/search", component: <Search /> },
  { path: "/category/:slug", component: <SearchCategory /> },
  { path: "/restaurant/:id", component: <Restaurant /> },
];

const ownerRoutes = [
  { path: "/", component: <MyRestaurants />, exact: true },
  { path: "/add-restaurant", component: <AddRestaurant /> },
];

const userRoutes = [
  { path: "/confirm", component: <ConfirmEmail /> },
  { path: "/edit-profile", component: <EditProfile /> },
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }
  return (
    <Router>
      <Header />
      <Switch>
        {data.me.role === "Client" &&
          clientRoutes.map((route) => (
            <Route key={route.path} path={route.path} exact={route.exact}>
              {route.component}
            </Route>
          ))}
        {data.me.role === "Owner" &&
          ownerRoutes.map((route) => (
            <Route key={route.path} path={route.path} exact={route.exact}>
              {route.component}
            </Route>
          ))}
        {userRoutes.map((route) => (
          <Route key={route.path} path={route.path}>
            {route.component}
          </Route>
        ))}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
