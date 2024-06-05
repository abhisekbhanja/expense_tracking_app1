import React, { useEffect, useState } from "react";

// import "./App.css"
import Formarray from "./components/Formarray";
import Pagination from "./components/Pagination";
import Pagination2 from "./components/Pagination2";
import Scroll from "./components/Scroll";
import Linechart from "./components/Linechart";
import Dashboard1 from "./Dashboard1";
import "./dashboard.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard_Page from "./Dashboard/Dashboard_Page";
import Dashboard_Page2 from "./Dashboard/Dashboard_Page2";
import Dashboard_Page3 from "./Dashboard/Dashboard_Page3";
import Home from "./components/Home";
import Dashboard_nav from "./Dashboard/Dashboard_nav";
import Expense_tracker from "./components/Expense_tracker";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import  Axios  from "axios";
import Protected_Route from "./components/Protected_Route";
//import { useNavigate } from 'react-router-dom';

function App() {
 

  const [expense_amount, setexpense_amount] = useState(0)
  const [expense_type, setexpense_type] = useState("")
  const [user_email, setuser_email] = useState("")
  const [user_detail, setuser_detail] = useState("")
  const [chart_data, setchart_data] = useState([])
  const [expense_details, setexpense_details] = useState([])
  

  const token=localStorage.getItem("usertoken")
  //const navigate=useNavigate()
 
  //get user details
  const get_user_data=()=>
  {
      try {
        Axios.get(`${process.env.REACT_APP_SERVER_URL}`,{
          headers: {
            'Content-Type':'application/json',
            "login-token" : localStorage.getItem("usertoken")
          }
        }).then(response =>{
          const allapiData=response.data
          //console.log(response);
          setexpense_details(response.data.data)
          setuser_email(response.data.user.email);
          setuser_detail(response.data.user);
          var result = [];
          allapiData?.data?.reduce(function(res, value) {
            if (!res[value.expense_type]) {
              res[value.expense_type] = { expense_type: value.expense_type, expense_amount: 0 };
              result.push(res[value.expense_type])
              setchart_data(result)
            }
            res[value.expense_type].expense_amount += value.expense_amount;
           //console.log(res)
            return res;
          }, []);
          //console.log(result)      
      })
      } catch (error) {
        //console.log(error);
      }
      
  }
   

  return (
    <>
    {/* <Formarray /> */}
    {/* <Pagination /> */}
    {/* <Pagination2 /> */}
    {/* <Scroll /> */}
    {/* <Linechart /> */}
    
    <Router>
    <Dashboard_nav user_detail={user_detail} get_user_data={get_user_data}/>
      <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
        
        <Route path="/expense_tracker" element={
        <Protected_Route><Expense_tracker
        chart_data={chart_data} user_email={user_email} expense_details=
        {expense_details} get_user_data={get_user_data} /></Protected_Route>
        } />
        
         
         
        
      </Routes>
    </Router>
    
    </>
  );
}

export default App;
