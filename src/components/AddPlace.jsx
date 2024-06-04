import axios from "axios";
import { useEffect, useState } from "react";



function AddPlace() {

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
  const [editingId, setEditingId] = useState(false);


  const API_URL = import.meta.env.VITE_API_URL;

  //To update state for editingId for form dropdown
  const handleUpdate = () => {
    setEditingId(!editingId)
};


  const handleImageChange = (e, index) => {
    const newImages = [...image]; // Create a copy of the current images array
    newImages[index] = e.target.value; // Update the value at the specified index
    setImage(newImages); // Update the state with the new images array
  };


  const handleSaveSubmit = (e) => {
    e.preventDefault();


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
      price: price
    }
    axios
      .post(`${API_URL}/api/places`, requestBody)
      .then(response => {
        //console.log(`Place created successfully`);
        setName("")
        setImage("")
        setAddress("")
        setDescription("")
      })
      .catch((err) => console.log(err));

      setEditingId(null);
  };


  return (
    <>
      <section className="grid gap-5 ml-10 mr-10 mb-10">
        <h1>Add New Place</h1>
        <button className="bg-green-500" onClick={() => handleUpdate()}>{editingId ? 'Cancel' : 'Add Place'}</button>
        <div>
        {editingId &&(
        <form className="updateForm" onSubmit={handleSaveSubmit}>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            className="border rounded p-2 mb-2 text-black"
          />

          <br />
          <label>Address:</label>
          <input
            type="text"
            value={address}
            placeholder="Street, City, State, ZIP"
            onChange={(e) => setAddress(e.target.value)}
            className="border rounded p-2 mb-2 text-black"
          />
          <br />
          <label>Price Per Night:</label>
          <input
            type="text"
            placeholder="$"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border rounded p-2 mb-2 text-black"
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
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index}>
              <label>{`Image ${index + 1}:`}</label>
              <input
                type="text"
                value={image[index] || ""}
                placeholder="Image URL address"
                onChange={(e) => handleImageChange(e, index)}
                className="border rounded p-2 mb-2 text-black"
              />
            </div>
          ))}
          <br />
          <label>Description</label>
          <br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the property and available amenities"
            className="border rounded p-2 mb-2 text-black"
            rows={2}
            cols={25}
          />
          
          <br />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Save
          </button>
        </form>
        )}

</div>
            </section >
        </>
    );
}

export default AddPlace;