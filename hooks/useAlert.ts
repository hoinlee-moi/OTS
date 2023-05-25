import React, { useState } from "react";

export default (bool: boolean):[boolean,()=>void] => {
  const [alertCheck, setAlertCheck] = useState(bool);
  const checkTranse = () => {
    setAlertCheck(true);
    setTimeout(() => {
      setAlertCheck(false);
    }, 5000);
  };
  return [alertCheck, checkTranse];
};
