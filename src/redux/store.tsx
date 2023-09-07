import userSlicer from "./userSlicer/userSlicer";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import themeSlicer from "./themeSlicer/themeSlicer";


export const store = configureStore({
	reducer: {
		userStore: userSlicer,
		themeStore: themeSlicer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;