import axios from "axios";
import { useState } from "react";

function EditReservation({ reservationId, getAllReservations }) {
    const [reservations, setReservations] = useState(null);
    const [name, setName] = useState("");
    const [date, setDate] = useState(["", ""]);
    const [guests, setGuests] = useState("");
    const [place, setPlace] = useState("");
    const [user, setUser] = useState("");
    const [placeId, setPlaceId] = useState("");

    const [editingId, setEditingId] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";


    const handleDateChange = (index, value) => {
        const newDates = [...date]; // Create a copy of the dates array
        newDates[index] = value; // Update the value at the specified index
        setDate(newDates); // Update the dates state with the new array
    };

    //To update state for editingId for form dropdown
    const handleUpdate = (id) => {
        setEditingId((prevId) => (prevId === id ? null : id));
        setPlaceId(id);

    };

    const handleSaveSubmit = (e) => {
        e.preventDefault();

        const requestBody = {
            name,
            date,
            guests,
            place,
            user
        };

        axios
            .put(`${API_URL}/api/reservations/${reservationId}`, requestBody)
            .then((response) => {
                //console.log(`Place with id ${placeId} updated successfully`);
                getAllReservations();
            })
            .catch((err) => console.log(err));

        setEditingId(null);
    };

    return (
        <>
            
            <div>
                <button className="relative mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded" onClick={() => handleUpdate(reservationId)}>
                    {editingId === reservationId ? "Cancel" : "Update"}
                </button>
            </div>

            {editingId === reservationId && (
                <div className="text-black rounded-lg bg-slate-50 drop-shadow-xl p-2 mt-2 top-10">
                    <form className=" p-2" onSubmit={handleSaveSubmit}>
                        <div className="flex flex-col gap-2">
                            
                            <label>
                                Name:
                                <input
                                    type="text"
                                    placeholder="i.e Paradise hotel"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="border rounded p-2 mb-2"
                                />
                            </label>

                            <label >Start Date:
                            <input
                                type="date"
                                id="start-date"
                                value={date[0]}
                                onChange={(e) => handleDateChange(0, e.target.value)}
                            />
                            </label>

                            <label >End Date:
                            <input
                                type="date"
                                id="end-date"
                                value={date[1]}
                                onChange={(e) => handleDateChange(1, e.target.value)}
                            />
                            </label>

                            <label >Guest Count:
                                <input
                                    type="text"
                                    placeholder="0"
                                    value={guests}
                                    onChange={(e) => setGuests(e.target.value)}
                                    className="border rounded p-2 mb-2 text-black"
                                />
                                </label>

                            

                                <label>Place Reference #:
                                    <input
                                        type="text"
                                        placeholder="1234"
                                        value={place}
                                        onChange={(e) => setPlace(e.target.value)}
                                        className="border rounded p-2 mb-2 text-black"
                                    />
                                    </label>

                                    <label>User Reference #:
                                        <input
                                            type="text"
                                            placeholder="1234"
                                            value={user}
                                            onChange={(e) => setUser(e.target.value)}
                                            className="border rounded p-2 mb-2 text-black"
                                        />
                                    </label>

                                

                               
                                <div className="w-full flex justify-center">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-8 py-2 rounded-lg"
                                    >
                                        Save
                                    </button>
                                    </div>
                                </div>
                            </form>
                        
                        </div>
                    )}
                    
                    </>
                    );
                    }

                    export default EditReservation;
