import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import { useCitiesContext } from '../context/CitiesContext'
import style from './Map.module.css'
import { usePosition } from '../hooks/usePosition'

function Map() {
    const [position, setPosition] = useState([30, 31])
    const { cities } = useCitiesContext()
    const [mapLat, mapLng] = usePosition()


    useEffect(() => {
        if (mapLat && mapLng) {
            setPosition([mapLat, mapLng])
        }
    }, [mapLat, mapLng])

    return (
        <div className={style.mapContainer} >
            <MapContainer className={style.map} center={position} zoom={8} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map((city) =>
                    <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
                        <Popup>
                            <span>{city.emoji}</span> <span>{city.cityName}</span>
                        </Popup>
                    </Marker>)}
                <ChangeMapView positionView={position} />
                <HandelClick />
            </MapContainer>
        </div>
    )
}

function ChangeMapView({ positionView }) {
    const map = useMap()
    map.setView(positionView)
    return null
}

function HandelClick() {
    const { setIsActive } = useCitiesContext()
    const navigate = useNavigate()

    useMapEvents({
        click: (e) => {
            navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
            setIsActive(true)
        }
    })
}

export default Map
