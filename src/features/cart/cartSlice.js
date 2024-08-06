// src/features/cart/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
        };
        toast.info("Increased product quantity", {
          position: "bottom-left",
        });
      } else {
        let tempProductItem = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProductItem);
        toast.success("Product added to cart", {
          position: "bottom-left",
        });
      }
      cartSlice.caseReducers.getTotals(state);
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        toast.info("Decreased product quantity", {
          position: "bottom-left",
        });
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );

        state.cartItems = nextCartItems;
        toast.error("Product removed from cart", {
          position: "bottom-left",
        });
      }
      cartSlice.caseReducers.getTotals(state);
    },
    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      toast.error("Product removed from cart", {
        position: "bottom-left",
      });
      cartSlice.caseReducers.getTotals(state);
    },
    getTotals(state) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    clearCart(state) {
      state.cartItems = [];
      state.cartTotalQuantity = 0;
      state.cartTotalAmount = 0;
      toast.error("Cart cleared", { position: "bottom-left" });
    },
    loadCartFromLocalStorage(state, action) {
      const userCart = localStorage.getItem(`cartItems_${action.payload.userId}`);
      if (userCart) {
        state.cartItems = JSON.parse(userCart);
      } else {
        state.cartItems = [];
      }
      cartSlice.caseReducers.getTotals(state);
    },
    saveCartToLocalStorage(state, action) {
      localStorage.setItem(`cartItems_${action.payload.userId}`, JSON.stringify(state.cartItems));
    },
  },
});

export const {
  addToCart,
  decreaseCart,
  removeFromCart,
  getTotals,
  clearCart,
  loadCartFromLocalStorage,
  saveCartToLocalStorage,
} = cartSlice.actions;

export default cartSlice.reducer;


// src/features/cart/cartSlice.js
// import { createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";

// const initialState = {
//   cartItems: [],
//   cartTotalQuantity: 0,
//   cartTotalAmount: 0,
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart(state, action) {
//       const existingIndex = state.cartItems.findIndex(
//         (item) => item.id === action.payload.id
//       );

//       if (existingIndex >= 0) {
//         state.cartItems[existingIndex] = {
//           ...state.cartItems[existingIndex],
//           cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
//         };
//         toast.info("Increased product quantity", {
//           position: "bottom-left",
//         });
//       } else {
//         let tempProductItem = { ...action.payload, cartQuantity: 1 };
//         state.cartItems.push(tempProductItem);
//         toast.success("Product added to cart", {
//           position: "bottom-left",
//         });
//       }
//     },
//     decreaseCart(state, action) {
//       const itemIndex = state.cartItems.findIndex(
//         (item) => item.id === action.payload.id
//       );

//       if (state.cartItems[itemIndex].cartQuantity > 1) {
//         state.cartItems[itemIndex].cartQuantity -= 1;

//         toast.info("Decreased product quantity", {
//           position: "bottom-left",
//         });
//       } else if (state.cartItems[itemIndex].cartQuantity === 1) {
//         const nextCartItems = state.cartItems.filter(
//           (item) => item.id !== action.payload.id
//         );

//         state.cartItems = nextCartItems;

//         toast.error("Product removed from cart", {
//           position: "bottom-left",
//         });
//       }
//     },
//     removeFromCart(state, action) {
//       state.cartItems = state.cartItems.filter(
//         (item) => item.id !== action.payload.id
//       );
//       toast.error("Product removed from cart", {
//         position: "bottom-left",
//       });
//     },
//     getTotals(state) {
//       let { total, quantity } = state.cartItems.reduce(
//         (cartTotal, cartItem) => {
//           const { price, cartQuantity } = cartItem;
//           const itemTotal = price * cartQuantity;

//           cartTotal.total += itemTotal;
//           cartTotal.quantity += cartQuantity;

//           return cartTotal;
//         },
//         {
//           total: 0,
//           quantity: 0,
//         }
//       );
//       total = parseFloat(total.toFixed(2));
//       state.cartTotalQuantity = quantity;
//       state.cartTotalAmount = total;
//     },
//     clearCart(state) {
//       state.cartItems = [];
//       toast.error("Cart cleared", { position: "bottom-left" });
//     },
//     loadCartFromLocalStorage(state, action) {
//       const userCart = localStorage.getItem(`cartItems_${action.payload.userId}`);
//       if (userCart) {
//         state.cartItems = JSON.parse(userCart);
//       } else {
//         state.cartItems = [];
//       }
//     },
//     saveCartToLocalStorage(state, action) {
//       localStorage.setItem(`cartItems_${action.payload.userId}`, JSON.stringify(state.cartItems));
//     },
//   },
// });

// export const {
//   addToCart,
//   decreaseCart,
//   removeFromCart,
//   getTotals,
//   clearCart,
//   loadCartFromLocalStorage,
//   saveCartToLocalStorage,
// } = cartSlice.actions;

// export default cartSlice.reducer;





// import { createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";

// const initialState = {
//   cartItems: localStorage.getItem("cartItems")
//     ? JSON.parse(localStorage.getItem("cartItems"))
//     : [],
//   cartTotalQuantity: 0,
//   cartTotalAmount: 0,
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart(state, action) {
//       const existingIndex = state.cartItems.findIndex(
//         (item) => item.id === action.payload.id
//       );

//       if (existingIndex >= 0) {
//         state.cartItems[existingIndex] = {
//           ...state.cartItems[existingIndex],
//           cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
//         };
//         toast.info("Increased product quantity", {
//           position: "bottom-left",
//         });
//       } else {
//         let tempProductItem = { ...action.payload, cartQuantity: 1 };
//         state.cartItems.push(tempProductItem);
//         toast.success("Product added to cart", {
//           position: "bottom-left",
//         });
//       }
//       localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
//     },
//     decreaseCart(state, action) {
//       const itemIndex = state.cartItems.findIndex(
//         (item) => item.id === action.payload.id
//       );

//       if (state.cartItems[itemIndex].cartQuantity > 1) {
//         state.cartItems[itemIndex].cartQuantity -= 1;

//         toast.info("Decreased product quantity", {
//           position: "bottom-left",
//         });
//       } else if (state.cartItems[itemIndex].cartQuantity === 1) {
//         const nextCartItems = state.cartItems.filter(
//           (item) => item.id !== action.payload.id
//         );

//         state.cartItems = nextCartItems;

//         toast.error("Product removed from cart", {
//           position: "bottom-left",
//         });
//       }

//       localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
//     },
//     removeFromCart(state, action) {
//       state.cartItems = state.cartItems.filter(
//         (item) => item.id !== action.payload.id
//       );
//       localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
//       toast.error("Product removed from cart", {
//         position: "bottom-left",
//       });
//     },
//     getTotals(state) {
//       let { total, quantity } = state.cartItems.reduce(
//         (cartTotal, cartItem) => {
//           const { price, cartQuantity } = cartItem;
//           const itemTotal = price * cartQuantity;

//           cartTotal.total += itemTotal;
//           cartTotal.quantity += cartQuantity;

//           return cartTotal;
//         },
//         {
//           total: 0,
//           quantity: 0,
//         }
//       );
//       total = parseFloat(total.toFixed(2));
//       state.cartTotalQuantity = quantity;
//       state.cartTotalAmount = total;
//     },
//     clearCart(state) {
//       state.cartItems = [];
//       localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
//       toast.error("Cart cleared", { position: "bottom-left" });
//     },
//     loadCartFromLocalStorage(state) {
//       const cartItems = localStorage.getItem("cartItems");
//       if (cartItems) {
//         state.cartItems = JSON.parse(cartItems);
//       }
//     },
//     initializeCart(state) {
//       state.cartItems = [];
//       localStorage.setItem("cartItems", JSON.stringify([]));
//     },
//   },
// });

// export const {
//   addToCart,
//   decreaseCart,
//   removeFromCart,
//   getTotals,
//   clearCart,
//   loadCartFromLocalStorage,
//   initializeCart,
// } = cartSlice.actions;

// export default cartSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";

// const initialState = {
//   cartItems: localStorage.getItem("cartItems")
//     ? JSON.parse(localStorage.getItem("cartItems"))
//     : [],
//   cartTotalQuantity: 0,
//   cartTotalAmount: 0,
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart(state, action) {
//       const existingIndex = state.cartItems.findIndex(
//         (item) => item.id === action.payload.id
//       );

//       if (existingIndex >= 0) {
//         state.cartItems[existingIndex] = {
//           ...state.cartItems[existingIndex],
//           cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
//         };
//         toast.info("Increased product quantity", {
//           position: "bottom-left",
//         });
//       } else {
//         let tempProductItem = { ...action.payload, cartQuantity: 1 };
//         state.cartItems.push(tempProductItem);
//         toast.success("Product added to cart", {
//           position: "bottom-left",
//         });
//       }
//       localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
//     },
//     decreaseCart(state, action) {
//       const itemIndex = state.cartItems.findIndex(
//         (item) => item.id === action.payload.id
//       );

//       if (state.cartItems[itemIndex].cartQuantity > 1) {
//         state.cartItems[itemIndex].cartQuantity -= 1;

//         toast.info("Decreased product quantity", {
//           position: "bottom-left",
//         });
//       } else if (state.cartItems[itemIndex].cartQuantity === 1) {
//         const nextCartItems = state.cartItems.filter(
//           (item) => item.id !== action.payload.id
//         );

//         state.cartItems = nextCartItems;

//         toast.error("Product removed from cart", {
//           position: "bottom-left",
//         });
//       }

//       localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
//     },
//     removeFromCart(state, action) {
//       state.cartItems.map((cartItem) => {
//         if (cartItem.id === action.payload.id) {
//           const nextCartItems = state.cartItems.filter(
//             (item) => item.id !== cartItem.id
//           );

//           state.cartItems = nextCartItems;

//           toast.error("Product removed from cart", {
//             position: "bottom-left",
//           });
//         }
//         localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
//         return state;
//       });
//     },
//     getTotals(state, action) {
//       let { total, quantity } = state.cartItems.reduce(
//         (cartTotal, cartItem) => {
//           const { price, cartQuantity } = cartItem;
//           const itemTotal = price * cartQuantity;

//           cartTotal.total += itemTotal;
//           cartTotal.quantity += cartQuantity;

//           return cartTotal;
//         },
//         {
//           total: 0,
//           quantity: 0,
//         }
//       );
//       total = parseFloat(total.toFixed(2));
//       state.cartTotalQuantity = quantity;
//       state.cartTotalAmount = total;
//     },
//     clearCart(state, action) {
//       state.cartItems = [];
//       localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
//       toast.error("Cart cleared", { position: "bottom-left" });
//     },
//   },
// });

// export const { addToCart, decreaseCart, removeFromCart, getTotals, clearCart } =
//   cartSlice.actions;

// export default cartSlice.reducer;