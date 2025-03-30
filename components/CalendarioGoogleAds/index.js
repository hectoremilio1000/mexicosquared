import React, { useEffect } from "react";
import Head from "next/head";
import { InlineWidget } from "react-calendly";
import { useAppContext } from "../context/Context";

const CalendlyWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Head>
        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />
      </Head>
      <div
        className="calendly-inline-widget"
        data-url="https://calendly.com/reservaciones-14/googleads-foodie-llorona?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=3eeb91"
        style={{ minWidth: "300px", height: "650px" }}
      ></div>
    </>
  );
};

function CalendarioGoogleAds() {
  const { espa } = useAppContext();
  return (
    <div id="reserva">
      {espa ? (
        <div className="w-full bg-white">
          <div className="w-full rounded max-w-[1184px] pt-4 mx-auto bg-gray-200">
            <h1 className="text-3xl md:text-5xl font-bold text-center text-gray-900 pb-2">
              Reserva ya
            </h1>

            <CalendlyWidget />
          </div>
        </div>
      ) : (
        <div className="w-full bg-white">
          <div className="w-full rounded bg-gray-200 max-w-[1184px] py-[80px] px-[20px] mx-auto">
            <h1 className="text2xl md:text-5xl font-bold text-center text-gray-900">
              My house is your house, Book now.
            </h1>

            <InlineWidget url="https://calendly.com/reservaciones-14/googleads-foodie-llorona" />
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarioGoogleAds;
