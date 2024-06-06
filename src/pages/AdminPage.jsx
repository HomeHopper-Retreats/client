import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddPlace from "../components/AddPlace";
import ReservationListAdmin from "../components/ReservationListAdmin";
import { Button } from "@chakra-ui/react";


function AdminPage() {
  const [places, setPlaces] = useState(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState([]);
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [pets, setPets] = useState(false);
  const [handicap, setHandicap] = useState(false);
  const [elevator, setElevator] = useState(false);
  const [kitchen, setKitchen] = useState(false);
  const [pool, setPool] = useState(false);
  const [luxury, setLuxury] = useState(false);
  const [description, setDescription] = useState("");
  const [placeId, setPlaceId] = useState("");

  const [editingId, setEditingId] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";

  useEffect(() => {
    getAllPlaces();
  }, []);

  function getAllPlaces() {
    axios
      .get(`${API_URL}/api/places`)
      .then((response) => {
        const placesFromApi = response.data.reverse();
        setPlaces(placesFromApi);
      })
      .catch((e) => console.log(e));
  }

  const deletePlace = (placeId) => {
    axios
      .delete(`${API_URL}/api/places/${placeId}`)
      .then((response) => {
        // console.log(`Place with id ${placeId} deleted successfully`);
        getAllPlaces();
      })
      .catch((err) => console.log(err));
  };

  const handleImageChange = (e, index) => {
    const newImages = [...image]; 
    newImages[index] = e.target.value; 
    setImage(newImages); 
  };

  //To update state for editingId for form dropdown
  const handleUpdate = (id) => {
    const selectedPlace = places.find(place => place._id === id);
    if (selectedPlace) {
      setName(selectedPlace.name);
      setImage(selectedPlace.image);
      setAddress(selectedPlace.address);
      setPrice(selectedPlace.price);
      setPets(selectedPlace.pets);
      setHandicap(selectedPlace.handicap);
      setElevator(selectedPlace.elevator);
      setKitchen(selectedPlace.kitchen);
      setPool(selectedPlace.pool);
      setLuxury(selectedPlace.luxury);
      setDescription(selectedPlace.description);
      setEditingId((prevId) => (prevId === id ? null : id));
      setPlaceId(id);
    }
  };

  const handlePlaceAdded = () => {
    
    getAllPlaces();
  };

  const handleSaveSubmit = (e) => {
    e.preventDefault();

    //console.log("placeID" + placeId)

    const requestBody = {
      name: name,
      image: image,
      description: description,
      petsAllowed: pets,
      handicapAccessible: handicap,
      elevatorAvailable: elevator,
      isLuxurious: luxury,
      kitchenAvailable: kitchen,
      poolAvailable: pool,
      address: address,
      price: price,
    };

    axios
      .put(`${API_URL}/api/places/${placeId}`, requestBody)
      .then((response) => {
        //console.log(`Place with id ${placeId} updated successfully`);
        getAllPlaces();
      })
      .catch((err) => console.log(err));

    setEditingId(null);
  };

  return (
    <>
      <section className="flex ml-10 mr-10 mb-10">
        <div className="w-1/2 mr-5 rounded-lg shadow-lg bg-slate-50 drop-shadow-xl">
        <AddPlace onPlaceAdded={handlePlaceAdded}/> 
    
        <h1 className="mt-5 pb-5 text-center text-4xl font-semibold">Manage Listings</h1>
      
      <hr className="mb-3"></hr>
      <div >
        {places?.map((place) => (
          <div
            key={place._id}
            className="relative mb-5"
            >
              <div className="hover:bg-white  rounded-3xl shadow-lg bg-slate-100 drop-shadow-xl h-full">
              <Link to={`/places/${place._id}`}>
                <div className="h-[100px] md:h-[150px] max-h-[400px] overflow-hidden rounded-3xl">
                <div className="text-gray-950 text-center">
                  {<div className="mb-1 text-lg">{place.name}</div>}
                </div>
                  <img
                    src={place.image[0]}
                    alt={place.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                </Link>
                <div className="">
                <Button colorScheme="red" mr={3} mt={3} onClick={() => deletePlace(place._id)}>
                        Delete
                      </Button>
                      <Button colorScheme="blue" mr={3} mt={3} onClick={() => handleUpdate(place._id)}>
                        Update
                      </Button>
              
              </div>
            <div>
              </div>
            
            
              
              <hr className="mb-3 mt-3"></hr>
              {editingId === place._id && (
                <div className="flex-col text-black rounded-lg bg-slate-50 drop-shadow-xl p-4 mt-2 top-10">
                  <form className="updateForm max-h-[400px] overflow-auto p-2" onSubmit={handleSaveSubmit}>
                    <div >
                    <label>
                    Name:
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="border rounded p-2 mb-2"
                    />
                      </label>
                    <br />
                    <label>Address:
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="border rounded p-2 mb-2"
                    />
                    </label>
                    <br />
                    <label>Price Per Night:
                    <input
                      type="text"
                      placeholder="$"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="border rounded p-2 mb-2 text-black"
                    />
                    </label>
                    <br />
                    <label>Pets Allowed?
                    <select
                      value={pets}
                      onChange={(e) => setPets(e.target.value)}
                      className="border rounded text-black p-2 mb-2"
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                    </label>
                    <br />
                    <label>Handicap Accessible?
                    <select
                      value={handicap}
                      onChange={(e) => setHandicap(e.target.value)}
                      className="border rounded text-black p-2 mb-2"
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                    </label>
                    <br />
                    <label>Kitchen?
                    <select
                      value={kitchen}
                      onChange={(e) => setKitchen(e.target.value)}
                      className="border rounded text-black p-2 mb-2"
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                    </label>
                    <br />
                    <label>Elevator?
                    <select
                      value={elevator}
                      onChange={(e) => setElevator(e.target.value)}
                      className="border rounded text-black p-2 mb-2"
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                    </label>
                    <br />
                    </div>
                    <div >
                    <label>Pool?
                    <select
                      value={pool}
                      onChange={(e) => setPool(e.target.value)}
                      className="border rounded text-black p-2 mb-2"
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                    </label>
                    <br />
                    <label>Luxury?
                    <select
                      value={luxury}
                      onChange={(e) => setLuxury(e.target.value)}
                      className="border rounded text-black p-2 mb-2"
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                    </label>
                    <br />
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div key={index}>
                        <label>{`Image ${index + 1}:`}
                        <input
                          type="text"
                          value={image[index] || ""}
                          onChange={(e) => handleImageChange(e, index)}
                          className="border rounded p-2 mb-2"
                        />
                        </label>
                      </div>
                    ))}
                    <br />
                    <label>Description
                    <br />
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="border rounded p-2 mb-2"
                      rows={3}
                      cols={25}
                    />
                    </label>
                    <br />
                    </div>
                    <div className="w-full flex justify-center">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-8 py-2 rounded-lg"
                    >
                      Save
                    </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        ))}
        </div>
        <Link to={`/`} >
            <button className="mb-5 mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded">
              Back
            </button>
          </Link>
        </div>
      
        <div className="w-1/2 p-1 rounded-lg shadow-lg bg-slate-50 drop-shadow-xl">
        
        
        <ReservationListAdmin />
        
        
        </div>
        
        </section>
      
      
    </>
  );
}

export default AdminPage;
