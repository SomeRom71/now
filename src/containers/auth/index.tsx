import React, { useEffect, useState } from 'react';
import { YMaps, Map, YMapsApi } from 'react-yandex-maps';
import cn from 'classnames';
import { YMAPS_API_KEY } from '../../constants/api-constants';
import s from './auth.module.scss';

const AuthContainer: React.FC = () => {
  const [position, setPosition] = useState([0, 0]);
  const [visible, setVisible] = useState(false);
  const [ymaps, setYmaps] = useState<YMapsApi>();

  // эта херня для того чтобы при авторизации на фоне у юзера был его город :)
  const getCityCoords = async () => {
    if (!ymaps) {
      return;
    }
    // берем примерные координаты и узнаем из какого города юзер
    const geolocation = await ymaps.geolocation.get({ provider: 'auto' });
    const coords = await geolocation.geoObjects.get(0).geometry.getCoordinates();
    const geocode = await ymaps.geocode(coords, { results: 1 });
    const location = await geocode.geoObjects.get(0);
    // известно имя города, берем координаты его центра и выводим чтобы смотрелось ровно
    const cityName = await location.getLocalities();
    const cityGeocode = await ymaps.geocode(...cityName);
    const cityCoordinates = await cityGeocode.geoObjects.get(0).geometry.getCoordinates();
    setPosition(cityCoordinates);
    setVisible(true);
  };

  useEffect(() => {
    getCityCoords();
  }, [ymaps]);

  return (
    <div className={s.wrap}>
      <YMaps
        query={{ apikey: YMAPS_API_KEY }}
      >
        <Map
          onLoad={(ymapsApi) => setYmaps(ymapsApi)}
          modules={['geocode', 'geolocation']}
          className={cn(s.map, { [s.visible]: visible })}
          state={{ center: position, zoom: 12 }}
        />
      </YMaps>
    </div>
  );
};

export default AuthContainer;
