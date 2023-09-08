import React from 'react'
import { Public,ViewList,Lightbulb } from '@mui/icons-material';
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { toggleElement1 } from '../js/element1Slice';
import { toggleElement2 } from '../js/element2Slice';
import { toggleElement3 } from '../js/element3Slice';
import sismos from '../assets/images/sismos.png';

const Header = () => {

  const dispatch = useDispatch();
  const [listaActiva,setListaActiva]=useState(true)
  const [mapaActivo,setMapaActivo]=useState(true)
  const [luzActiva,setLuzActiva]=useState(true)

  const alternarLista=()=>{
    setListaActiva(!listaActiva)
  }

  const alternarMapa=()=>{
    setMapaActivo(!mapaActivo)
  }

  const alternarLuz=()=>{
    setLuzActiva(!luzActiva)
  }

  return (
    <>
      <div className="flex h-[50px] items-center px-5 justify-between w-[100%]">
       
      <div className='flex items-center'>
      <img src={sismos}  />
      
      </div>

      <div>
<ul  className="flex">
 
 
 
  <li className="mr-6">
    <a className={`${listaActiva  ?  'text-white':'text-slate-500'}`} href="#"   onClick={() => {dispatch(toggleElement1()),alternarLista()}}><ViewList /></a>
  </li>
  <li className="mr-6">
    <a className={`${mapaActivo  ?  'text-white':'text-slate-500'}`} href="#"  onClick={() => {listaActiva? dispatch(toggleElement2()):'',listaActiva? alternarMapa():''}}><Public /></a>
  </li>
  <li className="mr-6">
    <a className={`${luzActiva  ?  'text-yellow-300':'text-gray-300'}`} href="#"   onClick={() => {dispatch(toggleElement3()),alternarLuz()}}><Lightbulb /></a>
  </li>
</ul>
</div>
</div>
   
    </>
  )
}

export default Header