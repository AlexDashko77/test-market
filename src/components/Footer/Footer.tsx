"use client";
import { useAuthStore } from "@/store/auth.store";
import styles from "./Footer.module.scss";
import { User } from "@/types/auth.types";
import { useEffect } from "react";

interface Props {
  user: User;
}

export const Footer = ({ user }: Props) => {
  const { user: clientUser, setUser } = useAuthStore();
  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  return (
    <footer className={styles.footer}>
      {new Date().getFullYear()}
      {clientUser && ` Logged as ${clientUser.email}`}
    </footer>
  );
};
