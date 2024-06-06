import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "@chakra-ui/react";

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



    useEffect(() => {
        // Fetch the reservations data from the API and then set the state
        axios
          .get(`${API_URL}/api/reservations`)
          .then((response) => {
            setReservations(response.data);
          })
          .catch((error) => {
            console.error("Error fetching reservations:", error);
          });
      }, []);

    const handleDateChange = (index, value) => {
        const newDates = [...date]; // Create a copy of the dates array
        newDates[index] = value; // Update the value at the specified index
        setDate(newDates); // Update the dates state with the new array
    };


    //To update state for editingId for form dropdown
    const handleUpdate = (id) => {
        
        const selectedReservation = reservations.find(reservation => reservation._id === id);
        const formattedDates = selectedReservation.date.map(d => {
            const dateObject = new Date(d);
            return dateObject.toISOString().split('T')[0];
          });
        if (selectedReservation) {
          setName(selectedReservation.name);
          setDate(formattedDates);
          setGuests(selectedReservation.guests);
          setPlace(selectedReservation.place);
          setUser(selectedReservation.user);        
          setEditingId((prevId) => (prevId === id ? null : id));
          setPlaceId(id);
        }
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
            <Button className="mt-3 relative text-white "colorScheme="blue" mr={3} onClick={() => handleUpdate(reservationId)}>
            {editingId === reservationId ? "Cancel" : "Update"}
                      </Button>
               
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
