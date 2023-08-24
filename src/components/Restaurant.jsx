// import Header from "./Header"
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import { Carousel } from "react-responsive-carousel";
import Header from "./Header";
import { AiFillStar } from "react-icons/ai";
import Footer from "./Footer";

const Restaurant = () => { 
 let { id } = useParams();
let [rDetails, setRDetails] = useState(null);
let [rMenuList, setRMenuList] = useState([]);
let [totalPrice, setTotalPrice] = useState(0);
let getRestaurantDetails = async () => {
  let url = "https://zomato-haj8.onrender.com/api/get-restaurant-detail/" + id;
  let { data } = await axios.get(url);
  // console.log(data.result);
  setRDetails(data.result);
};
let getMenuItemList = async () => {
  let url = "https://zomato-haj8.onrender.com/api/get-menu-item-list/" + id;
  let { data } = await axios.get(url);
  setRMenuList(data.result);
};

let incQty = (index) => {
  let _rMenuList = [...rMenuList];
  _rMenuList[index].qty += 1;
  totalPrice += _rMenuList[index].price;
  setRMenuList(_rMenuList);
  setTotalPrice(totalPrice);
};

let decQty = (index) => {
  let _rMenuList = [...rMenuList];
  _rMenuList[index].qty -= 1;
  totalPrice -= _rMenuList[index].price;
  setRMenuList(_rMenuList);
  setTotalPrice(totalPrice);
};

const getPaymentView = async() => {
  const  {data}=  await axios.post("https://zomato-haj8.onrender.com/api/create-order", {
    amount: totalPrice,
  }) 
 
var options = {
    "key": "rzp_test_zfcJvnDg1SRAdQ", // Enter the Key ID generated from the Dashboard
    "amount": totalPrice*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Zomato App",
    "description": "Make Your Order Now",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu316p2QqVVuNsUBkPkbxsH7AIjCsb-tG4yzCmrksLnNHDFuYK0NILhSTcMESi5EFLDbs&usqp=CAU",
    "order_id": data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler": async function (response){
      const sendData = {
       payment_id : response.razorpay_payment_id,
       order_id:response.razorpay_order_id,
       signature:response.razorpay_signature,
      }
      const {data}  =await  axios.post("https://zomato-haj8.onrender.com/api/verify-payment",sendData);
      // console.log(data);
    },
    "prefill": {
        "name": "Adarsh Mishra",
        "email": "mishraadarsh602@gmail.com",
        "contact": "9000090000"
    },
   
};
var rzp1 = new window.Razorpay(options);
// rzp1.on('payment.failed', function (response){
//         alert(response.error.code);
//         alert(response.error.description);
//         alert(response.error.source);
//         alert(response.error.step);
//         alert(response.error.reason);
//         alert(response.error.metadata.order_id);
//         alert(response.error.metadata.payment_id);
// });
    rzp1.open();

}

/* end of payment */

useEffect(() => {
  getRestaurantDetails();
}, []);

useEffect(() => {
  if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      setUser({
        fullname:user.user.fullname,
        email:user.user.email,
        address:user.user.address,
      });
      // console.log("user local:",user.user.fullname)

  }
}, [])


const [user,setUser] = useState({
  fullname: "",
  email: "",
  address:"",
});
const changInput = (e)=>{
   const { name, value} =   e.target;
   setUser({
     ...user,
     [name]: value
   })
}

return (
  <>
    {rDetails === null ? null : (
      <>

      <Header ></Header>
      {/* <!-- Button trigger modal --> */}

{/* <!-- Modal --> */}

        <div
          className="modal fade"
          id="slideShow"
           data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg " style={{ height: "75vh " }}>
            <div className="modal-content">
              <div className="modal-body h-75">
                <Carousel showThumbs={false} infiniteLoop={true}>
                  {rDetails.thumb.map((value, index) => {
                    return (
                      <div key={index} className="w-100">
                        <img src={"/images/" + value} alt="restaurant"/>
                      </div>
                    );
                  })}
                </Carousel>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="exampleModalToggle"
          aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel"
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalToggleLabel">
                  {rDetails.name}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body ">
                {rMenuList.map((menu, index) => {
                  return (
                    <div className="row p-2" key={menu._id}>
                      <div className="col-8">
                        <p className="mb-1 h6">{menu.name}</p>
                        <p className="mb-1">₹ {menu.price} /-</p>
                        <p className="small text-muted">{menu.description}</p>
                      </div>
                      <div className="col-4 d-flex justify-content-end">
                        <div className="menu-food-item">
                          <img src={"/images/" + menu.image} alt="" />
                          {menu.qty === 0 ? (
                            <button
                              onClick={() => incQty(index)}
                              className="btn btn-primary btn-sm add"
                            >
                              Add
                            </button>
                          ) : (
                            <div className="order-item-count section ">
                              <span
                                className="hand"
                                onClick={() => decQty(index)}
                              >
                                -
                              </span>
                              <span>{menu.qty}</span>
                              <span
                                className="hand"
                                onClick={() => incQty(index)}
                              >
                                +
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <hr className=" p-0 my-2" />
                    </div>
                  );
                })}

                {totalPrice > 0 ? (
                  <div className="d-flex justify-content-between">
                    <h3>Total: {totalPrice} /-</h3>
                    <button
                      className="btn btn-danger"
                      data-bs-target="#exampleModalToggle2"
                      data-bs-toggle="modal"
                    >
                      Next
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="exampleModalToggle2"
          aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel2"
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalToggleLabel2">
                  User Details
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Enter full Name"
                    required
                    name="fullname"
                    value={user.fullname}
                    onChange={changInput}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Enter Your Email"
                    required
                    name="email"
                    value={user.email}
                    onChange={changInput}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Address
                  </label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    required
                    name="address"
                    value={user.address}
                    onChange={changInput}
                  ></textarea>
                </div>
                <i>
                  Your payment for this order is{" "}
                  <b className="text-primary">{totalPrice} /-</b>
                </i>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-danger"
                  data-bs-target="#exampleModalToggle"
                  data-bs-toggle="modal"
                >
                  Back
                </button>
                <button className="btn btn-success" onClick={getPaymentView} >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="row bg-danger justify-content-center">
          <div className="col-10 d-flex justify-content-between py-2">
            <p className="m-0 brand">e!</p>
            <div>
              <button className="btn text-white">Login</button>
              <button className="btn btn-outline-light">
                <i className="fa fa-search" aria-hidden="true"></i>Create a
                Account
              </button>
            </div>
          </div>
        </div> */}
        {/* <!-- section -->  */}
        <div className="container">
          <div className="col-12">
            <div className="row">
              <div className="col-12 mt-5">
                <div className="restaurant-main-image position-relative">
                  <img
                    src={"/images/" + rDetails.image}
                    alt=""
                    className=""
                  />
                  <button
                    className="btn btn-outline-light position-absolute btn-gallery"
                    data-bs-toggle="modal"
                    data-bs-target="#slideShow"
                  >
                    Click To Get Image Gallery
                  </button>
                </div>
              </div>
              <div className="col-12">
                <h3 className="mt-4"><span className=" mr-4">{rDetails.name} </span>             
                    <span className="btn btn-sm btn-success ms-3">{rDetails.aggregate_rating} <AiFillStar />
                    </span>
                </h3>
                <div className="d-flex justify-content-between">
                  <ul className="list-unstyled d-flex gap-3">
                    <li>Overview & Contact</li>
                  </ul>
                  <a
                    className="btn btn-primary align-self-start"
                    data-bs-toggle="modal"
                    href="#exampleModalToggle"
                    role="button"
                    onClick={getMenuItemList}
                  >
                    Select Menu
                  </a>
                </div>
                <hr className="mt-0" />

                <div className="over-view">
                  <p className="h5 mb-4">{rDetails.rating_text}</p>

                  <p className="mb-0 fw-bold">Cuisine</p>
                  <p>
                    {rDetails.cuisine.map((value) => value.name).join(", ")}
                  </p>

                  <p className="mb-0 fw-bold">Average Cost</p>
                  <p>₹ {rDetails.min_price} for two people (approx.)</p>
                </div>

                <div className="over-view">
                  <p className="mb-0 fw-bold">Phone Number</p>
                  <p>+{rDetails.contact_number}</p>

                  <p className="mb-0 fw-bold">Address</p>
                  <p>
                    {rDetails.locality}, {rDetails.city}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>

      </>
    )}
  </>
);
}

export default Restaurant;
