import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import DeleteReservation from "../components/DeleteReservation";

function MyReservations() {
  const [reservations, setReservations] = useState(null);
  const { user } = useContext(AuthContext);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";

  useEffect(() => {
    if (user && user._id) {
      // Check if user and user.id exist
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

  return (
    <>
      <div className="h-screen flex flex-col">
        <section>
          <h2 className="text-3xl font-bold">Confirmed Reservations</h2>
        </section>
        <section className="grid gap-8 md:grid-cols-3 ml-10 mr-10 mb-10 mt-10">
          {reservations?.map((reservation) => (
            <div key={reservation._id}>
              <div className=" p-4 rounded-3xl shadow-lg bg-slate-100 drop-shadow-xl h-full">
                <div className="text-gray-950 text-center mt-2">
                  {
                    <div className="text-xl font-semibold mb-3">
                      {reservation.name}
                    </div>
                  }
                  {<div>Guest Count - {reservation.guests}</div>}
                  <div>
                    Start Date: {new Date(reservation.date[0]).toDateString()}
                  </div>
                  <div>
                    End Date: {new Date(reservation.date[1]).toDateString()}
                  </div>
                  <DeleteReservation
                    reservationId={reservation._id}
                    getMyReservations={getMyReservations}
                  />
                </div>
              </div>
            </div>
          ))}
        </section>
        <Link to={`/`}>
          <Button className="mb-5" colorScheme="blue" mr={3}>
            Back
          </Button>
        </Link>
      </div>
    </>
  );
}

export default MyReservations;
