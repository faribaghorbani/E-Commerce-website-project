import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import ordersStatusReducer from './slices/ordersStatusSlice';
import categoryDataReducer from './slices/categoryDataSlice';
import adminPanelSavedProductsReducer from './slices/adminPanelSavedProductsSlice';
import basketProductsReducer from './slices/basketProductsSlice';


const loadPreloadState = ()=>{
    try {
      const serializedState = localStorage.getItem('state');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
}


const saveState = (state) =>{
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
    } catch {
      // ignore write errors
    }
};

export const store = configureStore({
    devTools: true,
    preloadedState: loadPreloadState(),
    reducer: {
        user: userReducer,
        orderStatus: ordersStatusReducer,
        categoryData: categoryDataReducer,
        adminPanelSavedProducts: adminPanelSavedProductsReducer,
        basketProducts: basketProductsReducer,
    }
})

store.subscribe(()=>{
    saveState({
        basketProducts: store.getState().basketProducts,
     })
})
  