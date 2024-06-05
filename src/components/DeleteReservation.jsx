import axios from "axios";
import { Button } from "@chakra-ui/react";


const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";

function DeleteReservation({ reservationId, getAllReservations, getMyReservations }) {
    const handleDelete = (id) => {
      axios
        .delete(`${API_URL}/api/reservations/${id}`)
        .then((response) => {
          console.log(`Reservation with id ${id} deleted successfully`);
          getAllReservations();
        })
        .catch((err) => console.log(err));
    };
    const handleDeleteAdmin = (id) => {
      axios
        .delete(`${API_URL}/api/reservations/${id}`)
        .then((response) => {
          console.log(`Reservation with id ${id} deleted successfully`);
          getMyReservations();
        })
        .catch((err) => console.log(err));
    };
  
    return (
      <>

<button className="mt-3 bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded" onClick={() => 
          getMyReservations ? handleDeleteAdmin(reservationId) : handleDelete(reservationId) }>
          Delete</button>
      </>
    );
  }
  
  export default DeleteReservation;