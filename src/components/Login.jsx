import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import app from "../firebase/firebase.config";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const auth = getAuth(app);
const Login = () => {
  const [error, setError] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(true);

  // Automatic remove error message
  if (error) {
    setTimeout(() => {
      setError("");
    }, 5000);
  }

  // Password Show/Hidden Handle
  const handlePassword = () => {
    setIsShowPassword(!isShowPassword);
    if (isShowPassword) {
      document.getElementById("password").type = "text";
    } else {
      document.getElementById("password").type = "password";
    }
  };

  // Handle Login Data
  const loginUser = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        if (!result.user.emailVerified) {
          setError("*Please verify your email!");
          return;
        }
        toast.success("Successfully login!");
        event.target.reset();
      })
      .catch((error) => {
        if (error.message == "Firebase: Error (auth/wrong-password).") {
          setError("Your password doesn't match!");
        }
        console.log(error.message);
      });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Login Form</h1>
      <form
        onSubmit={loginUser}
        className="w-full max-w-sm mx-auto bg-white p-4 sm:p-8 rounded-md shadow-md"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="email"
          >
            Email
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="email"
            id="email"
            name="email"
            placeholder="prodip@example.com"
            required
          />
        </div>
        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <div className="w-full flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus-within:border-indigo-500">
            <input
              className="outline-none w-full"
              type="password"
              id="password"
              name="password"
              placeholder="******"
              required
            />
            {isShowPassword ? (
              <EyeSlashIcon
                onClick={handlePassword}
                className="w-5 h-5 text-gray-400"
              />
            ) : (
              <EyeIcon
                onClick={handlePassword}
                className="w-5 h-5 text-gray-400"
              />
            )}
          </div>
        </div>
        <div className="flex gap-10">
          <div>
            <input
              type="checkbox"
              name="remember-me"
              id="remember-me"
              className="mr-2"
            />
            <label htmlFor="remember-me" className="text-gray-500">
              Remember me
            </label>
          </div>
          <button className="font-semibold">Forgot Password?</button>
        </div>
        <p className="h-6">
          {error && <small className="text-red-500">{error}</small>}
        </p>
        <button
          className="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 mt-2 mb-4 rounded-md hover:bg-indigo-600 transition duration-300"
          type="submit"
        >
          Login
        </button>
        <hr />
        <p className="text-center mt-2">
          Don't you have an account yet?{" "}
          <span className="text-indigo-500 font-semibold underline underline-offset-2">
            <Link to={"/register"}>Register</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
