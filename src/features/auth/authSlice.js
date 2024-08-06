// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import firebase from '../../firebase.config';
import { clearCart, loadCartFromLocalStorage, saveCartToLocalStorage } from '../cart/cartSlice';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
  },
  reducers: {
    setAuth(state, action) {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
    },
    clearAuth(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;

export const loginUser = (email, password) => async dispatch => {
  try {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    dispatch(setAuth({ isAuthenticated: true, user }));
    dispatch(loadCartFromLocalStorage({ userId: user.uid }));
  } catch (error) {
    console.error("Login error:", error);
  }
};

export const logoutUser = () => async (dispatch, getState) => {
  try {
    const userId = getState().auth.user.uid;
    dispatch(saveCartToLocalStorage({ userId }));
    await firebase.auth().signOut();
    dispatch(clearAuth());
    dispatch(clearCart());
  } catch (error) {
    console.error("Logout error:", error);
  }
};

export default authSlice.reducer;


// // src/features/auth/authSlice.js
// import { createSlice } from '@reduxjs/toolkit';
// import firebase from '../../firebase.config';

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     isAuthenticated: false,
//     user: null,
//   },
//   reducers: {
//     setAuth(state, action) {
//       state.isAuthenticated = action.payload.isAuthenticated;
//       state.user = action.payload.user;
//     },
//     clearAuth(state) {
//       state.isAuthenticated = false;
//       state.user = null;
//     },
//   },
// });

// export const { setAuth, clearAuth } = authSlice.actions;

// export const loginUser = (email, password) => async dispatch => {
//   try {
//     const user = await firebase.auth().signInWithEmailAndPassword(email, password);
//     dispatch(setAuth({ isAuthenticated: true, user }));
//   } catch (error) {
//     console.error("Login error:", error);
//   }
// };

// export const logoutUser = () => async dispatch => {
//   try {
//     await firebase.auth().signOut();
//     dispatch(clearAuth());
//   } catch (error) {
//     console.error("Logout error:", error);
//   }
// };

// export default authSlice.reducer;
