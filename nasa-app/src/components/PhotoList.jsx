import React, { useState, useEffect } from "react";
import axios from "axios";



function ExpandedImageModal({ photo, onClose }) {
  console.log(" ExpandedImageModal img_src",photo.img_src)
  console.log(" ExpandedImageModal img",photo)
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="bg-black bg-opacity-80 w-full h-full absolute"></div>
      <div className="max-w-3xl w-full p-4 bg-white rounded-lg z-10 overflow-hidden">
        <img
          src={photo.img_src}
          alt=""
          className="rounded-lg"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-gray-800 text-white rounded-full hover:bg-gray-600 focus:outline-none"
        >
          Close
        </button>
      </div>
    </div>
  );
}





const PhotoList = ({ rover, sol, camera, page, apiKey }) => {
  const [photos, setPhotos] = useState([]);
  const [selectedRover, setSelectedRover] = useState("");
  const [rovers, setRovers] = useState([]);
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera]=useState("")
  const [expandedImage, setExpandedImage]=useState(null);
  const handleImageClick=(photo)=>{
    console.log("Clicked photo:", photo);

    setExpandedImage(photo);
  }

  const handleCloseClick=()=>{
    setExpandedImage(null);
  }




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



          const responseSelectedRover = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${response.data.rovers[0].name}`,
          { params: { api_key: apiKey } }
          );
          const cameraSe=responseSelectedRover.data.rover.cameras[0].name
          setSelectedCamera(cameraSe)
          setCameras(responseSelectedRover.data.rover.cameras)

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

    <div className="mb-4">

    <h2 className="text-xl font-semibold mb-4">Photos from Mars </h2>
  
    <div className="mb-4 flex flex-col sm:flex-row">
      <div className="mb-2 sm:mb-0 sm:mr-4">
        <label className="block text-sm font-semibold mb-1">Select Rover:</label>
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
      </div>
  
      <div>
        <label className="block text-sm font-semibold mb-1">Select Camera:</label>
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
      </div>
    </div>
  
    <ul className="mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {photos && photos.length > 0 ? (
        photos.map((photo) => (
          <li key={photo.id} className="relative group mb-4">
            <img
              src={photo.img_src}
              alt=""
              className="w-full h-full object-cover rounded-md transition-transform transform group-hover:scale-110"
              onClick={()=>handleImageClick(photo)}
          />
          </li>

        ))
      ) : (
        <li className="text-center"> No photos available </li>
      )}
    </ul>
    {expandedImage && <ExpandedImageModal photo={expandedImage} onClose={handleCloseClick} />}


  </div>
  
  );
};

export default PhotoList;
