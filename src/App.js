import Home from "./components/Home"
import Search from "./components/Search"
import Restaurant from "./components/Restaurant"
import { useState, useEffect } from "react";
import './App.css';
import axios from "axios";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
function App() {
  const [locationList,setLocationList] = useState([]);

    const getLocationList=async()=>{
        const url = `https://zomato-haj8.onrender.com/api/get-location-list`;
        const {data}  = await axios.get(url);
        // console.log(data.result);
        setLocationList(data.result);
    }
    useEffect(()=>{
        getLocationList();
    },[])
  return (
    <>
    <BrowserRouter>
       <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/restaurant-details/:id" element={<Restaurant/>} />
          <Route  path="/search/:mealtype_id/:meal_name" element={<Search locationList={locationList}/>} />
         <Route path="*" element={<PageNotFound/>} />
       </Routes>
    </BrowserRouter>
   
    
    </>
  );
}

export default App;
