"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ToastContainer, Zoom, Slide } from "react-toastify";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setTheme } from "@/redux/themeSlicer/themeSlicer";
import { ChildrenNode, UserType } from "@/types/AllType";

import HeaderFrame from "@/components/HeaderFrame/HeaderFrame";
import ThemeFrame from "@/components/ThemeFrame";
import SearchFrame from "@/components/SearchFrame";

import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {
	setUser,
	setUserLogin,
	setUserLogout,
} from "@/redux/userSlicer/userSlicer";

const Layout = ({ children }: ChildrenNode) => {
	const { theme } = useAppSelector((state) => state.themeStore);
	const { isUser } = useAppSelector((state) => state.userStore);
	const [loading, setLoading] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const pathName = usePathname();

	useEffect(() => {
		setLoading(false);
		const isTheme: string | undefined | null =
			window.localStorage.getItem("theme");
		if (!isTheme) {
			dispatch(setTheme("dark"));
			window.localStorage.setItem("theme", "dark");
			return;
		}
		dispatch(setTheme(isTheme));
	}, []);

	useEffect(()=>{
		const token = window.localStorage.getItem("token");
		if (!token) {
			dispatch(setUserLogout());
			setLoading(true);
			return;
		}
		GetUserTokenData(token);
	},[isUser])

	const GetUserTokenData = async (token:string) => {
		setLoading(false);

		await axios
			.get(`${process.env.NEXT_PUBLIC_URL}/user/profile`, {
				headers: {
					Authorization: "Bearer " + token,
				},
			})
			.then((res) => {
				const {
					data: { data },
				} = res;
				dispatch(setUserLogin());
				const userData: UserType = {
					firstname: data.firstname,
					lastname: data.lastname,
					avtar: data.avtar,
					email: data.email,
					bio: data.bio,
					gender: data.gender,
					followers: data.followers,
					following: data.following,
					blogs: data.blogs,
					saved: data.saved,
					liked: data.liked,
					youtube: data.youtube,
					facebook: data.facebook,
					instagram: data.instagram,
					thread: data.thread,
					github: data.github,
					portfolio: data.portfolio,
					linkedin: data.linkdin,
				};
				dispatch(setUser(userData));
			})
			.catch((err) => {
				dispatch(setUserLogout());
			});

		setLoading(true);
	};

	return !loading ? (
		<div
			className={`w-full h-full bg-slate-950 flex justify-center items-center`}
		>
			<span
				className={`relative w-[250px] h-[250px] p-3 text-center rounded-full flex justify-center items-center text-[30px] text-slate-300 font-satisfy after:content-[''] after:w-full after:h-full after:absolute after:border-[5px] after:border-transparent after:border-t-primary1 after:border-b-primary2 after:rounded-full after:animate-spin after:duration-[5s]`}
			>
				BlogSphere Loading...
			</span>
		</div>
	) : (
		<div
			className={`relative w-full h-full  overflow-y-auto ${
				theme === "dark" ? "bg-slate-950" : "bg-slate-100"
			} transition-all duration-300`}
		>
			{pathName === "/auth/login" ||
			pathName === "/auth/signup" ||
			pathName === "/auth/verify" ||
			pathName === "/auth/forget" ||
			pathName === "/auth/updatePassword" ||
			pathName === "/editprofile" ? (
				""
			) : (
				<>
					<HeaderFrame />
					<SearchFrame />
				</>
			)}
			{children}
			<ThemeFrame />

			<ToastContainer
				position="top-right"
				autoClose={4000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme={"light"}
				transition={Slide}
			/>
		</div>
	);
};

export default Layout;
