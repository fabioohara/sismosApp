import React from 'react'
import { Grid } from '@mui/material'
import { useState,useEffect } from 'react'
import { getDataFromSismo } from '../services'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MapComponent from '../Map/MapComponent'
import moment from 'moment/moment'
import { PiSortAscendingBold,PiSortDescendingBold } from 'react-icons/pi';

import { useSelector,useDispatch  } from 'react-redux';

const Sismo = () => {
   
    const maxlimit=40;
    const[sismos,setSismos]=useState([])
    const [zoomAction, setZoomAction] = useState(null);
    const [filterAction, setFilterAction] = useState(null);
    const [lightAction, setLightAction] = useState(null);
    const [filtro, setFiltro] = useState(">=2.5");
    
    const isElement2Visible = useSelector((state) => state.element2);
    const isElement1Visible = useSelector((state) => state.element1);
    const isElement3Visible = useSelector((state) => state.element3);

    
    const dispatch = useDispatch();


    const[coordinates,setCoordinates]=useState([0,0])
    const[selectedItem,setSelectedItem]=useState('0')
    const[filtrados,setFiltrados]=useState({})
    const[ordenados,setOrdenados]=useState({})
    const[orden,setOrden]=useState('ASC')
    const[update,setUpdate]=useState(0)

    
    const fetchSismos=async()=>{
        const listaSismos=await getDataFromSismo()
       
       setSismos(listaSismos.features);
        
    }
 
  
    const handleZoomButtonClick = () => {
       // playAudio()
       const zoomData = {
        zoomTo: coordinates, 
        zoomLevel:5,
        code:selectedItem,
        accion:0,
       
      };
  
      setZoomAction(zoomData);
     
    };

    const handleLight = () => {
      setZoomAction(null);
     const lightData = {
          light:isElement3Visible? 'light':'dark',
          accion:2
    };

    setLightAction(lightData);
   
  };
    
    const handleFilterButtonClick = () => {
      setZoomAction(null);
      const filterData = {
        points: filtrados, 
        accion:1
      };
  
     setFilterAction(filterData);
    
    };

    useEffect(() => {
      handleFilterButtonClick()
    
    },[filtrados]);


    useEffect(() => {
       fetchSismos()
      
    }, [update]);

    useEffect(()=>{
      filtrarSismos('sismo.properties.mag>0')
     
    },[sismos])

    const filtrarSismos=(filtro)=>{
      setFiltrados(sismos.filter( (sismo) => eval(filtro)))
     
    }

    useEffect(() => {
      handleLight()
  
    },[isElement3Visible]);

    useEffect(() => {
      orderFiltered()
    },[filtrados,orden]);

    const orderFiltered=()=>{
      try{
        if(orden=='ASC'){
            setOrdenados([...filtrados].sort((a, b) => b.properties.mag - a.properties.mag))
        }else{
            setOrdenados([...filtrados].sort((a, b) => a.properties.mag - b.properties.mag))
        }
      console.log(ordenados);
      }catch(error){

      }
    }

return (
<>
<div className='h-screen'>
<Header/>
<div className={`flex flex-row h-[calc(100%-75px)] mx-0 px-0 ${isElement3Visible  ? 'bg-white' : 'bg-[#262626]'}`}>

   <div id="sideBar" className={`${isElement2Visible  ? 'w-[400px]' : 'w-[100%]'} ml-0 overflow-y-scroll h-[100%] p-0`}
   
   style={{ display: isElement1Visible  ? 'block' : 'none' }}>
 
   <Grid container spacing={0} className={`py-2 px-2 ${isElement2Visible  ? 'w-1/5' : 'w-[100%]'} ${isElement3Visible  ? 'bg-white' : 'bg-[#262626]'} `}>


<div className='flex justify-center gap-3  w-[100%] h-[70px] items-center'> 
   <div className='flex justify-center gap-1 h-[33px]'>
  <button className="w-8 text-xs bg-slate-400 hover:bg-slate-700  text-white py-2 px-2  rounded-full transition-colors duration-300`}"
   onClick={() => {filtrarSismos('sismo.properties.mag>0'),setFiltro(">=2.5")}}>*</button>
   <button className="w-8 text-xs bg-red-400 hover:bg-red-700  text-white py-2 px-2  rounded-full transition-colors duration-300`}"
    onClick={() => {filtrarSismos('sismo.properties.mag>=5'),setFiltro(">=5")}}>&gt;=5</button>
   <button className="w-8 text-xs bg-orange-400 hover:bg-orange-700  text-white py-2 px-2  rounded-full transition-colors duration-300`}"
   onClick={() => {filtrarSismos('sismo.properties.mag>=3'),setFiltro(">=3")}}>&gt;=3</button>
   <button className="w-8 text-xs bg-blue-400 hover:bg-blue-700  text-white py-2 px-2  rounded-full transition-colors duration-300`}"
   onClick={() => {filtrarSismos('sismo.properties.mag<3'),setFiltro("<3")}}>&lt;3</button>
</div>
  <div  className='flex justify-end gap-1'>
  <button className={`w-8 text-base  ${orden=='DES'  ? 'bg-slate-300' : 'bg-white'} hover:bg-slate-300
    text-slate-700 py-2 px-2  rounded-sm transition-colors duration-300`}
    onClick={() => setOrden('DES')}><PiSortDescendingBold/></button>

  <button className={`w-8 text-base ${orden=='ASC'  ? 'bg-slate-300' : 'bg-white'} hover:bg-slate-300
    text-slate-700 py-2 px-2   rounded-sm transition-colors duration-300`}
    onClick={() => setOrden('ASC')}><PiSortAscendingBold/></button>

  </div>


</div>
<hr  className='border-slate-300'/>
    {ordenados.length>0 && 
    ordenados.map((sismo,index)=>(
        
      <div className='flex gap-1 min-w-[25%] max-w-[100%] items-center' key={index} >

      <div className='flex justify-start my-4 items-center  gap-2 w-[100%]'>
        <div className='font-semibold text-sm'>
          <button  key={index} onMouseDown={()=>{setCoordinates([sismo.geometry.coordinates[0],sismo.geometry.coordinates[1]]),setSelectedItem([sismo.properties.code])}} onClick={() => handleZoomButtonClick()}
          className={`${sismo.properties.mag>=5 ? 'bg-red-400 hover:bg-red-700' : sismo.properties.mag>=3 ? 'bg-orange-400 hover:bg-orange-700' : 'bg-blue-400 hover:bg-blue-700'}  text-white py-2 px-2  rounded transition-colors duration-300`}>
          {sismo.properties.mag.toFixed(1)}
          </button>
        </div>
        
          <div className='text-justify'>

              <p className={`${isElement3Visible  ? 'text-black' : 'text-white'}   font-semibold text-xs leading-[1rem]`}>{
                (((sismo.properties.place==null) ? 'Sin datos' : sismo.properties.place).length > maxlimit) ? 
                ((((sismo.properties.place==null) ? 'Sin datos' : sismo.properties.place).substring(0,maxlimit-3)) + '...') : 
                (sismo.properties.place==null) ? 'Sin datos' : sismo.properties.place
                }
              </p>
              <div className={`${isElement3Visible  ? ' text-slate-700' : 'text-white'}  text-xs font-extralight leading-[1rem]`}>
                  <p>{ moment.unix(sismo.properties.time / 1000).format("DD MMM YYYY hh:mm a")} ({Math.round(sismo.geometry.coordinates[0] * 100) / 100}, {Math.round(sismo.geometry.coordinates[1] * 100) / 100})</p>
              </div>  
           
          </div>
      
      </div>
     
  </div>
    


    )
    
    )}
  
</Grid>

   </div>
  <div id="map" className="w-[100%] mr-0 bg-gray-400 h-[100%]" 
    style={{ display: isElement2Visible  ? 'block' : !isElement1Visible ? 'block':'none' }}> 
    
  {filtrados.length>0 && 
 
       <MapComponent zoomAction={zoomAction} filterAction={filterAction} lightAction={lightAction}/>

  } 
    
    
    </div>
</div>
<Footer cantidad={filtrados.length} filtro={filtro}/>

</div>


</>
  )
}

export default Sismo