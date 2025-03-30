import React from "react";
import { InlineWidget } from "react-calendly";
import { useAppContext } from "../context/Context";

function CalendarioTiktokTwo() {
  const { espa } = useAppContext();
  return (
    <div id="reserva">
      {espa ? (
        <div className="w-full bg-black">
          <div className="w-full rounded bg-[#141414] max-w-[1184px] py-[80px] px-[20px] mx-auto">
            <h1 className="text2xl md:text-5xl font-bold text-center text-white">
              Mi casa es tu Casa, Reserva ya
            </h1>

            <InlineWidget url="https://calendly.com/reservaciones-14/reservaciones-llorona-tiktok-clon" />
          </div>
        </div>
      ) : (
        <div className="w-full bg-black">
          <div className="w-full rounded bg-[#141414] max-w-[1184px] py-[80px] px-[20px] mx-auto">
            <h1 className="text2xl md:text-5xl font-bold text-center text-white">
              My house is your house, Book now.
            </h1>

            <InlineWidget url="https://calendly.com/reservaciones-14/reservaciones-llorona-tiktok-clon" />
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarioTiktokTwo;
