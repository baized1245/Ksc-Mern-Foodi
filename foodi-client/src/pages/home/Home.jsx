import React from 'react';
import Banner from '../../componets/Banner';
import Categories from './Categories';
import SpecialDishes from './specialDishes';
import Testimonials from './Testimonials';
import OurServices from './OurServices';


const Home = () => {
    return (
        <div>
            <Banner/>
            <Categories/>
            <SpecialDishes/>
            <Testimonials/>
            <OurServices/>
        </div>
    );
};

export default Home;