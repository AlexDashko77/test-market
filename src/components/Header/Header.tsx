"use client";

import { useAuthStore } from "@/store/auth.store";
import Link from "next/link";
import styles from "./Header.module.scss";
import { User } from "@/types/auth.types";
import { useEffect } from "react";

interface Props {
  user: User | null;
}

export const Header = ({ user }: Props) => {
  const { user: clientUser, setUser, logout } = useAuthStore();

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  return (
    <header className={styles.header}>
      {clientUser ? (
        <div className={styles.user}>
          <span>
            {clientUser.firstName} {clientUser.lastName}
          </span>
          <button className={styles.btn} onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
        <Link className={styles.btn} href={"/login"}>
          Login
        </Link>
      )}
    </header>
  );
};
