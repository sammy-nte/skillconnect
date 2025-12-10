import Autocomplete from "react-google-autocomplete";

export default function MapInput({setLocationData}) {
  return (
    <Autocomplete
      apiKey="AIzaSyAL9xrTjy_ujtb1iROthlKm64ICpBufD2w"
      onPlaceSelected={(place) => {
        // console.log("Place selected:", place);
        setLocationData(place)
      }}
      options={{
        types: ["geocode"],
      }}
    />
  );
}
