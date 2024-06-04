import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ReservationListAdmin() {
  const [reservations, setReservations] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    getAllReservations();
  }, []);

  function getAllReservations() {
    axios
      .get(`${API_URL}/api/reservations`)
      .then((response) => {
        const reservationsFromApi = response.data; 
        setReservations(reservationsFromApi);
      })
      .catch((e) => console.log(e));
  }
  
  return (
    <>
      <section className="grid gap-8 md:grid-cols-3 ml-10 mr-10 mb-10 mt-10">
        {reservations?.map((reservation) => (
          <div key={reservation._id} className="w-full md:w-auto max-h-[200px] mb-3">
            <Link to={`/reservations/${reservation._id}`}>
              <div className="hover:bg-white p-4 rounded-3xl shadow-lg bg-slate-100 drop-shadow-xl h-full">
                <div className="relative h-[200px] md:h-[300px] max-h-[400px] overflow-hidden rounded-3xl">
                <div className="text-gray-950 text-center mt-2">
                {<div>{reservation.name}</div>}
                  {<div>Dates - {reservation.date}</div>}
                  {<div>Guest Count - {reservation.guests}</div>}
                  {<div>Location - {reservation.place}</div>}
                </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </section>
    </>
  );
}

export default ReservationListAdmin;