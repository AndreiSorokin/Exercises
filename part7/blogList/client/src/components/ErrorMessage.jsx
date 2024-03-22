import React from "react";
import { useAppSelector } from "../redux/store.js";

const ErrorMessage = () => {
  const errorMessage = useAppSelector(state => state.notification.errorMessage)

  if (errorMessage === null) {
    return null;
  }

  return <div className="error-message">{errorMessage}</div>;
};

export default ErrorMessage;
