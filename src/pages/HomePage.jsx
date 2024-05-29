import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [places, setPlaces] = useState(null);
  //const [fullAlbumsList, setFullAlbumsList] = useState(null);

  useEffect(() => {
    getAllPlaces();
  }, []);

  function getAllPlaces() {
    axios
      .get("http://localhost:5005/api/places")
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

      <section className="grid gap-5 md:grid-cols-3 ml-5 mr-5 mb-10">
        {places?.map((place) => (
          <div key={place._id} className="w-full md:w-auto">
            <Link to={`/places/${place._id}`}>
              <div className="hover:bg-white p-4 rounded-lg shadow-lg bg-slate-100 drop-shadow-xl">
                <img
                  src={place.image}
                  alt={place.name}
                />
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

export default HomePage;
