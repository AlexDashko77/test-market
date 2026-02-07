"use client";

import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { SyntheticEvent } from "react";
import styles from "./Login.module.scss";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import { useLoginForm } from "@/hooks/useLoginForm";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error } = useAuthStore();
  const { username, setUsername, password, setPassword, isValid, validationError } = useLoginForm();

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const success = await login(username, password);
    if (success) router.push("/");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Login</h1>

      <input
        className={styles.input}
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="text"
      />
      <input
        className={styles.input}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />

      {validationError && <ErrorMessage message={validationError} />}
      {error && <ErrorMessage message={error} />}

      <button className={styles.button} disabled={!isValid || isLoading}>
        {isLoading ? "Loading..." : "Login"}
      </button>
    </form>
  );
}
