import { useEffect, useState } from "react";
import { CiLock, CiUnlock } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./login.css"
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../api/AxiosSecure/useAxiosSecure";
import useAdmin from "../../hooks/useAdmin";


const Login = () => {
    const [isPassView, setIsPassView] = useState(false)
    const { logInUser, createUserWithGoogle, user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [isAdmin] = useAdmin()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state?.from?.pathname || "/main/allusers" || "/main/addTask"
    const today = new Date();

    const handleLogIn = (e) => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value
        console.log(email, password)

        logInUser(email, password)
            .then(result => {
                console.log(result.user)
                navigate(from, { replace: true })

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
    }
    useEffect(() => {
        if (user) {
            const redirectTo = isAdmin ? "/main/allusers" : "/main/addTask";
            navigate(redirectTo, { replace: true });
        }
    }, [user, navigate, isAdmin]);

    const handleGoogleSignIn = () => {
        createUserWithGoogle()
            .then(result => {
                console.log(result.user)
                const user = { name: result.user.displayName, email: result.user.email, image: result.user.photoURL, date: today, role: 'user' }
                axiosSecure.post('/users', user)
                    .then(res => {
                        if (res.data.insertedId) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Your registration successfull",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }

                    }).then(() => {
                        const redirectTo = isAdmin ? "/main/allusers" : "/main/addTask";
                        navigate(redirectTo, { replace: true });
                    });


            }
            ).catch(err => {
                console.log(err)
                Swal.fire({
                    position: "top-end",
                    icon: "warning",
                    title: "Somthing is wrong!",
                    showConfirmButton: false,
                    timer: 1500
                });
            })

    }


    return (
        <div className="w-full min-h-[100vh] flex justify-center items-center">
            <div className="2xl:w-1/3 xl:w-1/3 lg:w-2/5 md:w-1/2 sm:w-2/5 min-h-[600px] bg-white shadow-md rounded-md md:px-12 md:py-14 p-2 sm:border-2">
                <h1 className="text-center text-xl font-bold">Log In</h1>
                <p className="text-center mt-4 mb-6 font-thin">Please sign in for access your account</p>
                <form onSubmit={handleLogIn} action="" className="m-2 space-y-4">
                    <div className="flex flex-col space-y-4">
                        <label htmlFor="email">Email address</label>
                        <div className="inputField inline-flex items-center relative">
                            <input type="email" name="email" id="email" placeholder="type your email" />
                            <div className="absolute right-2">
                                <MdOutlineMail size={20} />
                            </div>
                        </div>
                    </div>
                    <div className="inputField flex flex-col space-y-4">
                        <label htmlFor="email">Password</label>
                        <div className="inline-flex items-center relative">
                            <input type={isPassView ? "text" : "password"} name="password" id="password" autoComplete="off" placeholder="type password" />
                            <div onClick={() => setIsPassView(!isPassView)} className="absolute right-2">
                                {isPassView ? <CiUnlock size={20} /> : <CiLock size={20} />}
                            </div>
                        </div>
                    </div>
                    <div className="w-full btn1">
                        <button type="submit">Continue</button>
                    </div>
                </form>
                <div className="btn1 m-2">
                    <h1 className="text-sm text-center my-4">---Sign in with another way---</h1>
                    <button onClick={handleGoogleSignIn} className="inline-flex items-center justify-center space-x-4 bg-white googleBtn"><FcGoogle size={25} /> <span className="text-base hover:bold">Sign in with google</span></button>
                    <p className="text-xs md:text-sm mt-1">{`Don't have an account?`}<Link to={"/signup"}> <span className="text-[#646cff] font-bold">Sign up</span></Link></p>
                </div>
            </div>

        </div>

    );
};

export default Login;