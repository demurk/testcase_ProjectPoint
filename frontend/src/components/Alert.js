import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { AlertContainer, alert } from "react-custom-alert";

import "react-custom-alert/dist/index.css";

const Alert = () => {
  const alertData = useSelector(({ alerts }) => alerts.alert);

  const createAlert = (message) => {
    alert({
      message,
      type: alertData.type,
    });
  };

  useEffect(() => {
    const message = alertData.message;
    if (message) {
      if (typeof message == "object") {
        Object.keys(message).map((el) =>
          createAlert(
            `${el !== "non_field_errors" ? el + " - " : ""}${message[el]}`
          )
        );
      } else {
        createAlert(message);
      }
    }
  }, [alertData]);

  return <AlertContainer floatingTime={3000} />;
};

export default Alert;