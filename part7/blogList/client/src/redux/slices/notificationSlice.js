import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
   name: 'notification',
   initialState: {
      errorMessage: null,
      successMessage: null
   },
   reducers: {
      showSuccessNotification: (state, action) => {
         state.successMessage = action.payload;
      },
      showErrorNotification: (state, action) => {
         state.errorMessage = action.payload;
      },
      hideNotification: (state) => {
         state.errorMessage = null,
         state.successMessage = null;
      }
   }
});

export const { showSuccessNotification, showErrorNotification, hideNotification } = notificationSlice.actions;
const notificationReducer = notificationSlice.reducer;
export default notificationReducer;