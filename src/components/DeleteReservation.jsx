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

<Button className="mt-3 relative text-white "colorScheme="red" mr={0} onClick={() => 
          getMyReservations ? handleDeleteAdmin(reservationId) : handleDelete(reservationId) }>
            Delete
                      </Button>
      </>
    );
  }
  
  export default DeleteReservation;