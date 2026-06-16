import { useEffect, useState } from "react";
import {
createUser,
updateUser,
getUserById,
getRoles
} from "../services/userService";

import { useNavigate, useParams } from "react-router-dom";

import SuccessModal from "../components/SuccessModal";

import "./VendorForm.css";

function UserForm() {
const navigate = useNavigate();
const { id } = useParams();
const isEditMode = !!id;
const [showSuccessModal, setShowSuccessModal] = useState(false);
const [roles, setRoles] = useState([]);
const [successMessage, setSuccessMessage] = useState("");
const [user, setUser] = useState({
    roleId: 1,
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    isActive: true
});

useEffect(() => {

    loadRoles();

    if (isEditMode) {

        loadUser();
    }

}, [id]);

const loadUser = async () => {

    try {

        const result =
            await getUserById(id);

        if (result.success) {

            setUser(result.data);
        }

    } catch (error) {

        console.error(error);
    }
};

const handleSave = async () => {

    try {

        let result;

        if (isEditMode) {

            result =
                await updateUser(
                    id,
                    user);
        }
        else {

            result =
                await createUser(
                    user);
        }

        if (result.success) {

            setSuccessMessage(
                isEditMode
                    ? "User updated successfully"
                    : "User created successfully"
            );

            setShowSuccessModal(true);
        }
        else {

            alert(result.message);
        }

    } catch (error) {

        console.error(error);

        alert("Error saving user");
    }
};

const loadRoles = async () => {

    try {

        const result =
            await getRoles();

        setRoles(result.data || []);

    } catch (error) {

        console.error(error);
    }
};
return (
    <div className="form-page">

        <div className="form-card">

            <span
                className="back-link"
                onClick={() =>
                    navigate("/users")}
            >
                ← Back To Users
            </span>

            <h1>
                {
                    isEditMode
                        ? "Edit User"
                        : "Create User"
                }
            </h1>

            <div className="form-grid">

                <div className="form-group">

                    <label>
                        First Name
                    </label>

                    <input
                        type="text"
                        value={user.firstName}
                        onChange={(e) =>
                            setUser({
                                ...user,
                                firstName:
                                    e.target.value
                            })}
                    />

                </div>

                <div className="form-group">

                    <label>
                        Last Name
                    </label>

                    <input
                        type="text"
                        value={user.lastName}
                        onChange={(e) =>
                            setUser({
                                ...user,
                                lastName:
                                    e.target.value
                            })}
                    />

                </div>

                <div className="form-group">

                    <label>
                        Email
                    </label>

                    <input
                        type="email"
                        value={user.email}
                        onChange={(e) =>
                            setUser({
                                ...user,
                                email:
                                    e.target.value
                            })}
                    />

                </div>

                <div className="form-group">

                    <label>
                        Username
                    </label>

                    <input
                        type="text"
                        value={user.username}
                        onChange={(e) =>
                            setUser({
                                ...user,
                                username:
                                    e.target.value
                            })}
                    />

                </div>

                <div className="form-group">

                    <label>
                        Password
                    </label>

                    <input
                        type="password"
                        value={user.password}
                        onChange={(e) =>
                            setUser({
                                ...user,
                                password:
                                    e.target.value
                            })}
                    />

                </div>

                <div className="form-group">

                    <label>
                        Role
                    </label>

                    <select
                        value={user.roleId}
                        onChange={(e) =>
                            setUser({
                                ...user,
                                roleId: Number(e.target.value)
                            })}
                    >

                        <option value="">
                            Select Role
                        </option>

                        {
                            roles.map(role => (
                                <option
                                    key={role.roleId}
                                    value={role.roleId}
                                >
                                    {role.roleName}
                                </option>
                            ))
                        }

                    </select>

                </div>

            </div>

            <div className="checkbox-container">

                <input
                    type="checkbox"
                    checked={user.isActive}
                    onChange={(e) =>
                        setUser({
                            ...user,
                            isActive:
                                e.target.checked
                        })}
                />

                <label>
                    Active User
                </label>

            </div>

            <div className="button-container">

                <button
                    className="cancel-btn"
                    onClick={() =>
                        navigate("/users")}
                >
                    Cancel
                </button>

                <button
                    className="save-btn"
                    onClick={handleSave}
                >
                    Save User
                </button>

            </div>

        </div>

        {
            showSuccessModal && (

                <SuccessModal
                    title="Success"
                    message={successMessage}
                    onClose={() => {

                        setShowSuccessModal(
                            false);

                        navigate("/users");
                    }}
                />
            )
        }

    </div>
);


}

export default UserForm;
