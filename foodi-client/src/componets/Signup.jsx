import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa'
import Modal from './Modal'
import { AuthContext } from '../context/AuthProvider'

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { createUser, signUpwithGamil, setLoading } = useContext(AuthContext)

  // redirecting to home or specific page
  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from?.pathname || '/'

  // Signup method: create user
  const onSubmit = (data) => {
    const email = data.email
    const password = data.password
    createUser(email, password)
      .then((result) => {
        const user = result.user
        alert('user created successfully')
        navigate(from, { replace: true })
      })
      .catch((error) => {
        setLoading(false)
        const errorCode = error.code
        const errorMessage = error.message
      })
  }

  // google signIn
  const handleGoole = () => {
    signUpwithGamil()
      .then((result) => {
        const user = result.user
        // sweet alart will be implemented
        alert('Login success')
        navigate(from, { replace: true })
      })
      .catch((error) => {
        setLoading(false)
        console.log(error)
      })
  }

  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-52">
      <div className="modal-action flex flex-col justify-center mt-0">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body"
          method="dialog"
        >
          <h3 className="font-bold text-lg">Create an account</h3>
          {/* email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              {...register('email')}
            />
          </div>
          {/* password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              {...register('password')}
            />
            <label className="label mt-1">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>

          {/* error */}

          {/* login btn */}
          <div className="form-control mt-6">
            <input type="submit" value="Signup" className="btn bg-green" />
          </div>
          <p>
            Already have an account?{' '}
            <button
              onClick={() => document.getElementById('my_modal_5').showModal()}
              className="underline text-rose-600"
            >
              Login Now
            </button>
          </p>
          <Link
            to="/"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-0"
          >
            X
          </Link>
        </form>
        {/* social sign in */}
        <div className="text-center space-x-3 mb-5">
          <button
            onClick={handleGoole}
            className="btn btn-circle hover:bg-green hover:text-white"
          >
            <FaGoogle />
          </button>
          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaFacebook />
          </button>
          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaGithub />
          </button>
        </div>
      </div>
      <Modal />
    </div>
  )
}

export default Signup
