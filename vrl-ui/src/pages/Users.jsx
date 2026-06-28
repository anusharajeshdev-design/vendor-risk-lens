import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../services/userService";
import { Pencil, Trash2, History } from "lucide-react";
import SuccessModal from "../components/SuccessModal";
import ConfirmModal from "../components/ConfirmModal";
import ViewHistoryModal from "../components/ViewHistoryModal";
import { useNavigate } from "react-router-dom";
import "./Vendors.css";

function Users() {


const [users, setUsers] = useState([]);

const [showSuccessModal, setShowSuccessModal] = useState(false);

const [showDeleteModal, setShowDeleteModal] = useState(false);

const [userToDelete, setUserToDelete] = useState(null);

  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
const navigate = useNavigate();

useEffect(() => {
    loadUsers();
}, []);

const loadUsers = async () => {

    const result = await getUsers();

    setUsers(result.data);
};

const handleDelete = async (userId) => {

    try {

        const result =
            await deleteUser(userId);

        if (result.success) {

            await loadUsers();

            setShowSuccessModal(true);
        }
        else {

            alert(result.message);
        }
    }
    catch (error) {

        console.error(error);

        alert("Error deleting user");
    }
};

return (
    <div className="page-container">

        <div className="page-header">

            <h1>User Management</h1>

            <button
                className="add-button"
                onClick={() =>
                    navigate("/users/new")}
            >
                + Add User
            </button>

        </div>

        <div className="table-card">

            <table>

                <thead>

                    <tr>

                        <th>First Name</th>

                        <th>Last Name</th>

                        <th>Email</th>

                        <th>Username</th>

                        <th>Role</th>

                        <th>Status</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {users.map((user) => (

                        <tr key={user.userId}>

                            <td>{user.firstName}</td>

                            <td>{user.lastName}</td>

                            <td>{user.email}</td>

                            <td>{user.username}</td>

                            <td>{user.roleId}</td>

                            <td>
                                {
                                    user.isActive
                                        ? "Active"
                                        : "Inactive"
                                }
                            </td>

                            <td>

                                <div className="action-icons">

                                    <Pencil
                                        size={18}
                                        className="edit-icon"
                                        onClick={() =>
                                            navigate(
                                                `/users/edit/${user.userId}`
                                            )}
                                    />
                                  <History
                                        size={18}
                                        className="edit-icon"
                                        onClick={() => {
                                            setSelectedUserId(user.userId);
                                            setShowHistoryModal(true);
                                        }}
                                    />

                                    <Trash2
                                        size={18}
                                        className="delete-icon"
                                        onClick={() => {

                                            setUserToDelete(
                                                user.userId);

                                            setShowDeleteModal(
                                                true);
                                        }}
                                    />

                                </div>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

        {
            showSuccessModal && (

                <SuccessModal
                    title="User Deleted"
                    message="The user has been deleted successfully."
                    onClose={() =>
                        setShowSuccessModal(false)}
                />
            )
        }

        {
            showDeleteModal && (

                <ConfirmModal
                    title="Delete User"
                    message="Are you sure you want to delete this user?"
                    onCancel={() =>
                        setShowDeleteModal(false)}
                    onConfirm={() => {

                        handleDelete(
                            userToDelete);

                        setShowDeleteModal(false);
                    }}
                />
            )
        }

        <ViewHistoryModal
                isOpen={showHistoryModal}
                onClose={() => setShowHistoryModal(false)}
                entityType="User"
                entityId={selectedUserId}
            />

    </div>
);


}

export default Users;
