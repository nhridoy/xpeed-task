import React from "react";
import { useParams } from "react-router-dom";
import useForm from "../../hooks/useForm";
import Input from "../Input/Input";
import successMessages from "../utils/successMessages";

const Form = () => {
  const { id } = useParams();
  let url;
  if (id) {
    url = `http://localhost/api/get_form.php?id=${id}`;
  } else {
    url = "http://localhost/api/get_form.php";
  }
  const [values, setValues] = useForm(url);

  const handleSubmit = (e) => {
    e.preventDefault();
    successMessages("http://localhost/api/submit_form.php");
  };
  //   console.log(values);
  return (
    <form className="qfc-container" onSubmit={handleSubmit}>
      {Object.keys(values).map((key, index) => (
        <Input key={index} input={values[key]} label={key} />
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
