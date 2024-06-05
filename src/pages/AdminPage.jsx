import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddPlace from "../components/AddPlace";
import ReservationListAdmin from "../components/ReservationListAdmin";

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
        const placesFromApi = response.data;
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
    const newImages = [...image]; // Create a copy of the current images array
    newImages[index] = e.target.value; // Update the value at the specified index
    setImage(newImages); // Update the state with the new images array
  };

  //To update state for editingId for form dropdown
  const handleUpdate = (id) => {
    setEditingId((prevId) => (prevId === id ? null : id));
    setPlaceId(id);
    // console.log("PlaceIDHandleUpdate" + placeId)
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
        <AddPlace /> 
    
        <h1 className="pb-5 text-center">Manage Existing Places</h1>
      
      <hr className="mb-3"></hr>
      
        {places?.map((place) => (
          <div
            key={place._id}
            className=""
            // relative w-full md:w-auto max-h-[400px] mb-7
          >
            <Link to={`/places/${place._id}`}>
              <div className="hover:bg-white p-2 rounded-3xl shadow-lg bg-slate-100 drop-shadow-xl h-full">
                <div className="h-[100px] md:h-[150px] max-h-[400px] overflow-hidden rounded-3xl">
                <div className="text-gray-950 text-center">
                  {<div>{place.name}</div>}
                </div>
                  <img
                    src={place.image[0]}
                    alt={place.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
              </div>
            </Link>
            <div>
              <div className="">
                <button onClick={() => deletePlace(place._id)}>Delete</button>
                <button onClick={() => handleUpdate(place._id)}>
                  {editingId === place._id ? "Cancel" : "Update"}
                </button>
              </div>
              <hr className="mb-3 mt-3"></hr>
              {editingId === place._id && (
                <div className="position: absolute z-50 text-black bg-white rounded-lg border p-4 mt-2 top-10">
                  <form className="updateForm" onSubmit={handleSaveSubmit}>
                    <label>Name:</label>
                    <input
                      type="text"
                      value={place.name}
                      onChange={(e) => setName(e.target.value)}
                      className="border rounded p-2 mb-2"
                    />

                    <br />
                    <label>Address:</label>
                    <input
                      type="text"
                      value={place.address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="border rounded p-2 mb-2"
                    />
                    <br />
                    <label>Price Per Night:</label>
                    <input
                      type="text"
                      placeholder="$"
                      value={place.price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="border rounded p-2 mb-2 text-black"
                    />
                    <br />
                    <label>Pets Allowed?</label>
                    <select
                      value={place.pets}
                      onChange={(e) => setPets(e.target.value)}
                      className="border rounded text-black p-2 mb-2"
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                    <br />
                    <label>Handicap Accessible?</label>
                    <select
                      value={place.handicap}
                      onChange={(e) => setHandicap(e.target.value)}
                      className="border rounded text-black p-2 mb-2"
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                    <br />
                    <label>Kitchen?</label>
                    <select
                      value={place.kitchen}
                      onChange={(e) => setKitchen(e.target.value)}
                      className="border rounded text-black p-2 mb-2"
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                    <br />
                    <label>Elevator?</label>
                    <select
                      value={place.elevator}
                      onChange={(e) => setElevator(e.target.value)}
                      className="border rounded text-black p-2 mb-2"
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                    <br />
                    <label>Pool?</label>
                    <select
                      value={place.pool}
                      onChange={(e) => setPool(e.target.value)}
                      className="border rounded text-black p-2 mb-2"
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                    <br />
                    <label>Luxury?</label>
                    <select
                      value={place.luxury}
                      onChange={(e) => setLuxury(e.target.value)}
                      className="border rounded text-black p-2 mb-2"
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                    <br />
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div key={index}>
                        <label>{`Image ${index + 1}:`}</label>
                        <input
                          type="text"
                          value={image[index] || ""}
                          onChange={(e) => handleImageChange(e, index)}
                          className="border rounded p-2 mb-2"
                        />
                      </div>
                    ))}
                    <br />
                    <label>Description</label>
                    <br />
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="border rounded p-2 mb-2"
                      rows={2}
                      cols={25}
                    />
                    <br />
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                      Save
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        ))}
        <Link to={`/`} >
            <button className="mb-5 mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded">
              Back
            </button>
          </Link>
        </div>
      
        <div className="w-1/2 self-start p-2 rounded-lg shadow-lg bg-slate-50 drop-shadow-xl">
        <h1>Manage Existing Reservations</h1>
        <ReservationListAdmin />
        </div>
        
        </section>
      
      
    </>
  );
}

export default AdminPage;
