import { useQuery } from "@tanstack/react-query";
import UseStateCard from "../../Comonents/UseStateCard";
import useAxiosSecure from "../../api/AxiosSecure/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip} from 'recharts';

// const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: count = [] } = useQuery({
        queryKey: ['count'],
        queryFn:
            async () => {
                const res = await axiosSecure.get(`/task/count?email=${user.email}`)
                return res.data;
            }

    })
    // console.log(Array.isArray([count]))

    const data = [
        {
            status: 'Total Task',
            totalCount: count.totalTask,

        },
        {
            status: 'Completed',
            totalCount: count.completedTask,

        },
        {
            status: 'Progress ',
            totalCount: count.progressTask,

        },
        {
            status: 'Pending Task',
            totalCount: count.pendingTask,

        },
    ]



    return (
        <div>
            <div>
                <h1 className="text-2xl uppercase font-bold">Hi! Welcome Back</h1>
            </div>
            <div className="flex justify-center">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 m-8">
                    <UseStateCard name={'Total Task Views'} total={count?.totalTask}></UseStateCard>
                    <UseStateCard name={'Complete Task'} total={count?.completedTask}></UseStateCard>
                    <UseStateCard name={'Progess Task'} total={count?.progressTask}></UseStateCard>
                    <UseStateCard name={'Pending Task'} total={count?.pendingTask}></UseStateCard>
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
                    <XAxis dataKey="status" scale="point" padding={{ left: 10, right: 10 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar dataKey="totalCount" fill="#8884d8" background={{ fill: "#eee" }} />
                </BarChart>
            </div>

        </div>
    );
};

export default Dashboard;