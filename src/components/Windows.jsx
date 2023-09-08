import React from 'react'

const Windows = () => {
  return (
    <>
      <div id="page" class="w-screen h-screen bg-zinc-800 transition-colors duration-500 p-2 md:p-10">

<div id="wrapper" class="w-full h-full">

  <div id="modal" class="w-[80%] max-w-screen-md rounded-3xl bg-neutral-50 text-center antialiased px-5 md:px-20 py-10 shadow-2xl shadow-zinc-900 relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">

    <span class="text-2xl">&#9995; &#8594; &#9994; &#8594; &#9995;</span>

    <h1 class="text-2xl lg:text-3xl font-bold text-neutral-900 my-4">
      Drag the modal
    </h1>

    <p class="text-base lg:text-xl text-neutral-500">
      Move this window anywhere you want in the page. Click on the button below to bring it back to its initial position.
    </p>

    <button type="button" id="reset" disabled class="px-8 py-4 mt-8 rounded-2xl text-neutral-50 bg-violet-800 hover:bg-violet-600 active:bg-violet-900 disabled:bg-neutral-900 disabled:cursor-not-allowed transition-colors">
      Reset the position
    </button>

    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="w-[16px] h-[16px] absolute right-6 top-6">
      <path d="m2 2 12 12m0-12-12 12" class="stroke-2 stroke-current" />
    </svg>

  </div>

</div>

</div>  
    </>
  )
}

export default Windows