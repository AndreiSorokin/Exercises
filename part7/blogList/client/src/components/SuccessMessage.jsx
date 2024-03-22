import React from "react";
import { useAppSelector } from "../redux/store.js";

const SuccessMessage = () => {
  const successMessage = useAppSelector(state => state.notification.successMessage)
  
  if (successMessage === null) {
    return null;
  }

  return <div className="success-message">{successMessage}</div>;
};

export default SuccessMessage;
