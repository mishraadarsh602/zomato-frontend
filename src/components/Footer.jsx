import { useState } from "react";
import { AiFillFacebook, AiFillInstagram, AiOutlineTwitter, AiFillLinkedin } from "react-icons/ai"
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const Footer = () => {
   const [letter,setLetter] = useState("");

  const registeredNews = () => toast("You have successfully registered!!");
  const invalidEmail = () => toast("Please enter valid email");

    const newsEmail  = (e)=>{
        setLetter(e.target.value);    
}
const submitNews = (e) => {
    e.preventDefault();
    const res = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!res.test(letter)){
        invalidEmail()
    }else{
        setLetter("");    
        registeredNews();

    }

}
    return (
        <>
            <div className="justify-content-center mt-3">
                <div className="container-fluid">
                    <div className="row bg-footer">
                        <div className="col-md-12">
                            <div className="card2 border-0 m-5">
                                <div className="card-body2 text-center ">
                                    <h2 className="text-dark-red"><b>Register to our Newsletter</b></h2>
                                    {/* <p className="pl-0 ml-0 mb-5">Find out what we can do for your business or home.</p> */}
                                    <div className="row text-center justify-content-center">
                                        <div className="col-12 col-md-5">
                                            <form>
                                                <div className="input-group-lg input-group mb-3 ">
                                                    <input type="text" value={letter} onChange={newsEmail} className="form-control rounded-0" placeholder="Enter your email" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                                    
                                                    <div className="input-group-append">
                                                        <button onClick={submitNews} className="btn btn-success btn-lg rounded-0" id="button-addon2"> <b>Submit</b></button></div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="mx-0 px-0" />
                <footer className="footer ">
                    <div className="justify-content-around mb-0  pb-4 ">
                        <div className="container-fluid">
                            <div className="row justify-content-center">
                                <div className="col-md-3 col-12 font-italic align-items-center mt-md-3 mt-4">
                                    <span>
                                        <div className="logo-div"><div className="biglogo rounded-circle bg-light  text-danger d-flex justify-content-center align-items-center display-1 fw-bold">e!</div></div>
                                    </span>
                                    <p className="text-dark">Eatopia - Your Ultimate Food App for Culinary Delights and Nutritious Recipes
                                    </p>
                                </div>
                                <div className="col-md-3 col-12 my-sm-0 mt-md-5">
                                    <ul className="list-unstyled">
                                        <li className="mt-md-3 mt-4">Our Solution</li>
                                        <li>Intergrated Security Platform</li>
                                        <li>Core Features</li>
                                        <li>Product Features</li>
                                        <li>Pricing</li>
                                    </ul>
                                </div>
                                <div className="col-md-3 col-12 my-sm-0 mt-md-5">
                                    <ul className="list-unstyled">
                                        <li className="mt-md-3 mt-4">Your needs</li>
                                        <li>Intergrated Security Platform</li>
                                        <li>Core Features</li>
                                        <li>Product Features</li>
                                        <li>Pricing</li>
                                    </ul>
                                </div>
                                <div className="col-xl-auto col-md-3 col-12 my-sm-0 mt-md-5">
                                    <ul className="list-unstyled">
                                        <li className="mt-md-3 mt-4">Offer</li>
                                        <li>Intergrated Security Platform</li>
                                        <li>Core Features</li>
                                        <li>Product Features</li>
                                        <li>Pricing</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-dark text-light text-center p-3">
                        <p className="social mt-md-3 mt-2">
                            <AiFillFacebook className="socialicon" />
                            <AiFillInstagram className="socialicon" />
                            <AiOutlineTwitter className="socialicon" />
                            <AiFillLinkedin className="socialicon" />

                        </p>
                        <div className="copy-rights cursor-pointer text-center">
                            &#9400;{new Date().getFullYear()} Eatopia
                            Copyright.All Rights Resered.

                        </div>

                    </div>
                </footer>
            </div>
        </>
    )
}

export default Footer