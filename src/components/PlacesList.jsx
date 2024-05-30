import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PlacesList() {
  const [places, setPlaces] = useState(null);
  //const [fullAlbumsList, setFullAlbumsList] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;


  useEffect(() => {
    getAllPlaces();
  }, []);

  function getAllPlaces() {

    axios
      .get(`${API_URL}/api/places`)
      .then((response) => {
        const placesFromApi = response.data.reverse(); //revert the order of the albums once a new one created appears as the first.
        setPlaces(placesFromApi);
        //setFullAlbumsList(albumsFromApi); // Update full album list
      })
      .catch((e) => console.log(e));
  }

  //   function searchAlbumOrArtist(query) {
  //     const needle = query.toLowerCase();

  //     const searchResult = fullAlbumsList.filter((album) => {
  //       const artistName = album.artist.toLowerCase();
  //       const albumName = album.title.toLowerCase();
  //       if (artistName.includes(needle) || albumName.includes(needle)) {
  //         return true;
  //       }
  //     });
  //     setAlbums(searchResult);
  //   }

  //   function getGenre(query) {
  //     setAlbums(fullAlbumsList);
  //     if (query === "All") {
  //       return;
  //     }
  //     const searchResult = fullAlbumsList.filter(
  //       (album) => album.genre === query
  //     );
  //     setAlbums(searchResult);
  //   }


  return (
    <>
      {/* <Search
        searchAlbumOrArtist={searchAlbumOrArtist}
        getAllAlbums={getAllPlaces}
        getGenre={getGenre}
      /> */}

<section className="grid gap-5 md:grid-cols-3 ml-10 mr-10 mb-10">
  {places?.map((place) => (
    <div key={place._id} className="w-full md:w-auto max-h-[400px]">
      <Link to={`/places/${place._id}`}>
        <div className="hover:bg-white p-4 rounded-3xl shadow-lg bg-slate-100 drop-shadow-xl h-full">
          <div className="relative h-[200px] md:h-[300px] max-h-[400px] overflow-hidden rounded-3xl">
            <img src={place.image} alt={place.name} className="w-full h-full object-cover" />
          </div>
          <div className="text-center mt-2">
            <h1>{place.name}</h1>
            <hr />
            {place.description}
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
