import React, { useState, useCallback } from "react";
type value = Record<string, any> | any;
type userInputProps = [Record<string, any> | any, (e: React.ChangeEvent<HTMLInputElement>) => void];

export default (initalValue: Record<string, any> | any): userInputProps => {
  const [data, setData] = useState(initalValue);

  const handler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (
        typeof data === "string" ||
        typeof data === "number" ||
        typeof data === "boolean"
      ) {
        setData(e.target.value);
        return;
      }
      const { value, name } = e.target;
      setData((data: any) => ({ ...data, [name]: value }));
    },
    [data]
  );
  return [data, handler];
};
