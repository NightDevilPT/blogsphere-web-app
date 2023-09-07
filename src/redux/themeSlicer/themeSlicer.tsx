import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ThemeTypes {
	theme:string|undefined
}

const initialState:ThemeTypes={
	theme:undefined
}

const themeSlicer = createSlice({
	name: "themeSlicer",
	initialState,
	reducers: {
		setTheme: (state,action:PayloadAction<string>) => {
			state.theme = action.payload;
		},
	},
});

export const { setTheme } = themeSlicer.actions;
export default themeSlicer.reducer;
