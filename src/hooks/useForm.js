import { useEffect, useState } from "react";

const useForm = () => {
  const [values, setValues] = useState({});

  useEffect(() => {
    fetch("http://localhost/api/get_form.php")
      .then((response) => response.json())
      .then((json) => {
        setValues(json.data.fields[0]);
      });
  }, []);

  return [values, setValues];
};

export default useForm;
