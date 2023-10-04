import React, { useState, useEffect } from "react";
import axios from "axios";

const UserProfile = ({ baseUrl }) => {
    const [user, setUser] = useState({});
    const [image, setImage] = useState();
    const [file, setFile] = useState(null);

    // Function to fetch user data
    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${baseUrl}/loggedUser`, {
                withCredentials: true,
            });
            setUser(response.data.user);
            console.log(response.data.user);
        } catch (error) {
            console.error("Error fetching user data:", error.message);
        }
    };

    // Function to handle profile picture upload
    const handleProfilePictureUpload = async (e) => {
        e.preventDefault()
        const formdata = new FormData()
        formdata.append('file', file)

        const headers = {
            'Content-Type': 'multipart/form-data',
        };

        await axios
            .post(`${baseUrl}/upload`, formdata, { headers, withCredentials: true })
            .then(res => {
                setImage(res.data[0].image)
                console.log(res)
            })
            .catch(err => console.log(err))
        fetchUserData()
    }

    // Fetch user data when the component mounts
    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-60">
            <div className="bg-white shadow-md rounded-lg p-1 w-full md:w-1/2">
                <div className="text-center">
                    {user.image && (
                        <img
                            src={`http://localhost:8000/images/${user.image}`}
                            alt="User Avatar"
                            className="mx-auto rounded-full h-60 w-60"
                        />
                    )}
                    <h4 className="mt-4 text-xl font-semibold">
                        {user.firstName} {user.lastName}
                    </h4>
                    <p className="text-gray-500">{user.email}</p>
                </div>

                <h2 className="mt-8 text-2xl font-semibold">User Profile</h2>
                <form onSubmit={handleProfilePictureUpload}>
                    <div className="mt-4">
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            className="border rounded p-2 w-full"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </div>
                    <div className="mt-4">
                        <button className="bg-blue-500 text-white py-2 px-4 rounded-full w-full">
                            Update Profile Picture
                        </button>
                    </div>
                </form>
                <hr className="mt-8" />
                <ul className="list-group mt-4">
                    <li className="list-group-item">
                        <strong>First Name:</strong> {user.firstName}
                    </li>
                    <li className="list-group-item">
                        <strong>Last Name:</strong> {user.lastName}
                    </li>
                    <li className="list-group-item">
                        <strong>Email:</strong> {user.email}
                    </li>
                    {/* Add more fields as needed */}
                </ul>
            </div>
        </div>
    );
};

export default UserProfile;