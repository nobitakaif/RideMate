"use client"

import { Plus, IndianRupee } from "lucide-react"
import { motion } from "motion/react"
import AnimatedCounter from "./status"

interface Status {
    value : number
    suffix ?: string,
    prefix?  : string
    msg : string
}


const statusList : Status[] = [
  {
    value: 8200,
    suffix: "+",
    msg: "Vehicle listed",
  },
  {
    value: 300,
    prefix: "$",
    msg: "Avg. owner earnings/mo",
  },
  {
    value: 40,
    suffix: "%",
    msg: "Cheaper than rental companies",
  },
  {
    value: 49,
    suffix: "/5",
    msg: "Platform rating",
  },
];

export default function CurrentStats(){
    return <motion.div className="h-40 w-full flex justify-center items-center bg-[#414134]">
        {statusList.map((item) => (
  <motion.div
    key={item.msg}
    className="h-40 w-full flex flex-col justify-center items-center border-r"
  >
    <h1 className="text-4xl font-bold">
      <AnimatedCounter
        value={item.value}
        prefix={item.prefix}
        suffix={item.suffix}
      />
    </h1>

    <span>{item.msg}</span>
  </motion.div>
))}
    </motion.div>
}