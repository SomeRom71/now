import React, { useEffect, useState } from 'react';
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

  const [pointKey, setPointKey] = useState<string>();
  const db = firebase.database();
  const dispatch = useDispatch();
  const router = useRouter();

  const getCityCoords = async (id?: string) => {
    const ymaps = await load({ apiKey: YMAPS_API_KEY });
    const geolocation = await ymaps.geolocation.get({ provider: 'auto' });
    const coords = await geolocation.geoObjects.get(0).geometry.getCoordinates();
    const geocode = await ymaps.geocode(coords, { results: 1 });
    const location = await geocode.geoObjects.get(0);
    const countryCode = await location.getCountryCode();
    const cityName = await location.getLocalities(0);
    const cityGeocode = await ymaps.geocode(...cityName);
    const cityCoords = await cityGeocode.geoObjects.get(0).geometry.getCoordinates();
    const pointRef = db.ref('points').push().key;
    if (pointRef !== null) {
      setPointKey(pointRef);
      db.ref('points').child(pointRef).set({
        coords,
        id,
      });
    }
    dispatch(setPosition({
      cityName: cityName[0], coords, cityCoords, countryCode,
    }));
  };

  const removePoint = async () => {
    const pointRef = db.ref(`points/${ pointKey}`);
    console.log(pointKey);
    await pointRef.remove();
  };

  useEffect(() => {
    window.addEventListener('beforeunload', removePoint);
    return () => window.removeEventListener('beforeunload', removePoint);
  }, [pointKey]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user && router.pathname !== AUTH_PATH) {
        getCityCoords();
        router.push(AUTH_PATH);
      } else {
        getCityCoords(user?.uid);
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
