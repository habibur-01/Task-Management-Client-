import useAuth from "../../hooks/useAuth";
import profile from "../../assets/profile.png"

const Profile = () => {
    const {user} = useAuth()
    return (
        <div>
            <div className="space-y-4 w-full flex flex-col justify-center items-center">
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
                    </div>
                </div>
            <div>

            </div>


            
        </div>
    );
};

export default Profile;