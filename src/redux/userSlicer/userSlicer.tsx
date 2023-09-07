import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserSlicerType, UserType } from "@/types/AllType";

const UserDataType: UserType = {
	firstname: "",
	lastname:"",
	email: "",
	bio:"",
	gender: "",
	avtar: "",
	followers: [],
	following: [],
	saved: [],
	liked: [],
	blogs: [],
	linkedin:"",
	portfolio:"",
	instagram:"",
	youtube:"",
	github:"",
	thread:"",
	facebook:""
};

const initialState: UserSlicerType = {
	isUser: false,
	user: UserDataType,
};

const userSlicer = createSlice({
	name: "UserSlicer",
	initialState,
	reducers: {
		setUserLogout: (state) => {
			state.isUser = false;
			state.user = UserDataType;
		},
		setUserLogin: (state) => {
			state.isUser = true;
		},
		setUser: (state, action: PayloadAction<UserType>) => {
			state.user = action.payload;
		},
	},
});

export const { setUserLogin, setUserLogout, setUser } = userSlicer.actions;
export default userSlicer.reducer;
