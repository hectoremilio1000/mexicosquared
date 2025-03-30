import React from "react";
import { InlineWidget } from "react-calendly";
import { useAppContext } from "../context/Context";

function CalendarioTiktokTree() {
  const { espa } = useAppContext();
  return (
    <div id="reserva">
      {espa ? (
        <div className="w-full bg-white">
          <div className="w-full rounded bg-gray-200 max-w-[1184px] py-[80px] px-[20px] mx-auto">
            <h1 className="text2xl md:text-5xl font-bold text-center text-gray-900">
              Mi casa es tu Casa, Reserva ya
            </h1>

            <InlineWidget url="https://calendly.com/reservaciones-14/reservaciones-llorona-tiktok-clon" />
          </div>
        </div>
      ) : (
        <div className="w-full bg-white">
          <div className="w-full rounded bg-gray-200 max-w-[1184px] py-[80px] px-[20px] mx-auto">
            <h1 className="text2xl md:text-5xl font-bold text-center text-gray-900">
              My house is your house, Book now.
            </h1>

            <InlineWidget url="https://calendly.com/reservaciones-14/reservaciones-llorona-tiktok-clon" />
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarioTiktokTree;
