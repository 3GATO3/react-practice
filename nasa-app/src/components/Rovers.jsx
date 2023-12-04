import React, { useState, useEffect } from "react";
import axios from "axios";

const Rovers = ({apiKey }) => {
  const [roversData, setRoversData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.nasa.gov/mars-photos/api/v1/rovers",
          { params: { api_key: apiKey } }
        );
        console.log("ROVERS", response.data.rovers);
        // Assuming the response data contains the rover information
        setRoversData(response.data.rovers);
      } catch (error) {
        console.error("Error fetching rovers data:", error);
        // Handle the error (e.g., show an error message to the user)
      } finally{
        setLoading(false)}
      
    };

    // Invoke the fetchData function
    fetchData();
  }, [apiKey]); // Include apiKey in the dependency array




  const ObjectDisplay = ({ data }) => {
    return (
      <div className="mb-4">
        {data.map((rover, index) => (
          <div key={index} className="mb-6">
            <h3>{rover.name}</h3>
  
            <p className="mb-2">
              <strong>Status: </strong> {rover.status}
            </p>
  
            <p className="mb-2">
              <strong>Launch Date: </strong> {rover.launch_date}
            </p>
            <p className="mb-2">
              <strong>Landing Date: </strong> {rover.landing_date}
            </p>
            <p className="mb-2">
              <strong>Max Date: </strong> {rover.max_date}
            </p>
            <p className="mb-2">
              <strong>Max sol: </strong> {rover.max_sol}
            </p>
            <p className="mb-2">
              <strong>Number of photos: </strong> {rover.total_photos}
            </p>
  
            {/* Add more fields as needed */}
          </div>
        ))}
      </div>
    );
  };
  
  
  
  
  
  return (
<div>
    <h2>ROVERS </h2>


  
    {loading?(
    <p>loading...</p>
    ) :  (
    <>
    {Object.keys(roversData).length>0?(
      
      <>
      <ObjectDisplay data={roversData}/>
      {console.log("roversDATA:",roversData)}
      </>

    ):(
    <p>no rover data available</p>
    )}
    </>
  )}

</div>
  );

};

export default Rovers;
