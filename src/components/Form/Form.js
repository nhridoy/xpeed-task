import React from "react";
import useForm from "../../hooks/useForm";
import Input from "../Input/Input";

const Form = () => {
  const [values, setValues] = useForm();
  //   console.log(values);
  return (
    <form className="qfc-container">
      {Object.keys(values).map((key, index) => (
        <Input key={index} input={values[key]} label={key} />
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
