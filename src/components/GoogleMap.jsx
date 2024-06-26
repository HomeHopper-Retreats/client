const GoogleMap = ({address}) => {

  

  const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

    return (
      <div>
        <iframe
          title="google map"
          src={`https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${encodeURIComponent(address)}`}
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    );
  };
  
  export default GoogleMap;