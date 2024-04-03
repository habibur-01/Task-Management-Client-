import useAuth from "../../hooks/useAuth";
import profile from "../../assets/profile.png"
import useAxiosSecure from "../../api/AxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
// import Swal from "sweetalert2";
// import { updateProfile } from "firebase/auth";
// import { updateProfile } from "firebase/auth";

const Profile = () => {
    const { user } = useAuth()

    const axiosSecure = useAxiosSecure()



    const { data: userData = [] } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user.email}`)
            return res.data
        }
    })
    console.log(userData)

    // const handleUpdateProfile = async (e) => {
    //     e.preventDefault()
    //     const form = e.target
    //     const userName = form.name.value
    //     const userGender = form.gender.value


    //     const userDetails = { name: userName, gender: userGender }
    //     console.log(userDetails)



    //     await axiosSecure.patch(`/users/${userData[0]._id}`, userDetails)
    //         .then(res => {
    //             if (res.data.modifiedCount > 0) {
    //                 updateProfile({
    //                     displayName: name,
    //                     // photoURL: data?.data?.display_url
    //                 })
    //                 Swal.fire({
    //                     position: "top-end",
    //                     icon: "success",
    //                     title: "Your task has been added",
    //                     showConfirmButton: false,
    //                     timer: 1500
    //                 });
    //             }
    //         }).catch(err => {
    //             console.log(err)
    //             Swal.fire({
    //                 position: "top-end",
    //                 icon: "warning",
    //                 title: "Somthing is wrong!",
    //                 showConfirmButton: false,
    //                 timer: 1500
    //             });
    //         })



    //     console.log(userDetails)


    // }
    return (
        <div>
            <div className="my-8">
                <h1 className="text-2xl font-bold uppercase">Hi! Welcome to profile</h1>
            </div>
            <div className="my-8 bg-slate-50 p-10 md:p-20 rounded-md lg:flex justify-center gap-8 ">
                <div className="space-y-4  flex flex-col justify-center items-center w-64">
                    <div className="w-14 h-14 rounded-full">
                        {
                            user ? <div className="w-14 h-14 rounded-full">
                                {
                                    user?.photoURL ? <img src={user?.photoURL} className="w-full  h-full object-cover rounded-full" alt="" /> :
                                        <img src={profile} className="w-full  h-full object-cover rounded-full" alt="" />
                                }
                            </div> :
                                <div className="w-14 h-14 rounded-full">
                                    <img src={profile} className="w-full  h-full object-cover rounded-full" alt="" />

                                </div>}

                    </div>
                    <div className="text-center">
                        <h2 className="text-sm">{user ? <>{user.email}</> : 'User Email'}</h2>
                        <h1 className="text-base font-medium">{user ? <>{user.displayName}</> : 'User Name'}</h1>
                        <p className="text-xs">Created time: {userData[0]?.date? <>{userData[0]?.date.split('T')[0]}</>: ''}</p>
                    </div>
                </div>


            </div>

        </div>
    );
};

export default Profile;