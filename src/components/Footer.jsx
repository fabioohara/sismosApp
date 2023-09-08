import React from 'react'

const Footer = ({filtro, cantidad}) => {
  return (
    <div className={`flex items-center h-[25px] w-[100%]
    
    ${filtro=='>=2.5' ? 'bg-slate-700':
    filtro=='>=5' ? 'bg-red-700':
    filtro=='>=3' ? 'bg-orange-700':
    'bg-blue-700'
}
`}>
     
        <span className="mr-6 text-white w-[100%] text-sm" >
            Magnitud {filtro} durante el día transcurrido: {cantidad} sismos
      </span>
      </div>

  )
}

export default Footer