import React,{useEffect,useState}  from 'react'
import { MapContainer, CircleMarker,Marker,Popup,TileLayer,GeoJSON,useMapEvents } from "react-leaflet";
import {Input} from 'reactstrap';
import L from 'leaflet';

import {useIntl} from 'react-intl'
import PropTypes from 'prop-types';

//import { FormattedMessage } from 'react-intl';
import "./style.scss";

import 'leaflet/dist/leaflet.css';
import Select from 'react-select';
import AsyncSelect from 'react-select/async'

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

/* this component is a child of MapContainer in order to get reference to map object
and listen for events. To call promise/api we've to pass callbacks defined in the container*/
function MyMap(props) {
    const {setMapObj,getMarkersAtPos}=props

    const map = useMapEvents({
      zoomend: () => {
          //console.log("SETZOOM:",mapEvents.getZoom());
          //onChangeZoom(map.getZoom())
      },
      //when click on map, it will resync center with current geoposition
      /*click() {
        map.locate() 
      },
      locationfound(e) {
        //when geo is found, it will fly to correct point in the map
        map.flyTo(e.latlng, map.getZoom())
      },*/
      moveend: (e)=> {
        let cent=map.getCenter();
        getMarkersAtPos({'lat':cent.lat,'lon':cent.lon})

      }
    });


    useEffect ( ()=> {
      if(map)
        setMapObj(map)
    },[map]);
  
    return (<div></div>)


  }


const MapSelector = (props) => {      
    console.log("MAPSelector:",props)   
    
    const {field,label,handleChange,getMarkers,markers,onPlacesSearch,placesList,onMarkerClick,placesFreeSearchPlaceholder,markerPopupComponent}=props;
    
    let zoom=12;
    const intl = useIntl()

    const [gps,setGPS]=useState({});
    const [searchAddress,setSearchAddress]=useState('');

    const [mapobj,setMapObj]=useState(null);

    const [position,setPosition]=useState([0,0]); 

    function positionSuccess (gps) {
      console.log("GPS:",gps);
      setGPS(gps);
    }
    
    function positionError (err) {
        console.log("ERR:",err)     
        setGPS({});        
    }
  
      
    useEffect(() => {    
    
    if(navigator.geolocation)
    {
      let options = {
        enableHighAccuracy: false,
        timeout: 1000*60*1,
        maximumAge: 1000*60*5 //5min
      };      
      navigator.geolocation.getCurrentPosition(positionSuccess,positionError,options);   
    }else positionError();
  
  }, [])


  const [selectedPlace,setSelectedPlace]=useState(null)
  const [selectedPMarker,setSelectedMarker]=useState(null)

  //triggered when you type something in the input field of the select
  const onSearchInputChange=(searchAddress,e)=> {
    //console.log("search input change",e)
    if(e.action==='input-change')
      {
        setSearchAddress(searchAddress)
        if(searchAddress!="" && searchAddress.length>=2)
          onPlacesSearch(searchAddress)
      }      
  }

  //triggered when choosed an option from select
  const onSearchSelectChange = (val,typeaction) => {
   // console.log("search change",val,typeaction);
    setSelectedPlace(val)
    if(val) 
    {
      goToPos([val.value.lat,val.value.lon])
      if(getMarkers) 
        getMarkers({'lat': val.value.lat,'lon':val.value.lon});
    }
    
  }

  //triggered on click on "choose" button in marker detail popup
  const chooseMarkerFromMap = (marker)=>{
    setSelectedMarker(marker);
    handleChange(marker.id);
  }

    
    
    const getPositionArrByCoord=(pos)=>{      
        let p=[pos && pos.coords && pos.coords.latitude?pos.coords.latitude:0,pos && pos.coords && pos.coords.longitude?pos.coords.longitude:0];        
        return p;
    }
  

    const goToPos = (pos) => {      
      if(pos)
      {
        mapobj.flyTo(new L.LatLng(pos[0],pos[1]),mapobj.getZoom());
        setPosition(pos);  
        getMarkers({'lat': pos[0],'lon':pos[1]});    
      }
    }
  
    
    useEffect(() => {    
        if(gps && mapobj)
        {
          let p2=getPositionArrByCoord(gps)
          goToPos(p2);
        }
      
    }, [gps])

    const [placesOptions,setPlacesOptions]=useState([]);

    useEffect( ()=> {
      let list=[];
      if(placesList && placesList.length>0)
      { placesList.forEach(p => {
          if(p.type=="administrative") {
            let item={'label': p.display_name,'value': {...p}};
            list.push(item);
          }
          
        })        
        setPlacesOptions(list);
      }

    },[placesList]);

    const myPosOptions = { color: '#880021', fillColor: '#DF6D43' }
    
    return (                               
                <>                 
                {field.freeSearch && <Select id="searchaddressSelect"
                  options={placesOptions}
                  onInputChange={onSearchInputChange}                               
                  onChange={onSearchSelectChange}
                  className="map-search mb-3"             
                  value={selectedPlace}               
                  isClearable={true}                  
                  isSearchable={true}
                  closeMenuOnSelect={true}   
                  onSelectResetsInput={false}         
                  hideSelectedOptions={false}    
                  placeholder={placesFreeSearchPlaceholder}                                               
                />}
                  <MapContainer id="mappa" center={position} zoom={zoom} scrollWheelZoom={true}>                   
                    <TileLayer
                      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    /> 
                     <CircleMarker center={position} pathOptions={myPosOptions} radius={8} stroke={true}>
                      <Popup>
                        You're here!
                      </Popup>
                    </CircleMarker>   
                    {markers && Object.keys(markers.data).length>0 && markers.data.map((marker, index) => {
                      return (
                        marker.lat && marker.lon && 
                        <Marker position={[marker.lat,marker.lon]} key={index}>
                          <Popup>
                            {markerPopupComponent(marker,chooseMarkerFromMap)}
                          </Popup>
                        </Marker>                          
                      )
                      })}  
                       <MyMap setMapObj={setMapObj} getMarkersAtPos={getMarkers}/>                  
                </MapContainer>
                {selectedPMarker && <div className="alert alert-success">{label}: <b>{selectedPMarker.name}</b> </div>} 
                </>    
                
  );
        
}

/*InputField.propTypes = {
    handleChange: PropTypes.func.isRequired,
    field: PropTypes.object.isRequired,
};*/

export default MapSelector