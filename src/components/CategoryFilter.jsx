import { MdOutlinePets, MdElevator, MdPool} from "react-icons/md";
import { BiHandicap } from "react-icons/bi"
import { IoDiamondOutline } from "react-icons/io5";
import { TbToolsKitchen2 } from "react-icons/tb";


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
    handicapAccessible: "Handicap Accessible",
    kitchenAvailable: "Kitchen",
    elevatorAvailable: "Elevator",
    poolAvailable: "Pool",
    isLuxurious: "Luxury"
  };
  
  return (
    <div className="grid gap-1 md:grid-cols-7 ml-1 mr-1 mb-8 shadow-sm">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => getCategory(category)}
          className="inline-flex items-center justify-center text-lg"
        >   
        {category === "All" &&  <div className="flex items-center"> <h2 className="ml-2"> All </h2> </div>} 
        {category === "petsAllowed" &&  <div className="flex items-center"> <MdOutlinePets /> <h2 className="ml-2"> Pets </h2> </div>}
        {category === "handicapAccessible" &&  <div className="flex items-center"> <BiHandicap /> <h2 className="ml-2"> Handicap Accessible </h2> </div>} 
        {category === "kitchenAvailable" &&  <div className="flex items-center"> <TbToolsKitchen2 /> <h2 className="ml-2"> Kitchen </h2> </div>} 
        {category === "elevatorAvailable" &&  <div className="flex items-center"> <MdElevator /> <h2 className="ml-2"> Elevator </h2> </div>} 
        {category === "poolAvailable" &&  <div className="flex items-center"> <MdPool /> <h2 className="ml-2"> Pool </h2> </div>} 
        {category === "isLuxurious" &&  <div className="flex items-center"> <IoDiamondOutline /> <h2 className="ml-2"> Luxury </h2> </div>} 
        
          
          
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;