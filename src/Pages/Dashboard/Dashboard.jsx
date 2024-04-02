import { useQuery } from "@tanstack/react-query";
import UseStateCard from "../../Comonents/UseStateCard";
import useAxiosSecure from "../../api/AxiosSecure/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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
            totalTask: count.totalTask,
            
        },
        {
            status: 'Completed',
            totalTask: count.completedTask,
            
        },
        {
            status: 'Progress ',
            totalTask: count.progressTask,
            
        },
        {
            status: 'Pending Task',
            totalTask: count.pendingTask,
            
        },
    ]
    const getPath = (x , y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };


    return (
        <div>
            <div>
                <h1 className="text-2xl uppercase font-bold">Hi! Welcome Back</h1>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 m-8">
                <UseStateCard name={'Total Task Views'} total={count?.totalTask}></UseStateCard>
                <UseStateCard name={'Complete Task'} total={count?.completedTask}></UseStateCard>
                <UseStateCard name={'Progess Task'} total={count?.progressTask}></UseStateCard>
                <UseStateCard name={'Pending Task'} total={count?.pendingTask}></UseStateCard>
            </div>
            <div className="my-20">
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="status" />
                    <YAxis />
                    <Bar dataKey="totalTask" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                        {data?.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Bar>
                </BarChart> 

            </div>

        </div>
    );
};

export default Dashboard;