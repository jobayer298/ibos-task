import React, { useContext, useEffect, useState } from "react";
import img from "../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { getAuth, updateProfile } from "firebase/auth";
import { toast } from "react-hot-toast";
import app from "../firebase/firebase.config";
const auth = getAuth(app);

const Register = () => {
  const [error, setError] = useState("");
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const navigate = useNavigate();
  const { googleSignIn, createUser, logout } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    const form = event.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    const newUser = { name, email };
    createUser(email, password)
      .then((result) => {
        console.log(result.user);
        toast.success("Registration successful");
          const existingUsersData = localStorage.getItem("registeredUsers");
          let existingUsers = [];
          if (existingUsersData) {
            existingUsers = JSON.parse(existingUsersData);
          }

          // Add the new user to the list of registered users
          const newUser = { name, email };
          const updatedUsers = [...existingUsers, newUser];
          localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

        navigate("/login");
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo,
        })
          .then(() => {
            console.log("profile updated");
            logout();
            navigate("/login");
          })
          .catch((error) => {
            console.log(error.message);
            setError(err.message);
          });
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
      });
  };
  const googleLogin = () => {
    googleSignIn()
      .then((result) => {
        toast.success("Login successful");
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="hero py-14 ">
      <div className="hero-content grid grid-cols-1 md:grid-cols-2">
        <div className="text-center ">
          <img src={img} alt="" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit} className="card-body">
            <p className="text-red-500">{error}</p>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                name="name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                placeholder="Photo URL"
                name="photo"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>
            <p>
              Already have an account?{" "}
              <Link className="font-bold underline" to="/login">
                Login
              </Link>
            </p>
            <div className="divider">Or login with</div>
          </form>
          <div className="text-center mb-5">
            <button
              onClick={googleLogin}
              className="btn btn-circle btn-primary btn-outline"
            >
              G
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
