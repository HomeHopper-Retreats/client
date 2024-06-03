import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function ImageCarousel(props) {

    const isOverview = props.overview;

  return (
    <Carousel
      autoPlay={true}
      showThumbs={isOverview ? false : true}
      infiniteLoop={true}
      showArrows={isOverview ? false : true}
      stopOnHover={isOverview ? false : true}
      showStatus={false}
    >
      {props.images.map((image, index) => (
        <div key={index} className={isOverview ? "carousel-image-overview" : "carousel-image-large"}>
          <img
            src={image}
            alt={`Slide ${index}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </Carousel>
  );
}

export default ImageCarousel;
