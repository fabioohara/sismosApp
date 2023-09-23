import React, { useEffect,useRef,useState } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature'; // Import the Feature class
import Point from 'ol/geom/Point'; // Import the Point class
import { Circle, Fill, Stroke, Style,Text } from 'ol/style';
import Select from 'ol/interaction/Select';
import { click } from 'ol/events/condition';
import { easeIn } from 'ol/easing'; // Import the easing function
import Projection from 'ol/proj/Projection';


const MapComponent = ({ zoomAction,filterAction,lightAction }) => {
  const mapRef = useRef(null);
  const layerRef = useRef(null);
  const Base =useRef(null);
  const platesLayer =useRef(null);
  const selectInteraction = useRef(null);
  const [sismoSeleccionado,setSismoSeleccionado]=useState([]);
 

///ESTILOS
const style=(feature)=> {
  // Define a style function that depends on the magnitude property of the feature
  const magnitude = feature.get('magnitude');
  const code = feature.get('code');
  let radius = 10; // Default radius
  let color ='rgba(0, 0, 255, 0.5)';// Default color
  let strokeColor='transparent'
  let font='12px Calibri,sans-serif'
 
    color = 'rgba(0, 0, 255, 0.5)';
    strokeColor='transparent'
  
  

    if (magnitude >= 5) {
      radius = 30;
    
        color = 'rgba(255, 0, 0, 0.5)';
     
    } else if (magnitude >= 3) {
      radius = 20;
    
        color = 'rgba(255, 165, 0, 0.5)';
     
    }
  
  // Create a style with a circle
  const style = new Style({
    image: new Circle({
      radius: radius,
      fill: new Fill({
        color: color,
      }),
      stroke: new Stroke({
        color: strokeColor,
        width: 3,
       // lineDash: [4,5]
      }),
    }),
      text: new Text({
        text: magnitude.toString(),
        font: font,
        fill: new Fill({
          color: 'white', // Text color
        }),
        stroke: new Stroke({
          color: color, // Text outline color
          width: 3,
        })
     
    })
    
  })

  return style;
}

const platesStyle = new Style({
  stroke: new Stroke({
    color: [255,100,100, 1],
    width: 0.5,
    lineDash: [4,8]
  })
});

const selectedStyle=(feature)=> {
  // Define a style function that depends on the magnitude property of the feature
  const magnitude = feature.get('magnitude');
 
  let radius = 10; // Default radius
  let color ='rgba(0, 0, 255, 0.5)';// Default color
  let strokeColor='rgba(70,120,190,0.5)'
  let font='bold 20px Calibri,sans-serif'

  // Adjust radius and color based on magnitude
  

    if (magnitude >= 5) {
      radius = 30;
    
        color = 'rgba(255, 0, 0, 0.5)';
     
    } else if (magnitude >= 3) {
      radius = 20;
    
        color = 'rgba(255, 165, 0, 0.5)';
     
    }
  
  // Create a style with a circle
  const style = new Style({
    image: new Circle({
      radius: radius,
      fill: new Fill({
        color: color,
      }),
      stroke: new Stroke({
        color: strokeColor,
        width: 10,
      //  lineDash: [4,5]
      }),
    }),
      text: new Text({
        text: magnitude.toString(),
        font: font,
        fill: new Fill({
          color: 'white', // Text color
        }),
        stroke: new Stroke({
          color: color, // Text outline color
          width: 3,
        })
     
    })
    
  })

  return style;
}


const wgs84Projection = new Projection({
  code: 'EPSG:4326',
  units: 'degrees',
});

const handleMapClick = (event) => {
  event.preventDefault();
  setSismoSeleccionado([])
  event.target.forEachFeatureAtPixel(event.pixel, (feature, layer) => {
    if (feature) {
      const featureProperties = feature.getProperties();
     console.log(featureProperties)
      setSismoSeleccionado(featureProperties)
     
    }
  });
 /*
  mapRef.current.forEachFeatureAtPixel(event.pixel, (feature, layer) => {
   
    if (feature) {
      // Access feature properties here
      const featureProperties = feature.getProperties();
      
    //  console.log('Clicked Feature Properties:', featureProperties);
     // feature.setStyle(selectedStyle)

    
      // You can access specific properties, e.g., name, magnitude, date
      /*const name = featureProperties.name;
      const magnitude = featureProperties.magnitude;
      const date = featureProperties.date;

      // Do something with the feature's data
    }
  });
  */
};


const selectedFeaturesSource = new VectorSource();
 
const  selectedFeaturesLayer = new VectorLayer({
  source: selectedFeaturesSource,
  style: selectedStyle,
  zIndex: 3 // Apply the selected style
});

  useEffect(() => {



   


    const baseSource= new XYZ({ 
      url: 'http://{1-4}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
    })
    if(!Base.current){
      Base.current= new TileLayer({source:baseSource,zIndex: 0})
    }

       


    if (!mapRef.current) {
      // Create the map when the component is first mounted
      mapRef.current = new Map({
        target: 'map',
        layers: [Base.current],
        view: new View({
          center: fromLonLat([0, 0]),
          zoom: 2,
        }),
      });
      mapRef.current.addLayer(selectedFeaturesLayer);
    }
    
    

     if(!platesLayer.current){
    fetch('https://raw.githubusercontent.com/fabioohara/sismosApp/main/public/plates.geojson')
    .then((response) => response.json())
    .then((geojsonData) => {
       platesLayer.current = new VectorLayer({
        source: new VectorSource({
          features: new GeoJSON().readFeatures(geojsonData, {
            featureProjection: 'EPSG:3857', // The display projection (Web Mercator)
            dataProjection: wgs84Projection, // The data source projection (WGS 84)
          }),
        }),
        style:platesStyle,
        zIndex: 1
      });
      mapRef.current.addLayer(platesLayer.current)
     
    });
  }


const vectorSource = new VectorSource();
    if (!layerRef.current) {
      // Create the map when the component is first mounted
    
      layerRef.current = new VectorLayer({
        source: vectorSource,
        style:style,
        zIndex: 2
      });
  
     mapRef.current.addLayer(layerRef.current)
    }


   
  
   
   





    if (!selectInteraction.current) {
    selectInteraction.current  = new Select({
      condition: click,
      layers: [layerRef.current],
      style: selectedStyle,
      
    });
  }

    mapRef.current.addInteraction(selectInteraction.current)
   

// Click en el mapa
mapRef.current.on('click', (event) => {
 
});

const handleZoomAction = (action) => {

  if (action) {
  
    if(action.accion==0){
      selectInteraction.current.getFeatures().clear(); 
      selectedFeaturesLayer.getSource().clear()

    const coordinates = fromLonLat(action.zoomTo);
    const code = action.code;
    const newPoint=new Point(coordinates)

    mapRef.current.getView().fit(newPoint, { 
      padding: [100, 100, 100, 100], 
      maxZoom:8, 
      duration:1000 ,
      center:coordinates,
      easing: easeIn,
  });

/*
    var features = layerRef.current.getSource().getFeatures();
    features.forEach((feature) => {
      if (feature.get('code') == code) {
         

      }

    
    });
      */
  }
  }
};

   const handleFilterAction = (action) => {
   
    layerRef.current.getSource().clear()
   
    if (action.accion==1) {
       
      const points=action.points;
     
      points.map((sismo) => {
        const coordinates = sismo.geometry.coordinates; // Assuming your earthquake data has coordinates
      
        // Create a feature for each earthquake point
        const earthquakeFeature = new Feature({
          geometry: new Point(fromLonLat([coordinates[0], coordinates[1]])),
          code:sismo.properties.code,
          id:sismo.id,
          title:sismo.properties.title,
          magnitude:sismo.properties.mag,
          tsunami:sismo.properties.tsunami,
          place:sismo.properties.place
         
        });
        // Add the feature to the vector source
        layerRef.current.getSource().addFeature(earthquakeFeature);
        return null; // You need to return something from the map function
      });
    } 
  };

  const handleLightAction = (action) => {
    if (action.accion==2) {
         
      Base.current.setSource(new XYZ({ 
        url: 'http://{1-4}.basemaps.cartocdn.com/'+action.light+'_all/{z}/{x}/{y}.png',
      }))
    }
  }
  


  handleZoomAction(zoomAction);
  handleFilterAction(filterAction);
  handleLightAction(lightAction);

  if (mapRef.current) {
    // Attach the click event listener
   

    mapRef.current.on('click', handleMapClick);
   // selectedFeaturesLayer.getSource().clear()

    // Clean up the event listener when the component unmounts
    return () => {
      mapRef.current.un('click', handleMapClick);
    };
  }

}, [zoomAction,filterAction,lightAction]);


  

  return <>
  <div id="map" style={{ width: '100%' }}></div>
  {sismoSeleccionado.id && 
  <div class={`bg-slate-100 border border-slate-500  px-4 py-3 absolute z-10 bottom-[30px] right-1 w-1/4 rounded-md`} role="alert">
  <p class="font-bold text-left">{sismoSeleccionado.title}</p>
  <p class="text-sm text-left">Lugar: {sismoSeleccionado.place}</p>
  <p class="text-sm text-left">Magnitud: {sismoSeleccionado.magnitude}</p>
  <p class="text-sm text-left">{sismoSeleccionado.tsunami="0"? "Sin alerta de tsunami":"Alerta de tsunami"}</p>
 </div>
}
  </>;
};

export default MapComponent;