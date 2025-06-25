import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Addtocart.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";

function Addtocart() {
  const [tabledata, setTabledata] = useState([]);
  const [userdata, setUserdata] = useState({});
  const [boolstate,setBoolstate]=useState(false)
  const [bool,setBool]=useState(true)
let navigate=useNavigate()
  const useremail = localStorage.getItem("email");
  useEffect(() => {

    axios
      .get(`http://localhost:3000/datas?email=${useremail}`)
      .then((res) => {

        setTabledata(res.data[0].orderdetails);

        setUserdata(res.data[0]);
      })
      .catch((e) => {
        console.log("error", e);
      });

    return () => {};
  }, [boolstate]);
  function addtocard(id) {
    axios
      .get(`http://localhost:3000/products?id=${id}`)
      .then((data) => {
           if (data.data.length > 0) {
      putaddtocart(data.data[0]);
    } else {
      alert("Product not found");
    }

      })
      .catch((e) => {
        console.log("error", e);
      });
  }
  function putaddtocart(name) {
    let temp;

    if (!userdata.addtocard) {
      temp = { ...userdata, addtocard: [{ ...name, count: 1 }] };
    } else if (userdata.addtocard) {
      let array = userdata.addtocard;
      const addtoobject = array.find((item) => {
        return item.id == name.id;
      });

      if (!addtoobject) {
        temp = {
          ...userdata,
          addtocard: [...userdata.addtocard, { ...name, count: 1 }],
        };
      }
    }
    if (temp) {
      try{

        axios
        .put(`http://localhost:3000/datas/${userdata.id}`, temp)
        .then((res) => {
          console.log(res);
          setBoolstate(!boolstate)
        
        })
        .catch((e) => {
          console.log("error", e);
        });
        document.getElementById("mySidebar").style.width = "400px";
        document.getElementById("orderdetailbody").classList.add('no-scroll');
        document.getElementById("fullpop").classList.add('sidebarfull')
        setBool(!bool)
      }
    catch(e){
      console.log(e)
    }
    }else{
          document.getElementById("mySidebar").style.width = "400px";
        document.getElementById("orderdetailbody").classList.add('no-scroll');
        document.getElementById("fullpop").classList.add('sidebarfull')
    }
  }
    function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("fullpop").classList.remove('sidebarfull')
    document.getElementById("orderdetailbody").classList.remove('no-scroll');
  }
 

  return (
    <div className="orderlistdiv">
              <Sidebar  closeNav={closeNav} bool={bool} boolstate={boolstate} setBoolstate={setBoolstate} />
      <div id='orderdetailbody'>
      <div
        style={{
          boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          backgroundColor: "#5d006da5",
          marginBottom: "50px",
        }}
      >
        <div
          className="d-flex justify-content-between container align-items-center"
          style={{ height: "80px" }}
        >
          <div>
            <h3 style={{ color: "white" }}>My Orders</h3>
          </div>
        </div>
      </div>
      {tabledata.length>0?tabledata.map((item) =>
        item.products.map((val, id) => (
        
          <div className="ordercart" key={id}>
           
            <div>
              <img src={val.img_link} className="cartimg" alt="" />
            </div>
            <div>
              <h5>{val.productname}</h5>
              <p> Delivered {item.data}</p>
              <div
                className="buyagain"
                onClick={() => {
                  addtocard(val.id);
                }}
              >
                Buy it Again
              </div>
            </div>
            <div>
              <i className="fa-solid fa-chevron-right arrowicon" onClick={()=>{navigate("/orderdetails",{state:{id:val.id,data:item}})}}></i>
            </div>
          </div>
        ))
      ):<div>Loading...</div>}
      </div>
    </div>
  );
}

export default Addtocart;
