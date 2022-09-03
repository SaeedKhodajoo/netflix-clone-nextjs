// import { CheckIcon } from "@heroicons/react/outline";
// import { doc, setDoc } from "firebase/firestore";
// import Head from "next/head";
// import Link from "next/link";
// import React, { useState } from "react";
// import { useRecoilState } from "recoil";
// import { planState, subscribeState } from "../atoms/subscribeAtom";
// import { db } from "../firebase";
// import useAuth from "../hooks/useAuth";
// import Loader from "./Loader";
// import Table from "./Table";

// function Plans() {
//   const { logout,user } = useAuth();
//   const [selectedPlan, setSelectedPlan] = useRecoilState<number>(planState);
//   const [subscribed, setSubscribed] = useRecoilState(subscribeState);



//   const subscribeToPlan = async () => {
//     await setDoc(
//       doc(db, "customers", user!.uid, "product",selectedPlan.toString()!),
//       {
//         subscribed:true,
//         selectedProduct:selectedPlan === 1 ? ('Basic') : (selectedPlan === 2 ? ('Standard') : ("Premium") )
//       }
//     );

//     // setSubscribed(true)
//   };

//   return (
//     <div>
//       <Head>
//         <title>Netflix</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <header className="border-b border-white/10 bg-[#141414]">
//         <Link href="/">
//           <img
//             src="/assets/netflix-logo.png"
//             alt="netflix"
//             width={150}
//             height={90}
//             className="cursor-pointer object-contain"
//           />
//         </Link>
//         <button
//           onClick={logout}
//           className="text-lg font-medium hover:underline"
//         >
//           Sign Out
//         </button>
//       </header>

//       <main className="pt-28 px-5 max-w-5xl mx-auto pb-12 transition-all md:px-10">
//         <h1 className="mb-3 text-3xl font-medium">
//           Choose the plan that's right for you
//         </h1>
//         <ul>
//           <li className="flex items-center gap-x-2 text-lg">
//             <CheckIcon className="h-7 w-7 text-[#E50914]" /> Watch all you want.
//             Ad-free.
//           </li>
//           <li className="flex items-center gap-x-2 text-lg">
//             <CheckIcon className="h-7 w-7 text-[#E50914]" /> Recommendations
//             just for you.
//           </li>
//           <li className="flex items-center gap-x-2 text-lg">
//             <CheckIcon className="h-7 w-7 text-[#E50914]" /> Change or cancel
//             your plan anytime.
//           </li>
//         </ul>

//         <div className="flex flex-col space-y-4 mt-4">
//           <div className="flex w-full items-center justify-end self-end md:w-3/5">
//             <div
//               onClick={() => setSelectedPlan(1)}
//               className={`planBox ${
//                 selectedPlan === 1 ? "opacity-100" : "opacity-60"
//               }`}
//             >
//               Basic
//             </div>
//             <div
//               onClick={() => setSelectedPlan(2)}
//               className={`planBox ${
//                 selectedPlan === 2 ? "opacity-100" : "opacity-60"
//               }`}
//             >
//               Standard
//             </div>
//             <div
//               onClick={() => setSelectedPlan(3)}
//               className={`planBox ${
//                 selectedPlan === 3 ? "opacity-100" : "opacity-60"
//               }`}
//             >
//               Premium
//             </div>
//           </div>

//           <Table selectedPlan={selectedPlan} />

//           <button
//             className="mx-auto w-11/12 rounded bg-[#E50914] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px]"
//             onClick={subscribeToPlan}
//           >
//             Subscribe
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default Plans;
