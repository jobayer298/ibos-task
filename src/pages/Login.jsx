import React, { useContext } from 'react';
import img from '../assets/login.png'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { toast } from 'react-hot-toast';

const Login = () => {
    const { login, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleSubmit = (event) => {
      event.preventDefault();
      const form = event.target;
      const email = form.email.value;
      const password = form.password.value;
      console.log(email, password);
      login(email, password)
        .then((result) => {
          console.log(result.user);
          toast.success("login successful")
          navigate("/")
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
              {/* <p className="text-red-500">{error}</p> */}
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
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
              <p>
                Don't have any account?
                <Link className="font-bold underline" to="/register">
                  register
                </Link>
              </p>
              <div className="divider">Or login with</div>
            </form>
            <div className="text-center mb-5">
              <button className="btn btn-circle btn-primary btn-outline">
                G
              </button>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Login;