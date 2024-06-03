const CategoryFilter = ({ setPlaces, fullPlacesList }) => {
  
 const getCategory = query => {   
    console.log("query" + query)
    
    if (query === "All") {
     return setPlaces(fullPlacesList)
    }
    
    const searchResult = fullPlacesList.filter(
      (place) => place[query] === true
    );
    setPlaces(searchResult);
  }

  const categories = [
    "All",
    "petsAllowed",
    "handicapAccessible",
    "kitchenAvailable",
    "elevatorAvailable",
    "poolAvailable",
    "isLuxurious"
  ]

  const categoryDisplayNames = {
    All: "All",
    petsAllowed: "Pets",
    handicapAccessible: "Handicap",
    kitchenAvailable: "Kitchen",
    elevatorAvailable: "Elevator",
    poolAvailable: "Pool",
    isLuxurious: "Luxurious"
  };
  
  return (
    <div className="grid gap-1 md:grid-cols-7 ml-1 mr-1 mb-8">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => getCategory(category)}
        >
          {categoryDisplayNames[category]}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;