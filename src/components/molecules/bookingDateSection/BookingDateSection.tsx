import { IBookingDateSection } from "@/components/molecules/bookingDateSection/types";

const BookingDateSection = ({ className = "" }: IBookingDateSection) => {
  //todo: devam edilecek
  return (
    <div className={`flex gap-x-2 border-2 p-5 ${className}`}>
      <div className="bg-gray-100 w-1/2">
        {/*todo: datepicker sorunu çözülecek*/}
        {/*<DatePicker*/}
        {/*  bookingDate={bookingDate}*/}
        {/*  setBookingDate={setBookingDate}*/}
        {/*/>*/}
      </div>
      <div className="w-1/2">
        {/*<GuestPicker*/}
        {/*  contentClass="text-xs lg:text-base text-gray-500"*/}
        {/*  className="flex h-full px-1 bg-gray-50 rounded-xl"*/}
        {/*  data={bookingGuests}*/}
        {/*  bodyClass="z-50 p-2 shadow bg-base-100 w-full mt-16"*/}
        {/*  setBookingGuests={setBookingGuests}*/}
        {/*/>*/}
        {/*<Guests*/}
        {/*  contentClass="text-base text-gray-500"*/}
        {/*  className="flex h-full px-1 bg-gray-50 rounded-xl"*/}
        {/*  data={bookingGuests}*/}
        {/*  bodyClass="z-1 p-2 shadow bg-base-100 w-full mt-16"*/}
        {/*  setBookingGuests={setBookingGuests}*/}
        {/*/>*/}
      </div>
    </div>
  );
};

export default BookingDateSection;
