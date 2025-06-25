import React, { useEffect, useState } from "react";
import "./Orderplace.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";

function Orderplace() {
  let location = useLocation();
  let seleted_product = location.state;
  const navigate = useNavigate();
  const [userdata, setUserdata] = useState([]);
  const [useraddres, setUseraddres] = useState([]);
  // const [selectaddres, setSelectaddress] = useState({});
  const [selectedRadioIndex, setSelectedRadioIndex] = useState(null);
  const [readioerror, setRadioerror] = useState(null);

  const [address, setAddress] = useState({
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phoneno: "",
  });
  const [errors, setErrors] = useState({
    firstnameerror: null,
    lastnameerror: null,
    addresserror: null,
    cityerror: null,
    stateerror: null,
    pincodeerror: null,
    phonenoerror: null,
  });

  let email = localStorage.getItem("email");
  useEffect(() => {
    axios
      .get(`http://localhost:3000/datas?email=${email}`)
      .then((res) => {
        setUserdata(res.data[0]);
        setUseraddres(res.data[0].address);
        // setUserAddtocart(res.data[0].addtocard);
      })
      .catch((e) => {
        console.log("error", e);
      });

    return () => {};
  }, []);
  function updatestatevalue(e) {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
    setRadioerror("");
  }
  function orderput_method() {
    if (selectedRadioIndex === null && readioerror === null) {
      setRadioerror(" Address required");
    } else {
      let temp;
      let filtered_addtocart;
      const array = userdata.addtocard;

      filtered_addtocart = array.filter((item) => {
        let finddata = seleted_product.find((val) => {
          return val.id === item.id;
        });
        if (!finddata) {
          return item;
        }
      });
      const date = new Date();
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
      const year = date.getFullYear();

      const formattedDate = `${day}/${month}/${year}`;

      if (userdata.orderdetails) {
        temp = {
          ...userdata,
          addtocard: filtered_addtocart,
          orderdetails: [
            ...userdata.orderdetails,
            {
              data: formattedDate,
              products: [...seleted_product],
              address: address,
            },
          ],
        };
      } else {
        temp = {
          ...userdata,
          addtocard: filtered_addtocart,
          orderdetails: [
            {
              data: formattedDate,
              products: seleted_product.map((product) => ({
                ...product,
                date: formattedDate,
              })),
              address: address,
            },
          ],
        };
      }
      if (selectedRadioIndex !== null) {
        setRadioerror(null);
        funcall(temp);
      } else {
        validation(temp);
      }
    }
  }
  function validation(temp) {
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
      funcall(temp);
    }
  }
  function funcall(temp) {
    console.log("temp", temp);
    try {
      axios
        .put(`http://localhost:3000/datas/${userdata.id}`, temp)
        .then((res) => {
          console.log(res);

          setSelectedRadioIndex(null); // Clear selected radio
          setAddress({
            firstname: "",
            lastname: "",
            address: "",
            city: "",
            state: "",
            pincode: "",
            phoneno: "",
          });
          navigate("/thank", {
            state: {
              selectedProduct: seleted_product,
              address: address,
              mapaddress: `${address.city},${address.city},${address.pincode},${address.state},India`,
            },
          });
        })
        .catch((e) => {
          console.log("error", e);
        });
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className=" d-flex media" style={{ position: "relative" }}>
      <div style={{ Width: "600px", margin: "0 auto", padding: "20px" }}>
        <div className="" style={{ margin: "30px auto", width: "100%" }}>
          <div>
            <h6 style={{ color: "rgb(82, 82, 82)" }}>Account</h6>
            <p>{email}</p>
            <hr style={{ width: "100%" }} />
          </div>
          <div className="addAddress">
            <h6 style={{ color: "rgb(82, 82, 82)" }}>Delivery</h6>
            <div style={{ width: "500px", margin: "0 auto" }}>
              {useraddres?.map((item, i) => (
                <div key={i}>
                  <div className="d-flex">
                    <div style={{ margin: "3px 10px" }}>
                      <input
                        type="radio"
                        name="radio"
                        checked={selectedRadioIndex === i}
                        id=""
                        onChange={() => {
                          setSelectedRadioIndex(i);
                          setAddress({
                            firstname: item.firstname,
                            lastname: item.lastname,
                            address: item.address,
                            city: item.city,
                            pincode: item.pincode,
                            state: item.state,
                            phoneno: item.phoneno,
                          });
                          setRadioerror("");
                        }}
                      />
                    </div>
                    <p
                      style={{ minWidth: "300px", fontSize: "14px" }}
                    >{`${item.firstname},${item.lastname},${item.address},${item.city}
                    ,${item.pincode},${item.state}. ${item.phoneno}`}</p>
                  </div>
                </div>
              ))}
              <div className="error">{readioerror}</div>
            </div>
            <div>
              <button
                style={{
                  borderRadius: "10px",
                  padding: "3px 10px",
                  marginBottom: "20px",
                  color: "white",
                  backgroundColor: "#5d006da5",
                  border: "none",
                  width: "150px",
                  height: "30px",
                }}
                onClick={() => {
                  document
                    .getElementsByClassName("addAddress")[0]
                    ?.classList.add("addressform");
                  document
                    .getElementsByClassName("selectaddres")[0]
                    ?.classList.remove("addressform");
                  setSelectedRadioIndex(null); // Clear selected radio
                  // setSelectaddress({});
                  setAddress({
                    firstname: "",
                    lastname: "",
                    address: "",
                    city: "",
                    state: "",
                    pincode: "",
                    phoneno: "",
                  });
                  setRadioerror(null);
                }}
              >
                Add Address
              </button>
            </div>
          </div>
          <div
            className="selectaddres addressform"
            style={{ margin: "10px auto" }}
          >
            <div
              className="d-flex justify-content-between  "
              style={{ marginBottom: "20px" }}
            >
              <div>
                <Form.Control
                  type="text"
                  name="firstname"
                  placeholder="Your FirstName"
                  value={address.firstname}
                  className="formcontroll"
                  style={{ width: "100%", height: "50px" }}
                  onChange={updatestatevalue}
                />
                <div className="error">{errors.firstnameerror}</div>
              </div>
              <div>
                <Form.Control
                  type="text"
                  name="lastname"
                  placeholder="Your LastName"
                  value={address.lastname}
                  className="formcontroll"
                  style={{ width: "100%", height: "50px" }}
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
                value={address.address}
                style={{ width: "100%", height: "50px", marginBottom: "20px" }}
                onChange={updatestatevalue}
              />
              <div className="error">{errors.addresserror}</div>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <Form.Control
                type="text"
                name="city"
                placeholder="Your City"
                value={address.city}
                className="formcontroll"
                style={{ width: "100%", height: "50px" }}
                onChange={updatestatevalue}
              />
              <div className="error">{errors.cityerror}</div>
            </div>
            <div
              className="d-flex justify-content-between"
              style={{ marginBottom: "20px" }}
            >
              <div>
                <Form.Control
                  type="text"
                  name="state"
                  placeholder="Your State"
                  className="formcontroll"
                  value={address.state}
                  style={{ width: "100%", height: "50px" }}
                  onChange={updatestatevalue}
                />
                <div className="error">{errors.stateerror}</div>
              </div>
              <div>
                <Form.Control
                  type="text"
                  name="pincode"
                  placeholder="Your Pincode"
                  value={address.pincode}
                  className="formcontroll"
                  style={{ width: "100%", height: "50px" }}
                  onChange={updatestatevalue}
                />
                <div className="error">{errors.pincodeerror}</div>
              </div>
            </div>
            <div>
              <Form.Control
                type="text"
                name="phoneno"
                placeholder="Your Phone no."
                value={address.phoneno}
                className="formcontroll"
                style={{ width: "100%", height: "50px", marginBottom: "20px" }}
                onChange={updatestatevalue}
              />
              <div className="error">{errors.phonenoerror}</div>
              <div className="error">{readioerror}</div>
            </div>
            <div>
              <button
                style={{
                  width: "150px",
                  height: "30px",
                  margin: "15px",
                  color: "white",
                  backgroundColor: "#5d006da5",
                  border: "none",
                  borderRadius: "10px",
                }}
                onClick={() => {
                  document
                    .getElementsByClassName("addAddress")[0]
                    ?.classList.remove("addressform");
                  document
                    .getElementsByClassName("selectaddres")[0]
                    ?.classList.add("addressform");
                  setAddress({
                    firstname: "",
                    lastname: "",
                    address: "",
                    city: "",
                    state: "",
                    pincode: "",
                    phoneno: "",
                  });
                }}
              >
                Select Address
              </button>
            </div>
          </div>
          <hr style={{ width: "100%" }} />
          <div style={{ marginBottom: "20px" }}>
            <h6 style={{ color: "rgb(82, 82, 82)" }}>Shipping method</h6>
            <div
              className="d-flex justify-content-between align-items-center"
              style={{
                maxWidth: "100%",
                padding: "10px",
                //   height: "40px",
                borderRadius: "10px",
                border: "1px solid #41054b",
                backgroundColor: "#ba68c89d",
                color: "white",
              }}
            >
              <span>Standard Shipping</span>
              <span>
                <b>Free</b>
              </span>
            </div>
          </div>
          <hr style={{ width: "100%" }} />
          <div>
            <h5>Payment </h5>
            <p>All transactions are secure and encrypted.</p>
            <p
              style={{
                border: "1px solid  #41054b",
                borderRadius: "10px",
                padding: "10px",
                maxWidth: "100%",
                backgroundColor: "#ba68c89d",
                color: "white",
              }}
            >
              Cash on Delivery (COD)
            </p>
          </div>
          <div>
            <h6 style={{ color: "rgb(82, 82, 82)" }}>Billing Address</h6>
            <p>Same as shipping address</p>
          </div>
          <button
            style={{
              borderRadius: "10px",
              padding: "10px",
              width: "100%",
              border: "none",
              backgroundColor: "#5d006da5",
              color: "white",
            }}
            onClick={() => {
              orderput_method();
            }}
          >
            Place Order
          </button>
        </div>
      </div>
      <div className="sidesticky">
        <div
          style={{
            maxWidth: "400px",
            height: "100%",
            paddingTop: "50px",
            margin: "0 auto",
          }}
        >
          {seleted_product?.map((value, i) => (
            <div key={i}>
              <div
                style={{
                  margin: "10px",
                  boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  padding: "10px",
                  borderRadius: "10px",
                  minWidth: "300px",
                  Width: "400px",
                  backgroundColor: "white",
                }}
              >
                <div
                  className="d-flex justify-content-between"
                  style={{ paddingBottom: "10px" }}
                >
                  <div style={{ position: "relative" }}>
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        height: "20px",
                        width: "20px",
                        borderRadius: "50%",
                        backgroundColor: "rebeccapurple",
                        color: "white",
                        fontSize: "15px",
                        fontWeight: "bold",
                        position: "absolute",
                        top: "-10px",
                        right: "-5px",
                      }}
                    >
                      {value.count}
                    </div>
                    <img
                      src={value.img_link}
                      alt="phone"
                      style={{ height: "80px" }}
                    />
                  </div>
                  <div>{value.productname}</div>
                  <div>
                    ₹
                    {(() => {
                      const cleanedPrice = parseFloat(
                        value.price.replace(/[^\d.]/g, "")
                      );
                      const count = Number(value.count);
                      return !isNaN(cleanedPrice) && count
                        ? cleanedPrice * count
                        : 0;
                    })()}
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div>Subtotal</div>
                  <div>
                    ₹
                    {(() => {
                      const cleanedPrice = parseFloat(
                        value.price.replace(/[^\d.]/g, "")
                      );
                      const count = Number(value.count);
                      return !isNaN(cleanedPrice) && count
                        ? cleanedPrice * count
                        : 0;
                    })()}
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div>Shipping</div>
                  <div>
                    <b> Free </b>
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div>
                    <h5>Total</h5>
                  </div>
                  <div>
                    <b>
                      ₹{" "}
                      {(() => {
                        const cleanedPrice = parseFloat(
                          value.price.replace(/[^\d.]/g, "")
                        );
                        const count = Number(value.count);
                        return !isNaN(cleanedPrice) && count
                          ? cleanedPrice * count
                          : 0;
                      })()}{" "}
                    </b>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Orderplace;
