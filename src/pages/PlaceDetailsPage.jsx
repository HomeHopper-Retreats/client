import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function PlaceDetailsPage() {
    const [place, setPlace] = useState(null);
    const { placeId } = useParams();

    const API_URL = import.meta.env.VITE_API_URL;


    useEffect(() => {
        getPlaceDetails();
    }, [placeId]);

    const getPlaceDetails = () => {

        axios
            .get(`${API_URL}/api/places/${placeId}`)
            .then((response) => {
                const placeDetailsFromApi = response.data;
                console.log(response.data)
                setPlace(placeDetailsFromApi);
            })
            .catch((e) => console.log("error" + e));

    };
    return (
        <>
            {place && (
                <section className="text-zinc-800 grid gap-5 md:grid-cols-2 ml-50 mr-50 mb-10">
                    <div className="w-full md:w-auto">

                        <div className="hover:bg-white p-4 rounded-lg shadow-lg bg-slate-100 drop-shadow-xl">
                            <img src={place.image} alt={place.name} />
                            <div className="text-center mt-2">
                                <h1>{place.name}</h1>
                                <hr />
                                {place.description}
                                {place.petsAllowed ? <div>DOGS ALLOWED</div> : <div>NO DOGS ALLOWED</div>}
                                {place.handicapAccessible ? <div>ACCESSIBLE</div> : <div>NOT ACCESSIBLE</div>}
                                {place.kitchenAvailable ? <div>KITCHEN</div> : <div>NO KITCHEN</div>}
                                {place.elevatorAvailable ? <div>ELEVATOR</div> : <div>NO ELEVATOR</div>}
                                {place.poolAvailable ? <div>POOL</div> : <div>NO POOL</div>}
                                {place.isLuxurious ? <div>LUXURIOUS</div> : <div>TOTAL CRAP</div>}
                                {place.address}
                                {place.location.coordinates}
                            </div>
                        </div>
                        <Link to={`/`}>
                            <button>Homepage</button>
                        </Link>
                    </div>
                </section>
            )}
        </>
    )

};

export default PlaceDetailsPage;