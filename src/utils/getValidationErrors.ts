import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export function getValidationErrors(err: ValidationError): Errors {
  return err.inner.reduce((validationErrors, error) => {
    validationErrors[error.path] = error.message;

    return validationErrors;
  }, {} as Errors);
}

export default getValidationErrors;
