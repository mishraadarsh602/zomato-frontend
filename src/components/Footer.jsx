import { AiFillFacebook, AiFillInstagram, AiOutlineTwitter, AiFillLinkedin } from "react-icons/ai"
const Footer = () => {
    return (
        <>
            <div className="justify-content-center mt-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card border-0 mt-5">
                                <div className="card-body text-center ">
                                    <h2><b>Register to our Newsletter</b></h2>
                                    <p className="pl-0 ml-0 mb-5">Find out what we can do for your business or home.</p>
                                    <div className="row text-center justify-content-center">
                                        <div className="col-12 col-md-5">
                                            <div className="input-group-lg input-group mb-3 ">
                                                <input type="text" className="form-control rounded-0" placeholder="Enter your e-mail address" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                                <div className="input-group-append"><button className="btn btn-success btn-lg rounded-0" type="button" id="button-addon2"> <b>Submit</b></button></div>
                                            </div>
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
                                           <h6 className="text-dark">Eatopia - Your Ultimate Food App for Culinary Delights and Nutritious Recipes
                                       </h6>
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
                         <AiFillInstagram className="socialicon"/> 
                         <AiOutlineTwitter className="socialicon"/>
                         <AiFillLinkedin className="socialicon"/>
                                                    
                        </p>
                        <div className="copy-rights cursor-pointer text-center">
                            &#9400; 2023 Eatopia 
                            Copyright.All Rights Resered.

                        </div>

                    </div>
                </footer>
            </div>
        </>
    )
}

export default Footer