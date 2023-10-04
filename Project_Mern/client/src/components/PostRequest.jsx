import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { serviceCategories, states } from "../utils/enums";

const Postrequest = () => {
  const [formData, setFormData] = useState({
    transactionType: "buy",
    title: "",
    category: "",
    description: "",
    position: {
      state: "", // Include the "state" field
      address: "", // Include the "address" field
    },
  });
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);

  const modalRef = useRef(null);
  const triggerRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to create a new service
      const response = await axios.post(
        "http://localhost:8000/api/services",
        formData,
        {
          withCredentials: true,
        }
      );

      // Check if the service was created successfully
      if (response.status === 201) {
        // Close the modal when the form is successfully submitted
        setModalOpen(false);
        // Redirect to the "showAllServices" page after successful creation
        navigate("/allServices");
      } else {
        // Handle any error conditions as needed
        console.error("Service creation failed:", response.data);
      }
    } catch (error) {
      console.error("Error creating service:", error);
    }
    setFormData({
      transactionType: "buy",
      title: "",
      category: "",
      description: "",
      position: {
        state: "", // Include the "state" field
        address: "", // Include the "address" field
      },
    })
  };

  // Close on click outside
  const clickHandler = ({ target }) => {
    if (!modalOpen) return;
    if (
      !modalRef.current.contains(target) &&
      !triggerRef.current.contains(target)
    ) {
      setModalOpen(false);
    }
  };

  // Close if the Esc key is pressed
  const keyHandler = ({ keyCode }) => {
    if (modalOpen && keyCode === 27) {
      setModalOpen(false);
    }
  };

  useEffect(() => {
    // Add event listeners when the component mounts
    document.addEventListener("click", clickHandler);
    document.addEventListener("keydown", keyHandler);

    // Remove event listeners when the component unmounts
    return () => {
      document.removeEventListener("click", clickHandler);
      document.removeEventListener("keydown", keyHandler);
    };
  }, []); // The empty dependency array ensures this effect runs only once

  return (
    <>
      <div className="container mx-auto">
        <button
          ref={triggerRef}
          onClick={() => setModalOpen(true)}
          className={`px-6 py-3 text-base font-medium text-dark rounded-full `}
          style={{ backgroundColor: "#f3f4f6" }}
        >
          Create A Request
        </button>
        <div
          ref={modalRef}
          className={`z-50 fixed top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90 px-4 py-5 ${
            modalOpen ? "block" : "hidden"
          }`}
        >
          <div className="w-full max-w-[570px] rounded-[20px] bg-white py-12 px-8 text-center md:py-[60px] md:px-[70px]">
            <h3 className="pb-2 text-xl font-bold text-dark sm:text-2xl">
              YOUR REQUEST
            </h3>
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="title"
                className="mb-3 block text-base font-medium text-black mt-5"
              >
                Title:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Title"
                className="border-form-stroke text-body-color placeholder-body-color focus:border-primary active:border-primary w-full rounded-lg border-[1.5px] py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-[#F5F7FD]"
                required
              />

              <label
                htmlFor="category"
                className="mb-3 block text-base font-medium text-black mt-5"
              >
                Category:
              </label>
              <select
                className="border-form-stroke text-body-color focus:border-primary active:border-primary w-full appearance-none rounded-lg border-[1.5px] py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-[#F5F7FD]"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <option value="" defaultValue={""}>
                  Choose Category
                </option>
                {serviceCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <label
                htmlFor="position.state"
                className="mb-3 block text-base font-medium text-black mt-5"
              >
                State:
              </label>
              <select
                className="border-form-stroke text-body-color focus:border-primary active:border-primary w-full appearance-none rounded-lg border-[1.5px] py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-[#F5F7FD]"
                value={formData.position.state}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    position: { ...formData.position, state: e.target.value },
                  })
                }
              >
                <option value="" defaultValue={""}>
                  Choose State
                </option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>

              <label
                htmlFor="position.address"
                className="mb-3 block text-base font-medium text-black mt-5"
              >
                Address:
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.position.address}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    position: { ...formData.position, address: e.target.value },
                  })
                }
                placeholder="Address"
                className="border-form-stroke text-body-color placeholder-body-color focus:border-primary active:border-primary w-full rounded-lg border-[1.5px] py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-[#F5F7FD]"
                required
              />

              <label
                htmlFor="description"
                className="mb-3 block text-base font-medium text-black mt-5"
              >
                What do you need?
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="border-form-stroke text-body-color placeholder-body-color focus:border-primary active:border-primary w-full rounded-lg border-[1.5px] py-6 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-[#F5F7FD]"
                required
              />

              <div className="flex flex-wrap -mx-3">
                <div className="w-1/2 px-3">
                  <button
                    type="submit"
                    className="mt-4 block w-full rounded-lg border border-[#E9EDF9] p-3 text-center text-base font-medium text-white transition hover:border-red-600 hover:bg-red-600 hover:text-white"
                    style={{ backgroundColor: "#a8df8e" }}
                  >
                    Submit
                  </button>
                </div>
                <div className="mt-4 w-1/2 px-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className={`block w-full p-3 text-base font-medium text-center text-white transition border rounded-lg border-primary bg-primary hover:bg-opacity-90`}
                    style={{ backgroundColor: "#ff0000" }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Postrequest;
