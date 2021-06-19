import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";

import styles from "./styles.module.scss";

export function SignInButton() {
  const isUserLoggedIn = true;

  if (isUserLoggedIn) {
    return (
      <button type="button" className={styles.signInButton}>
        <FaGithub className={styles.leftIcon} color="#04d361" />
        Luiz Ferrari
        <FiX className={styles.rightIcon} color="var(--gray-400)"/>
      </button>
    );
  }

  return (
    <button type="button" className={styles.signInButton}>
      <FaGithub className={styles.leftIcon} color="var(--yellow-500)" />
      Sign In with Github
    </button>
  );
}
