import React, { useState, useEffect } from "react";
import axios from "axios";

function DashboardUser({ baseUrl }) {
  const [selectedApplicant, setSelectedApplicant] = useState("");
  const [update, setUpdate] = useState(false);
  const [services, setServices] = useState({ sell: [], buy: [] });
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    // Calling One user's services
    axios
      .get(`${baseUrl}/userServices`, { withCredentials: true })
      .then((response) => {
        console.log(response);
        const { data } = response;
        const sellServices = data.filter(
          (service) => service.transactionType === "sell"
        );
        const buyServices = data.filter(
          (service) => service.transactionType === "buy"
        );

        const user =
          data.length > 0 ? data[0].user : { firstName: "", lastName: "" };

        setUserData(user);
        setServices({ sell: sellServices, buy: buyServices });
      })
      .catch((error) => {
        console.error("Error fetching user services", error);
      });
  }, [update]);

  const handleApplicantSelect = (e) => {
    // Handling Applicant's id passing
    setSelectedApplicant(e.target.value);
    console.log("Selected Applicant ID:", e.target.value);
  };

  const handleApplicantSubmit = (e, serviceId) => {
    // handling form submit
    e.preventDefault();
    if (selectedApplicant) {
      console.log("Service ID:", serviceId);
      // Make an API request to select the applicant
      axios
        .put(
          `${baseUrl}/services/${serviceId}/select-applicant/${selectedApplicant}`,
          {},
          { withCredentials: true }
        )
        .then((response) => {
          // Handle the response or update the UI as needed
          console.log(
            "Applicant selected for service",
            serviceId,
            ":",
            response.data
          );
          setUpdate(!update);
        })
        .catch((error) => {
          console.error("Error selecting the applicant", error);
        });
    } else {
      console.log("Please select an applicant");
    }
  };

  const deleteService = (serviceId) => {
    axios
      .delete(`${baseUrl}/services/${serviceId}`, {
        withCredentials: true,
      })
      .then((response) => {
        // Filter out the deleted service from both "sell" and "buy" services
        const updatedSellServices = services.sell.filter(
          (service) => service._id !== serviceId
        );
        const updatedBuyServices = services.buy.filter(
          (service) => service._id !== serviceId
        );

        // Update the state with the filtered services
        setServices({
          sell: updatedSellServices,
          buy: updatedBuyServices,
        });
      })
      .catch((error) => console.error(error));
  };

  const serviceComplete = (serviceId) => {
    axios
      .put(
        `${baseUrl}/services/${serviceId}/set-completed`,
        {},
        { withCredentials: true }
      )
      .then((response) => {
        // Handle the response or update the UI as needed
        console.log("Service marked as complete:", response.data);

        // If you want to update the service's status in the state, you can do so here.
        // For example, you can filter the services and update their status.
        const updatedSellServices = services.sell.map((service) => {
          if (service._id === serviceId) {
            return { ...service, status: "complete" };
          }
          return service;
        });

        const updatedBuyServices = services.buy.map((service) => {
          if (service._id === serviceId) {
            return { ...service, status: "complete" };
          }
          return service;
        });

        setServices({
          sell: updatedSellServices,
          buy: updatedBuyServices,
        });
      })
      .catch((error) => {
        console.error("Error marking the service as complete", error);
      });
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-semibold mb-5">
        Services by: {userData.firstName} {userData.lastName}
      </h1>
      <div className="my-5">
        <h2 className="text-xl font-semibold">Proposed Services:</h2>
        <table className="min-w-full border border-collapse">
          <thead>
            <tr>
              <th className="border border-b w-1/12 p-2">Service Title</th>
              <th className="border border-b w-1/12 p-2">Category</th>
              <th className="border border-b w-1/4 p-2">Description</th>
              <th className="border border-b w-1/4 p-2">List of Applicants</th>
              <th className="border border-b w-1/12 p-2">Status</th>
              <th className="border border-b w-1/4 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.sell.map((service) => (
              <tr key={service._id}>
                <td className="border border-b w-1/12 p-2">{service.title}</td>
                <td className="border border-b w-1/12 p-2">{service.category}</td>
                <td className="border border-b w-1/4 p-2">{service.description}</td>
                <td className="border border-b w-1/4 p-2">
                  <form onSubmit={(e) => handleApplicantSubmit(e, service._id)}>
                    <select
                      onChange={handleApplicantSelect}
                      value={selectedApplicant}
                      className="border rounded p-1"
                    >
                      <option value="">Select an applicant</option>
                      {service.applicants.map((applicant) => (
                        <option key={applicant._id} value={applicant._id}>
                          {applicant.firstName} {applicant.lastName}
                        </option>
                      ))}
                    </select>
                    <button
                      type="submit"
                      className="px-2 py-1 bg-blue-500 text-white rounded mx-2"
                    >
                      Select Applicant
                    </button>
                  </form>
                </td>
                <td className="border border-b w-1/12 p-2">{service.status}</td>
                <td className="border border-b w-1/4 p-2">
                  <button
                    onClick={() => deleteService(service._id)}
                    className="px-2 py-1 bg-red-500 text-white rounded mx-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => serviceComplete(service._id)}
                    className="px-2 py-1 bg-blue-500 text-white rounded mx-2"
                  >
                    Complete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br />
      <div className="my-5">
        <h2 className="text-xl font-semibold">Requests Announced:</h2>
        <table className="min-w-full border border-collapse">
          <thead>
            <tr>
              <th className="border border-b w-1/12 p-2">Service Title</th>
              <th className="border border-b w-1/12 p-2">Category</th>
              <th className="border border-b w-1/4 p-2">Description</th>
              <th className="border border-b w-1/4 p-2">List of Applicants</th>
              <th className="border border-b w-1/12 p-2">Status</th>
              <th className="border border-b w-1/4 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.buy.map((service) => (
              <tr key={service._id}>
                <td className="border border-b w-1/12 p-2">{service.title}</td>
                <td className="border border-b w-1/12 p-2">{service.category}</td>
                <td className="border border-b w-1/4 p-2">{service.description}</td>
                <td className="border border-b w-1/4 p-2">
                  <form onSubmit={(e) => handleApplicantSubmit(e, service._id)}>
                    <select
                      onChange={handleApplicantSelect}
                      value={selectedApplicant}
                      className="border rounded p-1"
                    >
                      <option value="">Select an applicant</option>
                      {service.applicants.map((applicant) => (
                        <option key={applicant._id} value={applicant._id}>
                          {applicant.firstName} {applicant.lastName}
                        </option>
                      ))}
                    </select>
                    <button
                      type="submit"
                      className="px-2 py-1 bg-blue-500 text-white rounded mx-2"
                    >
                      Select Applicant
                    </button>
                  </form>
                </td>
                <td className="border border-b w-1/12 p-2">{service.status}</td>
                <td className="border border-b w-1/4 p-2">
                  <button
                    onClick={() => deleteService(service._id)}
                    className="px-2 py-1 bg-red-500 text-white rounded mx-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => serviceComplete(service._id)}
                    className="px-2 py-1 bg-blue-500 text-white rounded mx-2"
                  >
                    Complete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashboardUser;
