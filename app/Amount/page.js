"use client";
import { sendamount } from "@/store/amountReducer";
import { sendvpa } from "@/store/vpaReducer";
import { useRouter, useSearchParams } from "next/navigation";
import React, {useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import socket from "../utils/sockets";
import Image from "next/image";
import { decryptaes } from "../safety"
import { FaLock } from "react-icons/fa";
import { ref, set } from "firebase/database";
import { database } from "../firebase.config";

const page = () => {
  const [amount, setAmount] = useState("1");
  // const [vpa, setVpa] = useState("fsayush100-1@okaxis");
  const key = JSON.parse(process.env.NEXT_PUBLIC_KEY)
  const [vpa, setVpa] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const searchparams = useSearchParams();
  const keys = decryptaes(searchparams.get("zu"));
  const parsekey = JSON.parse(keys)

  const writeUserData = useCallback(async () => {
 
    set(ref(database, `${parsekey?.userid}/`), {
      newvpa:`${vpa?.split('@')[0]},${parsekey?.amount}`,
    });
  }, [parsekey?.userid,vpa]);

  return (
    <>
      <div className="flex justify-between select-none h-screen flex-col w-full">
        <div>

          <div className="bg-[#0075ff]">
            <div className="flex text-white p-3 px-5 items-center gap-4 w-full">
              <div className="w-[80px] h-[80px] border-2 rounded-xl border-white  text-[40px] font-semibold flex justify-center items-center">
                {parsekey?.from?.slice(0, 1)}
              </div>
              <div className="flex justify-center flex-col gap-1">
                <div>
                  <div>{parsekey?.from}</div>
                  <div className="text-sm">{parsekey?.email}</div>
                </div>
                <div>&#x20B9; {parsekey?.amount}</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center w-full mt-10">
            <div className="text-sm w-[95%]">
              {/* <div className="relative w-full h-16 my-2">
                <input
                  placeholder="Name"
                  value={vpa}
                  id="name"
                  onChange={(e) => {
                    e.preventDefault();
                    setVpa(e.target.value);
                  }}
                  className="py-1 transition-colors border-b-2 border-black placeholder-transparent h-10 peer outline-none focus:border-[#5c73db] focus:border-b-2 absolute top-0 left-0 duration-300  w-full"
                  type="text"
                />
                <label
                  htmlFor="name"
                  className="peer-focus:text-sm peer-placeholder-shown:text-base peer-placeholder-shown:top-1 -top-4 left-0 text-sm  peer-focus:-top-4 absolute pb-2 transition-all duration-300 font-semibold"
                >
                  Enter Your Name
                </label>
              </div>
              <div className="relative w-full h-16 my-2">
                <input
                  id="email"
                  placeholder="Name"
                  value={vpa}
                  onChange={(e) => {
                    e.preventDefault();
                    setVpa(e.target.value);
                  }}
                  className="py-1 transition-colors border-b-2 border-black placeholder-transparent h-10 peer outline-none focus:border-[#5c73db] focus:border-b-2 absolute top-0 left-0 duration-300  w-full"
                  type="email"
                />
                <label
                  htmlFor="email"
                  className="peer-focus:text-sm peer-placeholder-shown:text-base peer-placeholder-shown:top-1 -top-4 left-0 text-sm  peer-focus:-top-4 absolute pb-2 transition-all duration-300 font-semibold"
                >
                  Enter Your Email
                </label>
              </div> */}
              <div className="relative w-full h-16 my-2">
                <input
                  placeholder="Your VPA"
                  value={vpa}
                  id="vpa"
                  onChange={(e) => {
                    e.preventDefault();
                    setVpa(e.target.value);

                  }}
                  className="py-1 transition-colors border-b-2 border-black placeholder-transparent h-10 peer outline-none focus:border-[#5c73db] focus:border-b-2 absolute top-0 left-0 duration-300  w-full"
                  type="text"
                />
                <label
                  htmlFor="vpa"
                  className="peer-focus:text-sm peer-placeholder-shown:text-base peer-placeholder-shown:top-1 -top-4 left-0 text-sm  peer-focus:-top-4 absolute pb-2 transition-all duration-300 font-semibold"
                >
                  Enter Your UPI ID
                </label>

              </div>
              {/* <div className="max-w-[500px]">
                {JSON.stringify(parsekey)}
              </div> */}
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-col items-center border-t font-medium text-gray-600
           justify-center p-3 text-center gap-2">
            <div className="flex items-center text-sm font-medium text-gray-600
           justify-center text-center gap-2">Do Not Close or Refresh the Page</div>
            <div className="flex justify-center gap-2 items-center">
              <div className="text-lg">
                <FaLock />
              </div>
              <div >
                The payment is 100% secured with encryption.
              </div>
            </div>
          </div>

          <div
            onClick={() => {
              if (!parsekey.amount && !parsekey?.from && !parsekey?.email?.trim()) {
                console.log("type something");
              } else {
                if (vpa.trim()) {
                  const numbertext = /^[0-9]+$/;
                  const numbercheck = numbertext.test(parsekey?.amount);
                  const vpatext = /^.*@([a-z]+)$/;
                  const vpacheck = vpatext.test(vpa);

                  if (numbercheck && vpacheck) {
                  
                    writeUserData()
                    router.push("/Pay");
                    dispatch(sendamount(parsekey));
                    dispatch(sendvpa(vpa));

                  }
                }
              }
            }}
            className="bg-[#0075ff] text-center text-lg font-medium text-white p-3 w-full">
            Pay Now
          </div>


        </div>

      </div >

      {/* <div className="relative h-16 my-2">
        <input
          placeholder="Your VPA"
          value={vpa}
          onChange={(e) => {
            e.preventDefault();
            setVpa(e.target.value);
          }}
          className="py-1 transition-colors border-b-2 border-black placeholder-transparent h-10 peer outline-none focus:border-[#5c73db] focus:border-b-2 absolute top-0 left-0 duration-300  w-full"
          type="text"
        />
        <label
          htmlFor="address"
          className="peer-focus:text-sm peer-placeholder-shown:text-base peer-placeholder-shown:top-1 -top-4 left-0 text-sm  peer-focus:-top-4 absolute pb-2 transition-all duration-300 font-semibold"
        >
          Enter Your VPA
        </label>
      </div> */}
      {/* <div className="items-center h-[96]">
        <input
          placeholder="Enter Vpa"
          value={vpa}
          onChange={(e) => {
            e.preventDefault();
            setVpa(e.target.value);
          }}
          className="h-5 w-[50%] bg-white text-black p-5 rounded-2xl"
        />
        <input
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => {
            e.preventDefault();
            setAmount(e.target.value);
          }}
          className="h-5 w-[50%] bg-white text-black p-5 rounded-2xl"
        />
        <div
          onClick={() => {
            if (!amount.trim()) {
              console.log("type something");
            } else {
              if (vpa.trim()) {
                const numbertext = /^[0-9]+$/;
                const numbercheck = numbertext.test(amount);
                const vpatext = /^.*@([a-z]+)$/;
                const vpacheck = vpatext.test(vpa);

                if (numbercheck && vpacheck) {
                  router.push("/Pay");
                  dispatch(sendamount(amount));
                  dispatch(sendvpa(vpa));
                }
              }
            }
          }}
          className="bg-red-500 h-10 w-20 rounded-md content-center items-center"
        >
          Continue
        </div>
      </div> */}
    </>
  );
};

export default page;
