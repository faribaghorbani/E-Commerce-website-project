import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'


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
    reducer: {
        user: userReducer,
    }
})

store.subscribe(()=>{
    saveState({
      user: store.getState().user,
     })
})
  