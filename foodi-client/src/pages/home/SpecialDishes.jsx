import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Cards from "../../componets/Cards";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const simpleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    >
      Next
    </div>
  );
};

const simplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    >
      BACK
    </div>
  );
};

const SpecialDishes = () => {
  const [recipes, setRecipes] = useState([]);
  const slider = React.useRef(null);

  useEffect(() => {
    fetch("https://foodi-server-mdbaizedhasans.vercel.app/menu")
      .then((res) => res.json())
      .then((data) => {
        const specials = data.filter((item) => item.category === "popular");
        setRecipes(specials);
        // console.log(recipes);
      });
  }, []);

  // settings
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],

    nextArrow: <simpleNextArrow />,
    PrevArrow: <simplePrevArrow />,
  };

  return (
    <div className="section-container my-20 relative">
      <div className="text-left">
        <p className="subtitle">Special Dishes</p>
        <h2 className="title md:w-[520px]">Standout Dishes From Our Menu</h2>
      </div>
      {/* Arrow btn */}
      <div className="md:absolute flex  right-3 top-8 mb-10 md:mr-24">
        <button
          onClick={() => slider?.current?.slickPrev()}
          className="btn p-2 rounded-full ml-5 "
        >
          <FaAngleLeft className="w-8 h-8 p-1" /> Prev
        </button>
        <button
          onClick={() => slider?.current?.slickNext()}
          className="btn p-2 rounded-full ml-5 bg-green"
        >
          Next <FaAngleRight className="w-8 h-8 p-1" />
        </button>
      </div>
      <Slider
        ref={slider}
        {...settings}
        className="overflow-hidden mt-10 space-x-5"
      >
        {recipes.map((item, i) => (
          <Cards key={i} item={item} />
        ))}
      </Slider>
    </div>
  );
};

export default SpecialDishes;
