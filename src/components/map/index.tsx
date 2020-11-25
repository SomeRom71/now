import React, { useEffect, useState } from 'react';
import {
  YMaps, Map, Clusterer, Placemark,
} from 'react-yandex-maps';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import firebase from 'firebase';
import { YMAPS_API_KEY } from '../../constants/api-constants';
import styles from './map.module.scss';

type PointsType = {
  [key: string]: {
    id: string,
    coords: number[],
  }
};

const MapContainer = () => {
  const [points, setPoints] = useState<PointsType>({});
  const cityCoords = useSelector((state) => state.position.coords);

  useEffect(() => {
    const db = firebase.database();
    const pointsFromDb = db.ref('points');
    pointsFromDb.on('value', (elem) => setPoints(elem.val()));
  }, []);

  return (
    <div className={styles.wrap}>
      { cityCoords.length > 0
        && (
          <YMaps
            query={{ apikey: YMAPS_API_KEY }}
          >
            <Map
              modules={['geocode', 'geolocation']}
              className={cn(styles.map, styles.visible)}
              state={{ center: cityCoords, zoom: 15 }}
            >
              <Clusterer
                options={{
                  preset: 'islands#invertedVioletClusterIcons',
                  groupByCoordinates: false,
                }}
              >
                {Object.keys(points).map((elem) => (
                  <Placemark
                    geometry={points[elem].coords}
                    onClick={() => alert(points[elem].id)}
                  />
                ))}
              </Clusterer>
            </Map>
          </YMaps>
        )}
    </div>
  );
};

export default MapContainer;
