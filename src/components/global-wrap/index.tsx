import React, { useEffect } from 'react';
// @ts-ignore
import load from 'ymaps-loader';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import firebase from 'firebase';
import { YMAPS_API_KEY } from '../../constants/api-constants';
import { setPosition } from '../../actions/position-actions';
import { AUTH_PATH } from '../../constants/router-constants';
import s from './global-wrap.module.scss';

type IGlobalWrap = {
  children: React.ReactNode
};

const GlobalWrap: React.FC<IGlobalWrap> = ({ children }: IGlobalWrap) => {

  const dispatch = useDispatch();
  const router = useRouter();

  const getCityCoords = async () => {
    const ymaps = await load({ apiKey: YMAPS_API_KEY });
    const geolocation = await ymaps.geolocation.get({ provider: 'auto' });
    const coords = await geolocation.geoObjects.get(0).geometry.getCoordinates();
    const geocode = await ymaps.geocode(coords, { results: 1 });
    const location = await geocode.geoObjects.get(0);
    const countryCode = await location.getCountryCode();
    const cityName = await location.getLocalities(0);
    const cityGeocode = await ymaps.geocode(...cityName);
    const cityCoords = await cityGeocode.geoObjects.get(0).geometry.getCoordinates();
    dispatch(setPosition({
      cityName: cityName[0], coords, cityCoords, countryCode,
    }));
  };

  useEffect(() => {
    getCityCoords();
    firebase.auth().onAuthStateChanged((user) => {
      if (!user && router.pathname !== AUTH_PATH) {
        router.push(AUTH_PATH);
      }
    });
  }, []);

  return (
    <div className={s.wrap}>
      {children}
    </div>
  );
};

export default GlobalWrap;
