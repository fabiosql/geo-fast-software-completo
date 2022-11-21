import React, { useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader, MarkerF  } from '@react-google-maps/api';
import { Button, useUpdateEffect } from '@chakra-ui/react';
import { env } from 'process';

const containerStyle = {
    width: '100%',
    height: '400px'
};

interface IPosition{
    lat: number;
    lng: number;
}

interface IPositions{
    positions: IPosition[]
}

function MapsFrame({positions}: IPositions) {

    const [center, setCenter] = useState({
        lat: -23.726898,
        lng: -46.7801095
    })

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "KEY"
    })

    const [map, setMap] = React.useState<google.maps.Map | null>(null)
    const [markers, setMarkers] = useState<IPosition[]>([]);

    const onLoad = React.useCallback(function callback(map: google.maps.Map) {
        setMarkers([center]);
    }, [])

    const update = () => {
        if(positions.length > 0){
            positions.map(position => {
                position.lat = Number(position.lat),
                position.lng = Number(position.lng)
            })
            setMarkers(positions);
            setCenter(positions[positions.length -1]);
        }
    }

    useEffect(()=> {
        update();
    },[positions])

    return isLoaded ? (
       <>
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={19}
            onLoad={onLoad}
        >
            {markers.map(l => <MarkerF key={Math.random() * Math.random()} position={l} />)}
        </GoogleMap>

        </>
    ) : <></>
}

export default React.memo(MapsFrame)