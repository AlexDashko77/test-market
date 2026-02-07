import styles from "./ErrorMessage.module.scss";

interface Props {
  message: string;
}

export default function ErrorMessage({ message }: Props) {
  return <div className={styles.error}>{message}</div>;
}
