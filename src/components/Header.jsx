import "../css/index.css";
import "../css/responsive.css";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle, FaAddressBook } from "react-icons/fa";
import { AiOutlineMail, AiOutlinePhone, AiFillEyeInvisible, AiFillEye, AiFillLock } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  
const Header = () => {
    const registered = () => toast("You have successfully registered!!");
    const loggedIn = () => toast("You have successfully logged in!!");

    // const regRef = useRef();
    const [input, setInput] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        address: "",

    })
    const [logInput, setLogInput] = useState({
        email: "",
        password: "",
    })
    const [showPassword, setShowPassword] = useState(false);
    const [getDetails, setGetDetails] = useState(null);
    const [logError, setLogError] = useState(null);
    const [regError, setRegError] = useState(null);
    useEffect(() => {
        if (localStorage.getItem("user")) {
            const user = JSON.parse(localStorage.getItem("user"));
            setGetDetails(user);
            // console.log("user local:",user.user.fullname)

        }
    }, [])

    const changeInput = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value
        })
    }
    const changeLogInput = (e) => {
        const { name, value } = e.target;
        setLogInput({
            ...logInput,
            [name]: value
        })
    }
    const logSubmit = async (e) => {
        e.preventDefault();
        const sendData = {
            email: logInput.email,
            password: logInput.password
        }
        const { data } = await axios.post("https://zomato-haj8.onrender.com/api/login", sendData);
        console.log(data)
        if (data.call === true) {
            // alert("You have successfully logged in");
            loggedIn();
            localStorage.setItem("user", JSON.stringify(data));
            window.location.reload();

        } else {
            // alert("Invalid email or password");
            setLogError("Invalid email or password")
        }


    }
    const onSubmit = async (e) => {
        e.preventDefault();
        const { fullName, email, phone, password, address } = input;

        const sendData = {
            fullName,
            email,
            phone,
            password,
            address
        }

        const { data } = await axios.post("https://zomato-haj8.onrender.com/api/save-user-data", sendData);
        // console.log(data)
        if (data.call === true) {
            // alert("You have successfully registered");
            registered();

            // // const  = new Modal()
            // console.log(regRef.current);
            // var myModal = regRef.current;
            // // var bsModal = new window.bootstrap.Modal(myModal);
            // var bsModal = new window.bootstrap.Modal(myModal);
            // bsModal.show();
            window.location.reload();
            // if (isPending == "show") {
            //     bsModal.show();
            // }
            // if (isPending == "hide") {
            //     console.log("hide", bsModal);
            // }

        } else {
            // alert(data.message);
            setRegError(data.message)


        }
    }
    const logOut = () => {
        localStorage.removeItem("user");
        window.location.reload();
    }
    return (
        <> 
        <header>
            <span className="logo-box">
                <Link className="logo" to="/">e!</Link>
            </span>
            {
                getDetails === null ? <span className="">
                    <span className="login text-light me-3" data-bs-target="#loginModal" data-bs-toggle="modal">Login</span>
                    <span className="create-acc btn btn-outline-light" data-bs-target="#registerModal" data-bs-toggle="modal" >Create an account</span>
                </span> : <span className="head-right">
                    <span className="text-light me-3">{`Welcome ${getDetails.user.fullname.split(" ")[0]} !! `}</span>
                    <span className=" btn btn-outline-light" onClick={logOut} >Logout</span>
                </span>
            }



            {/* Modal Starts */}
            <div className="modal fade" id="registerModal" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalToggleLabel">Register</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="input-group mb-3">
                                    <span className="input-group-text bg-success text-white" id="basic-addon1"><FaUserCircle></FaUserCircle></span>
                                    <input type="text" name="fullName" value={input.fullName}
                                        onChange={changeInput} className="form-control" placeholder="Full Name" aria-label="fullName" aria-describedby="basic-addon1" />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text bg-primary text-white" id="basic-addon1"><AiOutlineMail></AiOutlineMail></span>
                                    <input type="email" name="email" required value={input.email} onChange={changeInput} className="form-control" placeholder="Email" aria-label="email" aria-describedby="basic-addon1" />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text bg-secondary text-white" id="basic-addon1"><AiOutlinePhone></AiOutlinePhone></span>
                                    <input type="tel" name="phone" value={input.phone} onChange={changeInput} className="form-control" placeholder="Phone" aria-label="phone" aria-describedby="basic-addon1" />
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text bg-danger text-white" id="basic-addon1"><AiFillLock></AiFillLock></span>

                                    <input required type={showPassword ? "text" : "password"} name="password" value={input.password} onChange={changeInput} className="form-control" placeholder="Password" aria-label="password" aria-describedby="basic-addon1" />
                                    <span className="input-group-text bg-danger text-white" id="basic-addon1"
                                        onClick={() => setShowPassword(!showPassword)} >{showPassword ? <AiFillEye /> : <AiFillEyeInvisible />} </span>

                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text bg-danger text-white" id="basic-addon1"><AiFillLock></AiFillLock></span>
                                    <input required type="password" name="confirmPassword" value={input.confirmPassword} onChange={changeInput} className="form-control" placeholder="Confirm Password" aria-label="password" aria-describedby="basic-addon1" />
                                </div>
                                <div className="input-group">
                                    <span className="input-group-text  bg-warning text-white"><FaAddressBook></FaAddressBook></span>
                                    <textarea className="form-control" value={input.address} onChange={changeInput} name="address" placeholder="Address" aria-label="With textarea"></textarea>
                                </div>
                                <div className="text-danger">{regError}</div>
                                <button className="btn btn-outline-primary mt-3 " type="submit" onClick={onSubmit}>Submit

                                </button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <span>Already have account ?</span> <button className="btn text-success text-decoration-underline" data-bs-target="#loginModal" data-bs-toggle="modal">Login</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="loginModal" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalToggleLabel2">Login</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="input-group mb-3">
                                    <span className="input-group-text bg-primary text-white" id="basic-addon1"><AiOutlineMail></AiOutlineMail></span>
                                    <input type="email" name="email" required value={logInput.email} onChange={changeLogInput} className="form-control" placeholder="Email" aria-label="email" aria-describedby="basic-addon1" />
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text bg-danger text-white" id="basic-addon1"><AiFillLock></AiFillLock></span>

                                    <input required type={showPassword ? "text" : "password"} name="password" value={logInput.password} onChange={changeLogInput} className="form-control" placeholder="Password" aria-label="password" aria-describedby="basic-addon1" />
                                    <span className="input-group-text bg-danger text-white" id="basic-addon1"
                                        onClick={() => setShowPassword(!showPassword)} >{showPassword ? <AiFillEye /> : <AiFillEyeInvisible />} </span>

                                </div>
                                <div className="text-danger"> {logError}</div>
                                <div className="input-group mb-3">
                                    <button className="btn btn-outline-success mt-3 " onClick={logSubmit} type="submit">Submit</button>
                                </div>

                            </form>
                        </div>

                        <div className="modal-footer">
                            <span>Don't have account ?</span> <button className="btn text-primary text-decoration-underline" data-bs-target="#registerModal" data-bs-toggle="modal">Register</button>
                        </div>
                    </div>
                </div>
            </div>
            {/*  end of modal  */}

        </header>
                    <ToastContainer />
                   </>

    )
}

export default Header;