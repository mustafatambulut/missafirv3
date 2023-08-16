import ReservationDetail from "@/components/molecules/reservationDetail/ReservationDetail";

const Page = ({ params }: any) => {
  const { reservationId } = params;
  return <ReservationDetail reservationId={reservationId} />;
};

export default Page;
