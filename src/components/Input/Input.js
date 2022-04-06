import React from "react";
import "./Input.css";

const Input = ({ input, label }) => {
  const [repeaterForms, setRepeaterForms] = React.useState([]);
  console.log(input);
  const { id, ...html_attr } = input?.html_attr;

  delete html_attr?.class;
  const handleRepeater = (e) => {
    e.preventDefault();
    setRepeaterForms((prev) => [
      ...prev,
      Object.keys(input?.repeater_fields).map((key, index) => {
        return (
          <div key={index}>
            <label
              htmlFor={key + " " + input?.repeater_fields[key]?.html_attr?.id}
            >
              {input?.repeater_fields[key]?.title}
            </label>
            <input
              id={key + " " + input?.repeater_fields[key]?.html_attr?.id}
              className={input?.repeater_fields[key]?.html_attr?.class}
              type={input?.repeater_fields[key]?.type}
              name={key}
              required={input?.repeater_fields[key]?.required}
              defaultValue={input?.repeater_fields[key]?.value}
              readOnly={input?.repeater_fields[key]?.readonly}
            />
          </div>
        );
      }),
    ]);
  };

  return (
    <div>
      <label className="label" htmlFor={label + " " + input?.html_attr?.id}>
        {input?.title}
      </label>
      {input?.type === "textarea" ? (
        <textarea
          id={label + " " + input?.html_attr?.id}
          className={input?.html_attr?.class}
          name={label}
          required={input?.required}
          defaultValue={input?.value}
          readOnly={input?.readonly}
          {...html_attr}
        />
      ) : input?.type === "radio" ? (
        <>
          {input?.options.map((option, index) => (
            <span key={index}>
              <input
                id={option?.key + " " + input?.html_attr?.id}
                className={input?.html_attr?.class}
                type={input?.type}
                name={label}
                required={input?.required}
                defaultChecked={input?.default === option?.key}
                readOnly={input?.readonly}
                {...html_attr}
              />
              <label htmlFor={option?.key + " " + input?.html_attr?.id}>
                {option?.label}
              </label>
            </span>
          ))}
        </>
      ) : input?.type === "select" ? (
        <select
          id={label + " " + input?.html_attr?.id}
          className={input?.html_attr?.class}
          name={label}
          required={input?.required}
          defaultValue={input?.default}
          readOnly={input?.readonly}
          {...html_attr}
        >
          {input?.options.map((option, index) => (
            <option key={index} value={option?.key}>
              {option?.label}
            </option>
          ))}
        </select>
      ) : input?.type === "repeater" ? (
        <>
          <button
            type="button"
            id={label + " " + input?.html_attr?.id}
            className={input?.html_attr?.class}
            {...html_attr}
            onClick={handleRepeater}
          >
            +
          </button>
          {repeaterForms.map((form, index) => {
            return form;
          })}
        </>
      ) : (
        <input
          id={label + " " + input?.html_attr.id}
          className={input?.html_attr?.class}
          type={input?.type}
          name={label}
          required={input?.required}
          defaultValue={input?.value}
          readOnly={input?.readonly}
          {...html_attr}
        />
      )}
    </div>
  );
};

export default Input;
