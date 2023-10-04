import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import NoteStars from "./NoteStars";
import axios from "axios";

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";


// Define a mapping of category names to default image URLs
const categoryDefaultImages = {
  house_moving: "/housemoving.jpg",
  baby_sitting: "/babysitter.jpg",
  household : "/household.png",
  pet_care :"/petcare.jpg",
  miscellaneous :"/DIY.jpg",
  plumber :"/plumber.jpg",
  // Add more categories and default image URLs as needed
};

const OneService = ({ baseUrl }) => {
  
  const { id } = useParams();
  
  const [service, setService] = useState({
    title: "",
    category: "",
    description: "",
    position: {
      address: "",
      state: "",
    },
    user: {
      firstName: "",
      lastName: "",
      num_telephone: "",
      availability: false,
    },
  });

  useEffect(() => {
    axios
      .get(`${baseUrl}/services/${id}`, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        setService(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // Function to get the default image URL for the category
  const getDefaultImageForCategory = (category) => {
    const defaultImage = categoryDefaultImages[category.toLowerCase()];
    if (defaultImage) {
      // console.log(defaultImage, '************');
      return defaultImage;
    }
    // Return a default image URL if the category is not found
    return "/HomeServices.jpeg";
    
  };

  const applyForService = () => {
    // Check if the user is logged in
    
      // Send a request to apply for the service
      axios
        .post(`${baseUrl}/services/${id}/apply`, null, { withCredentials: true })
        .then((response) => {
          // Handle a successful application (e.g., show a success message)
          console.log("Application successful", response.data);
        })
        .catch((error) => {
          // Handle errors (e.g., display an error message)
          console.error("Error applying for the service", error);
        });
    
  };
  
  return (
    <div className="m-11 ">
      <div className="m-5">
      <Link to={'/AllServices'} type="button" class="bg-gray-800 text-white rounded-l-md border-r border-gray-100 py-2 hover:bg-red-700 hover:text-white px-3">
      <div class="flex flex-row align-middle">
        <svg class="w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
        </svg>
        <p class="ml-2">Prev</p>
      </div>
    </Link>
        </div>
      <div className="flex flex-col md:flex-row mt-5 ">
        {/* Left Part - Image and Description */}
        <div className="md:w-1/2 p-4"
        style={{width:'700px'}}>
          <img
            src={getDefaultImageForCategory(service.category)}
            // src="/babysitter.jpg"
            alt={`Category: ${service.category}`}
            className="mb-4"
          />
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Description:
          </Typography>
          <Typography>{service.description}</Typography>
        </div>

        {/* Right Part - UserCard and SingleCard */}
        <div className="w-full md:w-1/2 p-4">
          {/* Card to show User Details */}
          <UserCard user={service.user} />

          {/* Place the SingleCard component here */}
          <SingleCard
            CardTitle={service.title}
            CardName={`Category: ${service.category}`}
            Button={`Apply`}
            applyForService={applyForService}
          />

          {/* NoteStars */}
          <NoteStars />
        </div>
      </div>
    </div>
  );
};

const UserCard = ({ user }) => {
  return (
    <Card className="mt-8">
      <CardHeader color="blue-gray" className="relative">
        {/* You can add a user image here if available */}
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          User Details:
        </Typography>
        <Typography>First Name: {user.firstName}</Typography>
        <Typography>Last Name: {user.lastName}</Typography>
        <Typography>Phone Number: {user.num_telephone}</Typography>
        <Typography>
          Availability: {user.availability ? "Available" : "Not Available"}
        </Typography>
      </CardBody>
    </Card>
  );
};

const SingleCard = ({ Button, CardName, CardTitle, applyForService}) => {
  return (
    <div className="overflow-hidden bg-white rounded-lg">
      <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
        <h3 className="mb-4 block text-xl font-semibold text-dark hover:text-primary sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]">
          {CardTitle}
        </h3>
        <p className="text-base leading-relaxed mb-7 text-body-color">
          {CardName}
        </p>
        {Button && (
          <a
            onClick={applyForService}
            href="#"
            className="inline-block rounded-full border border-[#a8df8e] py-2 px-7 text-base font-medium text-body-color transition hover:border-primary hover:bg-primary hover:text-white"
            style={{ backgroundColor: "#a8df8e" }}
          >
            {Button}
          </a>
        )}
      </div>
    </div>
  );
};

export default OneService;
