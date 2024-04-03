import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../api/AxiosSecure/useAxiosSecure";
import { Link } from "react-router-dom";
import { FaRegUser, FaUser, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";


const AllUsers = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
    const { refetch, data: allUsers = [] } = useQuery({
        queryKey: ['alluser'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })
    // console.log(allUsers)

    const handleContestDelete = (id) => {
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
                axiosSecure.delete(`/users/${id}`)
                    .then((response) => {
                        if (response.data?.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });

                        }
                    })
                    .catch((error) => {
                        console.error('Error deleting item:', error);
                    });

            }
        });

    }
    const handleMakeAdmin = (id) => {
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
                axiosSecure.patch(`/users/${id}`)
                    .then((response) => {
                        if (response.data?.modifiedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Updated!",
                                text: `${user.name} is now admin`,
                                icon: "success"
                            });

                        }
                    })
                    .catch((error) => {
                        console.error('Error deleting item:', error);
                        Swal.fire({
                            title: "Wrong!",
                            text: `Somthing is wrong`,
                            icon: "warning"
                        });
                    });

            }
        });

    }




    return (
        <div>
            <div className="py-2 border-b-4 flex justify-between">
                <div>
                    <h1 className="text-3xl font-medium flex items-center gap-4"><FaUsers size={25} /><span>All Users</span> </h1>
                    <p className="text-sm">Total: {allUsers.length}</p>
                </div>
                <Link to="/signup"><p className="flex items-center gap-2"><FaRegUser size={12} color="green" /><span>Add</span></p></Link>
            </div>
            <div className="overflow-x-auto py-10">
                <table className="table ">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>User Name</th>
                            <th>User Email</th>

                            <th>User Role</th>
                            <th>Action</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {totalUsers.length} */}
                        {/* row 1 */}
                        {
                            allUsers?.length <= 0 ? <tr className="row-span-7">
                                <td>
                                    <div className="flex h-[700px] justify-center items-center space-y-4">
                                        <h1 className="text-4xl font-bold">Here has not any usert</h1>

                                    </div>
                                </td>
                            </tr> :
                                allUsers?.map((data, index) => <tr key={data._id}>
                                    <th>
                                        <label>
                                            {index + 1}
                                        </label>
                                    </th>
                                    <td>

                                        <span className="font-bold">{data?.name}</span>



                                    </td>
                                    <td>

                                        <span className="badge badge-ghost badge-sm">{data?.email}</span>
                                    </td>
                                    {
                                        data.role === 'admin' ? <td className="font-medium">Admin</td>:<td onClick={() => handleMakeAdmin(data._id)}><FaUser size={15} /></td>
                                    }
                                    <th className="space-x-2">
                                        <button onClick={() => handleContestDelete(data._id)} className="btn btn-ghost text-white btn-sm text-xs bg-red-400">Delete</button>

                                    </th>

                                </tr>)
                        }


                    </tbody>
                    {/* foot */}
                    <tfoot>

                    </tfoot>

                </table>
            </div>

        </div>
    );
};

export default AllUsers;