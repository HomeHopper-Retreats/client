import axios from "axios";
import { useContext, useEffect, useState } from "react";
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
import GoogleMap from "../components/GoogleMap";
import { AuthContext } from "../context/auth.context";
import ImageCarousel from "../components/ImageCarousel";
import { MdOutlinePets, MdElevator, MdPool } from "react-icons/md";
import { BiHandicap } from "react-icons/bi";
import { IoDiamondOutline } from "react-icons/io5";
import { TbToolsKitchen2 } from "react-icons/tb";

function PlaceDetailsPage() {
  const [place, setPlace] = useState(null);
  const { placeId } = useParams();
  const [date, setDate] = useState(new Date());
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useContext(AuthContext);
  const { isLoggedIn } = useContext(AuthContext);
  const [guests, setGuests] = useState(1);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";

  useEffect(() => {
    getPlaceDetails();
  }, [placeId]);

  const getPlaceDetails = () => {
    axios
      .get(`${API_URL}/api/places/${placeId}`)
      .then((response) => {
        const placeDetailsFromApi = response.data;
        //console.log(response.data);
        setPlace(placeDetailsFromApi);
      })
      .catch((e) => console.log("error" + e));
  };

  const submitReservation = (date) => {
    if (!isLoggedIn) {
      //console.log("User not logged in, opening login prompt");
      onOpen(); // Open the modal window
      return;
    }

    const dates = [date[0], date[1]];
    const requestBody = {
      name: place.name,
      date: dates,
      guests: guests,
      place: placeId,
      user: user._id,
    };

    axios
      .post(`${API_URL}/api/reservations`, requestBody)
      .then((response) => {
        onOpen(); // Open the modal window
      })
      .catch((e) => console.log("error" + e));
  };

  return (
    <>
      {place && (
        
        <div className="container mx-auto p-4">
          <h1 className="text-left font-bold mb-3">{place.name}</h1>
          <div className="md:flex md:space-x-4">
            <div className="md:w-2/3 mb-4 md:mb-0 p-4 rounded-lg shadow-lg bg-slate-50 drop-shadow-xl">
              <ImageCarousel
                overview={false}
                images={place.image}
                className="w-full h-full object-cover mb-4"
              />
              <div className="p-4 bg-slate-50">
                <div className="text-center mt-2">
                  <h1 className="text-2xl font-bold mb-2">{place.name}</h1>
                  <p className="mb-4">{place.description}</p>
                  <hr className="my-4" />
                  <div className="space-y-2">
                    {place.petsAllowed ? (
                      <div className="flex items-center">
                        <MdOutlinePets />
                        <h2 className="ml-2">DOGS ALLOWED</h2>
                      </div>
                    ) : (
                      <div>NO DOGS ALLOWED</div>
                    )}
                    {place.handicapAccessible ? (
                      <div className="flex items-center">
                        <BiHandicap />
                        <h2 className="ml-2">Accessible</h2>
                      </div>
                    ) : (
                      <div>NOT ACCESSIBLE</div>
                    )}
                    {place.kitchenAvailable ? (
                      <div className="flex items-center">
                        <TbToolsKitchen2 />
                        <h2 className="ml-2">Kitchen</h2>
                      </div>
                    ) : (
                      <div>NO KITCHEN</div>
                    )}
                    {place.elevatorAvailable ? (
                      <div className="flex items-center">
                        <MdElevator />
                        <h2 className="ml-2">Elevator</h2>
                      </div>
                    ) : (
                      <div>NO ELEVATOR</div>
                    )}
                    {place.poolAvailable ? (
                      <div className="flex items-center">
                        <MdPool />
                        <h2 className="ml-2">Pool</h2>
                      </div>
                    ) : (
                      <div>NO POOL</div>
                    )}
                    {place.isLuxurious ? (
                      <div className="flex items-center">
                        <IoDiamondOutline />
                        <h2 className="ml-2">Luxury</h2>
                      </div>
                    ) : (
                      <div>STANDARD</div>
                    )}
                  </div>
                  <div className="mt-4">{place.address}</div>
                  <div className="text-xl font-bold mt-2">${place.price}</div>
                </div>
              </div>
            </div>
            <div className="md:w-1/3">
              <div className="p-4 rounded-lg shadow-lg bg-slate-50 drop-shadow-xl mb-4">
                <h1 className="text-xl font-bold mb-4">Reservation</h1>
                <Calendar
                  onChange={setDate}
                  value={date}
                  selectRange={true}
                  minDate={new Date()}
                />
                {date.length > 0 ? (
                  <div className="mt-4">
                    <p className="text-slate-800">
                      <span className="font-bold">Start:</span>{" "}
                      {date[0].toDateString()}
                      &nbsp;|&nbsp;
                      <span className="font-bold">End:</span>{" "}
                      {date[1].toDateString()}
                    </p>
                  </div>
                ) : (
                  <p className="text-slate-800 mt-4">
                    <span className="font-bold">
                      Please select a date range
                    </span>
                  </p>
                )}
                <div className="mt-4">
                  <label className="block mb-2">Number of guests</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="border rounded text-black p-2 mb-2 w-full"
                  >
                    <option value="1">1 Person</option>
                    <option value="2">2 Persons</option>
                    <option value="3">3 Persons</option>
                    <option value="4">4 Persons</option>
                    <option value="5">5 Persons</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => submitReservation(date)}
                    className={
                      date.length > 0
                        ? "focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 w-full"
                        : "bg-gray-300 px-4 py-2 rounded-md cursor-not-allowed opacity-50 w-full"
                    }
                  >
                    Book reservation
                  </button>
                </div>
              </div>
              <div className="p-4 rounded-lg shadow-lg bg-slate-50 drop-shadow-xl">
                <GoogleMap address={place.address} />
              </div>
            </div>
          </div>
          <Link to={`/`}>
            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Back
            </button>
          </Link>

          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                {isLoggedIn
                  ? "Thank you for your reservation!"
                  : "Please login to make a reservation"}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {isLoggedIn ? (
                  <>
                    
                    <div>
                      From: {date.length === 2 ? date[0].toDateString() : ""}
                    </div>
                    <div className="mb-3">
                      To: {date.length === 2 ? date[1].toDateString() : ""}
                    </div>
                    <div className="mb-3">Number of guests: {guests}</div>
                    <div className="mb-3">
                      We will reply to you shortly with your booking
                      confirmation.
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </ModalBody>
              <ModalFooter>
                {!isLoggedIn && (
                  <>
                    <Link to={`/login`}>
                      <Button colorScheme="blue" mr={3}>
                        Proceed to Login
                      </Button>
                    </Link>
                  </>
                )}
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      )}
    </>
  );
}

export default PlaceDetailsPage;
