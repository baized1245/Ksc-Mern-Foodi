import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";

const Cards = ({ item }) => {
  const { name, image, price, recipe, _id } = item;
  const [isHeartFillted, setIsHeartFillted] = useState(false);
  const { user } = useContext(AuthContext);

  // redirecting to home or specific page
  const location = useLocation();
  const navigate = useNavigate();

  // add to cart btn
  const handleAddToCart = (item) => {
    if (user && user?.email) {
      const cartItem = {
        menuItemId: _id,
        name,
        quantity: 1,
        image,
        price,
        email: user.email,
      };
      fetch("https://foodi-server-mdbaizedhasans.vercel.app/carts", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(cartItem),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Item Saved in the Cart!",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    } else {
      Swal.fire({
        title: "Please Login",
        text: "Without an account can't able to add products",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Signup Now",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/signup", { state: { from: location } });
        }
      });
    }
  };

  const handleHeartFillted = () => {
    setIsHeartFillted(!isHeartFillted);
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl relative">
      <div
        className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-green ${
          isHeartFillted ? "text-rose-500" : "text-white"
        }`}
        onClick={handleHeartFillted}
      >
        <FaHeart className="h-5 w-5 cursor-pointer" />
      </div>
      <Link
        to={`https://foodi-server-mdbaizedhasans.vercel.app/menu/${item._id}`}
      >
        <figure>
          <img
            src={item.image}
            alt="Shoes"
            className="hover:scale-105 transition-all duration-300 md:h-72"
          />
        </figure>
      </Link>
      <div className="card-body">
        <Link
          to={`https://foodi-server-mdbaizedhasans.vercel.app/menu/${item._id}`}
        >
          <h2 className="card-title">{item.name}</h2>
        </Link>
        <p>Description of the item</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            <span className="text-sm text-red">$</span> {item.price}
          </h5>
          <button
            className="btn bg-green text-white"
            onClick={() => handleAddToCart(item)}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
