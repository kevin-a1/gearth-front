import { useState } from 'react';

const useForm = (initialState = {}, validateForm, action) =>{

    const [ values, setValues ] = useState(initialState);
    const [ errors, setErrors ] = useState({});
    const [  setIsSubmitting ] = useState(false);

    const handleInputChange = ({target}) =>{

        setErrors([]);
        const {name, value} = target;
        setValues({
            ...values,
            [ name ]: value
        });
    };

    const handleSubmit = e =>{
        e.preventDefault();
        
        setErrors(validateForm(values));
        setIsSubmitting(true);
        
        if (Object.keys(errors).length === 0) {
              console.log(Object.keys(errors).length );
              action(values);
        }
    };

    /*useEffect(
        () => {
          if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
          }
        },
        [errors]
      );*/

    return {
        values,
        handleInputChange,
        handleSubmit,
        errors,
        setValues
    }
}

export default useForm;