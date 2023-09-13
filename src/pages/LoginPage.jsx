import { useState } from "react";
import Supabase from "../Supabase/Client"
import { useNavigate } from 'react-router-dom'


function LoginPage() {
  let Navigate = useNavigate()
  const [phonenumber, setphonenumber] = useState("");
  async function handlelogin(e, number) {
    e.preventDefault();
    try {
      let { data, error } = await Supabase.auth.signInWithOtp({
        phone: "91" + number
      })
      if (error) throw error
      Navigate('/otp',{ state: {number:number} })
      alert('check your phone for otp')
    }
    catch (error) {
      alert(error)
    }
  }

  return (
    <>
      <div className=" w-full h-[100vh] flex flex-col flex-1 items-center justify-center bg-[url('./assets/rest.jpg')] bg-cover">
        <div className=" bg-blue-500 rounded-3xl px-4">
          <div>
            <h1 className=" my-10 flex text-6xl text-cyan-50">Welcome</h1>
          </div>
          <div className=" flex items-center ">
            <form id='login-form' method='POST' onSubmit={(e) => handlelogin(e, phonenumber)}>
              <div className=" flex items-center text-4xl text-white"> <label htmlFor="phone number">Plese enter a Phone Number</label> </div>
              <div className=" my-5 flex items-center text-3xl"> <input phone number="phone number" placeholder='Enter here...' type='text' value={phonenumber} onChange={(e) => setphonenumber(e.target.value)} /> </div>
              <div className=" mx-28 my-10 w-24 flex items-center text-3xl bg-violet-600 hover:text-red-400 px-1 rounded-xl"> <button type='submit' >LOGIN</button></div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
