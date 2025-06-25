import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

import "./Thanku.css"

// const containerStyle = {
//   width: "100%",
//   height: "400px",
// };

// const centerDefault = {
//   lat: 0,
//   lng: 0,
// };


 function Thanku() {
  const [userdata, setUserdata] = useState({});
  const navigate = useNavigate();
  let email = localStorage.getItem("email");
    // const [locations, setLocations] = useState(null);

  let location = useLocation();
  let seleted_product = location.state.selectedProduct;
  let address = location.state.address;
  let mapaddress = location.state.mapaddress;
  // const mapaddress = "No.12, Gandhi Street, Chennai";
  //   const { isLoaded } = useLoadScript({
  //   googleMapsApiKey: "AIzaSyB2Big-rLr1lkxv3pYfw1VfuM3aEBHWpho", // 🔁 Replace with your API key
  // });
// apikey=AIzaSyDe3AbtYKd-Gdg6EtKtQFWVxFNMW2YBeCM
  useEffect(() => {
    axios
      .get(`http://localhost:3000/datas?email=${email}`)
      .then((res) => {
        setUserdata(res.data[0]);
        console.log(userdata);
      })
      .catch((e) => {
        console.log("error", e);
      });
  //  const getCoordinates = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://maps.googleapis.com/maps/api/geocode/json`,
  //         {
  //           params: {
  //             address: mapaddress,
  //             key: "AIzaSyB2Big-rLr1lkxv3pYfw1VfuM3aEBHWpho", // 🔁 Replace again here
  //           },
  //         }
  //       );
  //       if (response.data.status === "OK") {
  //         // const locationData = response.data.results[0].geometry.location;
  //         // setLocations(locationData);
  //       } else {
  //         console.error("Geocode error:", response.data.status);
  //       }
  //     } catch (error) {
  //       console.error("API error:", error);
  //     }
    // };

    // getCoordinates();
  }, [mapaddress]);
  // if (!isLoaded) return <div>Loading map...</div>;
  return (
    <div
      className=" d-flex justify-content-center media"
      style={{ position: "relative" }}
    >
      <div style={{ margin: "0 auto", width:"70%" }}>
        <div className="  " style={{ maxWidth: "500px", margin: "30px auto" }}>
          <div>
            <p>orderId {userdata.id}</p>
            <h5>{`Thank you,${userdata.username}`}</h5>
            {/* <div style={{ height: "400px", width: "100%", marginBottom:"20px" }}>
            
                <GoogleMap
        mapContainerStyle={containerStyle}
        center={locations || centerDefault}
        zoom={locations ? 15 : 2}
      >
        {locations && <Marker position={locations} />}
      </GoogleMap>
              
            </div> */}
                <h5 style={{ color: "rgb(82, 82, 82)" }}>Your order is confirmed</h5>

            <div
              style={{
                width: "500px",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                padding: "20px",
                marginBottom: "20px",
              }}
            >
              <div>
                
              </div>
              <h5>Order details</h5>
              <div className="d-flex" style={{}}>
                <div>
                  <h6>Contact information</h6>
                  <p>{email}</p>
                  <h6>Shipping address</h6>
                  <p style={{ width: "200px" }}>
                    {`${address.firstname} ${address.lastname},${address.address},${address.city}
                    ,${address.pincode},${address.state}. ${address.phoneno}`}
                  </p>
                  <h6>Shpping method</h6>
                  <p>standard shipping</p>
                </div>
                <div>
                  <h6>payment method</h6>
                  <p>Cash on delivary</p>
                  <h6>Billing address</h6>
                  <p>{`${address.firstname} ${address.lastname},${address.address},${address.city}
                    ,${address.pincode},${address.state}. ${address.phoneno}`}</p>
                </div>
              </div>
            </div>
            <button
              style={{
                borderRadius: "10px",
                color: "white",
                backgroundColor: "#5d006da5",
                border: "none",
                padding: "3px 10px",
                marginBottom: "20px",
              }}
              onClick={() => {
                navigate("/product");
              }}
            >
              Continue to shoping
            </button>
          </div>
        </div>
      </div>
      <div
       className="sidesticky"
      >
        <div
          style={{
            Width: "100%",
            height: "100%",
            margin: "0 auto",
            paddingTop: "50px",
          }}
        >
          {seleted_product.map((value, i) => (
            <div key={i}>
              <div
                style={{
                  margin: "10px auto",
                  boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  padding: "10px",
                  borderRadius: "10px",
                  width: "300px",
                  backgroundColor:"white"
                  
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

export default Thanku;


