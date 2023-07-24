import { useEffect, useState } from "react";

export default function useValidate(initialState, validate) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);

  function handleChange(event) {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
    setIsFirstRender(false);
  }

  useEffect(() => {
    if (isFirstRender) {
      setIsSubmitting(false)
    }
  }, [isFirstRender])
  
  useEffect(() => {
    if (!isFirstRender) {
      setErrors(validate(values));
    }
  }, [values]);
  
  useEffect(() => {
    if (!isFirstRender) {
      if (Object.keys(errors).length !== 0) {
        setIsSubmitting(false);
      } else {
        setIsSubmitting(true);
      }
    }
  }, [errors]);

  return {
    values,
    errors,
    handleChange,
    isSubmitting,
    setValues,
    setErrors,
    setIsFirstRender,
    setIsSubmitting
  };
}


