import React from "react";

const page = () => {
  return (
    <section className="grid h-svh place-items-center bg-slate-100 p-5 text-center text-2xl">
      <span>¡Hola! 👋🏼 Gracias por visitarnos. </span>
      <h1 className="text-3xl font-bold">
        No estamos en horario de atención en este momento.
      </h1>

      <div className="flex flex-col gap-20">
        <div className="flex flex-col">
          <span>Vuelve a visitarnos cuando estemos disponibles.</span>
          <span>Estaremos encantados de atenderte. 😊 </span>
        </div>
        {/* <div className="text-3xl font-semibold flex flex-col">
          <span>Lunes - Viernes</span>
          <b>7 AM - 9 PM</b>
        </div> */} 
      </div>
    </section>
  );
};

export default page;
