import Link from "next/link";
import styles from "./Navbar.module.css";
import Image from "next/image";

const Navbar = () => {
  return (
    <header className={styles.navBar}>
      <button className={styles.navButton} aria-label="Profile">
        <span role="img" aria-hidden="true">
          👤
        </span>
      </button>
      <Link href="/">
        <Image src="/eat-club-logo.svg" alt="logo" width={64} height={32} />
      </Link>
      <button className={styles.navButton} aria-label="Filters">
        <span style={{ fontSize: 24 }}>≡</span>
        {/* inline icon with font size for simplicity */}
      </button>
    </header>
  );
};

export default Navbar;
