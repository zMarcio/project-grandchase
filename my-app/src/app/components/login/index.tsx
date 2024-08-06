// FALTA COLOCAR RESTRUIRÇÕES PARA O USUÁRIO, LOGAR O ERROS COMO TICKET
"use client";
import axios from "axios";
import React from "react";
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation'
import { User } from "@/interface/user_interface";

type Inputs = {
  nickname: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>(); // Usar o hook form
  const router = useRouter(); // userRouter necessary for redirection page


  // bellow is the code received submit from the form and send to the server, returning the response to the user, and redirecting to the home page.
  const onSubmit: SubmitHandler<Inputs> = async data => {
    // Validation of the data is here!
    const str: string = `Nickname: ${data.nickname}, password: ${data.password}`; // is commented because it is not necessary to log the data
    console.log(str); // Log the data

    try {
      const userResponse =  await axios.get<User>('/api/controller/userCrud/loginUser/findEmail', { params : { nickname: data.nickname } }); // Get the user from the server
    
      const user : User = userResponse.data;
      
      const response = await axios.post('/api/controller/userCrud/loginUser/userPost', data); // Post the data to the server

      console.log(response); // Log the response

      if (response.status === 200) {

        router.push(`/pages/homeUser?message=${encodeURIComponent(`Login Successful! Welcome, ${user.nickname}!`)}`);

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
          <label htmlFor="nickname">
            Nickname:
            <input type="nickname" id="nickname" {...register('nickname')} />
          </label>
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
