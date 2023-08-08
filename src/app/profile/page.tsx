import ProfileSidebar from "@/components/molecules/profileSidebar/ProfileSidebar";
import ReservationList from "@/components/molecules/reservationList/ReservationList";
import ReservationDetail from "@/components/molecules/reservationDetail/ReservationDetail";

const Profile = () => {
  return (
    <div className="pt-16 lg:pt-40 px-5 lg:px-40">
      <h1 className="text-42 mb-10 hidden lg:block">Profil</h1>
      <div className="tab-container flex flex-col lg:flex-row lg:gap-x-7">
        <ProfileSidebar />
        <div className="tab-content flex-1 grid grid-cols-1 gap-y-4">
          <div className="hidden lg:flex justify-between items-center">
            <h1 className="text-gray-800 font-mi-sans-semi-bold text-28">
              Geçmiş Rezervasyonlar
            </h1>
          </div>
          <ReservationList />
          <ReservationDetail />
        </div>
      </div>
    </div>
  );
};

export default Profile;
