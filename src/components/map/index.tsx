import React from 'react';
import {
  YMaps, Map, Clusterer, Placemark,
} from 'react-yandex-maps';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { YMAPS_API_KEY } from '../../constants/api-constants';
import styles from './map.module.scss';

const MapContainer = () => {

  const cityCoords = useSelector((state) => state.position.coords);

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
                <Placemark
                  geometry={cityCoords}
                />
              </Clusterer>
            </Map>
          </YMaps>
        )}
    </div>
  );
};

export default MapContainer;
