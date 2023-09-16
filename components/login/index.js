import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import useAuthService from "@/services/authService";
import ChayyakartLogo from "../../public/images/chhayakart-pink-logo.png";
import Input from "../shared/inputs/input";
import styles from "./login.module.scss";

const Login = () => {
  const { authService } = useAuthService();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    type: 1,
  });

  const updateField = (event) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  const login = () => {
    setIsLoading(true);
    authService
      .login(loginData)
      .then(function () {
        const navigateUrl = "/";
        router.push(navigateUrl);
      })
      .catch(function () {
        setIsError(true);
        setErrorText("Incorrect username or password.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className={styles.formGridWrapper}>
      <Image
        src={ChayyakartLogo}
        className={styles.logo}
        height={75}
        width={200}
      />
      <p className={styles.header}>Welcome Back!</p>
      <p className={styles.description}>Please login to your account</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login();
        }}
      >
        <label className={styles.label}>Email</label>
        <Input
          type="text"
          labelText="Email"
          name="email"
          id="email"
          value={loginData.Email}
          isRequired={true}
          placeholder="Enter your Email"
          onChange={updateField}
          className={styles.inputStyle}
        />
        <label className={styles.label}>Password</label>
        <Input
          type="password"
          labelText="Password"
          name="password"
          id="password"
          value={loginData.Password}
          isRequired={true}
          placeholder="Enter your Password"
          onChange={updateField}
          className={styles.inputStyle}
        />

        {isError && <div className={styles.helpBlock}>{errorText}</div>}

        <button
          className={`btn btn-secondary ${styles.customBtn} ${styles.submitBtn}`}
        >
          {isLoading && (
            <i>
              <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
            </i>
          )}{" "}
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
