import React, { useEffect, useState } from "react";
import empty from "../assets/empty-folder.png"
import "./Sidebar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Sidebar(props) {
  const [tabledata, setTabledata] = useState([]);
  const [userdata, setUserdata] = useState({});
  const [checkeditem,setCheckeditem]=useState([])
  const [showCart, setShowCart] = useState(false);
  let boolstate=props.boolstate;
  let setBoolstate=props.setBoolstate;
  const navigate=useNavigate()

  const useremail = localStorage.getItem("email");
  useEffect(() => {

    axios
      .get(`http://localhost:3000/datas?email=${useremail}`)
      .then((res) => {
       
        setTabledata(res.data[0].addtocard);
        setUserdata(res.data[0]);
      })
      .catch((e) => {
        console.log("error", e);
      });
      
      return () => {}
    }, [props.bool, boolstate]);
    setTimeout(() => {
       setShowCart(true);
     }, 1000); // Delay of 1 second
  function removeaction(removeitem) {
    const filtereddata = tabledata.filter((item) => {
      if (item.id !== removeitem.id) {
        return item;
      }
    });
    axios
      .put(`http://localhost:3000/datas/${userdata.id}`, {
        ...userdata,
        addtocard: filtereddata,
      })
      .then(() => {
 
      
        setBoolstate(!boolstate);
      })
      .catch((e) => {
        console.log("error", e);
      });
  }
  function decrecount(id) {
    let count;
    if (id.count>=0) {
      count = id.count - 1;
    }
    if (count) {
      countupdate(count,id);
    }
  }
  function increcount(id) {
    let count1;
    if (id.count) {
      count1 = id.count+1;
    } else {
      count1 = 1;
    }
    countupdate(count1,id);
  }
  function countupdate(count,id) {
     const filtereddata = tabledata.find((item) => {
      if (item.id === id.id) {
        return item;
      }
    });
    const filtereddata2 = tabledata.filter((item) => {
      if (item.id !== id.id) {
        return item;
      }
    });

    axios
      .put(`http://localhost:3000/datas/${userdata.id}`, {
        ...userdata,
        addtocard:[...filtereddata2,{...filtereddata,count:count}]
      })
      .then(() => {
       

        setBoolstate(!boolstate);
      })
      .catch((e) => {
        console.log("error", e);
      });
  }
  function selecteddata(e,item) {
    let check=e.target.checked
    if(check){
     if(checkeditem.length==0){
      setCheckeditem([item])
   
     }else{
      setCheckeditem([...checkeditem,item])
   
     }
    }else{
      let temp=checkeditem.filter((value)=>(
        value.id!==item.id
      ))
   
      setCheckeditem(temp)
    } 
    
  }

  function navtoorder(){
    navigate("/order",{state:checkeditem})
     props.closeNav();
  }
  return (
    <div id="fullpop">
      <div id="mySidebar" className="sidebar">
        <p
          className="closebtn"
          onClick={() => {
            props.closeNav();
          }}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </p>
        <div>
            <p style={{fontSize:"30px" ,textAlign:"center",fontWeight:"bold"}}>Your Cart</p>
          {!showCart ? (
  <p style={{ textAlign: "center" }}>Loading your cart...</p>
) : (
          tabledata==undefined||tabledata.length==0||tabledata==null?<><div className="d-flex justify-content-center"><img src={empty} alt="" style={{height:"200px",width:"200px"}} /></div></>:tabledata.map((item,i) => (
            <div style={{ margin: "10px auto", boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",padding:"10px" ,borderRadius:"5px",maxWidth:"300px"}} key={i}>
              <div
                className="d-flex justify-content-between"
                style={{ paddingBottom: "10px" }}
              >
                <div className="d-flex">
                  <div>
                    <img
                      src={item.img_link}
                      alt="phone"
                      style={{ height: "80px" }}
                    />
                  </div>
                  <div style={{color:"rgb(131, 130, 130)",padding:"5px 0px 0px 5px" ,fontSize:"14px"}}>{item.productname}</div>
                </div>
                <div style={{ width: "50px", textAlign: "center" }}>
                  <i
                    className="fa-solid fa-trash-can"
                    onClick={() => {
                      removeaction(item);
                    }}
                    style={{marginRight:"10px"}}
                  ></i>
                  <input type="checkbox" name={item.id} id="" style={{height:"15px",width:"15px",marginTop:"3px"}} onChange={(e)=>{selecteddata(e,item)}} />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-center align-items-center">
                  <div
                    style={{
                      height: "20px",
                      width: "20px",
                      borderRadius: "50%",
                      border: "1px solid black",
                      // textAlign: "center",
                      marginRight: "10px",
                    }}
                    onClick={() => {
                      decrecount(item);
                    }}
                  >
                    <i className="fa-solid fa-minus d-flex justify-content-center" style={{fontSize:"10px",fontWeight:"bold", marginTop:"5px"}} ></i>
                  </div>
                  <div style={{fontWeight:'bold'}}>{item.count?item.count:0}</div>
                  <div
                    style={{
                      height: "20px",
                      width: "20px",
                      borderRadius: "50%",
                      border: "1px solid black",
                    
                      marginLeft: "10px",
                    }}
                    onClick={() => {
                      increcount(item);
                    }}
                  >
                    <i className="fa-solid fa-plus d-flex justify-content-center" style={{fontSize:"10px",fontWeight:"bold", marginTop:"5px"}}></i>
                  </div>
                </div>
                <div style={{fontWeight:"bold"}}>
                
                  <i className="fa-solid fa-indian-rupee-sign" style={{paddingRight:"3px"}}></i>
                  { (() => {
      const cleanedPrice = parseFloat(item.price.replace(/[^\d.]/g, ''));
      const count = Number(item.count);
      return !isNaN(cleanedPrice) && count ? (cleanedPrice * count) : 0;
    })()}
                </div>
           
              </div>
            </div>
          ))
          
          
          )}
        { checkeditem.length>0? <div style={{textAlign:"end"}}>

          <button style={{height:"40px",borderRadius:'10px',fontWeight:"bold",backgroundColor:"#5d006da5",marginRight:"20px",color:"white",border:'none'}} onClick={()=>{navtoorder()}}>Checkout</button>
          </div>:null}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
