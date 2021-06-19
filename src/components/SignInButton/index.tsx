import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { signIn, useSession, signOut } from "next-auth/client";

import styles from "./styles.module.scss";

export function SignInButton() {
  const [session] = useSession();

  if (session) {
    return (
      <button
        type="button"
        className={styles.signInButton}
        onClick={() => signOut()}
      >
        <FaGithub className={styles.leftIcon} color="#04d361" />
        {session.user.name}
        <FiX className={styles.rightIcon} color="var(--gray-400)" />
      </button>
    );
  }

  return (
    <button
      type="button"
      className={styles.signInButton}
      onClick={() => signIn("github")}
    >
      <FaGithub className={styles.leftIcon} color="var(--yellow-500)" />
      Sign In with Github
    </button>
  );
}
