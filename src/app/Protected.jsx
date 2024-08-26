import React from "react";
import { Navigate } from "react-router-dom";
import { paths } from "./Routes";

const Protected = ({ children }) => {
  const user = JSON.parse(localStorage.userData ?? "null");

  if (!user) {
    return <Navigate to={paths.login} />;
  }

  return children
};

export default Protected;
