import React, { useState } from "react";
import { use } from "react";
import AuthContext from "../contexts/AuthContext";
import { Link, useLocation, useNavigate } from "react-router";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";

const Signup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const { user, setUser, createUser, signInWithGoogle } = use(AuthContext);

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordShown((prev) => !prev);
  };
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch(() => {});
  };
  const handleCreateUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    if (name.length < 5) {
      setError("Name should be more then 5 character");
      return;
    } else {
      setError("");
    }
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    const passwordRegExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (passwordRegExp.test(password) === false) {
      setError(
        "Password must have one lowercase, one uppercase, one digit and 8 characters or longer."
      );
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo,
        })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });

            navigate(`${location.state ? location.state : "/"}`);
          })
          .catch(() => {
            setUser(user);
          });
      })
      .catch(() => {});
  };

  return (
    <div>
   
      <div className="z-10 flex flex-col justify-center items-center  h-screen ">
        <div className="space-y-6 bg-white shadow-2xl p-10 rounded-md ">
          <h1 className="text-center text-5xl font-serif">Sign Up </h1>
          <form onSubmit={handleCreateUser} className="space-y-6 w-md ">
            <div className="relative">
              <input
                placeholder="john@example.com"
                className="peer h-10 w-full  border-b-2 border-slate-300 text-slate-400 
            bg-transparent placeholder-transparent focus:outline-none
             focus:border-slate-600"
                required
                id="name"
                name="name"
                type="text"
              />
              <label
                className="absolute left-0 -top-3.5 text-slate-300 text-sm 
            transition-all 
            peer-placeholder-shown:top-2 peer-focus:-top-4.5
             peer-focus:text-slate-400 
            peer-focus:text-base"
                htmlFor="name"
              >
                Name
              </label>
            </div>
            <div className="relative">
              <input
                placeholder="john@example.com"
                className="peer h-10 w-full  border-b-2 border-slate-300 text-slate-400 
            bg-transparent placeholder-transparent focus:outline-none
             focus:border-slate-600"
                required
                id="email"
                name="email"
                type="email"
              />
              <label
                className="absolute left-0 -top-3.5 text-slate-300 text-sm 
            transition-all 
            peer-placeholder-shown:top-2 peer-focus:-top-4.5
             peer-focus:text-slate-400 
            peer-focus:text-base"
                htmlFor="email"
              >
                Email address
              </label>
            </div>

            <div className="relative">
              <input
                placeholder="Password"
                className="peer h-10 w-full  border-b-2 border-slate-300 text-black 
            bg-transparent placeholder-transparent focus:outline-none
             focus:border-slate-600"
                required
                id="password"
                name="password"
                type={passwordShown ? "text" : "password"}
              />
              <label
                className="absolute  left-0 -top-3.5 text-slate-400 text-sm 
            transition-all 
            peer-placeholder-shown:top-2 peer-focus:-top-4.5
             peer-focus:text-slate-400 
            peer-focus:text-base"
                htmlFor="password"
              >
                Password
              </label>

              <div
                className="absolute right-3 top-2.5 cursor-pointer text-xl text-gray-600"
                onClick={togglePasswordVisibility}
              >
                {passwordShown ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            <div className="relative">
              <input
                placeholder="Url"
                className="peer h-10 w-full  border-b-2 border-slate-300 text-slate-400 
            bg-transparent placeholder-transparent focus:outline-none
             focus:border-slate-600"
                id="photo"
                name="photo"
                type="text"
              />
              <label
                className="absolute left-0 -top-3.5 text-slate-300 text-sm 
            transition-all 
            peer-placeholder-shown:top-2 peer-focus:-top-4.5
             peer-focus:text-slate-400 
            peer-focus:text-base"
                htmlFor="photo"
              >
                PhotoUrl
              </label>
            </div>

            <div className="flex items-center justify-between">
              {/* <label className="flex items-center text-sm text-gray-200">
            <input
              className="form-checkbox h-4 w-4 text-purple-600 bg-gray-800 border-gray-300 rounded"
              type="checkbox"
              checked
            />
            <span className="ml-2">Remember me</span>
          </label> */}

              <a className="text-sm text-blue-300 hover:underline" href="#">
                Forgot your password?
              </a>

              <Link
                to={`/login`}
                className="text-sm text-blue-300 hover:underline"
                href="#"
              >
                Create Account
              </Link>
            </div>
            <button
              className="w-full py-2 px-4 bg-slate-950  rounded-md shadow-lg text-white font-semibold transition duration-200"
              type="submit"
            >
              Sign In
            </button>
          </form>

          <button
            onClick={handleGoogleSignIn}
            className="btn bg-white text-black border-[#e5e5e5] w-md"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
