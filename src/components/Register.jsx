import React, { useState } from "react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import app from "../firebase/firebase.config";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const twitterProvider = new TwitterAuthProvider();

const Register = () => {
  const [error, setError] = useState("");
  const [isShowFirstPass, setIsShowFirstPass] = useState(true);
  const [isShowSecondPass, setIsShowSecondPass] = useState(true);
  const [isTermsChecked, setIsTermsChecked] = useState(false);

  // Password Show/Hidden Handle
  const handleFirstPass = () => {
    setIsShowFirstPass(!isShowFirstPass);
    if (isShowFirstPass) {
      document.getElementById("password").type = "text";
    } else {
      document.getElementById("password").type = "password";
    }
  };
  const handleSecondPass = () => {
    setIsShowSecondPass(!isShowSecondPass);
    if (isShowSecondPass) {
      document.getElementById("confirmPassword").type = "text";
    } else {
      document.getElementById("confirmPassword").type = "password";
    }
  };

  // Automatic remove error message
  if (error) {
    setTimeout(() => {
      setError("");
    }, 5000);
  }

  // Additional providers access authentication
  const googleRegister = () => {
    signInWithPopup(auth, googleProvider)
      .then(() => {
        toast.success("Successfully registered!");
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  const githubRegister = () => {
    signInWithPopup(auth, githubProvider)
      .then(() => {
        toast.success("Successfully registered!");
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  const twitterRegister = () => {
    signInWithPopup(auth, twitterProvider)
      .then(() => {
        toast.success("Successfully registered!");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  // Email Password register authentication
  const handleOnSubmitData = (event) => {
    event.preventDefault();
    const eventTarget = event.target;
    const name = eventTarget.name.value;
    const email = eventTarget.email.value;
    const password = eventTarget.password.value;
    const confirmPassword = eventTarget.confirmPassword.value;

    // Check Password Validation
    if (!password || !confirmPassword) {
      setError("*Please enter a password!");
      return;
    } else if (password !== confirmPassword) {
      eventTarget.password.value = "";
      eventTarget.confirmPassword.value = "";
      setError("*Password doesn't match!");
      return;
    } else if (password) {
      const regex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/;
      if (!regex.test(password)) {
        setError("*Enter a strong password!");
        return;
      } else if (password.length < 6) {
        setError("*Enter a password with at least 6 digits!");
        return;
      }
    }

    // Register New User In Firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        if (!isTermsChecked) {
          setError("*Please agree to the terms and conditions!");
          return;
        } else {
          updateProfileInfo(result.user, name);
          sendVerification(result.user);
          console.log(result.user);
        }
      })
      .catch((error) => {
        if (error.message == "Firebase: Error (auth/email-already-in-use).") {
          if (!isTermsChecked) {
            setError("*Please agree to the terms and conditions!");
            return;
          }
          setError("Your email already exists!");
          event.target.reset();
        }
        console.log(error.message);
      });
    // Update User Name
    const updateProfileInfo = (user, name) => {
      <Link to={"/"}></Link>;
      updateProfile(user, {
        displayName: name,
      })
        .then(() => {})
        .catch((error) => {
          setError(error.message);
        });
    };
    // Send user verification email
    const sendVerification = (user) => {
      sendEmailVerification(user)
        .then(() => {
          toast("Please verify your email!", {
            icon: "💌",
          });
          event.target.reset();
        })
        .catch((error) => {
          setError(error.message);
        });
    };
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Registration Form</h1>
      <form
        onSubmit={handleOnSubmitData}
        className="w-full max-w-sm mx-auto bg-white p-4 sm:p-8 rounded-md shadow-md relative"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="name"
          >
            Name
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="text"
            id="name"
            name="name"
            placeholder="Prodip Karati"
            required
          />
        </div>
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
        <div className="mb-4">
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
            />
            {isShowFirstPass ? (
              <EyeSlashIcon
                onClick={handleFirstPass}
                className="w-5 h-5 text-gray-400"
              />
            ) : (
              <EyeIcon
                onClick={handleFirstPass}
                className="w-5 h-5 text-gray-400"
              />
            )}
          </div>
        </div>
        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="confirmPassword"
          >
            Confirm Password
          </label>
          <div className="w-full flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus-within:border-indigo-500">
            <input
              className="outline-none w-full"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="******"
            />
            {isShowSecondPass ? (
              <EyeSlashIcon
                onClick={handleSecondPass}
                className="w-5 h-5 text-gray-400"
              />
            ) : (
              <EyeIcon
                onClick={handleSecondPass}
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
              checked={isTermsChecked}
              onChange={() => setIsTermsChecked(!isTermsChecked)}
            />
            <label htmlFor="remember-me" className="text-gray-500">
              I accept the{" "}
              <a
                href="#"
                className="underline underline-offset-2 font-semibold"
              >
                Terms and Conditions
              </a>
            </label>
          </div>
        </div>
        <p className="h-6">
          {error && <small className="text-red-500">{error}</small>}
        </p>
        <button
          className="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 my-2 rounded-md hover:bg-indigo-600 transition duration-300"
          type="submit"
        >
          Register
        </button>
        <p className="text-center text-sm">Or</p>
        <ul className="flex gap-5 items-center justify-center mt-1 mb-4">
          <li
            onClick={googleRegister}
            className="w-8 bg-gray-200 p-1 rounded-full"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/150px-Google_%22G%22_Logo.svg.png"
              alt="logo"
            />
          </li>
          <li
            onClick={githubRegister}
            className="w-8 bg-gray-200 p-1 rounded-full"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/2048px-Octicons-mark-github.svg.png"
              alt="logo"
            />
          </li>
          <li
            onClick={twitterRegister}
            className="w-8 bg-gray-200 p-1 rounded-full"
          >
            <img
              src="https://png.pngtree.com/png-vector/20221018/ourmid/pngtree-twitter-social-media-round-icon-png-image_6315985.png"
              alt="logo"
            />
          </li>
        </ul>
        <hr />
        <p className="text-center mt-2">
          Already have an account?{" "}
          <span className="text-indigo-500 font-semibold underline underline-offset-2">
            <Link to={"/"}>Login</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
