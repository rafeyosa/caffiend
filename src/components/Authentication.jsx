import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Authentication(props) {
  const { handleClosemodal } = props;
  const [isRegistration, setIsRegistration] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { signUp, login } = useAuth();

  async function handleAuthenticate() {
    if (!email || !password) {
      setErrorMessage("Email and password cannot be empty");
      return;
    }
    if (!email.includes("@")) {
      setErrorMessage("Email is not valid");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long");
      return;
    }
    if (isAuthenticating) {
      return;
    }

    try {
      setIsAuthenticating(true);

      if (isRegistration) {
        await signUp(email, password);
      } else {
        await login(email, password);
      }
      handleClosemodal();
      clearForm();
    } catch (error) {
      setErrorMessage(
        isRegistration ? "The user already exists" : "Invalid email or password"
      );
      console.log(error.message);
    } finally {
      setIsAuthenticating(false);
    }
  }

  function clearForm() {
    setEmail("");
    setPassword("");
  }

  return (
    <>
      <h2 className="sign-up-text">{isRegistration ? "Sign Up" : "Login"}</h2>
      <p>
        {isRegistration ? "Create an account!" : "Sign in to your account!"}
      </p>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setErrorMessage("");
        }}
      />
      <input
        type="password"
        placeholder="********"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setErrorMessage("");
        }}
      />
      <button onClick={handleAuthenticate}>
        <p>{isAuthenticating ? "Authenticating..." : "Submit"}</p>
      </button>
      <hr />
      <div className="register-content">
        <p>
          {isRegistration
            ? "Already have an account?"
            : "Don't have an account?"}
        </p>
        <button
          onClick={() => {
            setIsRegistration(!isRegistration);
            setErrorMessage("");
            clearForm();
          }}
        >
          <p>{isRegistration ? "Login" : "Sign Up"}</p>
        </button>
      </div>
    </>
  );
}
