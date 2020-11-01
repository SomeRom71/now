import React, { useEffect, useState } from 'react';
import { YMaps, Map } from 'react-yandex-maps';
import s from './auth.module.scss';

const AuthContainer: React.FC = () => {
  const [userPosition, setUserPosition] = useState<number[]>([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserPosition([latitude, longitude]);
      },
      (error) => {
        alert(error.message);
      },
    );
  }, []);

  const mapData = { center: userPosition, zoom: 10 };

  return (
    <div className={s.wrap}>
      <YMaps>
        <Map className={s.map} defaultState={mapData} />
      </YMaps>
    </div>
  );
};

export default AuthContainer;
