import dynamic from "next/dynamic";

const ReservationList = dynamic(
  () => import("@/components/molecules/reservationList/ReservationList"),
  { ssr: false }
);

const Reservations = () => {
  return <ReservationList />;
};

export default Reservations;
