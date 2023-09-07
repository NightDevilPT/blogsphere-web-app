"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import avtar from "../../images/avtar.png";
import { EditProfileType, UserType } from "@/types/AllType";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import ImageCropper from "@/components/ImageCropper/ImageCropper";
import EditFormFrame from "@/components/EditFormFrame";
import { MdOutlineClose } from "react-icons/md";

const page = () => {
	const router = useRouter();
	const { theme } = useAppSelector((state) => state.themeStore);
	const { isUser, user } = useAppSelector((state) => state.userStore);
	const [profileForm, setProfileForm] = useState<EditProfileType>({
		firstname: user.firstname,
		lastname: user.lastname,
		gender: user.gender,
		avtar: user.avtar,
		email: user.email,
		bio: user.bio,
		portfolio: user.portfolio,
		thread: user.thread,
		github: user.github,
		youtube: user.youtube,
		instagram: user.instagram,
		facebook: user.facebook,
		linkedin: user.linkedin,
	});
	const [showImageCroper, setShowImageCroper] = useState<boolean>(false);

	useEffect(() => {
		if (!isUser) {
			router.push("/auth/login");
		}
	}, []);

	return (
		<div className="container h-full flex justify-start items-center gap-5 flex-col">
			<div
				className={`w-full h-[100px] max-sm:h-[80px] flex justify-center items-center border-b-[2px] font-inter font-bold text-[40px] max-sm:text-[30px] ${
					theme === "dark"
						? "border-b-slate-800 text-slate-300"
						: "border-b-slate-400 text-slate-700"
				}`}
			>
				Profile Setting
			</div>

			<div className="w-full h-auto flex justify-between items-start gap-6 transition-all duration-300 max-md:flex-col max-md:items-center max-md:justify-start max-sm:px-2">
				{/* -----[ Upload Image Button ]----- */}
				<div
					className={`relative w-[400px] min-w-[400px] h-[400px] rounded-full overflow-hidden flex justify-center items-center cursor-pointer max-lg:min-w-[300px] max-lg:w-[300px] max-lg:h-[300px] max-lg:min-h-[300px] max-[320px]:min-w-[280px] max-[320px]:w-[280px] max-[320px]:min-h-[280px]  max-[320px]:h-[280px]`}
					onClick={() => {
						setShowImageCroper(true);
					}}
				>
					<Image
						src={profileForm.avtar ? profileForm.avtar : avtar}
						alt=""
						fill={true}
						priority
					/>
					<span
						className={`absolute left-0 bottom-0 w-full h-[50px] flex justify-center items-center bg-slate-900/60 font-inter font-bold text-[20px] text-slate-300`}
					>
						Edit Profile
					</span>
				</div>
				{/* ----[ Edit profile form ]----- */}
				<EditFormFrame
					setProfileForm={setProfileForm}
					profileForm={profileForm}
				/>
			</div>

			<div
				className={` fixed top-0 left-0 z-[100] w-full h-full backdrop-blur-md flex justify-center items-center transition-all duration-500 ${
					showImageCroper ? "scale-100" : "scale-0"
				}`}
			>
				<MdOutlineClose
					className={`absolute right-5 top-5 w-[38px] h-[38px] p-1 cursor-pointer rounded ${
						theme === "dark"
							? "bg-slate-300 text-slate-800"
							: "bg-slate-800 text-slate-300"
					}`}
					onClick={() => {
						setShowImageCroper(false);
					}}
				/>

				<ImageCropper
					setShowImageCropper={setShowImageCroper}
					showImageCropper={showImageCroper}
					profileForm={profileForm}
					setProfileForm={setProfileForm}
				/>
			</div>
		</div>
	);
};

export default page;
