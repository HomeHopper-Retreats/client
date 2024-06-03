import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryFilter from "./CategoryFilter";

import ImageCarousel from "./ImageCarousel";

function PlacesList() {
  const [places, setPlaces] = useState(null);
  const [fullPlacesList, setFullPlacesList] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    getAllPlaces();
  }, []);

  function getAllPlaces() {
    axios
      .get(`${API_URL}/api/places`)
      .then((response) => {

        const placesFromApi = response.data; 
        
        setFullPlacesList(placesFromApi); 
        setPlaces(placesFromApi);
      })
      .catch((e) => console.log(e));
  }
  
  return (
    <>
    <section>
    <CategoryFilter
          setPlaces={setPlaces}
          fullPlacesList={fullPlacesList}
        />
    </section>
      <section className="grid gap-8 md:grid-cols-3 ml-10 mr-10 mb-10">
        {places?.map((place) => (
          <div key={place._id} className="w-full md:w-auto max-h-[400px]">
            <Link to={`/places/${place._id}`}>
              <div className="hover:bg-white p-4 rounded-3xl shadow-lg bg-slate-100 drop-shadow-xl h-full">
                <div className="relative h-[200px] md:h-[300px] max-h-[400px] overflow-hidden rounded-3xl">
                  <ImageCarousel
                    overview={true}
                    images={place.image}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-gray-950 text-center mt-2">
                  {<div>{place.name}</div>}
                  {<div className="font-bold">${place.price} / Night</div>}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </section>
    </>
  );
}

export default PlacesList;
