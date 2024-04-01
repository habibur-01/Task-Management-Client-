import { CiEdit } from "react-icons/ci";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "./style.css"
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
// import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../api/AxiosSecure/useAxiosSecure";
import SectionTitle from "../../../Comonents/Shared/SectionTitle/SectionTitle";
import { useLocation } from "react-router-dom";


const UpdateTask = () => {
    const location = useLocation()
    const [startDate, setStartDate] = useState(location.state?.startDate || new Date());
    const [endDate, setEndDate] = useState(location.state?.endDate || new Date());
    const axiosSecure = useAxiosSecure()
    // const { user } = useAuth()
    // console.log(selectedValue)
    const [selectedValue, setSelectedValue] = useState(location.state?.priority);
    console.log(location)


    const handleUpdateTask = (e) => {
        e.preventDefault()
        const form = e.target
        const projectName = form.project.value
        const priority = selectedValue
        const description = form.description.value
        const task = { projectName, priority, startDate, endDate, description }

        axiosSecure.patch(`/task/${location.state?._id}`, task)
            .then(res => {
                console.log(res.data)
                if (res?.data?.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your task has been added",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(err => {
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
        <div className="">
            <SectionTitle icon={<CiEdit size={32} />} title={`Upadate Task`}></SectionTitle>
            <div className="my-8 bg-slate-50 p-10 md:p-20 rounded-md">
                <form className=" grid grid-cols-1 md:grid-cols-2 gap-8 taskForm" onSubmit={handleUpdateTask}>
                    <div className="flex flex-col space-y-4">
                        <label >Project Name</label>
                        <input type="text" placeholder="type your project name" name="project" defaultValue={location.state?.projectName} required />
                    </div>
                    <div className="flex flex-col space-y-4">
                        <label >Priority Label</label>
                        <select className="h-[45px] border-[1px] px-4 rounded-md" onChange={(e) => setSelectedValue(e.target.value)} value={selectedValue} >
                            <option value={1}>Label-1</option>
                            <option value={2}>Label-2</option>
                            <option value={3}>Label-3</option>

                        </select>

                    </div>
                    <div className="flex flex-col space-y-4">
                        <label >Start Date</label>
                        <DatePicker showIcon selected={startDate} onChange={(date) => setStartDate(date)} required />
                    </div>
                    <div className="flex flex-col space-y-4">
                        <label >End Date</label>
                        <DatePicker showIcon selected={endDate} onChange={(date) => setEndDate(date)} required />
                    </div>
                    <div className="flex flex-col space-y-4 md:col-span-2">
                        <label >Project Name</label>
                        <textarea type="text" placeholder="type project description" defaultValue={location.state?.description} name="description" className="p-4 h-36 rounded-md border-[1px]" required></textarea>
                    </div>
                    <div>
                        <button className="btn bg-gradient-to-r from-[#d37c7c] via-[#ff9f9f] to-pink-400 hover:btn-secondary">Update Task</button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default UpdateTask;