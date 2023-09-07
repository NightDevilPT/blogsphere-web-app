'use client';

import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AiOutlineLink } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { EditProfileType, UserType } from "@/types/AllType";

import { setUser } from "@/redux/userSlicer/userSlicer";
import { useAppDispatch, useAppSelector } from "@/redux/store";

interface ImageCroperProps {
	profileForm: EditProfileType;
	setProfileForm: React.Dispatch<React.SetStateAction<EditProfileType>>;
}

const EditFormFrame = ({ profileForm, setProfileForm }: ImageCroperProps) => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [upload, setUpload] = useState<boolean>(false);
	const { theme } = useAppSelector((state) => state.themeStore);
	const { user } = useAppSelector((state) => state.userStore);

	const OnChangeHandle = (
		event: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => {
		setProfileForm((pre) => ({
			...pre,
			[event.target.name]: event.target.value,
		}));
	};

	const SubmitHandle = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setUpload(true);

		const token = window.localStorage.getItem("token");
		if (!token) {
			router.push("/auth/login");
			return;
		}

		await axios
			.put(
				`${process.env.NEXT_PUBLIC_URL}/user/update`,
				{ ...profileForm },
				{
					headers: {
						Authorization: "Bearer " + token,
						"Content-Type": "application/json",
					},
				}
			)
			.then((res) => {
				const userData: UserType = {
					...user,
					firstname: profileForm.firstname,
					lastname: profileForm.lastname,
					avtar: profileForm.avtar,
					bio: profileForm.bio,
					gender: profileForm.gender,
					youtube: profileForm.youtube,
					facebook: profileForm.facebook,
					instagram: profileForm.instagram,
					thread: profileForm.thread,
					github: profileForm.github,
					portfolio: profileForm.portfolio,
					linkedin: profileForm.linkedin,
				};
				dispatch(setUser(userData));
				toast.success(res.data.message);
			})
			.catch((err) => {
				toast.error(err.response.data.message);
			});

		setUpload(false);
	};

	return (
		<form
			className="w-full h-auto flex justify-start items-start flex-col gap-5"
			onSubmit={SubmitHandle}
		>
			{/* -----[ Personal Information Edit Fieldset ]----- */}
			<fieldset
				className={`w-full h-full min-h-full border-[2px] rounded ${
					theme === "dark" ? "border-slate-900" : "border-slate-300"
				} grid grid-cols-2 gap-5 p-4 max-lg:flex max-lg:flex-col max-lg:justify-start max-lg:items-start`}
			>
				<legend
					className={`w-auto h-auto font-inter font-bold px-1 text-[20px] text-slate-500`}
				>
					Personal
				</legend>

				{/* ------[ Firstname Input Fields ]----- */}
				<div
					className={`relative w-full h-[80px] font-inter font-bold text-[16px] flex justify-start items-start flex-col gap-1`}
				>
					<label
						htmlFor="firstname"
						className={`relative left-1 w-auto h-auto ${
							theme === "dark"
								? "text-slate-300"
								: "text-slate-800"
						}`}
					>
						Firstname
					</label>
					<input
						id="firstname"
						name="firstname"
						className={`w-full h-[60px] outline-none px-2 rounded placeholder:text-slate-500 ${
							theme === "dark"
								? "bg-slate-900 text-slate-300"
								: "bg-slate-300 text-slate-800"
						}`}
						value={profileForm.firstname}
						onChange={OnChangeHandle}
						minLength={3}
						autoComplete="off"
						disabled={upload}
						placeholder="Firstname..."
						required
					/>
				</div>

				{/* ------[ Lastname Input Fields ]----- */}
				<div
					className={`relative w-full h-[80px] font-inter font-bold text-[16px] flex justify-start items-start flex-col gap-1`}
				>
					<label
						htmlFor="lastname"
						className={`relative left-1 w-auto h-auto placeholder:text-slate-500 ${
							theme === "dark"
								? "text-slate-300"
								: "text-slate-800"
						}`}
					>
						Lastname
					</label>
					<input
						id="lastname"
						name="lastname"
						className={`w-full h-[60px] outline-none px-2 rounded ${
							theme === "dark"
								? "bg-slate-900 text-slate-300"
								: "bg-slate-300 text-slate-800"
						}`}
						value={profileForm.lastname}
						onChange={OnChangeHandle}
						minLength={3}
						autoComplete="off"
						disabled={upload}
						placeholder="Lastname..."
						required
					/>
				</div>

				{/* ------[ Gender Input Fields ]----- */}
				<div
					className={`relative w-full h-[80px] font-inter font-bold text-[16px] flex justify-start items-start flex-col gap-1`}
				>
					<label
						htmlFor="gender"
						className={`relative left-1 w-auto h-auto ${
							theme === "dark"
								? "text-slate-300"
								: "text-slate-800"
						}`}
					>
						Gender
					</label>
					<select
						id="gender"
						name="gender"
						value={profileForm.gender}
						className={`w-full h-[60px] outline-none px-2 rounded ${
							theme === "dark"
								? "bg-slate-900 text-slate-300"
								: "bg-slate-300 text-slate-800"
						}`}
						onChange={OnChangeHandle}
					>
						<option value={""}>---Select Gender---</option>
						<option value={"male"}>Male</option>
						<option value={"female"}>Female</option>
						<option value={"other"}>Other</option>
					</select>
				</div>

				{/* ------[ Email Input Fields ]----- */}
				<div
					className={`relative w-full h-[80px] font-inter font-bold text-[16px] flex justify-start items-start flex-col gap-1`}
				>
					<label
						htmlFor="lastname"
						className={`relative left-1 w-auto h-auto ${
							theme === "dark"
								? "text-slate-300"
								: "text-slate-800"
						}`}
					>
						Email
					</label>
					<input
						id="email"
						name="email"
						className={`w-full h-[60px] outline-none px-2 rounded placeholder:text-slate-500 ${
							theme === "dark"
								? "bg-slate-900 text-slate-500"
								: "bg-slate-300 text-slate-600"
						}`}
						value={profileForm.email}
						onChange={OnChangeHandle}
						minLength={3}
						autoComplete="off"
						placeholder="Email..."
						disabled={true}
					/>
				</div>

				{/* ------[ Bio Input Fields ]----- */}
				<div
					className={`relative col-span-2 w-full h-[150px] font-inter font-bold text-[16px] flex justify-start items-start flex-col gap-1`}
				>
					<label
						htmlFor="bio"
						className={`relative left-1 w-auto h-auto ${
							theme === "dark"
								? "text-slate-300"
								: "text-slate-800"
						}`}
					>
						Bio
					</label>
					<textarea
						id="bio"
						name="bio"
						className={`w-full h-full outline-none px-2 py-2 rounded resize-none placeholder:text-slate-500 ${
							theme === "dark"
								? "bg-slate-900 text-slate-300"
								: "bg-slate-300 text-slate-600"
						}`}
						value={profileForm.bio}
						onChange={OnChangeHandle}
						minLength={3}
						autoComplete="off"
						disabled={upload}
						placeholder="Bio..."
					/>
					<span
						className={`w-full h-auto text-right text-[12px] ${
							profileForm.bio.length > 150
								? "text-red-500"
								: "text-slate-500"
						}`}
					>
						150/{profileForm.bio.length}
					</span>
				</div>
			</fieldset>

			{/* -----[ Social Information Edit Fieldset ]----- */}
			<fieldset
				className={`w-full h-full min-h-full border-[2px] rounded ${
					theme === "dark" ? "border-slate-900" : "border-slate-300"
				} grid grid-cols-2 gap-5 p-4 max-lg:flex max-lg:flex-col max-lg:justify-start max-lg:items-start`}
			>
				<legend
					className={`w-auto h-auto font-inter font-bold px-1 text-[20px] text-slate-500`}
				>
					Social
				</legend>

				{/* ------[ Portfolio Input Fields ]----- */}
				<div
					className={`relative w-full h-[80px] font-inter font-bold text-[16px] flex justify-start items-start flex-col gap-1`}
				>
					<label
						htmlFor="portfolio"
						className={`relative left-1 w-auto h-auto flex justify-start items-center gap-1 ${
							theme === "dark"
								? "text-slate-300"
								: "text-slate-800"
						}`}
					>
						Portfolio
						<AiOutlineLink
							className={`w-[20px] h-[20px] ${
								theme === "dark"
									? "text-slate-300"
									: "text-slate-800"
							}`}
						/>
					</label>
					<input
						id="portfolio"
						name="portfolio"
						type="url"
						className={`w-full h-[60px] outline-none px-2 rounded placeholder:text-slate-500 ${
							theme === "dark"
								? "bg-slate-900 text-slate-300"
								: "bg-slate-300 text-slate-800"
						}`}
						value={profileForm.portfolio}
						onChange={OnChangeHandle}
						minLength={3}
						autoComplete="off"
						disabled={upload}
						placeholder="Portfolio Link..."
					/>
				</div>

				{/* ------[ Facebook Input Fields ]----- */}
				<div
					className={`relative w-full h-[80px] font-inter font-bold text-[16px] flex justify-start items-start flex-col gap-1`}
				>
					<label
						htmlFor="facebook"
						className={`relative left-1 w-auto h-auto flex justify-start items-center gap-1 ${
							theme === "dark"
								? "text-slate-300"
								: "text-slate-800"
						}`}
					>
						Facebook
						<AiOutlineLink
							className={`w-[20px] h-[20px] ${
								theme === "dark"
									? "text-slate-300"
									: "text-slate-800"
							}`}
						/>
					</label>
					<input
						id="facebook"
						name="facebook"
						type="url"
						className={`w-full h-[60px] outline-none px-2 rounded placeholder:text-slate-500 ${
							theme === "dark"
								? "bg-slate-900 text-slate-300"
								: "bg-slate-300 text-slate-800"
						}`}
						value={profileForm.facebook}
						onChange={OnChangeHandle}
						minLength={3}
						autoComplete="off"
						disabled={upload}
						placeholder="Facebook Link..."
					/>
				</div>

				{/* ------[ Instagram Input Fields ]----- */}
				<div
					className={`relative w-full h-[80px] font-inter font-bold text-[16px] flex justify-start items-start flex-col gap-1`}
				>
					<label
						htmlFor="instagram"
						className={`relative left-1 w-auto h-auto flex justify-start items-center gap-1 ${
							theme === "dark"
								? "text-slate-300"
								: "text-slate-800"
						}`}
					>
						Instagram
						<AiOutlineLink
							className={`w-[20px] h-[20px] ${
								theme === "dark"
									? "text-slate-300"
									: "text-slate-800"
							}`}
						/>
					</label>
					<input
						id="instagram"
						name="instagram"
						type="url"
						className={`w-full h-[60px] outline-none px-2 rounded placeholder:text-slate-500 ${
							theme === "dark"
								? "bg-slate-900 text-slate-300"
								: "bg-slate-300 text-slate-800"
						}`}
						value={profileForm.instagram}
						onChange={OnChangeHandle}
						minLength={3}
						autoComplete="off"
						disabled={upload}
						placeholder="Instagram Link..."
					/>
				</div>

				{/* ------[ Thread Input Fields ]----- */}
				<div
					className={`relative w-full h-[80px] font-inter font-bold text-[16px] flex justify-start items-start flex-col gap-1`}
				>
					<label
						htmlFor="thread"
						className={`relative left-1 w-auto h-auto flex justify-start items-center gap-1 ${
							theme === "dark"
								? "text-slate-300"
								: "text-slate-800"
						}`}
					>
						Thread
						<AiOutlineLink
							className={`w-[20px] h-[20px] ${
								theme === "dark"
									? "text-slate-300"
									: "text-slate-800"
							}`}
						/>
					</label>
					<input
						id="thread"
						name="thread"
						type="url"
						className={`w-full h-[60px] outline-none px-2 rounded placeholder:text-slate-500 ${
							theme === "dark"
								? "bg-slate-900 text-slate-300"
								: "bg-slate-300 text-slate-800"
						}`}
						value={profileForm.thread}
						onChange={OnChangeHandle}
						minLength={3}
						autoComplete="off"
						disabled={upload}
						placeholder="Thread Link..."
					/>
				</div>

				{/* ------[ Youtube Input Fields ]----- */}
				<div
					className={`relative w-full h-[80px] font-inter font-bold text-[16px] flex justify-start items-start flex-col gap-1`}
				>
					<label
						htmlFor="youtube"
						className={`relative left-1 w-auto h-auto flex justify-start items-center gap-1 ${
							theme === "dark"
								? "text-slate-300"
								: "text-slate-800"
						}`}
					>
						Youtube
						<AiOutlineLink
							className={`w-[20px] h-[20px] ${
								theme === "dark"
									? "text-slate-300"
									: "text-slate-800"
							}`}
						/>
					</label>
					<input
						id="youtube"
						name="youtube"
						type="url"
						className={`w-full h-[60px] outline-none px-2 rounded placeholder:text-slate-500 ${
							theme === "dark"
								? "bg-slate-900 text-slate-300"
								: "bg-slate-300 text-slate-800"
						}`}
						value={profileForm.youtube}
						onChange={OnChangeHandle}
						minLength={3}
						autoComplete="off"
						disabled={upload}
						placeholder="Youtube Link..."
					/>
				</div>

				{/* ------[ Linkdin Input Fields ]----- */}
				<div
					className={`relative w-full h-[80px] font-inter font-bold text-[16px] flex justify-start items-start flex-col gap-1`}
				>
					<label
						htmlFor="linkedin"
						className={`relative left-1 w-auto h-auto flex justify-start items-center gap-1 ${
							theme === "dark"
								? "text-slate-300"
								: "text-slate-800"
						}`}
					>
						Linkedin
						<AiOutlineLink
							className={`w-[20px] h-[20px] ${
								theme === "dark"
									? "text-slate-300"
									: "text-slate-800"
							}`}
						/>
					</label>
					<input
						id="linkedin"
						name="linkedin"
						type="url"
						className={`w-full h-[60px] outline-none px-2 rounded placeholder:text-slate-500 ${
							theme === "dark"
								? "bg-slate-900 text-slate-300"
								: "bg-slate-300 text-slate-800"
						}`}
						value={profileForm.linkedin}
						onChange={OnChangeHandle}
						autoComplete="off"
						disabled={upload}
						placeholder="Linkdin Link..."
					/>
				</div>

				{/* ------[ Github Input Fields ]----- */}
				<div
					className={`relative w-full h-[80px] font-inter font-bold text-[16px] flex justify-start items-start flex-col gap-1`}
				>
					<label
						htmlFor="github"
						className={`relative left-1 w-auto h-auto flex justify-start items-center gap-1 ${
							theme === "dark"
								? "text-slate-300"
								: "text-slate-800"
						}`}
					>
						Github
						<AiOutlineLink
							className={`w-[20px] h-[20px] ${
								theme === "dark"
									? "text-slate-300"
									: "text-slate-800"
							}`}
						/>
					</label>
					<input
						id="github"
						name="github"
						type="url"
						className={`w-full h-[60px] outline-none px-2 rounded placeholder:text-slate-500 ${
							theme === "dark"
								? "bg-slate-900 text-slate-300"
								: "bg-slate-300 text-slate-800"
						}`}
						value={profileForm.github}
						onChange={OnChangeHandle}
						minLength={3}
						autoComplete="off"
						disabled={upload}
						placeholder="Github Link..."
					/>
				</div>
			</fieldset>

			<div className="w-full h-auto flex justify-end items-center gap-4">
				<Link
					className={`w-auto h-auto px-4 py-2 font-inter font-bold text-[18px] rounded hover:scale-110 transition-all duration-300 ${
						theme === "dark"
							? "bg-slate-300 text-slate-800"
							: "bg-slate-800 text-slate-300"
					}`}
					href={"/"}
				>
					Back
				</Link>
				<button
					type="submit"
					className="w-auto h-auto px-4 py-2 font-inter font-bold text-[18px] rounded hover:scale-110 transition-all duration-300 flex justify-center items-center bg-gradient-to-tr from-primary1 to-primary2 text-slate-300"
				>
					{upload ? (
						<span className="w-[25px] h-[25px] rounded-full border-[3px] border-slate-300/60 border-t-transparent animate-spin"></span>
					) : (
						"Save"
					)}
				</button>
			</div>
		</form>
	);
};

export default EditFormFrame;
