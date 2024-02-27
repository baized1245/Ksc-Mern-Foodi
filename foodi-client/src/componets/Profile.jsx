import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'

const Profile = ({ user }) => {
  const { logOut, setLoading } = useContext(AuthContext)

  // logout user
  const handleLogout = () => {
    logOut()
      .then(() => {
        alert('Logout successfully')
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        console.log(error)
      })
  }

  return (
    <div>
      <div className="drawer drawer-end z-50">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              {user?.photoURL ? (
                <img src={user?.photoURL} />
              ) : (
                <img src="https://img.freepik.com/free-psd/3d-illustration-person-with-long-hair_23-2149436197.jpg?size=626&ext=jpg&uid=R110489875&ga=GA1.1.1162881527.1690013272&semt=sph" />
              )}
            </div>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <a href="/update-profile">Profile</a>
            </li>
            <li>
              <a>Order</a>
            </li>
            <li>
              <a>Setting</a>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Profile
