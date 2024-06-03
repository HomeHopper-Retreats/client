import { useRef, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

function ImageCarousel(props) {
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef(null);
  const isOverview = props.overview;

  const handleMouseEnter = () => {
    if(!isOverview) return;
    setIsAnimating(true);
    carouselRef.current.increment();
  };

  const handleMouseLeave = () => {
    setIsAnimating(false);
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Carousel
        ref={carouselRef}
        autoPlay={isOverview ? isAnimating : true}
        showThumbs={isOverview ? false : true}
        infiniteLoop={true}
        showArrows={isOverview ? false : true}
        stopOnHover={isOverview ? false : true} // Turn off stopOnHover since we are controlling it manually
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
    </div>
  );
}

export default ImageCarousel;
