import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";

function Login(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className=" w-full h-screen ">
      <div className=" w-full px-4 py-2 z-50">
        <div className=" max-w-[450px] h-[450px] mx-auto   bg-white border-2 border-white/10 text-slate-800  rounded-md">
          <div className=" max-w-[320px] mx-auto py-10"></div>
          <h2 className="text-3xl font-bold pl-4">Login</h2>
          <form
            onSubmit={handleFormSubmit}
            className=" w-full flex flex-col py-2 px-4"
          >
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

            {error ? (
              <div>
                <p className=" text-red-600 pt-4">
                  Provided credentials are incorrect
                </p>
              </div>
            ) : null}

            <div className="mt-4">
              <button
                className="  w-[100px] rounded border-2 bg-white hover:bg-stone-800  p-2  text-stone-800 hover:text-white  duration-300 "
                type="submit"
              >
                Login
              </button>
            </div>
            <p className=" py-8 text-slate-800 ">
              <span>Not registered?</span>
              <Link
                to="/signup"
                className="  text-black  hover:text-sky-700   duration-500 pl-2"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
