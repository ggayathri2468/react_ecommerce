import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import "./Signin.css";

function Signinpage() {
  // const [alldata, setAlldata] = useState([]);
  const [getdata, setGetdata] = useState({
    username: "",
    password: "",
  });
  const [usernameerror, setusername] = useState(null);
  const [passworderror, setPassworderror] = useState(null);
  const navicate = useNavigate();
  useEffect(() => {
    return () => {};
  }, []);
  const comparedata = () => {
    if (getdata.username === "") {
      setusername("Enter userName");
    } else if (getdata.password === "") {
      setusername("");
      setPassworderror("Enter password");
    } else {
      setusername("");
      setPassworderror("");
      axios
        .get(`http://localhost:3000/datas?username=${getdata.username}`)
        .then((data) => {
        
          localStorage.setItem("email", data.data[0].email);
          if (data.data[0].password === getdata.password) {
           
             navicate("/product");
             setGetdata({username:"",password:""})
          } else {
            setPassworderror("Incorrect Password");
          }
        })
        .catch((e) => {
          setusername("Invalid username");
          console.log("error", e);
        });
    }
  };
  const getinput = (e) => {
    let { name, value } = e.target;
    setGetdata({ ...getdata, [name]: value });
  };
  function navtosignup() {
    navicate("/signup");
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center marigntop"
     
    >
      <div className="sideimg1">
        <h2 className="title1">Signin to your account</h2>
      </div>
      <div className="sign text-center">
        <div>
          <h2 className="signinhead">Signin</h2>
        </div>
        <div>
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter the username"
            className="formcontroll"
            style={{ width: "60%", margin: "25px auto 10px" }}
            onChange={getinput}
          />
          <div className="error">{usernameerror}</div>
        </div>
        <div>
          <Form.Control
            type="password"
            name="password"
            style={{ width: "60%", margin: "25px auto 10px" }}
            placeholder="Enter the password"
            onChange={getinput}
          />
          <div className="error">{passworderror}</div>
        </div>
        <button
          className="signinbtn"
          onClick={() => {
            comparedata();
          }}
          style={{ width: "60%", marginBottom: "25px", marginTop: "20px" }}
        >
          submit
        </button>
        <p style={{ fontSize: "18px" }}>
          do you want create an account ?{" "}
          <span
            className="span"
            style={{ fontWeight: "bold", color: "#BA68C8" }}
            onClick={() => {
              navtosignup();
            }}
          >
            {" "}
            signup
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signinpage;
