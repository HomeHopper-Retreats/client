import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function AdminPage() {

    const [places, setPlaces] = useState(null);
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [address, setAddress] = useState("");
    const [pets, setPets] = useState(false);
    const [handicap, setHandicap] = useState(false);
    const [elevator, setElevator] = useState(false);
    const [kitchen, setKitchen] = useState(false);
    const [pool, setPool] = useState(false);
    const [luxury, setLuxury] = useState(false);
    const [description, setDescription] = useState("");
    const [placeId, setPlaceId] = useState("");


    const [editingId, setEditingId] = useState(false);


    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        getAllPlaces();
    }, []);


    function getAllPlaces() {

        axios
            .get(`${API_URL}/api/places`)
            .then((response) => {
                const placesFromApi = response.data
                setPlaces(placesFromApi);
            })
            .catch((e) => console.log(e));
    }


    const deletePlace = (placeId) => {

        axios
            .delete(`${API_URL}/api/places/${placeId}`)
            .then(response => {
                console.log(`Place with id ${placeId} deleted successfully`);
            })
            .catch((err) => console.log(err));
    };

    //To update state for editingId for form dropdown
    const handleUpdate = (id) => {
        setEditingId(prevId => (prevId === id ? null : id))
        setPlaceId(id);
        console.log("PlaceIDHandleUpdate" + placeId)
    };

    const handleSaveSubmit = (e) => {
        e.preventDefault();

        console.log("placeID" + placeId)

        
        const requestBody = { 
            name: name, 
            image: image, 
            description: description, 
            petsAllowed: pets,
            handicapAccessible: handicap, 
            isLuxurious: luxury, 
            kitchenAvailable: kitchen, 
            poolAvailable: pool, 
            address: address}

        console.log("pets" + (typeof pets))

        console.log("request body" + requestBody);

        axios
            .put(`${API_URL}/api/places/${placeId}`, requestBody)
            .then(response => {
                console.log(`Place with id ${placeId} updated successfully`);
                getAllPlaces();
            })
            .catch((err) => console.log(err));

        setEditingId(null);
    };


    return (
        <>

            <section className="grid gap-5 md:grid-cols-3 ml-5 mr-5 mb-10">
                {places?.map((place) => (
                    <div key={place._id} className="w-full md:w-auto">
                        <Link to={`/places/${place._id}`}>
                            <div className="hover:bg-white p-4 rounded-lg shadow-lg bg-slate-100 drop-shadow-xl">
                                <img src={place.image} alt={place.name} />
                                <div className="text-center mt-2">
                                    <h1>{place.name}</h1>
                                    <hr />
                                    {place.description}
                                </div>
                            </div>
                        </Link>
                        <div>
                            <button onClick={() => deletePlace(place._id)}>Delete</button>
                            <button onClick={() => handleUpdate(place._id)}>{editingId === place._id ? 'Cancel' : 'Update'}</button>
                            {editingId === place._id && (
                                <div className="position: absolute; text-black bg-white rounded-lg border p-4 mt-2 top-10">
                                    <form className="updateForm" onSubmit={handleSaveSubmit}>
                                        <label>Name:</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="border rounded p-2 mb-2"
                                        />
                                        <br />
                                        <label>Image:</label>
                                        <input
                                            type="text"
                                            value={image}
                                            onChange={(e) => setImage(e.target.value)}
                                            className="border rounded p-2 mb-2"
                                        />
                                        <br />
                                        <label>Address:</label>
                                        <input
                                            type="text"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            className="border rounded p-2 mb-2"
                                        />
                                        <br />
                                        <label>Pets Allowed?</label>
                                        <select
                                            value={pets}
                                            onChange={(e) => setPets(e.target.value)}
                                            className="border rounded text-black p-2 mb-2">
                                        
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                        </select>
                                        <br />
                                        <label>Handicap Accessible?</label>
                                        <select
                                            value={handicap}
                                            onChange={(e) => setHandicap(e.target.value)}
                                            className="border rounded text-black p-2 mb-2">
                                            
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                        </select>
                                        <br />
                                        <label>Kitchen?</label>
                                        <select
                                            value={kitchen}
                                            onChange={(e) => setKitchen(e.target.value)}
                                            className="border rounded text-black p-2 mb-2">
                                            
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                        </select>
                                        <br />
                                        <label>Elevator?</label>
                                        <select
                                            value={elevator}
                                            onChange={(e) => setElevator(e.target.value)}
                                            className="border rounded text-black p-2 mb-2">
                                            
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                        </select>
                                        <br />
                                        <label>Pool?</label>
                                        <select
                                            value={pool}
                                            onChange={(e) => setPool(e.target.value)}
                                            className="border rounded text-black p-2 mb-2">
                                            
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                        </select>
                                        <br />
                                        <label>Luxury?</label>
                                        <select
                                            value={luxury}
                                            onChange={(e) => setLuxury(e.target.value)}
                                            className="border rounded text-black p-2 mb-2">
                                            
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                        </select>
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
                                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                                            Save
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>

                ))}
            </section>
        </>
    );
}

export default AdminPage;