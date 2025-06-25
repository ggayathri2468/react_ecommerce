import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import "./Address.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";

function Address() {
  const [userone, setUserone] = useState({});
  const [errors, setErrors] = useState({
    firstnameerror: null,
    lastnameerror: null,
    addresserror: null,
    cityerror: null,
    stateerror: null,
    pincodeerror: null,
    phonenoerror: null,
  });
  const [address, setAddress] = useState({
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phoneno: "",
  });
  const navigate = useNavigate();
  const useremail = localStorage.getItem("email");
  useEffect(() => {
    axios
      .get(`http://localhost:3000/datas?email=${useremail}`)
      .then((res) => {
        console.log(res.data);
        setUserone(res.data[0]);
      })
      .catch((e) => {
        console.log("error", e);
      });

    return () => {};
  }, []);

  function updatestatevalue(e) {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value.trim() });
    console.log(address);
  }

  function postaddress() {
    console.log("error");
    if (address.firstname === "") {
      setErrors((prev) => ({
        ...prev,
        firstnameerror: "Enter a First name",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        firstnameerror: "",
      }));
    }
    if (address.lastname === "") {
      setErrors((prev) => ({
        ...prev,
        lastnameerror: "Enter a Last name",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        lastnameerror: "",
      }));
    }
    if (address.address === "") {
      setErrors((prev) => ({
        ...prev,
        addresserror: "Enter a Address",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        addresserror: "",
      }));
    }
    if (address.city === "") {
      setErrors((prev) => ({
        ...prev,
        cityerror: "Enter a City",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        cityerror: "",
      }));
    }
    if (address.state === "") {
      setErrors((prev) => ({
        ...prev,
        stateerror: "Enter a State",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        stateerror: "",
      }));
    }
    if (address.pincode === "") {
      setErrors((prev) => ({
        ...prev,
        pincodeerror: "Enter a Pincode",
      }));
    } else if (!/^\d{6}$/.test(address.pincode)) {
      setErrors((prev) => ({
        ...prev,
        pincodeerror: "Pincode must be 6 digits",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        pincodeerror: "",
      }));
    }
    if (address.phoneno === "") {
      setErrors((prev) => ({
        ...prev,
        phonenoerror: "Enter a Phone Number",
      }));
    } else if (!/^\d{10}$/.test(address.phoneno)) {
      setErrors((prev) => ({
        ...prev,
        phonenoerror: "Phone number must be 10 digits",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        phonenoerror: "",
      }));
    }
    if (
      errors.addresserror === "" &&
      errors.cityerror === "" &&
      errors.firstnameerror === "" &&
      errors.lastnameerror === "" &&
      errors.phonenoerror === "" &&
      errors.stateerror === ""
    ) {
      let temp;
      if (!userone.address) {
        temp = { ...userone, address: [address] };
      } else {
        temp = { ...userone, address: [...userone.address, { ...address }] };
      }
      console.log("result", temp);
      axios
          .put(`http://localhost:3000/datas/${userone.id}`, temp)
          .then((res) => {
            console.log(res);
      
      setAddress({
        firstname: "",
        lastname: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        phoneno: "",
      });
            navigate("/product")
          })
          .catch((e) => {
            console.log("error", e);
          });
    }
  }
  return (
    <div>
      <div
        style={{
          boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          backgroundColor: "#5d006da5",
        }}
      >
        <div
          className="d-flex justify-content-between container align-items-center"
          style={{ height: "80px" }}
        >
          <div>
            <h3 style={{ color: "white" }}>Saved Addresses</h3>
          </div>
        </div>
      </div>

      <div className="container">
        <p style={{ margin: "15px" }}>Add a New Address</p>

        <div>
          <div>
            <Form.Control
              type="text"
              name="firstname"
              placeholder="Your FirstName"
              className="formcontroll"
              style={{ width: "400px", margin: "15px ", height: "50px" }}
              onChange={updatestatevalue}
            />
            <div className="error">{errors.firstnameerror}</div>
          </div>
          <div>
            <Form.Control
              type="text"
              name="lastname"
              placeholder="Your LastName"
              className="formcontroll"
              style={{ width: "400px", margin: "15px ", height: "50px" }}
              onChange={updatestatevalue}
            />
            <div className="error">{errors.lastnameerror}</div>
          </div>
        </div>
        <div>
          <Form.Control
            type="text"
            name="address"
            placeholder="Your Address"
            className="formcontroll"
            style={{ width: "400px", margin: "15px ", height: "50px" }}
            onChange={updatestatevalue}
          />
          <div className="error">{errors.addresserror}</div>
        </div>
        <div>
          <Form.Control
            type="text"
            name="city"
            placeholder="Your City"
            className="formcontroll"
            style={{ width: "400px", margin: "15px ", height: "50px" }}
            onChange={updatestatevalue}
          />
          <div className="error">{errors.cityerror}</div>
        </div>
        <div className="d-flex ">
          <div>
            <Form.Control
              type="text"
              name="state"
              placeholder="Your State"
              className="formcontroll"
              style={{ width: "400px", margin: "15px ", height: "50px" }}
              onChange={updatestatevalue}
            />
            <div className="error">{errors.stateerror}</div>
          </div>
          <div>
            <Form.Control
              type="number"
              name="pincode"
              placeholder="Your Pincode"
              className="formcontroll inputnumber"
              style={{ width: "400px", margin: "15px ", height: "50px" }}
              onChange={updatestatevalue}
            />
            <div className="error">{errors.pincodeerror}</div>
          </div>
        </div>
        <div>
          <Form.Control
            type="number"
            name="phoneno"
            placeholder="Your Phone no."
            className="formcontroll inputnumber"
            style={{ width: "400px", margin: "15px ", height: "50px" }}
            onChange={updatestatevalue}
          />
          <div className="error">{errors.phonenoerror}</div>
        </div>
        <div>
          <button
            className="addresbtn"
            onClick={() => {
              postaddress();
            }}
          >
            Add Address
          </button>
        </div>
      </div>
    </div>
  );
}

export default Address;
