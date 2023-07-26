import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {
    step1: {
      state: "MAHARASHTRA",
      district: "",
      tashil: "",
      village: "",
      primary: "",
      class: "",
      refrance: "",
    },
    step2: {
      studentName: "",
      address: "",
      fatherName: "",
      motherName: "",
      dob: "",
      bloodGroup: "",
      mobileNo: "",
      mailId: "",
      password: "",
    },
    step3: {
      fathersBussinessProfile: "",
      fatherEducation: "",
      motherEducation: "",
      mailId: "",
      password: "",
    },
  },
  reducers: {
    updateFormData: (state, action) => {
      const { step, field, value } = action.payload;
      if (state[step] && state[step][field] !== undefined) {
        state[step][field] = value;
      }
    },
  },
});

export const { updateFormData } = formSlice.actions;
export default formSlice.reducer;
