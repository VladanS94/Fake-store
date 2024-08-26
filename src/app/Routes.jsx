import React from "react";
import { useRoutes } from "react-router-dom";
import SingleItem from "../pages/SingleItem";
import Products from "../components/Products";
import LogIn from "../pages/LogIn";
import Register from "../pages/Register";
import Protected from "./Protected";
import LogInRoute from "./LoginRoute";

export const paths = Object.freeze({
  home: "/",
  id: "/:id",
  login: "/login",
  register: "/register",
});

const Routes = () => {
  return useRoutes([
    {
      path: paths.home,
      element: (
        <Protected>
          <Products />
        </Protected>
      ),
    },
    {
      path: paths.id,
      element: (
        <Protected>
          <SingleItem />,
        </Protected>
      ),
    },
    {
      path: paths.login,
      element: (
        <LogInRoute>
          <LogIn />,
        </LogInRoute>
      ),
    },
    {
      path: paths.register,
      element: (
        <LogInRoute>
          <Register />,
        </LogInRoute>
      ),
    },
  ]);
};

export default Routes;
