import { useState } from "react";

function useFormValidator() {

    const [values, setValues] = useState('');
    const [errors, setErrors] = useState('');
    const [isValid, setIsValid] = useState(false);

    function handleInputsChange(evt) {
        const { value, name } = evt.target;
        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: evt.target.validationMessage });
        setIsValid(evt.target.closest('form').checkValidity());
    }

    return ({ values, errors, setErrors, handleInputsChange, setValues, isValid, setIsValid })
}

export default useFormValidator