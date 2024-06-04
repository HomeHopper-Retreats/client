import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import {Button} from "@chakra-ui/react"
import DeleteReservation from "../components/DeleteReservation";

function MyReservations() {
  const [reservations, setReservations] = useState(null);
  const { user } = useContext(AuthContext);

  const API_URL = import.meta.env.VITE_API_URL;

  console.log("User object:", user._id);

  useEffect(() => {
    if (user && user._id) { // Check if user and user.id exist
        getMyReservations(user._id);
      }
  }, [user]);


  function getMyReservations() {
    
    axios
      .get(`${API_URL}/api/reservations/user/${user._id}`)
      .then((response) => {
        const reservationsFromApi = response.data; 
        setReservations(reservationsFromApi);
      })
      .catch((e) => console.log(e));
  }

  if (!reservations) {
    return <div>Loading...</div>; // Add a loading state while waiting for the data
  }

  const deleteReservation = (reservationId) => {
    axios
      .delete(`${API_URL}/api/reservations/${reservationId}`)
      .then((response) => {
        // console.log(`Place with id ${placeId} deleted successfully`);
        getMyReservations();
      })
      .catch((err) => console.log(err));
  }
  
  return (
    <>
    <section>
        <h2 className="text-3xl">Confirmed Reservations</h2>
    </section>
      <section className="grid gap-8 md:grid-cols-3 ml-10 mr-10 mb-10 mt-10">
        {reservations?.map((reservation) => (
          <div key={reservation._id} className="w-full md:w-auto max-h-[400px] ml-5 mb-10">
              <div className=" p-4 rounded-3xl shadow-lg bg-slate-100 drop-shadow-xl h-full">
                <div className="relative h-[200px] md:h-[300px] max-h-[400px] overflow-hidden rounded-3xl">
                <div className="text-gray-950 text-center mt-2">
                  {<div className="text-xl mb-3">Name - {reservation.name}</div>}
                  {<div>Dates - {reservation.date}</div>}
                  {<div>Guest Count - {reservation.guests}</div>}
                  {<div>Place Reference Number - {reservation.place}</div>}
                  {<div>User Reference Number - {reservation.user}</div>}
                  <Button colorScheme="blue" className="mt-5" onClick={() => deleteReservation(reservation._id)}>Delete</Button>
                </div>
                
                </div>
              </div>
              
              
          </div>
        ))}
        
      </section>
      <Link to={`/`}>
                      <Button className="mb-5"colorScheme="blue" mr={3}>
                        Back
                      </Button>
                    </Link>
    </>
  );
}

export default MyReservations;