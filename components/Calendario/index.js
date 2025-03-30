import React, { useEffect, useState } from "react";
import { InlineWidget } from "react-calendly";
import { useAppContext } from "../context/Context";
import Head from "next/head";

function Calendario() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const { espa } = useAppContext();
  return (
    <div id="reserva">
      <>
        <Head>
          <link
            href="https://assets.calendly.com/assets/external/widget.css"
            rel="stylesheet"
          />
        </Head>
      </>

      {espa ? (
        <div className="w-full bg-black">
          <div className="w-full rounded bg-[#141414] max-w-[1184px] py-[80px] px-[20px] mx-auto">
            <h1 className="text2xl md:text-5xl font-bold text-center text-white">
              Mi casa es tu Casa, Reserva ya
            </h1>

            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/reservaciones-14/reservaciones-llorona?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=3eeb91"
              style={{ minWidth: "320px", height: "650px" }}
            ></div>
          </div>
        </div>
      ) : (
        <div className="w-full bg-black">
          <div className="w-full rounded bg-[#141414] max-w-[1184px] py-[80px] px-[20px] mx-auto">
            <h1 className="text2xl md:text-5xl font-bold text-center text-white">
              My house is your house, Book now.
            </h1>

            <InlineWidget url="https://calendly.com/reservaciones-14/reservaciones-llorona" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendario;
