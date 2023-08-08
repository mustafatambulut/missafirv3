import ReservationList from "@/components/molecules/reservationList/ReservationList";
import ReservationDetail from "@/components/molecules/reservationDetail/ReservationDetail";

const ProfileContent = () => {
  return (
    <div className="tab-content flex-1 grid grid-cols-1 gap-y-4">
      <ReservationList />
      <ReservationDetail />
    </div>
  );
};

export default ProfileContent;
