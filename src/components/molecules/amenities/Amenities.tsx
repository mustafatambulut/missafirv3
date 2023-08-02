import React from "react";

import Checkbox from "@/components/atoms/checkbox/Checkbox";

const Amenities = () => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="text-lg">Popular in this location</div>
        <div className="grid grid-cols-2 lg:w-[358px] gap-y-3">
          <div className="form-control">
            <Checkbox label="Pool" />
          </div>
          <div className="form-control">
            <Checkbox label="Wi-fi" />
          </div>
          <div className="form-control">
            <Checkbox label="Balcony" />
          </div>
          <div className="form-control">
            <Checkbox label="Kitchen" />
          </div>
          <div className="form-control">
            <Checkbox label="Jakuzi" />
          </div>
          <div className="form-control">
            <Checkbox label="Parking" />
          </div>
          <div className="form-control">
            <Checkbox label="Elevator" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-lg">Essentials</div>
        <div className="grid grid-cols-2 w-[358px] gap-y-3">
          <div className="form-control">
            <Checkbox label="Washer" />
          </div>
          <div className="form-control">
            <Checkbox label="Heating" />
          </div>
          <div className="form-control">
            <Checkbox label="TV" />
          </div>
          <div className="form-control">
            <Checkbox label="Iron" />
          </div>
          <div className="form-control">
            <Checkbox label="Dryer" />
          </div>
          <div className="form-control">
            <Checkbox label="Dedicated workspace" />
          </div>
          <div className="form-control">
            <Checkbox label="Hair Dryer" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-lg">Features</div>
        <div className="grid grid-cols-2 w-[358px] gap-y-3">
          <div className="form-control">
            <Checkbox label="Hot tub" />
          </div>
          <div className="form-control">
            <Checkbox label="Crib" />
          </div>
          <div className="form-control">
            <Checkbox label="BBQ Grill" />
          </div>
          <div className="form-control">
            <Checkbox label="Indoor fireplace" />
          </div>
          <div className="form-control">
            <Checkbox label="Charger" />
          </div>
          <div className="form-control">
            <Checkbox label="Gym" />
          </div>
          <div className="form-control">
            <Checkbox label="Breakfast" />
          </div>
          <div className="form-control">
            <Checkbox label="Smoking Allowed" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-lg">Location Features</div>
        <div className="grid grid-cols-2 w-[358px] gap-y-3">
          <div className="form-control">
            <Checkbox label="Near the sea" />
          </div>
          <div className="form-control">
            <Checkbox label="Nature interwined" />
          </div>
          <div className="form-control">
            <Checkbox label="City Center" />
          </div>
          <div className="form-control">
            <Checkbox label="Near public transport" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Amenities;
