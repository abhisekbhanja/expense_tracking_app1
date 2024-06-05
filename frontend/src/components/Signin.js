import React, { useState } from 'react';
import "./expense_tracker.css"
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function Signin() {
    const {register,handleSubmit,watch,formState: { errors },} = useForm();
    const navigate=useNavigate()
    const [loading, setloading] = useState(false)
    const [err, seterr] = useState(false)

    const login_user=async(data)=>{
        //console.log(data);
        setloading(true)
        try {
           const result=await axios.post('http://localhost:7000/login',data);
           if (result.status===200) {
            localStorage.setItem("usertoken",result.data.token)
           
            navigate("/expense_tracker")
           }
           else{console.log(result.response.status)}
        } catch (error) {
            setloading(false)
            seterr(error.response.status)
        }
    }
  return (
    <div>
       <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-header text-center">
                        <h2>Sign in Here</h2>                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(login_user)}>
                        <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input type="text" className={errors.email ? "form-control is-invalid" : "form-control"} placeholder="Enter email"
                                {...register("email", {
                                    required: "this field is rquired",
                                    pattern: {
                                      value:
                                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                      message: "give a valid email",
                                    },
                                  })} />

                            <p className="text-danger">{errors.email?.message}</p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className={errors.password ? "form-control is-invalid" : "form-control"} placeholder="Password"
                                {...register("password", { required: "this field is required" })} />
                                <p className="text-danger">{errors.password?.message}</p>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">
                            {loading?"loading...":"sign in"}
                            </button>
                            <div className='text-danger pt-2'>{err===500?
                            <p className='text-danger'>internal error try after sometime</p>:
                            err===200?<p className='text-success'>login successfully</p>:
                            err===401?<p className='text-danger'>invalid credentials</p>:" "}</div>
                        <p className='mt-3'>don't have account ? click <Link to="/signup">here</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}
