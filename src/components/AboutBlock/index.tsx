import { useState } from "react";
// components
import BackButton from "../../components/UI/BackButton";
// Mapbox
import Map, { Marker, NavigationControl, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
// icons
import phoneLogoFooter from "../../assets/img/footer_phone.svg";
import emailLogoFooter from "../../assets/img/footer_email.svg";
import locationLogoFooter from "../../assets/img/footer_location.svg";
import instagramLogoFooter from "../../assets/img/footer_instagram.svg";
import telegramLogoFooter from "../../assets/img/footer_telegram.svg";
import markerImage from "../../assets/img/pizza-marker.png";
// styles
import styles from "./AboutBlock.module.scss";
// react-router
import { Link } from "react-router-dom";

const markersData = [
  {
    longitude: 37.5716530669932,
    latitude: 55.82848542453838,
    location: "Москва, ул. Дмитровское ш., 29",
  },
  {
    longitude: 37.58450199739204,
    latitude: 55.80658962844234,
    location: "Москва, ул. Новодмитровская, 1с1",
  },
  {
    longitude: 37.760199739204,
    latitude: 55.42578962844234,
    location: "Московская обл., Домодедово, ул. 25 лет Октября, 14",
  },
  {
    longitude: 37.51433199739204,
    latitude: 55.76649962844234,
    location: "Москва, 1-й Силикатный пр-д",
  },
  {
    longitude: 37.65450199739204,
    latitude: 55.677668962844234,
    location: "Москва, Нагатинская ул., 22к1",
  },
  {
    longitude: 37.77480199739204,
    latitude: 55.797668962844234,
    location: "Москва, ул. Никитинская, 6",
  },
  {
    longitude: 37.77490199739204,
    latitude: 55.715668962844234,
    location: "Москва, ул. Федора Полетаева, 2к1",
  },
];

const AboutBlock: React.FC = () => {
  const [selectedMarkers, setSelectedMarkers] = useState<boolean[]>(
    new Array(markersData.length).fill(true)
  );

  const handleMarkerClick = (index: number) => {
    const newSelectedMarkers = [...selectedMarkers];
    newSelectedMarkers[index] = !newSelectedMarkers[index];
    setSelectedMarkers(newSelectedMarkers);
  };

  return (
    <>
      <div className={styles.aboutContainer}>
        <div className={styles.aboutColumn}>
          <Map
            mapboxAccessToken="pk.eyJ1IjoiZGFuZGVsMW9uIiwiYSI6ImNsbm96c2J5aTBpaWUyam9jMjQ1ZjBvbG8ifQ.fJBIAFF65UCvaFHqc-FXXw"
            initialViewState={{
              longitude: 37.5716530669932,
              latitude: 55.82848542453838,
              zoom: 13,
            }}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            style={{ width: "100%", height: "400px" }}
          >
            {markersData.map((marker, index) => {
              return (
                <Marker
                  key={index}
                  longitude={marker.longitude}
                  latitude={marker.latitude}
                  anchor="bottom"
                >
                  <div
                    className={styles.marker}
                    onClick={() => handleMarkerClick(index)}
                  >
                    <img src={markerImage} alt="marker" />
                  </div>
                  {selectedMarkers[index] && (
                    <Popup
                      longitude={marker.longitude}
                      latitude={marker.latitude}
                      anchor="top"
                      onClose={() => handleMarkerClick(index)}
                      className={styles.popup}
                    >
                      {marker?.location}
                    </Popup>
                  )}
                </Marker>
              );
            })}
            <NavigationControl />
          </Map>
        </div>
        <div className={styles.aboutColumn}>
          <div className={styles.logo}>
            <img width="25" src={phoneLogoFooter} alt="Phone logo" />
            <a href="tel:+7(777)7777">
              <p>+ 7 (777) 77 77</p>
            </a>
          </div>
          <div className={styles.logo}>
            <img width="25" src={emailLogoFooter} alt="Email logo" />
            <p>dudu_pizza@mail.ru</p>
          </div>
          <div className={styles.logo}>
            <img width="25" src={locationLogoFooter} alt="Location logo" />
            <p>Москва, ул. Дегунинская, д.10к1</p>
          </div>
          <div className={styles.logo}>
            <img width="25" src={instagramLogoFooter} alt="Instagram logo" />
            <p>@dudu.pizzagram</p>
          </div>
          <div className={styles.logo}>
            <img width="25" src={telegramLogoFooter} alt="Telegram logo" />
            <p>@dudu.pizza</p>
          </div>
        </div>
      </div>
      <Link to="/react_project_3">
        <BackButton />
      </Link>
    </>
  );
};

export default AboutBlock;
