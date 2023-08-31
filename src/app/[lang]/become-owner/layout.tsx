"use client";
import { useAppSelector } from "@/redux/hooks";
import { IBecomeOwnerLayout } from "@/app/[lang]/become-owner/types";

import { STEP_1 } from "@/redux/features/ownerSlice/enum";
import BecomeOwnerLanding from "@/components/organisms/becomeOwnerLanding/BecomeOwnerLanding";

const BecomeOwnerLayout = ({ children }: IBecomeOwnerLayout) => {
  const { currentStep } = useAppSelector((state) => state.ownerReducer);

  return currentStep === STEP_1 ? (
    <BecomeOwnerLanding />
  ) : (
    <section className="mt-20 lg:mt-28 flex flex-col gap-y-10 lg:gap-y-20 relative px-0 lg:px-10">
      <main>
        <section>{children}</section>
      </main>
    </section>
  );
};

export default BecomeOwnerLayout;
