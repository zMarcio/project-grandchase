"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation'
import { User } from "@/interface/user_interface";

type Inputs = {
  email: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<Inputs>(); // Usar o hook form

  const router = useRouter(); // userRouter necessary for redirection page

  // bellow is the code received submit from the form and send to the server, returning the response to the user, and redirecting to the home page.
  const onSubmit: SubmitHandler<Inputs> = async data => {
    const str: string = `email: ${data.email}, password: ${data.password}`;
    console.log(str); // Log the data

    try {
      const userResponse =  await axios.get<User>('/api/controller/userCrud/loginUser/findEmail', { params : { email: data.email } }); // Get the user from the server
    
      const user : User = userResponse.data;
      
      const response = await axios.post('/api/controller/userCrud/loginUser/userPost', data); // Post the data to the server

      console.log(response); // Log the response

      if (response.status === 200) {
        let userFL: string[] = user.name.split(' ');
        const userName: string = userFL[0] + " " + userFL[1];
        // redirect to the home page
        router.push(`/pages/homeUser?message=${encodeURIComponent(`Login Successful! Welcome, ${userName}!`)}`);
      } else {  
        console.error('Login failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }

    reset(); // reset the form
  };


  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" {...register('email')} />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" {...register('password')} />
        </div>

        <button type="submit">Submit</button>

      </form>
    </>
  );
}
