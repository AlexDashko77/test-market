import { useState } from "react";
import { useDelayedError } from "./useDelayedError";

export function useLoginForm(delay = 700) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isValid = username.length >= 3 && password.length >= 3;

  const validationError = !username || !password ? null : !isValid ? "Minimum 3 characters" : null;

  const delayedValidationError = useDelayedError(validationError, delay);

  return {
    username,
    setUsername,
    password,
    setPassword,
    isValid,
    validationError: delayedValidationError,
  };
}
