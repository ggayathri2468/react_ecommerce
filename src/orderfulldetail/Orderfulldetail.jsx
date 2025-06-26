import React, { useEffect } from "react";
import "./Orderfulldetail.css";
import { Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function Orderfulldetail() {
  const location = useLocation();
  const id = location.state.id;
  const orderlist = location.state.data;

  const email = localStorage.getItem("email");
  console.log("id", id);
  console.log("orderlisting", orderlist);
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="orderdetail">
      <div className="Orderdeail_div">
        <div
          className="box"
          style={{
            position: "relative",
            height: "100px",
            marginBottom: "15px",
          }}
        >
          <div>
            <b>Order status</b>
          </div>
          <div style={{ padding: "0 20px" }}>
            <hr style={{ color: "rebeccapurple" }} />
            <div className="dot pos1"></div>
            <div className="dot pos2"></div>
            <div className="dot pos3"></div>
            <div className="dot pos4"></div>
            <div className="dot pos5"></div>
            <div className="trackname tack1">Confirmed</div>
            <div className="trackname tack2">Shipped</div>
            <div className="trackname tack3">In Transit</div>
            <div className="trackname tack4">Out for Delivery</div>
            <div className="trackname tack5">Delivered</div>
          </div>
        </div>
        <div className="box">
          <div className="flexs">
            <span className="graycolor">Order ID:</span>
            <span>
              <b>#{orderlist.products[0].id}</b>
            </span>
          </div>
          <div className="flexs">
            <span className="graycolor">Date</span>
            <span>
              <b>{orderlist.products[0].date}</b>
            </span>
          </div>
          <div className="flexs">
            <span className="graycolor">Amount</span>
            <span>
              <b>
                <i
                  className="fa-solid fa-indian-rupee-sign"
                  style={{ paddingRight: "3px" }}
                ></i>
                {orderlist.products[0].price}
              </b>
            </span>
          </div>
        </div>

        <div className="box" style={{ marginBottom: "15px" }}>
          <div
            className="d-flex justify-content-between"
            style={{ paddingBottom: "10px", paddingTop: "20px" }}
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
                {orderlist.products[0].count}
              </div>
              <img
                src={orderlist.products[0].img_link}
                alt="phone"
                style={{ height: "80px" }}
              />
            </div>
            <div>{orderlist.products[0].productname}</div>
            <div>
              <div
                style={{
                  fontSize: "14px",
                  paddingRight: "5px",
                  color: "rgb(131, 130, 130)",
                }}
              >
                <i
                  className="fa-solid fa-indian-rupee-sign"
                  style={{ paddingRight: "1px" }}
                ></i>{" "}
                <del>{orderlist.products[0].delete}</del>
              </div>
              <b>
                <i
                  className="fa-solid fa-indian-rupee-sign"
                  style={{ paddingRight: "3px" }}
                ></i>
                {(() => {
                  const cleanedPrice = parseFloat(
                    orderlist.products[0].price.replace(/[^\d.]/g, "")
                  );
                  const counts = Number(orderlist.products[0].count);
                       
                      const count = parseFloat(
                        orderlist.products[0].delete.replace(/[^\d.]/g, "")
                      );
                      return !isNaN(cleanedPrice) && count
                        ? count*counts - cleanedPrice*counts
                        : 0;
                })()}
              </b>
            </div>
          </div>
          <hr />
          <div className="flexs">
            <span className="graycolor">Savings</span>
            <span>
              <b>
                <i
                  className="fa-solid fa-indian-rupee-sign"
                  style={{ paddingRight: "3px" }}
                ></i>
                {(() => {
                  const cleanedPrice = parseFloat(
                    orderlist.products[0].price.replace(/[^\d.]/g, "")
                  );
                  const count = parseFloat(
                    orderlist.products[0].delete.replace(/[^\d.]/g, "")
                  );
                  return !isNaN(cleanedPrice) && count
                    ? count - cleanedPrice
                    : 0;
                })()}
              </b>
            </span>
          </div>
          <div className="flexs">
            <span className="graycolor">Discount</span>
            <span>
              <b>
                {" "}
                <i
                  className="fa-solid fa-indian-rupee-sign"
                  style={{ paddingRight: "3px" }}
                ></i>{" "}
                {orderlist.products[0].discount}
              </b>
            </span>
          </div>
          <div className="flexs">
            <span className="graycolor">{`Shipping(Standard Shipping)`}</span>
            <span>
              <b>
                <i
                  className="fa-solid fa-indian-rupee-sign"
                  style={{ paddingRight: "3px" }}
                ></i>
                0.00
              </b>
            </span>
          </div>
          <div className="flexs">
            <span className="graycolor">{"Total(incl taxes)"}</span>
            <span>
              <b>
                <i
                  className="fa-solid fa-indian-rupee-sign"
                  style={{ paddingRight: "3px", color: "black" }}
                ></i>
                {orderlist.products[0].price}
              </b>
            </span>
          </div>
        </div>
        <div className="box">
          <div className="graycolor">Shipping Address</div>
          <div>
            <div>{`${orderlist.address.firstname} ${orderlist.address.lastname}`}</div>
            <div>{orderlist.address.address}</div>
            <div>{`${orderlist.address.pincode} ${orderlist.address.city} ${orderlist.address.state}`}</div>
            <div>India</div>
          </div>
        </div>
        <div className="box">
          <div>
            <b>Customer information</b>
          </div>
          <div>
            <div className="graycolor">Contact information</div>
            <div>{email}</div>
          </div>
          <div>
            <div className="graycolor">Payment method</div>
            <div>
              <span>Cash on delivery</span>
              <span style={{ color: "rebeccapurple", fontWeight: "500" }}>
                -Rs.{orderlist.products[0].price}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orderfulldetail;
