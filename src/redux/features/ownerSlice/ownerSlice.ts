import { createSlice } from "@reduxjs/toolkit";

import { STEP_1 } from "@/redux/features/ownerSlice/enum";

// todo: api entegrasyonu sonrası güncellenecek
const initialState = {
  currentStep: STEP_1,
  countries: [
    {
      icon: "https://www.missafir.com/wp-content/uploads/2023/06/flag-turkey.svg",
      label: "Turkey",
      description: "View 3,557 property"
    },
    {
      icon: "https://www.missafir.com/wp-content/uploads/2023/06/flag-turkey.svg",
      label: "Croatia",
      description: "View 3,557 property"
    },
    {
      icon: "https://www.missafir.com/wp-content/uploads/2023/06/flag-turkey.svg",
      label: "Montenegro",
      description: "View 3,557 property"
    },
    {
      icon: "https://www.missafir.com/wp-content/uploads/2023/06/flag-turkey.svg",
      label: "Northern Cyprus",
      description: "View 3,557 property"
    }
  ]
};

const ownerSlice = createSlice({
  name: "owner",
  initialState,
  reducers: {}
});

//export const {} = ownerSlice.actions;

export default ownerSlice.reducer;
