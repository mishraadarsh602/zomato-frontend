import Header from "./Header";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { HiOutlineChevronRight, HiOutlineChevronLeft } from "react-icons/hi"
import { AiFillStar } from "react-icons/ai";
import axios from "axios";
const Search = ({ locationList }) => {
    const { mealtype_id, meal_name } = useParams();
    const [restaurants, setRestaurants] = useState([]);
    const [cuisines, setCuisines] = useState([]);
    const [totalItems, setTotalItems] = useState(null);
    const [mealname, setMealName] = useState("");
    const [city, setCity] = useState("");
    const [cuisineArray, setCuisineArray] = useState([]);
    const [page, SetPage] = useState(1);
    const [able, SetAble] = useState(true)
    // const [sortPrice,setSortPrice]
    const [filter, setFilter] = useState({
        mealtype_id: +mealtype_id,
        sort: 1,
        // limit: 2,
        // page: 1,
        cuisine_id: cuisineArray
    });

    const getFilterData = async () => {
        //  setLocation(location_id);
        const url = `http://localhost:5000/api/filters`;
        const { data } = await axios.post(url, filter);
        // console.log(data.RestaurantList);
        setRestaurants(data.RestaurantList);
        // console.log("data count :", data.count)
        setTotalItems(data.count);
    }
    const getCuisineList = async () => {
        //  setLocation(location_id);
        const url = `http://localhost:5000/api/get-cuisine-list`;
        const { data } = await axios.get(url);
        setCuisines(data.result);

        // console.log(cuisines);

        // console.log(restaurants)
    }

    const changeFilter = (event) => {
        let { name, value, checked } = event.target;
        if (checked) {
            console.log("checked", value);

            const lists = [...cuisineArray].concat(Number(value));
            setCuisineArray(lists);
            setFilter({ ...filter, cuisine_id: lists })



            // console.log("value",value)
            // console.log(lists);
        } else {
            const newItem = cuisineArray.filter((item) => item !== Number(value))
            setCuisineArray(newItem);
            // console.log("unchecked", newItem)
            setFilter({ ...filter, cuisine_id: newItem })




        }
        switch (name) {
            case "location":
                if (value === "") {
                    delete filter.location_id;
                    setFilter({ ...filter });
                }
                else {
                    setFilter({ ...filter, location_id: value });
                    // console.log("filter", filter)
                    // console.log("filter22:", event.target.innerHTML);
                    // const select = document.getElementById("selectt");
                    // select.onchange = function () {

                    //     var options = this.getElementsByTagName("option");
                    //     var optionHTML = options[this.selectedIndex].innerHTML;
                    //     console.log("hyy", optionHTML); //this is what I want, but it works now
                    //     setCity(optionHTML)
                    // };


                }

                break;

            case "sort":
                //setFilter({...filter,name:value})
                if (value === "lowToHigh") {
                    setFilter({ ...filter, sort: 1 });
                    console.log("lowTohigh")

                } else {
                    setFilter({ ...filter, sort: -1 });
                    console.log("highToLow")

                }


                break;
            case "costs":
                const pricerange = value.split("-");
                const lower = Number(pricerange[0]);
                const higher = Number(pricerange[1]);


                setFilter({ ...filter, lower, higher })
                console.log(lower, "-", higher)

                break;

            default:
                console.log("no value selected")

        }
    }



    useEffect(() => {
        getCuisineList();
        setMealName(meal_name)
    }, []);
    useEffect(() => {
        getFilterData();

    }, [filter, totalItems, cuisineArray])


    return (
        <div>
            <Header />
            <main>
                <section className="container mt-5">
                    <div className="text-head-box mb-3">
                        <h1 className="text-head text-edu fw-bold">{mealname} Places in {city ? city : "India"}</h1>
                    </div>
                    <button className="btn text-start collapseFilterbtn   d-lg-none d-md-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFilter" aria-expanded="false" aria-controls="collapseFilter">
                        Filters/Sort
                    </button>
                    <div className="row box">
                        <div className="col-12 col-md-3 left ">

                            <article id="collapseFilter" className="collapse p-4 d-lg-block d-md-block">
                                <div className="filter">
                                    <h5 className="head">Filters</h5>
                                    <h6 className="para">Select Location</h6>
                                    <select name="location" id="selectt" onChange={changeFilter}>
                                        <option value="">Select Location</option>

                                        {locationList.map((location, index) =>
                                        (

                                            <option key={index} value={location.location_id}>{location.name}, {location.city} </option>

                                        ))}


                                    </select>
                                </div>
                                <div className="cuisine">
                                    <p className="para">Cuisine</p>

                                    <ul className="p-0">

                                        {cuisines.map((value, i) => (
                                            <li key={i}><label><input type="checkbox" value={value.cuisine_id} name={value.name} onChange={(event) => changeFilter(event)} />{value.name}</label></li>
                                        ))}
                                        {/* {const cuisineFinal=[new Set(cuisines.map((cuisineobj)=>
                                       (cuisineobj.cuisine.map((value)=><li><input  type="checkbox" />{value.name}</li>)))
                                       )]} */}

                                        {/* <li><input  type="checkbox" /> North Indian</li>
                                        <li><input  type="checkbox" /> South Indian</li>
                                        <li><input  type="checkbox" /> Chinese</li>
                                        <li><input  type="checkbox" /> Fast Food</li>
                                        <li><input  type="checkbox" /> Street Food</li> */}

                                    </ul>
                                </div>
                                <div className="cost">
                                    <p className="para">Cost For Two</p>

                                    <ul className="p-0">
                                        <li><input type="radio" name="costs" onClick={changeFilter} value="1-500" /> Less Than 500</li>
                                        <li><input type="radio" name="costs" onClick={changeFilter} value="500-1000" /> 500 to 1000</li>

                                        <li><input type="radio" name="costs" onClick={changeFilter} value="1000-1500" /> 1000 to 1500</li>
                                        <li><input type="radio" name="costs" onClick={changeFilter} value="1500-2000" /> 1500 to 2000</li>
                                        <li><input type="radio" name="costs" onClick={changeFilter} value="2000-50000" /> 2000+</li>


                                    </ul>
                                </div>
                                <div className="sort">
                                    <p className="para">Price</p>

                                    <ul className="p-0">
                                        <li><input type="radio" name="sort" onClick={changeFilter} value="lowToHigh" id="" /> Price low to high</li>
                                        <li><input type="radio" name="sort" onClick={changeFilter} value="highToLow" id="" /> Price high to low</li>
                                    </ul>
                                </div>
                            </article>
                        </div>
                        <div className="col-12 col-md-9 right">
                            <article>

                                {restaurants.length > 0 ? restaurants.slice(page * 2 - 2, page * 2).map((rest, index) => (
                                    <Link to={`../restaurant-details/${rest._id}`} key={index} style={{ textDecoration: "none" }}>
                                        <div className="right-up mb-4">

                                            <div className="right-up-box">
                                                <div className="food-img">
                                                    <img src={`/images/${rest.image}`} alt="img1" />
                                                </div>
                                                <div className="food-text">
                                                    <h5 className="heading">{rest.name}</h5>
                                                    {/* <p className="text-edu fw-bold">FORT</p> */}

                                                     {/* {Math.round(rest.aggregate_rating)} */}
                                                    {/* <span className="rating">{[...Array(Math.round(rest.aggregate_rating))].map((_, i) => <AiFillStar key={i} />) }</span> */}
                                                    <p className="text-edu-light">{rest.locality},{rest.city}</p>
                                                    <span className="btn btn-sm btn-success mb-2">{rest.aggregate_rating} <AiFillStar /></span>

                                                </div>
                                            </div>
                                            <hr />
                                            <div className="right-up-box">
                                                <div className="">
                                                    <p className="text-edu-light">CUISINES : </p>
                                                    <p className="text-edu-light">COST FOR TWO :</p>
                                                </div>
                                                <div className="food-text">
                                                    <p className="text-edu">{rest.cuisine.map((value) => value.name).join(", ")}</p>
                                                    <p className="text-edu"> &#8377;{rest.min_price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )) : <div className="d-flex justify-content-center align-items-center"><img src="/images/no-merchant.png" /></div>}


                               {restaurants.length>2 && <div className="pagging mt-4">
                                    <div className="buttons">
                                        <button className={`button ${page===1?"btndisabled":""}`} disabled={page === 1} onClick={() => SetPage(page - 1)} >
                                            <HiOutlineChevronLeft />
                                        </button>
                                        {
                                            [...Array(Math.ceil(totalItems / 2))].map((_, i) => (
                                                <div key={i} onClick={() => SetPage(i + 1)} className={`button ${(page === i + 1) ? "activepage" : ""}`}>
                                                    {i + 1}
                                                </div>
                                            ))
                                        }

                                        <button type="button" disabled={page === Math.ceil(totalItems / 2)} onClick={() => SetPage(page + 1)} className={`button $ ${page === Math.ceil(totalItems / 2)?"btndisabled":""}`}>
                                            <HiOutlineChevronRight />
                                        </button>
                                    </div>
                                </div>
                               }

                            </article>
                            <article>

                            </article>

                        </div>
                    </div>

                </section>
            </main>
            <br /><br />
        </div>
    )
}

export default Search;