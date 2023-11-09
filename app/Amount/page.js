"use client";
import { sendamount } from "@/store/amountReducer";
import { sendvpa } from "@/store/vpaReducer";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import socket from "../utils/sockets";

const page = () => {
  const [amount, setAmount] = useState("1");
  const [vpa, setVpa] = useState("fsayush100-1@okaxis");
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    socket.removeAllListeners();
  }, []);

  return (
    <div className="content-center items-center h-[96]">
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
    </div>
  );
};

export default page;
