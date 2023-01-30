import { useEffect, useMemo, useState } from "react";

export const useForm = (initialForm = {}, formValidations = {}) => {
  const [formState, setFormState] = useState(initialForm);
  const [formValidation, setFormValidation] = useState({});

  // Cada vez que hay un cambio en el form vamos a llamar a los validadores para chequar que todo este bien
  useEffect(() => {
    createValidators();
  }, [formState]);

  // Creamos un useEffect para actualizar el formulario cuando una nota cmabia
  useEffect(() => {
    // Mandamos el nuevo initial form
    setFormState(initialForm);
  }, [initialForm]);

  // Creamos el metodo para determinar si el formulario es válido y usamos el useMemo porque no queremos vovler a renderizar si no corresponde
  const isFormValid = useMemo(() => {
    // Usamor for of para evaluar cada uno de los campos del formValidation
    for (const formValue of Object.keys(formValidation)) {
      // Evaluamos cada validacion para ver si NO son nulas, si no son nulas, es porque hay un mensaje de error y nos salimos mostrando el error
      if (formValidation[formValue] !== null) return false;
    }
    // Si son nulas es porque no hya error y devolvemos true como que esta todo okey
    return true;
  }, [formValidation]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  // Validamos que los campos hayan sido ingresados con la información correcta
  const createValidators = () => {
    const formCheckValues = {};

    // Con este for evaluamos si lo que la persona inserto es correcto
    for (const formField of Object.keys(formValidations)) {
      // console.log( formField )

      // Tomaoms la función que tiene las condicioens que pautamos para vlidar del formValidatins para cada formField
      const [fn, errorMessage] = formValidations[formField];

      // Creamos las validaciones emailValid, passwordValid, displayNameValid y si cumple le ponemos null, sino el mensaje de error
      formCheckValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;

      // Creamos el nuevo estado de validación para nuestro formulario
      setFormValidation(formCheckValues);
    }
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,

    // Enviamos las validaciones
    ...formValidation,
    isFormValid,
  };
};
