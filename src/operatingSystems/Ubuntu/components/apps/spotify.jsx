import React from "react";

export default function Spotify() {
  return (
    <iframe
      src="https://open.spotify.com/embed/playlist/37i9dQZEVXcTrkDwjqyl1q?si=85ed77aa2db24ecf"
      frameBorder="0"
      title="Spotify"
      className="h-full w-full bg-ub-cool-grey"
    ></iframe>
  );
}

export const displaySpotify = () => {
  <Spotify> </Spotify>;
};
