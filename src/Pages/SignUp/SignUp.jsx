import { useState } from "react";
import { CiLock, CiUnlock } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css"
// import ImgUpload from "../../api/ImgUpload/ImgUpload";
import useAxiosSecure from "../../api/AxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth.jsx"
import { updateProfile } from "firebase/auth";
import { FaArrowLeftLong } from "react-icons/fa6";


const SignUp = () => {
    const [isPassView, setIsPassView] = useState(false)
    const axiosSecure = useAxiosSecure()
    const { crearteUser } = useAuth()
    const navigate = useNavigate()
    const today = new Date();
    const handleSignUp = (e) => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const email = form.email.value
        const password = form.password.value
        const gender = form.gender.value

        
        if (!/^(?=.*?[A-Z])(?=.*?[#?!@$%^&*-]).{6,}$/.test(password)) {
            return Swal.fire({
                position: "top-end",
                icon: "warning",
                title: "Minimum six characters, at least one uppercase & special charecter!",
                showConfirmButton: false,
                timer: 1500
            }); 

        }
        const userDetails = { name, email, password, gender, date: today, role: 'user' }

        crearteUser(email, password)
            .then(result => {
                const userInfo = result.user
                console.log(userInfo)
                updateProfile(result.user, {
                    displayName: name,
                    // photoURL: data?.data?.display_url
                })

                axiosSecure.post('/users', userDetails)
                    .then(res => {
                        if (res.data.insertedId) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Your registration successfull",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate('/login')
                        }
                    }).catch(err => {
                        console.log(err)
                        Swal.fire({
                            position: "top-end",
                            icon: "warning",
                            title: "Somthing is wrong!",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    })
            }).catch(err => {
                console.log(err)
            })


        console.log(userDetails)


    }
    return (
        <div className="w-full min-h-[100vh] flex justify-center items-center">
            <div className=" relative 2xl:w-1/3 xl:w-1/3 lg:w-2/5 md:w-1/2 sm:w-2/5 min-h-fit bg-white shadow-md rounded-md md:px-12 md:py-14 p-2 sm:border-2">
                <h1 className="text-center text-xl font-bold">Sign Up</h1>
                <p className="text-center mt-4 mb-6 font-thin">Please sign up for access your account</p>
                <form onSubmit={handleSignUp} action="" className="m-2 space-y-4 ">
                    <div className="flex flex-col space-y-4">
                        <label htmlFor="name">Your name</label>
                        <div className="inputField inline-flex items-center relative">
                            <input type="text" name="name" id="name" placeholder="type your name" required />
                            <div className="absolute right-2">
                                <FaRegUser size={20} />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <label htmlFor="gender">Your gender</label>
                        <div className="inputField inline-flex items-center relative">
                            <input type="text" name="gender" id="gender" placeholder="" required />
                            <div className="absolute right-2">
                                <FaRegUser size={20} />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <label htmlFor="email">Email address</label>
                        <div className="inputField inline-flex items-center relative">
                            <input type="email" name="email" id="email" placeholder="type your email" required />
                            <div className="absolute right-2">
                                <MdOutlineMail size={20} />
                            </div>
                        </div>
                    </div>
                    <div className="inputField flex flex-col space-y-4">
                        <label htmlFor="password">Password</label>
                        <div className="inline-flex items-center relative">
                            <input type={isPassView ? "text" : "password"} name="password" id="password" autoComplete="off" placeholder="type password" required />
                            <div onClick={() => setIsPassView(!isPassView)} className="absolute right-2">
                                {isPassView ? <CiUnlock size={20} /> : <CiLock size={20} />}
                            </div>
                        </div>
                    </div>
                    <div className="w-full btn1">
                        <button type="submit">Continue</button>
                        <p className="text-xs md:text-sm mt-1">{`Don't have an account?`}<Link to={"/login"}> <span className="text-[#646cff] font-bold">Login</span></Link></p>
                    </div>
                </form>
                <div className="absolute top-6 left-4">
                    <Link to={"/"}><FaArrowLeftLong/></Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;