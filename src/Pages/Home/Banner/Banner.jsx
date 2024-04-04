
import "./banner.css"

const Banner = () => {
   

    return (
        <div className="banner flex justify-center items-center">
        <div className=' w-1/2 bg-[#464650] shadow-md flex flex-col justify-center items-center space-y-4 text-white border-[1px] h-80 bg-opacity-75 rounded-md backdrop-blur-sm'>
                <h1 className='text-4xl font-bold uppercase text-center '>Make Your life easy by <br/>organize your task</h1>
                <button className='btn bg-[#ff9f9f] border-none hover:scale-105'>Explore it!</button>
            </div>


        </div>
    );
};

export default Banner;