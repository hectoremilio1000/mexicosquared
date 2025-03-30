import axios from "axios";
import React, { useEffect, useState } from "react";

import NavBar from "../components/NavBarBlack/NavBarEs";
import { message, Modal } from "antd";
import { redirect } from "next/navigation";

const Planes = () => {
  const [plans, setPlans] = useState([]);
  const [selectPlan, setSelectPlan] = useState(null);
  const [openModalPay, setOpenModalPay] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const searchPlans = async () => {
    try {
      const response = await axios.get(`${apiUrl}/plans`);
      console.log(response.data);
      setPlans(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    searchPlans();
  }, [apiUrl]);
  const handlePayPlan = (plan) => {
    setOpenModalPay(true);
    setSelectPlan(plan);
  };
  const handleOkPay = async () => {
    try {
      const newpay = {
        ...selectPlan,
        price: parseFloat(selectPlan.price),
        type: "preference",
        email: "jampierv127@gmail.com",
      };
      const response = await axios.post(`${apiUrl}/testpayment`, newpay, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      });
      const paymentUrl = response.data.data.url;
      window.location.href = paymentUrl;
    } catch (error) {
      console.log(error);
      message.error("Ocurrio un error al momento de hacer el pago");
    }
    //  ...
  };
  const handleCancelPay = () => {
    setSelectPlan(null);
    setOpenModalPay(false);
  };

  return (
    <>
      <NavBar />
      <div className="bg-gray-50 px-4 py-8 md:px-16 pt-24 md:pt-36">
        <div className="w-full mb-6">
          <h1 className="font-bold text-2xl text-center">
            Nuestros planes para ti
          </h1>
          <p className="text-lg text-center">
            Adquiere un plan que se adecue a ti
          </p>
        </div>
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {plans.length > 0 &&
              plans.map((p, index) => {
                return (
                  <div
                    key={index}
                    className="w-full py-8 px-4 rounded shadow-2xl"
                  >
                    <h3 className="text-md  text-center">{p.name}</h3>
                    <h1 className="text-2xl font-bold text-center">
                      <span className="text-xl">$</span> {p.price}
                    </h1>
                    <p className="text-lg text-gray-400 text-center">
                      {p.description}
                    </p>
                    <div className="modulos mb-6">
                      <span className="mt-8 text-center mb-4 block font-bold">
                        Modulos
                      </span>
                      {p.modules.map((m, index) => {
                        return (
                          <div key={index} className="w-full">
                            <p className="text-lg text-center text-gray-600">
                              {m.name}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                    <div
                      onClick={() => handlePayPlan(p)}
                      className="bg-yellow-500 text-whtie cursor-pointer px-3 py-2 rounded text-center font-bold"
                    >
                      Adquirir Ahora
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <Modal open={openModalPay} onCancel={handleCancelPay} footer={false}>
          <div className="grid grid-cols-1 gap-4">
            <div className="w-full">
              <label htmlFor="name">name</label>
              <input type="text" id="name" />
            </div>
          </div>
          <button
            onClick={() => handleOkPay()}
            className="px-3 py-2 bg-black text-white rounded-full"
          >
            Pagar
          </button>
        </Modal>
      </div>
    </>
  );
};

export default Planes;
