import { PropTypes } from "prop-types"
import { Fragment, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit, CiViewList } from "react-icons/ci";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../api/AxiosSecure/useAxiosSecure";
import { Listbox, Transition } from "@headlessui/react";
import { FaCheck } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";

const people = [
    { name: 'pending' },
    { name: 'progress' },
    { name: 'completed' },

]

const Card = ({ task, refetch }) => {
    const { projectName, priority, startDate, endDate, description, status, _id } = task
    const [selected, setSelected] = useState({ name: status })
    const [isHovered, setIsHovered] = useState(false);
    const axiosSecure = useAxiosSecure()
    const handleDeleteTask = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/task/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })

            }
        });
        axiosSecure.delete('/task')
    }

    const handleOptionSelect = (selectedOption) => {
        setSelected(selectedOption);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/task/status/${_id}`, { status: selectedOption.name })
                    .then(res => {
                        console.log('Task status updated successfully', res.data);
                        if (res?.data?.modifiedCount > 0) {
                            refetch()
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Your task has been updated",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
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
    };
    // console.log(selected)

    return (
        <div>
            <div className="card xl:w-96 sm:w-80 bg-slate-200 text-black-content">
                <div className="card-body">
                    <h2 className="card-title">{projectName}</h2>
                    <p className="text-wrap">{description.slice(0, 200)}</p>

                    <div className="card-actions justify-between items-baseline">
                        <div className="mt-2">
                            <p><span className="py-1 px-2 bg-slate-100 text-xs rounded-xl ">{startDate.split('T')[0]}</span> <span className="py-1 px-2 text-xs bg-slate-100 rounded-xl ">{endDate.split('T')[0]}</span></p>
                            <div className="mt-3 flex gap-4">

                                <div className="w-28 z-10">
                                    <Listbox value={selected} onChange={handleOptionSelect}>
                                        <div className="relative mt-1">
                                            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-slate-100 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                                <span className="block truncate">{selected.name}</span>
                                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                    <FaAngleDown
                                                        className="h-4 w-4 text-gray-400"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            </Listbox.Button>
                                            <Transition
                                                as={Fragment}
                                                leave="transition ease-in duration-100"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                            >
                                                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-100 py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-none ">
                                                    {people.map((person, personIdx) => (
                                                        <Listbox.Option
                                                            key={personIdx}
                                                            className={({ active }) =>
                                                                `relative cursor-default select-none py-2 pl-6 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                                                }`
                                                            }
                                                            value={person}
                                                        >
                                                            {({ selected }) => (
                                                                <>
                                                                    <span
                                                                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                            }`}
                                                                    >
                                                                        {person.name}
                                                                    </span>
                                                                    {selected ? (
                                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-amber-600">
                                                                            <FaCheck className="h-3 w-3" aria-hidden="true" />
                                                                        </span>
                                                                    ) : null}
                                                                </>
                                                            )}
                                                        </Listbox.Option>
                                                    ))}
                                                </Listbox.Options>
                                            </Transition>
                                        </div>
                                    </Listbox>
                                </div>

                            </div>
                        </div>
                        <div className="pt-8 flex gap-2">
                            <div>
                                <CiViewList size={21} onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)} />
                                {isHovered && (
                                    <div className="absolute bottom-5 right-20 bg-gray-100 text-gray-800 text-xs p-2 rounded shadow">
                                        Priority level- {priority}
                                    </div>
                                )}
                            </div>
                            <Link to="/updateTask" state={task}><CiEdit size={22} className="hover:cursor-pointer" /></Link>
                            <AiOutlineDelete size={22} className="hover:cursor-pointer" onClick={() => handleDeleteTask(_id)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
Card.propTypes = {
    task: PropTypes.object,
    refetch: PropTypes.any

}

export default Card;