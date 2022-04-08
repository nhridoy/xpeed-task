import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../Input/Input";
import successMessages from "../utils/successMessages";
import "./Form.css";

const Form = () => {
  const { id } = useParams();
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);
  let url;
  useEffect(() => {
    setValues({});
    if (id) {
      url = `http://localhost/api/get_form.php?id=${id}`;
    } else {
      url = "http://localhost/api/get_form.php";
    }
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setValues(json.data.fields[0]);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    successMessages("http://localhost/api/submit_form.php", setLoading).then(
      (response) => {
        setLoading(false);
      }
    );
  };
  //   console.log(values);
  return (
    <form className="qfc-container" onSubmit={handleSubmit}>
      {Object.keys(values).map((key, index) => (
        <Input key={index} input={values[key]} label={key} />
      ))}
      {loading ? (
        <button style={{ cursor: "not-allowed" }} type="submit" disabled>
          <div className="lds-dual-rings"></div>
        </button>
      ) : (
        <button type="submit">Submit</button>
      )}
    </form>
  );
};

export default Form;
