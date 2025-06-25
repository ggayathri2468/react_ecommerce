import axios from "axios";
import React, { useEffect, useState } from "react";
import "../production/Productpage.css";
// import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar(props) {
  //  const [alldata,setAlldata]=useState([])

  const [getuser, setGetuser] = useState({});
  const [lengthofcard, setLengthofcard] = useState(0);
  const [useremail, setUseremail] = useState("");
  // const navigate=useNavigate()
  function openNav() {
    document.getElementById("mySidebar").style.width = "400px";
    document.getElementById("main").classList.add("no-scroll");
    document.getElementById("fullpop").classList.add("sidebarfull");
  }
  useEffect(() => {
    const email = localStorage.getItem("email");
    setUseremail(email);
    axios
      .get(`http://localhost:3000/datas?email=${email}`)
      .then((data) => {
        let oneuser = data.data[0];
        setGetuser(oneuser);
        if (oneuser.addtocard) {
          setLengthofcard(oneuser.addtocard.length);
        }
        console.log(oneuser);
      })
      .catch((e) => {
        console.log("error", e);
      });
    console.log(getuser);
  }, [props.bool, props.boolstate]);
  function removeaccount() {
    localStorage.removeItem("email");
  }

  return (
    <div className="navbar_outer_div">
      <div
        className="d-flex justify-content-between container align-items-center"
        style={{ height: "80px" }}
      >
        <div>
          <h3 style={{ color: "white" }}>Product</h3>
        </div>
        <div className="d-flex justify-content-between align-items-center left_div_of_nav">
          <div
            className="openbtn"
            onClick={() => {
              openNav();
            }}
          >
            <i
              className="fa-solid fa-cart-shopping"
              style={{ color: "white" }}
            ></i>
            <div className="d-flex align-items-center justify-content-center cartcount">
              {lengthofcard}
            </div>
          </div>

          <div
            className="d-flex align-items-center profile"
            style={{ height: "100%" }}
          >
            <i className="fa-solid fa-user usericon"></i>
            <div className="username">{getuser?.username}</div>
            <div className="profilediv">
              <div>{useremail}</div>
              <hr style={{ width: "100%" }} />
              <Link to="/address" className="linktag">
                My Address
              </Link>
              <br />
              <Link to="/list" className="linktag">
                My Order History
              </Link>
              <br />
              <hr style={{ width: "100%" }} />
              <Link
                to="/"
                className="linktag"
                onClick={() => {
                  removeaccount();
                }}
              >
                Sign Out
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
