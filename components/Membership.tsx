import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { planState } from "../atoms/subscribeAtom";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";
// import useSubscription from '../hooks/useSubscription'
// import { goToBillingPortal } from '../lib/stripe'
import Loader from "./Loader";

function Membership() {
  const { user } = useAuth();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<DocumentData | null>([]);
  //   const subscription = useSubscription(user)
  const [isBillingLoading, setBillingLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    return onSnapshot(
      collection(db, "customers", user.uid, "product"),
      (snapshot) => {
        setSelectedPlan(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      }
    );
  }, []);

  const manageSubscription = async () => {
    await deleteDoc(
      doc(
        db,
        "customers",
        user!.uid,
        "product",
        selectedPlan![0].id.toString()!
      )
    );
    // console.log(doc(db,'customers',user?.uid));

    router.push("/plans");
  };

  //   console.log(subscription)

  return (
    <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0">
      <div className="space-y-2 py-4">
        <h4 className="text-lg text-[gray]">Membership & Billing</h4>
        <button
          //   disabled={isBillingLoading || !subscription}
          className="h-10 w-3/5 whitespace-nowrap bg-gray-300 py-2 text-sm font-medium text-black shadow-md hover:bg-gray-200 md:w-4/5"
          onClick={manageSubscription}
        >
          Cancel Membership
        </button>
      </div>

      <div className="col-span-3">
        <div className="flex flex-col justify-between border-b border-white/10 py-4 md:flex-row">
          <div>
            <p className="font-medium">{user?.email}</p>
            <p className="text-[gray]">Password: ********</p>
          </div>
          <div className="md:text-right">
            <p className="membershipLink">Change email</p>
            <p className="membershipLink">Change password</p>
          </div>
        </div>

        <div className="flex flex-col justify-between pt-4 pb-4 md:flex-row md:pb-0">
          <div>
            <p>
              {/* {subscription?.cancel_at_period_end
                ? 'Your membership will end on '
                : 'Your next billing date is '}
              {subscription?.current_period_end} */}
            </p>
          </div>
          <div className="md:text-right">
            <p className="membershipLink">Manage payment info</p>
            <p className="membershipLink">Add backup payment method</p>
            <p className="membershipLink">Billing Details</p>
            <p className="membershipLink">Change billing day</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Membership;
