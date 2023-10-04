import React, { useState, useEffect } from "react";
import axios from "axios";
import { serviceCategories, states , transactionType } from "../utils/enums";
import { Link } from "react-router-dom";

const DefaultColumn = ({ children }) => {
  return (
    <div className="w-full px-4 md:w-1/2 lg:w-1/3">
      <div className="mb-12">{children}</div>
    </div>
  );
};

const DefaultSelect = ({ options, selectedValue, onChange }) => {
  return (
    <>
      <label className="mb-3 block text-base font-medium text-black">
        {options.label}
      </label>
      <div className="relative">
        <select
          className="border-form-stroke text-body-color focus:border-primary active:border-primary w-full appearance-none rounded-lg border-[1.5px] py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-[#F5F7FD]"
          value={selectedValue}
          onChange={onChange}
        >
          <option value="">All</option> {/* Updated to have an empty value */}
          {options.values.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span className="border-body-color absolute right-4 top-1/2 mt-[-2px] h-[10px] w-[10px] -translate-y-1/2 rotate-45 border-r-2 border-b-2"></span>
      </div>
    </>
  );
};


const AllServices = ({baseUrl}) => {

  const scrollToTop = () => { // Scroll to the top of the page
    window.scrollTo(0, 0); 
  };

  const [filters, setFilters] = useState({
    category: "", // Initially no category filter
    state: "",
    transactionType:"", // Initially no state filter
  });


  const [services, setServices] = useState([]);
  const [allServices, setAllServices] = useState([]);

  const fetchServices = () => {
    axios
      .get("http://localhost:8000/api/services", { withCredentials: true })
      .then((response) => {
        setAllServices(response.data);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // useEffect(() => {
  //   axios
  //     .get("http://ip-api.com/json")
  //     .then((response) => console.log(response.data.regionName))
  //     .catch((error) => console.log(error));
  // }, []);
  

  useEffect(() => {
    // Apply filtering based on category and state
    const filteredServices = allServices.filter((service) => {
      if (filters.category && filters.category !== "all" && service.category !== filters.category) {
        return false;
      }
      if (filters.state && filters.state !== "all" && service.position.state !== filters.state) {
        return false;
      }
      if (filters.transactionType && filters.transactionType !== "all" && service.transactionType !== filters.transactionType) {
        return false;
      }
      return true;
    });
    setServices(filteredServices);
  }, [filters, allServices]);
  

  return (
    <section className="py-12 "
    style={{backgroundImage:'url("bg7.avif")', backgroundPosition: 'center',backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}} >
      <div className="container d-flex center">
        <div className="-mx-4 flex flex-wrap"
        style={{ margin: "50px",marginLeft:'500px' }}>
          <DefaultColumn>
            <DefaultSelect
              options={{ label: "Select Category", values: serviceCategories }}
              selectedValue={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
            />
          </DefaultColumn>
          <DefaultColumn>
            <DefaultSelect
              options={{ label: "Select State", values: states }}
              selectedValue={filters.state}
              onChange={(e) =>
                setFilters({ ...filters, state: e.target.value })
              }
            />
          </DefaultColumn>

          <DefaultColumn>
            <DefaultSelect
              options={{ label: "Select service type ", values: transactionType }}
              selectedValue={filters.transactionType}
              onChange={(e) =>
                setFilters({ ...filters, transactionType: e.target.value })
              }
            />
          </DefaultColumn>
          
        </div>
      </div>

      <table className="table  table-hover  "
      style={{marginLeft:"13%"}}>
        <thead 
          style={{
            border: '1px solid',
            backgroundColor: "f4f5f7",
            color: "black",
            fontSize: "1.2em",
            padding: "20px",
          }}
        >
          <tr>
            <th
              style={{ textAlign: "center", verticalAlign: "middle" ,border: '3px solid',height:'5rem',width:'15rem'  }}
              width="30%"
              scope="col"
            >
              Service Name
            </th>
            <th
              style={{ textAlign: "center", verticalAlign: "middle" ,border: '3px solid',height:'5rem',width:'10rem'   }}
              width="30%"
              scope="col"
            >
              Category
            </th>
            <th
              style={{ textAlign: "center", verticalAlign: "middle",border: '3px solid',height:'5rem',width:'20rem'}}
              width="10%"
              scope="col"
            >
              Service Location
            </th>
            <th
              style={{ textAlign: "center", verticalAlign: "middle",border: '3px solid' ,height:'5rem',width:'30rem' }}
              scope="col"
            >
              Description
            </th>
            <th
              style={{ textAlign: "center", verticalAlign: "middle",border: '3px solid',height:'5rem',width:'15rem' }}
              scope="col"
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {services.map(
            ({ _id, transactionType , title, category, position, description, status , user }) => (
              <tr key={_id} style={{ backgroundColor: transactionType === "buy" ? 'transparent' : '#c3e6cb' }} >
                <td style={{ textAlign: "center", verticalAlign: "middle" ,border:'2px solid'}}>
                  <Link onClick={scrollToTop} to={`/services/${_id}`}>{title}</Link>
                </td>
                <td style={{ textAlign: "center", verticalAlign: "middle" ,border:'2px solid' }}>
                  {category}
                </td>
                <td style={{ textAlign: "center", verticalAlign: "middle" ,border:'2px solid' }}>
                {position.address} <br />
              <div style={{fontWeight : 'bolder' ,fontFamily: 'Arial'}} >{position.state}</div>
                
                </td>
                <td style={{ textAlign: "center", verticalAlign: "middle" ,border:'2px solid' }}>
                  {description}
                </td>
                <td style={{ textAlign: "center", verticalAlign: "middle" ,border:'2px solid', }}>
                  {status} by : <br />
                  {user.lastName} {user.firstName}
                  
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </section>
  );
};

export default AllServices;
