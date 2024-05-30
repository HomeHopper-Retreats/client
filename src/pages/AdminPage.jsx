import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function AdminPage() {

  const [places, setPlaces] = useState(null);

  const [editingId, setEditingId] = useState(false);
  const [updatedName, setUpdatedName] = useState("");


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
  };

  const handleSaveSubmit = () => {
    e.preventDefault();

    const requestBody = {name, image, description, petsAllowed, handicapAccessible, address, coordinates}

    axios
    .put(`${API_URL}/api/places/${placeId}`, requestBody)
    .then(response => {
      console.log(`Place with id ${placeId} updated successfully`);
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
              <div className="absolute bg-white rounded-lg border p-4 mt-2 top-10">
                <form onSubmit={handleSaveSubmit}>
                <label className="text-black">Name:</label>
                  <input
                    type="text"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                    className="border rounded p-2 mb-2"
                  />
                  <br/>
                  <label className="text-black">Image:</label>
                  <input
                    type="text"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                    className="border rounded p-2 mb-2"
                  />
                  <br/>
                  <label className="text-black">Address:</label>
                  <input
                    type="text"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                    className="border rounded p-2 mb-2"
                  />
                  <br/>
                  <label className="text-black">Pets Allowed?:</label>
                  <input
                    type="boolean"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                    className="border rounded p-2 mb-2"
                  />
                  <br/>
                  <label className="text-black">Handicap Accessible?:</label>
                  <input
                    type="boolean"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                    className="border rounded p-2 mb-2"
                  />
                  <br/>
                  <label className="text-black">Description</label>
                  <br/>
                  <textarea
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                    className="border rounded p-2 mb-2"
                    rows={2} // Specify the number of visible text lines
                    cols={25} // Specify the visible width of the text area
                  />
                  <br/>
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