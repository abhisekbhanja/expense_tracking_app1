import axios from 'axios';
import {React,  useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
    const {register,handleSubmit,watch,formState: { errors },} = useForm();
      const password = useRef({});
      password.current = watch("password", "");
      const [loading, setloading] = useState(false)
      const [err, seterr] = useState(false)
      const navigate=useNavigate()

    const add_user=async(data)=>{
        //console.log(data);
        setloading(true)
        try {
           const result=await axios.post('http://localhost:7000/register',data);
           if (result) {
            setloading(false)
            seterr(result.status)
            navigate('/')
           }
           else{console.log(result.response.status)
            console.log("internal error try after sometime")}
        } catch (error) {
          setloading(false)
            console.log(error.response.status)
            seterr(error.response.status)
            console.log("internal error try after sometime")
        }
    }

  return (
    <div>
         <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-header text-center">
                        <h4>Create Your Account Here</h4>                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(add_user)}>
                        <div className="form-group">
                                <label htmlFor="email">Name</label>
                                <input type="text" className={errors.name ? "form-control is-invalid" : "form-control"} placeholder="Enter your name"
                                {...register("name", { required: "this field is required" })} />
                                <p className="text-danger">{errors.name?.message}</p>
                            </div>
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
                            <div className="form-group">
                                <label htmlFor="password">Confirm Password</label>
                                <input type="password" className={errors.confirm_password ? "form-control is-invalid" : "form-control"} 
                                placeholder="Confirm Password"
                                {...register('confirm_password',{required: "this field is rquired",
              validate: value =>
              value === password.current || "The passwords do not match"})}
              
              autoComplete="on"
            />

                                <p className="text-danger">{errors.confirm_password?.message}</p>
                            </div>
                            <button type="submit" className="btn btn-success btn-block">
                              {loading?"loading...":"Create Account"}
                            </button>

                            <div className='text-danger pt-2'>{err===500?
                            <p className='text-danger'>internal error try after sometime</p>:
                            err===200?<p className='text-success'>account created successfully</p>:
                            err===422?<p className='text-danger'>email already exist</p>:" "}</div>   
                        <p className='mt-3'>already have account ? click <Link to="/">here</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}
