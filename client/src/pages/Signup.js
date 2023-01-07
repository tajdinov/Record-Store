import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";

function Signup(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <>
      <div className=" w-full h-screen ">
        <div className=" w-full px-4 py-2 z-50">
          <div className=" max-w-[450px] h-[500px] mx-auto  dark:bg-black/80 bg-white border-2 border-white/10 text-slate-800 dark:text-white rounded-md">
            <div className=" max-w-[320px] mx-auto py-6"></div>
            <h2 className="text-3xl font-bold pl-4">Sign Up</h2>
            <form
              onSubmit={handleFormSubmit}
              className=" w-full flex flex-col py-2 px-4"
            >
              <label htmlFor="firstName"></label>
              <input
                className="p-3 my-2 bg-gray-200 rounded focus:outline-none text-black/60"
                placeholder="First Name"
                name="firstName"
                type="firstName"
                id="firstName"
                onChange={handleChange}
              />
              <label htmlFor="lastName"></label>
              <input
                className="p-3 my-2 bg-gray-200 rounded focus:outline-none text-black/60"
                placeholder="Last Name"
                name="lastName"
                type="lastName"
                id="lastName"
                onChange={handleChange}
              />
              <label htmlFor="email"></label>
              <input
                className="p-3 my-2 bg-gray-200 rounded focus:outline-none text-black/60"
                placeholder="Youremail@test.com"
                name="email"
                type="email"
                id="email"
                onChange={handleChange}
              />
              <label htmlFor="pwd"></label>
              <input
                className="p-3 my-2 bg-gray-200 rounded focus:outline-none text-black/60"
                placeholder="Password"
                name="password"
                type="password"
                id="pwd"
                onChange={handleChange}
              />

              <div className="mt-4">
                <button
                  className="  w-[100px] rounded border-2 bg-white hover:bg-stone-800 dark:bg-stone-800 p-2 dark:hover:bg-white text-stone-800 hover:text-white dark:text-white dark:hover:text-stone-800 duration-300 "
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
              <div className="">
                <p className=" py-10  text-slate-800 dark:text-white">
                  Already registered?
                  <Link
                    to="/login"
                    className="  text-black dark:text-white  hover:text-sky-700 dark:hover:text-sky-200  duration-500 pl-2"
                  >
                    Log In
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
