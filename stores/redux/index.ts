import { configureStore } from "@reduxjs/toolkit";

import inventoryReducer from "./inventory";

const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
  },
});

export default store;
