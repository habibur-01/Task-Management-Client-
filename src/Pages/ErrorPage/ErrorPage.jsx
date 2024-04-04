import { Link } from 'react-router-dom';
import errorpic from '../../assets/Error/humanerror.png'

const ErrorPage = () => {
    return (
        <div className='max-w-full min-h-screen flex justify-center items-center'>
            <div className=''>
                <div className='max-w-[400px] max-h-[400px]'>
                    <img className='w-full h-full overflow-hidden object-cover' src={errorpic} alt="error" />
                </div>
                <div className='text-center'>
                    <h1 className='text-xl'>{`Oops! Something's wrong`}</h1>
                    <p className='font-thin'>{`We can't seem to find the page you're looking for. `}</p>
                      {/* #336aea */}
                    <p><Link to={"/"}><button className='bg-lime-700 p-2 rounded-md mt-4 text-white'>Back to home</button></Link></p>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;