import axios from "axios";
import { useEffect, useState } from "react";
import DeleteReservation from "./DeleteReservation";
import EditReservation from "./EditReservation";



function ReservationListAdmin() {
  const [reservations, setReservations] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";

  useEffect(() => {
    getAllReservations();
  }, []);

  const getAllReservations = () => {
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
      <section className="h-auto ml-10 mr-10 mb-10 mt-5 shadow-sm">
        <h1 className="text-4xl font-semibold">Manage Existing Reservations</h1>
        <hr className="mb-1 mt-3"></hr>
        {reservations?.map((reservation) => (
          
          <div key={reservation._id} className=" relative mb-4 mt-3">
            <div className=" p-1 rounded-3xl shadow-lg bg-slate-100 drop-shadow-2xl relative">
              {/* <div className=" h-[200px] md:h-[300px] rounded-3xl"> */}
                <div className="text-gray-950 text-center mt-2">
                  {<div className="font-semibold text-lg">{reservation.name}</div>}
                  {<div>Guest Count - {reservation.guests}</div>}
                  <div>Start Date: {new Date(reservation.date[0]).toDateString()}</div>
                  <div>End Date: {new Date(reservation.date[1]).toDateString()}</div>
                  {<div>Location REF - {reservation.place}</div>}
                  {<div>UserID - {reservation.user}</div>}
                  
                  <hr className="mt-2"></hr>
                  
                  <div className="flex justify-center gap-3 mb-3 ">
                  <div>
                  <DeleteReservation reservationId={reservation._id} getAllReservations={getAllReservations} />
                    </div>
                  
                  <EditReservation reservationId={reservation._id} getAllReservations={getAllReservations} />
                  
                  <div>
                    
                  </div>
                  
                </div>
                </div>
                
                
                {/* </div> */}
            </div>
          </div>

        ))}

      </section>
    </>
  );
}

export default ReservationListAdmin;