import React from "react";
import { Navigate } from "react-router-dom";
import { paths } from "./Routes";

const LogInRoute = ({ children }) => {
  const user = JSON.parse(localStorage.userData ?? "null");

  if (user) {
    return <Navigate to={paths.home} />;
  }

  return children;
};

export default LogInRoute;
