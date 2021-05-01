import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <React.Fragment>
      <header className="w-full fixed top-0">
        <div className={styles.wrapper}>
          <div className="container mx-auto">
            <Link href="/">
              <a>
                <img src="/logo-dizai.png" className="mx-auto" alt="Diz-aí" />
              </a>
            </Link>
          </div>
        </div>
        <div className="p-4 bg-secondary shadow-md text-center text-tertiary">
          <Link href="/about">
            <a className="p-4 font-bold hover:bg-primary">Sobre</a>
          </Link>
          <Link href="/contact">
            <a className="p-4 font-bold hover:bg-primary">Contato</a>
          </Link>
          <Link href="/research">
            <a className="p-4 font-bold hover:bg-primary">Pesquisa</a>
          </Link>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
