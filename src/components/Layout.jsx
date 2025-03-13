import { useState } from "react";
import Authentication from "./Authentication";
import Modal from "./Modal";
import { useAuth } from "../context/AuthContext";

export default function Layout(props) {
  const { children } = props;
  const [showModal, setShowModal] = useState(false);
  const { globalUser, logout } = useAuth();

  const header = (
    <header>
      <div>
        <h1 className="text-gradient">CAFFIEND</h1>
        <p>For Coffee Insatiates</p>
      </div>
      {globalUser ? (
        <button onClick={logout}>
          <p>Logout</p>
        </button>
      ) : (
        <button onClick={() => setShowModal(true)}>
          <p>Sign up free</p>
          <i className="fa-solid fa-mug-hot" />
        </button>
      )}
    </header>
  );
  const footer = (
    <footer>
      <p>
        <span className="text-gradient">Caffiend</span> was made by{" "}
        <a href="https://rafeyosa.netlify.app/" target="_blank">
          Rafeyosa
        </a>{" "}
        <br />
        using the{" "}
        <a href="https://www.fantacss.smoljames.com/" target="_blank">
          FantaCSS
        </a>{" "}
        design library.
        <br />
        Check out the project on{" "}
        <a href="https://github.com/rafeyosa/caffiend.git" target="_blank">
          Github
        </a>
      </p>
    </footer>
  );

  function handleClosemodal() {
    setShowModal(false);
  }

  return (
    <>
      {showModal && (
        <Modal handleClosemodal={handleClosemodal}>
          <Authentication handleClosemodal={handleClosemodal} />
        </Modal>
      )}
      {header}
      <main>{children}</main>
      {footer}
    </>
  );
}
