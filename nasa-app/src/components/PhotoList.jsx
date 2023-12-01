import React, { useState, useEffect } from "react";
import axios from "axios";

const PhotoList = ({ rover, sol, camera, page, apiKey }) => {
  const [photos, setPhotos] = useState([]);
  const [selectedRover, setSelectedRover] = useState("");
  const [rovers, setRovers] = useState([]);
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera]=useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.nasa.gov/mars-photos/api/v1/rovers",
          { params: { api_key: apiKey } }
        );
        setRovers(response.data.rovers);




        if (response.data.rovers.length > 0) {
            //console.log("set intial rover name"+response.data.rovers[0].name)
          setSelectedRover(response.data.rovers[0].name);



          const responseSelectedRover = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${selectedRover}`,
          { params: { api_key: apiKey } }
          );
          setSelectedCamera(responseSelectedRover.data.rover.cameras[0].name)
          setCameras(responseSelectedRover.data.rover.cameras)

          console.log("data :",responseSelectedRover.data)
          console.log("set intial camera name"+responseSelectedRover.data.rover.cameras[0].name)
        }
      } catch (error) {
        console.error("error fetching rovers", error);
      }
    };
    fetchData();
  }, [apiKey]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        if (selectedRover.trim() !== "") {
          const response = await axios.get(
            `https://api.nasa.gov/mars-photos/api/v1/rovers/${selectedRover}/photos?sol=1000&camera=${selectedCamera}`,
            { params: { api_key: apiKey } }
          );
          console.log("Api response: ", response.data);
          console.log("Selected Rover in fetchPhotos: ", selectedRover);
          console.log("Selected camera in fetchPhotos: ", selectedCamera);

          setPhotos(response.data.photos);
        } else {
          console.error("Selected rover is empty");
        }
      } catch (error) {
        console.error("error fetching photos: ", error);
      }
    };
    fetchPhotos();
  }, [selectedCamera,selectedRover, apiKey]);

  return (
    <div>
      <h2>Photos from Mars {selectedRover}  {selectedCamera}</h2>
      <label>Select rover</label>


      <select
        value={selectedRover}
        onChange={(e) => {
          console.log("Selected Rover: ", e.target.value);
          setSelectedRover(e.target.value);
        }}
      >
        {rovers.map((rover) => (
          <option key={rover.id} value={rover.name}>
            {rover.name}
          </option>
        ))}
      </select>




      <label>Select camera</label>
    {console.log("Cameras: ", cameras)}
      <select
        value={selectedCamera}
        onChange={(e) => {
          console.log("Selected Camera: ", e.target.value);
          setSelectedCamera(e.target.value);
        }}
      >
        {cameras.map((camera) => (
          <option key={camera.name} value={camera.name}>
            {camera.name}
          </option>
        ))}
      </select>





      <ul>
        {photos && photos.length > 0 ? (
          photos.map((photo) => (
            <li key={photo.id}>
              <img src={photo.img_src} alt="" />
            </li>
          ))
        ) : (
          <li> No phots available </li>
        )}
      </ul>
    </div>
  );
};

export default PhotoList;
