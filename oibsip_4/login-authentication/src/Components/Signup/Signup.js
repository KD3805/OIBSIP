import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";

const Signup = () => {
    const [data, setData] = useState({
        uname: "",
        email: "",
        pass: "",
    });
    const [submitBtnDisable, setSubmitBtnDisable] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();

    const handleSubmission = () => {
        if (!data.uname || !data.email || !data.pass) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please fill all the fields!",
            });
            return;
        }

        if (
            nameForV(data.uname) &&
            emailForV(data.email) &&
            passForV(data.pass)
        ) {
            setSubmitBtnDisable(true);
            createUserWithEmailAndPassword(auth, data.email, data.pass)
            .then(async (userCredential) => {
                // Signed up
                setSubmitBtnDisable(false);
                const user = userCredential.user;
                await updateProfile(user, {
                    displayName: data.uname,
                });

                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Account created successfully!',
                    showConfirmButton: false,
                    timer: 1500
                  });
                  setTimeout(() => {
                    navigate("/")
                }, 2000);
            })
            .catch((err) => {
                setSubmitBtnDisable(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'An account with this user already exists. Please log in instead.',
                    showConfirmButton: false,
                    timer: 2500
                });
                console.log("Error : ", err.message);
            });
        }
    };

    const nameForV = (stringName) => {
        if (stringName == null) {
            setErrMsg("Please enter your name properly");
            return false;
        } else { 
            return true;
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
            "^(?=.*[0-9])(?=.*[!@#$%^&*_=+-])(?=.*[A-Z])(?=.*[a-z]).{8,12}$"
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
            <div className="signup-box">
                <form>
                    <h2 className="title">sign up</h2>

                    <div className="form-details">
                        <div className="input-box">
                            <span className="icon">
                                <i className="fa-solid fa-user"></i>
                            </span>
                            <input
                                type="text"
                                name="username"
                                id="uname"
                                autoComplete="off"
                                onChange={(e) => {
                                    setData({ ...data, uname: e.target.value });
                                }}
                                required
                            />
                            <label htmlFor="uname">Username</label>
                        </div>

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

                    <div className='err-msg'>
                        {errMsg}
                    </div>

                    <button
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            handleSubmission();
                        }}
                        disabled={submitBtnDisable}
                    >
                        Sign up
                    </button>

                    <div className="register-link">
                        <p>
                            Already have an account? <Link to="/login">Login</Link>
                        </p>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Signup;
