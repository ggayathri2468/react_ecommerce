import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import axios from "axios";
import { Button } from "bootstrap";
import Sidebar from "../sidebar/Sidebar";

function Productpage() {
  const [alldata, setAlldata] = useState([]);
  const [getuser, setGetuser] = useState({});
  const [bool, setBool] = useState(false);
  const [boolstate, setBoolstate] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((data) => {
        setAlldata(data.data);
      })
      .catch((e) => {
        console.log("error", e);
      });
    const email = localStorage.getItem("email");
    axios
      .get("http://localhost:3000/datas")
      .then((data) => {
        const comparevalue = data.data.find((ele) => {
          if (email == ele.email) {
            return ele;
          }
        });
        setGetuser(comparevalue);
      })
      .catch((e) => {
        console.log("error", e);
      });

    return () => {};
  }, [bool,boolstate]);

  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("fullpop").classList.remove('sidebarfull')
    document.getElementById("main").classList.remove('no-scroll');
  }

  function addtocard(name) {
    let temp;

    if (!getuser.addtocard) {
      temp = { ...getuser, addtocard: [{...name,count:1}] };
    } else if (getuser.addtocard) {
      let array = getuser.addtocard;
      const addtoobject = array.find((item) => {
        return item.id == name.id;
      });

      if (!addtoobject) {
        temp = { ...getuser, addtocard: [...getuser.addtocard, {...name,count:1}] };
      }
    }
    if (temp) {
      axios
        .put(`http://localhost:3000/datas/${getuser.id}`, temp)
        .then(() => {
         
         
          setBool(!bool);
        })
        .catch((e) => {
          console.log("error", e);
        });
    }
  }
  return (
    <>
      <div style={{ overflowX: "hidden" }} >
        <Sidebar  closeNav={closeNav} bool={bool} boolstate={boolstate} setBoolstate={setBoolstate} />
     
        <div id="main">
          <div style={{position:"relative"}}>
        <div
          style={{
            position: "sticky",
            top: "0px",
            backgroundColor: "white",
            marginBottom: "10px",
          }}
        >
          <Navbar bool={bool} boolstate={boolstate}/>
        </div>
        <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-4 row-cols-xl-5  row-cols-xxl-5 justify-content-center  gap-5   " style={{margin:"30px"}}>
          {alldata.map((item, index) => (
            <div
              key={index}
              style={{
                boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                padding: "15px 5px",
                maxWidth:"200px",
                height:"370px",
                borderRadius:"10px"
              }}
            >
              <div className="d-flex justify-content-center" style={{backgroundColor:"rgb(234, 234, 234)"}}>
                <img
                  src={item.img_link}
                  alt={item.product_type}
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "contain",
                    margin: "10px",
                  }}
                />
              </div>
              <div style={{ padding: "0px 5px" }}>
                <p
                  className=""
                  style={{ color: "rgb(3, 3, 3)", marginBottom: "5px", fontSize:"14px" }}
                >
                  {item.productname}
                </p>
                <p style={{ marginBottom: "5px" ,fontWeight:"bold",}}>
                  <span> <i className="fa-solid fa-indian-rupee-sign" style={{paddingRight:"3px"}}></i>
                  {item.price}</span>
                 
                </p>
                <p style={{marginBottom:"0px"}}>{item.discount} off<span style={{fontSize:"14px",color: "rgb(131, 130, 130)"}}> <del><i className="fa-solid fa-indian-rupee-sign" style={{paddingRight:"1px",fontSize:"14px"}}></i>{item.delete}</del></span></p>
                <p
                  style={{
                    padding: "3px 3px",
                    color: "grey",
                    backgroundColor: "",
                    borderRadius: "5px",
                    marginBottom: "5px",
                    fontSize:"13px"
                  }}
                >
                  Free Delivery
                </p>
                <div className="d-flex ">
                  <button
                    style={{
                      fontSize: "16px",
                      backgroundColor: "#5d006da5",
                      border:"none",
                      color:"white",
                      borderRadius: "5px",
                      padding: "5px",
                    }}
                    onClick={() => {
                      addtocard(item);
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
        </div>
        </div>
      </div>
    </>
  );
}

export default Productpage;
