import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../api/AxiosSecure/useAxiosSecure";
import UseStateCard from "../../../Comonents/UseStateCard";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";


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
    const data =[
        {
            user: 'Total Users',
            numberOfUser: userCount.totaluser,

        },
        {
           user: 'Regular Users',
           numberOfUser: userCount.onlyuser,

        },
        {
           user: 'Admin',
            numberOfUser: userCount.admin,

        },
        
    ]


    return (
        <div>
            <div>
                <h1 className="text-2xl uppercase font-bold">Hi! Welcome Back</h1>
            </div>
            <div className="flex justify-center">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 m-8">
                    <UseStateCard name={'Total User Views'} total={userCount?.totaluser}></UseStateCard>
                    <UseStateCard name={'Only User'} total={userCount?.onlyuser}></UseStateCard>
                    <UseStateCard name={'Admin'} total={userCount?.admin}></UseStateCard>

                </div>
            </div>
            <div className="my-20 flex justify-center">

                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
                    }}
                    barSize={20}
                >
                    <XAxis dataKey="user" scale="point" padding={{ left: 10, right: 10 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar dataKey="numberOfUser" fill="#8884d8" background={{ fill: "#eee" }} />
                </BarChart>
            </div>

        </div>
    );
};

export default AdminDashboard;
