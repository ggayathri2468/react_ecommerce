import React, { useState } from "react";
import Form from "react-bootstrap/Form";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

export function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
  });
  const [nameerror, setNameerror] = useState(null);
  const [emailerror, setEmailerror] = useState(null);
  const [passworderror, setPassworderror] = useState(null);
  const [phoneerror, setPhoneerror] = useState(null);
  const [confirmerror, setConfirmerror] = useState(null);

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    let a = validateInputs();
    if (a) {
      if (
        nameerror === "" &&
        emailerror === "" &&
        passworderror === "" &&
        phoneerror === "" &&
        confirmerror === ""
      ) {
        axios.post("http://localhost:3000/datas", formData).then(() => {
         

          setFormData({
            username: "",
            email: "",
            phone: "",
            password: "",
            confirmpassword: "",
          });
          navigate("/");
        });
        console.log("first");
      }
    }
  };
  function validateInputs() {
    let valid = true;
    if (formData.username === "") {
      setNameerror("Username is required");
      valid = false;
    } else if (formData.username) {
      axios
        .get(`http://localhost:3000/datas?username=${formData.username}`)
        .then((res) => {
          if (res.data[0].username === formData.username) {
            setNameerror("Enter different Username");
            valid = false;
          }
        })
        .catch(() => {
          setNameerror("");
        });
    } else {
      setNameerror("");
    }
    if (formData.email === "") {
      setEmailerror("Email is required");
      valid = false;
    } else {
      let checkemail = String(formData.email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

      if (!checkemail) {
        setEmailerror("Please enter a valid email");
        valid = false;
      } else {
        setEmailerror("");
      }
    }

    if (formData.phone === "") {
      setPhoneerror("Phone Number is required");
      valid = false;
    } else if (formData.phone.length < 10 || formData.phone.length > 10) {
      setPhoneerror("Enter 10 digit number");
      valid = false;
    } else {
      setPhoneerror("");
    }
    if (formData.password === "") {
      setPassworderror("Password is required");
      valid = false;
    } else if (formData.password.length < 8) {
      setPassworderror("Password must be atleast 8 characters long");
      valid = false;
    } else {
      setPassworderror("");
    }
    if (formData.confirmpassword === "") {
      setConfirmerror("Enter Confirm Password");
      valid = false;
    } else if (formData.confirmpassword.length < 8) {
      setConfirmerror("Password must be atleast 8 characters long");
      valid = false;
    } else if (formData.password !== formData.confirmpassword) {
      setConfirmerror("Password Miss Match");
      valid = false;
    } else {
      setConfirmerror("");
    }
   
    if (
      nameerror === "" &&
      emailerror === "" &&
      passworderror === "" &&
      phoneerror === "" &&
      confirmerror === ""
    ) {
      return true;
    }
    return valid;
  }
  function navtosignin() {
    navigate("/");
  }
  return (
    <div
      className="login_container d-flex justify-content-center align-items-center"
      style={{ marginTop: "90px" }}
    >
      <div className="sideimg">
        <h2 className="title">Create Your Account</h2>
      </div>
      <div className="login text-center">
        <h1 className="signuphead">SignUp</h1>

        <div
          className="login_fields text-center container"
          style={{ width: "300px" }}
        >
          <div className="input-group">
            <Form.Control
              type="text"
              name="username"
              placeholder="Your Name"
              className="formcontroll"
              style={{ width: "100%", margin: "10px auto" }}
              onChange={handleChange}
            />
            <div className="error">{nameerror}</div>
          </div>
          <div className="input-group">
            <Form.Control
              type="text"
              name="email"
              placeholder="Your Email"
              style={{ width: "100%", margin: "10px auto" }}
              onChange={handleChange}
            />
            <div className="error">{emailerror}</div>
          </div>
          <div className="input-group">
            <Form.Control
              className="inputnumber"
              type="number"
              name="phone"
              placeholder="Your phone no."
              style={{ width: "60%", margin: "10px auto" }}
              onChange={handleChange}
            />
            <div className="error">{phoneerror}</div>
          </div>
          <div className="input-group">
            <Form.Control
              type="password"
              name="password"
              style={{ width: "60%", margin: "10px auto" }}
              placeholder="Password"
              onChange={handleChange}
            />
            <div className="error">{passworderror}</div>
          </div>
          <div className="input-group">
            <Form.Control
              type="password"
              name="confirmpassword"
              style={{ width: "60%", margin: "10px auto" }}
              placeholder="Confirm Password"
              onChange={handleChange}
            />
            <div className="error">{confirmerror}</div>
          </div>
        </div>
        <button
          type="submit"
          className=" signupbtn"
          style={{ width: "60%", marginBottom: "10px" }}
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit
        </button>
        <p style={{ fontSize: "18px" }}>
          Already have an account ?{" "}
          <span
            className="span"
            style={{ fontWeight: "bold", color: "#BA68C8" }}
            onClick={() => {
              navtosignin();
            }}
          >
            {" "}
            singin
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
