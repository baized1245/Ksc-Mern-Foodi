import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../context/AuthProvider'
import { useLocation, useNavigate } from 'react-router-dom'

const UpdateProfile = () => {
  const { updateUserProfile } = useContext(AuthContext)

  // redirecting to home or specific page
  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from?.pathname || '/'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    const name = data.name
    const photoURL = data.photoURL
    updateUserProfile(name, photoURL)
      .then(() => {
        alert('Your Profile Update successfully')
        navigate(from, { replace: true })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <h3 className="font-bold">Update Your Profile</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Your Name"
              className="input input-bordered"
              {...register('name')}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Upload Photo</span>
            </label>
            <input
              type="text"
              placeholder="PhotoURL"
              className="input input-bordered"
              {...register('photoURL')}
            />
            {/* Todo uploading image will be here */}
            {/* <input type="file" className="file-input w-full max-w-xs" /> */}
          </div>
          <div className="form-control mt-6">
            <button className="btn bg-green text-white">Update</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateProfile
