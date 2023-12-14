"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import pay from "../../assets/gpay.jpeg";
import Lottie from "lottie-react";
import loading from "@/assets/loading.json";
import success from "@/assets/success.json";
import fail from "@/assets/fail.json";
import socket from "../utils/sockets";
import { useDispatch, useSelector } from "react-redux";
import { sendsocket } from "@/store/setSocketReducer";
import QRCode from "react-qr-code";
import axios from "axios";
import { API } from "../utils/Essentials";
import { useRouter, useSearchParams } from "next/navigation";
import { ref, set, get, child, onValue } from "firebase/database";
import { database } from "../firebase.config";

const page = () => {
  const [state, setState] = useState(1);
  const [load, setLoad] = useState(0);
  const [time, setTime] = useState(119);
  const [mount, setMount] = useState(false);
  const data = useSelector((state) => state.amount);
  const vpa = useSelector((state) => state.vpa);
  const [final, setFinal] = useState(0);
  let newvpa = vpa?.split("@")[0];
  let combined = `${newvpa},${data?.amount}`;
  const router = useRouter();
  const [animationPlayed, setAnimationPlayed] = useState(false);

  const onAnimationComplete = () => {
    setAnimationPlayed(true);
  };
  let value = `upi://pay?pa=theshreyanshsingh7@okicici&pn=${data?.from}&tn=Paying%${data?.amount}.00%to%${data?.from}&am=${data?.amount}.00&cu=INR`;
  // let value = `upi://pay?pa=${data?.upi}&pn=${data?.from}&tn=Paying%${data?.amount}.00%to%${data?.from}&am=${data?.amount}.00&cu=INR`;

  const starCountRef = ref(database, `${combined}/`);

  const finalcheck = useCallback(async (data) => {
    if (data === true) {
      try {
        //const res= await axios.post(`${API}/addamount/${id}`,{amount,vpa})
        if (data) {
          setFinal(1);
        } else {
          setFinal(2);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      setFinal(2);
    }
  }, []);

  const writeUserData = useCallback(async () => {
    set(ref(database, `${combined}/`), {
      newvpa,
      time: Date.now(),
      userid: data?.userid ? data?.userid : "",
      amount: data?.amount,
      pid: data?.pid,
      from: data?.from,
      email: data?.email,
      status: "pending",
      socialMedia: data?.socialMedia,
      category: data?.category,
      link: data?.link,
      count: data?.count,
      upi: data?.upi,
    });
  }, []);

  useEffect(() => {
    if (time <= 0) {
      console.log("Timer reached 0!");

      const sreref = ref(database, `${data?.userid}/`);
      remove(sreref)
        .then(() => {
          console.log("Data deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting data:", error.message);
        });
      setState(0);
      return;
    }

    // Update the timer every second
    const timerId = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(timerId);
  }, [time]);

  // Format the remaining time for display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  useEffect(() => {
    writeUserData();

    const unsub = onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data?.status === "success") {
        setLoad(true);
        finalcheck(true);
      }
    });
    return () => {
      unsub();
    };
  }, [writeUserData]);

  //'upi://pay?pa=theshreyanshsingh7@okicici&pn=ShreaynshName&mc=Mac&tid=456456778&tr=ref5678&tn=Newnote&am=1.00&cu=INR&refUrl=grovyo.com'

  // useEffect(() => {
  //   let datas = {
  //     vpa,
  //     amount: data?.amount,
  //   };
  //   socket.emit("started", datas);

  //   socket.on("data", (data) => {
  //     setLoad(data);
  //     finalcheck(data);
  //     if (data) {
  //       const childFrame = document.getElementById("childframe");
  //       if (childFrame?.contentWindow) {
  //         childFrame?.contentWindow?.postMessage(data, "*");
  //       } else {
  //         console.error("Content window not available.");
  //       }
  //     }
  //   });
  //   console.log("mounted");

  //   // if (time === 0) {
  //   //   setState(0);
  //   //   socket.disconnect();
  //   //   socket.disconnected;
  //   //   socket.removeAllListeners();
  //   // }
  //   // const timer = setTimeout(() => {
  //   //   setTime((prevTime) => prevTime - 1);
  //   // }, 1000);

  //   return () => {
  //     // clearTimeout(timer);
  //     console.log("unmounted", mount);
  //     // socket.disconnect();
  //     // socket.removeAllListeners();
  //   };
  // }, [socket]);
  console.log("render");
  console.log(final);

  if (!data) return null;

  return (
    <>
      {final === 0 ? (
        <>
          {state == 0 ? (
            <>
              <div className=" flex justify-center select-none items-center h-screen">
                Qr Expired!
              </div>
              <div>No Payment Recored will be tracked after Qr expiry.</div>
              <div>Try doing the Payement again</div>
            </>
          ) : (
            state == 1 && (
              <div className="h-screen w-full flex  select-none  flex-col justify-center items-center">
                <div className="p-3 rounded-2xl ">
                  {load === 1 ? (
                    <div className="bg-white h-96 w-[20.4%] rounded-2xl absolute z-10">
                      <Lottie animationData={loading} loop={true} />{" "}
                      <div className="text-black mx-[30%] ">Processing...</div>
                      <div className="text-black mx-[10%] text-sm my-10">
                        Do not close or refresh the page!
                      </div>
                    </div>
                  ) : null}
                  <div>
                    <div className="flex justify-center my-6 items-center">
                      <div
                        className="text-2xl border-b-2 p-1 border-black
                     text-center font-semibold"
                      >
                        Scan To Pay
                      </div>
                    </div>
                    <div className="flex justify-center items-center">
                      <QRCode
                        size={256}
                        style={{
                          height: "auto",

                          width: "100%",
                        }}
                        className="max-w-[350px]"
                        value={value}
                        viewBox={`0 0 256 256`}
                      />
                    </div>
                  </div>

                  <div className="my-2">
                    <div className="w-full flex my-2 items-center text-sm justify-center text-black">
                      Do not close or refresh the page!
                    </div>
                    <div className="w-full flex my-2 items-center font-semibold justify-center text-black">
                      Payement Should be made with {vpa}
                    </div>
                    <div className="w-full flex items-center gap-3 text-lg justify-center text-black font-semibold">
                      <div>Qr Will expire in</div>
                      <div>{formatTime(time)}</div>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </>
      ) : final === 1 ? (
        <div className="bg-white flex flex-col justify-center items-center max-h-[500px] rounded-2xl ">
          <div className="bg-white max-h-[400px] max-w-[400px] h-[70%] w-[70%] rounded-2xl ">
            <Lottie
              animationData={success}
              autoplay={!animationPlayed} // Play only if animationPlayed is false
              loop={false}
              onComplete={onAnimationComplete}
            />
          </div>
          <div className="min-h-20 text-xl font-semibold flex justify-center items-center">
            Redirecting...
          </div>
        </div>
      ) : (
        <div className="bg-red-900 h-screen w-screen rounded-2xl ">
          <Lottie animationData={fail} loop={true} />
        </div>
      )}
      {/* <div>{JSON.stringify(data)}</div> */}
    </>
  );
};

export default page;
