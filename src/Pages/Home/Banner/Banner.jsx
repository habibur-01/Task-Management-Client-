
import { Link } from "react-router-dom";
import "./banner.css"

const Banner = () => {
   

    return (
        <div className="banner flex justify-center items-center">
        <div className=' lg:w-1/2 w-3/4 sm:bg-white/10 backdrop-blur-sm shadow-md flex flex-col justify-center items-center space-y-4 text-white sm:border-[#ff9f9f] h-80 bg-opacity-75 rounded-md sm:backdrop-blur-sm'>
                <h1 className='text-4xl font-bold uppercase text-center '>Make Your life easy by <br/>organize your task</h1>
                <Link to={'/login'}><button className='btn bg-[#ff9f9f] border-none hover:scale-105'>Explore it!</button></Link>
            </div>


        </div>
    );
};

export default Banner;