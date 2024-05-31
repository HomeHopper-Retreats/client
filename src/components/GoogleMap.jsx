const GoogleMap = ({address}) => {

    return (
      <div>
        <iframe
          title="google map"
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBapC5bIrPygdzF8X4-pIbrSgfmpFSa3B8&q=${encodeURIComponent(address)}`}
          width="100%"
          height="500"
          style={{ border: 0 }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    );
  };
  
  export default GoogleMap;