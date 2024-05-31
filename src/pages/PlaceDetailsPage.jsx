import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

function PlaceDetailsPage() {
  const [place, setPlace] = useState(null);
  const { placeId } = useParams();
  const [date, setDate] = useState(new Date());
  const { isOpen, onOpen, onClose } = useDisclosure();

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    getPlaceDetails();
  }, [placeId]);

  const getPlaceDetails = () => {
    axios
      .get(`${API_URL}/api/places/${placeId}`)
      .then((response) => {
        const placeDetailsFromApi = response.data;
        console.log(response.data);
        setPlace(placeDetailsFromApi);
      })
      .catch((e) => console.log("error" + e));
  };

  const submitReservation = (date) => {
    const dates = [date[0], date[1]];
    const requestBody = {
      name: place.name,
      date: dates,
      description: "can be removed?",
      place: placeId,
      user: "6657293dbbbb6f7ef765b721", // TODO: make dynamic
    };
    axios
      .post(`${API_URL}/api/reservations`, requestBody)
      .then((response) => {
        console.log(response.data);
        onOpen(); // Open the modal
      })
      .catch((e) => console.log("error" + e));
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Thank you for your reservation!</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {place && (
        <div>
          <div className="mb-10">
            <section className="text-zinc-800 mx-auto mb-4 max-w-screen-md">
              <div className="w-full md:w-auto">
                <div className="hover:bg-white p-4 rounded-lg shadow-lg bg-slate-100 drop-shadow-xl">
                  <div className="text-center mt-2">
                    <h1>{place.name}</h1>
                    <hr />
                    {place.description}
                    {place.petsAllowed ? (
                      <div>DOGS ALLOWED</div>
                    ) : (
                      <div>NO DOGS ALLOWED</div>
                    )}
                    {place.handicapAccessible ? (
                      <div>ACCESSIBLE</div>
                    ) : (
                      <div>NOT ACCESSIBLE</div>
                    )}
                    {place.kitchenAvailable ? (
                      <div>KITCHEN</div>
                    ) : (
                      <div>NO KITCHEN</div>
                    )}
                    {place.elevatorAvailable ? (
                      <div>ELEVATOR</div>
                    ) : (
                      <div>NO ELEVATOR</div>
                    )}
                    {place.poolAvailable ? <div>POOL</div> : <div>NO POOL</div>}
                    {place.isLuxurious ? (
                      <div>LUXURIOUS</div>
                    ) : (
                      <div>STANDARD</div>
                    )}
                    {place.address}
                    {place.location.coordinates}
                  </div>
                </div>
                <h1 className="text-gray-50">Reservation</h1>
                <div className="flex items-center justify-center m-5">
                  <Calendar
                    onChange={setDate}
                    value={date}
                    selectRange={true}
                  />
                </div>
                {date.length > 0 ? (
                  <div>
                    <p className="text-slate-50">
                      <span className="bold">Start:</span>{" "}
                      {date[0].toDateString()}
                      &nbsp;|&nbsp;
                      <span className="bold">End:</span>{" "}
                      {date[1].toDateString()}
                    </p>
                    <button
                      type="button"
                      onClick={() => submitReservation(date)}
                      className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      Book reservation
                    </button>
                  </div>
                ) : (
                  <p className="text-slate-50">
                    <span className="bold">Please select a date range</span>
                  </p>
                )}
                <div>
                  {place.image.map((imgUrl, index) => (
                    <img key={index} src={imgUrl} alt={place.name} />
                  ))}
                </div>
              </div>
            </section>
            <Link to={`/`}>
              <button>Back</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default PlaceDetailsPage;
