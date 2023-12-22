import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../firebase";
import Swal from 'sweetalert2';


const Login = () => {
    
  const [data, setData] = useState({
    email: "",
    pass: "",
  });
  const [submitBtnDisable, setSubmitBtnDisable] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmission = () => {
    if (!data.email || !data.pass) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all the fields!",
      });
      return;
    }

    if (emailForV(data.email) && passForV(data.pass)) {
      setErrMsg("");

      setSubmitBtnDisable(true);
      signInWithEmailAndPassword(auth, data.email, data.pass)
        .then(async (res) => {
          setSubmitBtnDisable(false);
          navigate("/");
        })
        .catch((err) => {
          setSubmitBtnDisable(false);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please ensure your email and password are entered correctly.",
            showConfirmButton: false,
            timer: 2500,
          });
        });
    }
  };

  const emailForV = (stringEmail) => {
    const validate = new RegExp("^[\\w-_.]*[\\w-_.]@[\\w].+[\\w]+[\\w]$");
    if (!validate.test(stringEmail)) {
      setErrMsg("Please enter your email properly");
      return false;
    } else {
      return true;
    }
  };

  const passForV = (stringPass) => {
    const validate = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"
    );
    if (!validate.test(stringPass)) {
      setErrMsg(
        "Password should contain special character, digits and alphabets, length must be 8 to 12 only."
      );
      return false;
    } else {
      return true;
    }
  };

  return (
    <section>
      <div className="login-box">
        <form action="">
          <h2 className="title">login</h2>

          <div className="form-details">
            <div className="input-box">
              <span className="icon">
                <i className="fa-solid fa-envelope"></i>
              </span>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                onChange={(e) => {
                  setData({ ...data, email: e.target.value });
                }}
                required
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className="input-box">
              <span className="icon">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="new-password"
                onChange={(e) => {
                  setData({ ...data, pass: e.target.value });
                }}
                required
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>

          <div className="err-msg">{errMsg}</div>

          <button
            type="submit"
            disabled={submitBtnDisable}
            onClick={(e) => {
              e.preventDefault();
              handleSubmission();
            }}
          >
            Login
          </button>

          <div className="register-link">
            <p>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
