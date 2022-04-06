import { useEffect, useState } from "react";

const useForm = (url) => {
  const [values, setValues] = useState({});

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setValues(json.data.fields[0]);
      });
  }, []);

  return [values, setValues];
};

export default useForm;
