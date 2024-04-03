import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../api/AxiosSecure/useAxiosSecure";
import UseStateCard from "../../../Comonents/UseStateCard";


const AdminDashboard = () => {

    const axiosSecure = useAxiosSecure()

    const { data: userCount = [] } = useQuery({
        queryKey: ['countuser'],
        queryFn:
            async () => {
                const res = await axiosSecure.get(`/users/count`)
                return res.data;
            }

    })
    // console.log(Array.isArray([count]))


    return (
        <div>
            <div>
                <h1 className="text-2xl uppercase font-bold">Hi! Welcome Back</h1>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 m-8">
                <UseStateCard name={'Total User Views'} total={userCount?.totaluser}></UseStateCard>
                <UseStateCard name={'Only User'} total={userCount?.onlyuser}></UseStateCard>
                <UseStateCard name={'Admin'} total={userCount?.admin}></UseStateCard>
                
            </div>

        </div>
    );
};

export default AdminDashboard;
