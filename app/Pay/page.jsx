"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import pay from "../../assets/gpay.jpeg";
import Lottie from "lottie-react";
import loading from '@/assets/loading.json'
import success from '@/assets/success.json'
import fail from '@/assets/fail.json'
import socket from "../utils/sockets";
import { useDispatch, useSelector } from "react-redux";
import { sendsocket } from "@/store/setSocketReducer";
import QRCode from "react-qr-code";
import axios from "axios";
import { API } from "../utils/Essentials";

const page = () => {
  const [state, setState] = useState(1);
  const [load, setLoad] = useState(0);
  const [time, setTime] = useState(59)
  const [mount, setMount] = useState(false)
  const amount = useSelector(state => state.amount)
  const vpa = useSelector(state => state.vpa)
  const [final, setFinal] = useState(0)
  //'upi://pay?pa=theshreyanshsingh7@okicici&pn=ShreaynshName&mc=Mac&tid=456456778&tr=ref5678&tn=Newnote&am=1.00&cu=INR&refUrl=grovyo.com'
  let value = `upi://pay?pa=theshreyanshsingh7@okicici&pn=Willowwave&tn=Paying%${amount}.00%to%WillowWave&am=${amount}.00&cu=INR`

  const finalcheck = useCallback(async (data) => {
    if (data === true) {
      try {
        //const res= await axios.post(`${API}/addamount/${id}`,{amount,vpa})
        if (data) {
          setFinal(1)
        } else {
          setFinal(2)
        }
      } catch (e) {
        console.log(e)
      }
    } else {
      setFinal(2)
    }
  }, [])

  useEffect(() => {
    if (!mount) {

      let data = {
        vpa,
        amount
      }
      socket.emit("started", data);
    }
    socket.on('data', data => {
      setLoad(data)
      finalcheck(data)
    });

    setMount(true);

  }, [socket])



  useEffect(() => {

    if (time === 0) {
      setState(0);
      socket.disconnect()
      socket.disconnected
      socket.removeAllListeners()
    }
    const timer = setTimeout(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearTimeout(timer);

    };
  }, [time,]);

  return ( <
        >

    {
      final === 0 ? < >


        {
          state == 0 ?
            <
                div className=" " > Page Expired! < /div> :
              (state == 1 && ( <
                    div className="h-screen w-screen flex flex-col justify-center items-center" >
                <
                    div className="p-4 rounded-2xl bg-white" > {
                    load === 1 ?
                      <
                        div className="bg-white h-96 w-[20.4%] rounded-2xl absolute z-10" >
                        <
                          Lottie animationData={loading}
                          loop={true}
                        /> <
                        div className="text-black mx-[30%] " > Processing... < /div> <
                        div className="text-black mx-[10%] text-sm my-10" > Do not close or refresh the page! < /div> < /
                        div > : null
                    } <
                              QRCode size={256}
                              style={
                                { height: "auto", maxWidth: "100%", width: "100%" }
                              }
                              value={value}
                              viewBox={`0 0 256 256`}
                            />

                            <
                    div className="w-full flex items-center justify-center text-black" > Do not close or refresh the page! < /div> <
                                div className="w-full flex items-center justify-center text-black font-medium" > 00: {time} < /div></div >
                              <
                    /div>
                              ))
            }



                              <
            />:final===1? <
            div className="bg-white h-screen w-screen rounded-2xl " >
                                <
                                  Lottie animationData={success}
                                  loop={true}
                                /> < /
            div > :
                                <
                div className="bg-white h-screen w-screen rounded-2xl " >
                                  <
                                    Lottie animationData={fail}
                                    loop={true}
                                  /> < /
            div >
        }


                                  <
        />
                                  );
};

                                  export default page;