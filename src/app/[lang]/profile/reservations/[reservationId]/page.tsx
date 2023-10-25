import dynamic from "next/dynamic";

const ReservationDetail = dynamic(
  () => import("@/components/molecules/reservationDetail/ReservationDetail"),
  { ssr: false }
);

const Page = ({ params }: any) => {
  const { reservationId } = params;
  return <ReservationDetail reservationId={reservationId} />;
};

export default Page;
