import React from "react";
import ProfileSidebar from "@/components/molecules/profileSidebar/ProfileSidebar";

export default function ProfileLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="pt-16 lg:pt-40 px-3 lg:px-40">
        {/*todo: dil seçeneği ekleyince güncellenecek*/}
        <h1 className="text-42 mb-10 hidden lg:block">Profil</h1>
        <div className="tab-container flex flex-col lg:flex-row lg:gap-x-10 gap-y-4">
          <ProfileSidebar />
          <div className="tab-content flex-1 grid grid-cols-1 gap-y-4">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
