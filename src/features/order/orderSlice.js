import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderDetails: [],
  userEmail: '',
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderDetails(state, action) {
      state.orderDetails.push(action.payload);
      localStorage.setItem(state.userEmail, JSON.stringify(state.orderDetails));
    },
    clearOrderDetails(state) {
      state.orderDetails = [];
    },
    setUserEmail(state, action) {
      state.userEmail = action.payload;
      const storedOrders = JSON.parse(localStorage.getItem(action.payload)) || [];
      state.orderDetails = storedOrders;
    },
  },
});

export const { setOrderDetails, clearOrderDetails, setUserEmail } = orderSlice.actions;
export default orderSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   orderDetails: [],
//   userEmail: '',
// };

// const orderSlice = createSlice({
//   name: 'order',
//   initialState,
//   reducers: {
//     setOrderDetails(state, action) {
//       state.orderDetails.push(action.payload);
//     },
//     clearOrderDetails(state) {
//       state.orderDetails = [];
//     },
//     setUserEmail(state, action) {
//       state.userEmail = action.payload;
//     },
//   },
// });

// export const { setOrderDetails, clearOrderDetails, setUserEmail } = orderSlice.actions;
// export default orderSlice.reducer;



// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   orderDetails: null,
// };

// const orderSlice = createSlice({
//   name: 'order',
//   initialState,
//   reducers: {
//     setOrderDetails(state, action) {
//       state.orderDetails = action.payload;
//     },
//     clearOrderDetails(state) {
//       state.orderDetails = null;
//     },
//   },
// });

// export const { setOrderDetails, clearOrderDetails } = orderSlice.actions;
// export default orderSlice.reducer;
