import { useEffect, useState, useRef } from "react";

// icons
import phoneLogoFooter from "../../assets/img/footer_phone.svg";
import emailLogoFooter from "../../assets/img/footer_email.svg";
import locationLogoFooter from "../../assets/img/footer_location.svg";
import instagramLogoFooter from "../../assets/img/footer_instagram.svg";
import telegramLogoFooter from "../../assets/img/footer_telegram.svg";

// Mapbox
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";

// styles
import styles from "./AboutBlock.module.scss";

const AboutBlock: React.FC = () => {
  const [marker, setMarker] = useState<any>();
  const mapRef = useRef();

  mapboxgl.accessToken =
    "pk.eyJ1IjoiZGFuZGVsMW9uIiwiYSI6ImNsbm96c2J5aTBpaWUyam9jMjQ1ZjBvbG8ifQ.fJBIAFF65UCvaFHqc-FXXw";

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [37.61556, 55.75222],
      zoom: 1,
    });
    // create marker
    const marker = new mapboxgl.Marker()
      .setLngLat([37.61556, 55.75222])
      .addTo(map); // add it to the existing map
    setMarker(marker); // make it available throughout the component
    console.log("render");
    console.log(marker);
    
  }, []);

  const stores = {
    office: [37.61556, 55.75222],
    location1: [37.61556, 55.75222],
    location2: [37.61556, 55.75222],
  };

  function handleDropdownChange(event: any) {
    marker.setLngLat(stores[event.target.value]);
    console.log(event.target.value);
  }

  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <div className={styles.mapOverlay}>
          <h3>Выберите точку: </h3>
          <select onChange={handleDropdownChange}>
            <option value="office">Главный офис</option>
            <option value="location1">Ресторан</option>
            <option value="location2">Ресторан</option>
          </select>
        </div>
        <div className={styles.map}>
          <div ref={mapRef} id="map"></div>
        </div>
      </div>
      <div className={styles.column}>
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
  );
};

export default AboutBlock;
