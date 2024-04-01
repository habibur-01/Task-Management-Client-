import { useState } from "react";
import { CiLock, CiUnlock } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { Link } from "react-router-dom";
import "./signup.css"
// import ImgUpload from "../../api/ImgUpload/ImgUpload";
import useAxiosSecure from "../../api/AxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth.jsx"
import { updateProfile } from "firebase/auth";


const SignUp = () => {
    const [isPassView, setIsPassView] = useState(false)
    const axiosSecure = useAxiosSecure()
    const { crearteUser } = useAuth()
    const handleSignUp = (e) => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const email = form.email.value
        const password = form.password.value
        const gender = form.gender.value

        const user = { name, email, password, gender }

        crearteUser(email, password)
            .then(result => {
                const userInfo = result.user
                console.log(userInfo)
                updateProfile(result.user, {
                    displayName: name,
                    // photoURL: data?.data?.display_url
                })

                axiosSecure.post('/users', user)
                    .then(res => {
                        if (res.data.insertedId) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Your task has been added",
                                showConfirmButton: false,
                                timer: 1500
                            });
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


        console.log(user)


    }
    return (
        <div>
            <form onSubmit={handleSignUp} action="" className="m-2 space-y-4">
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
                    <p className="text-xs md:text-sm mt-1">{`Don't have an account?`}<Link to={"/login"}> <span className="text-[#646cff] font-bold">Sign in</span></Link></p>
                </div>
            </form>
        </div>
    );
};

export default SignUp;