"use client";

import { useAppSelector } from "@/redux/store";
import { EditProfileType } from "@/types/AllType";
import React, { useState, useCallback, ChangeEvent, useEffect } from "react";
import Cropper, { Area, Point } from "react-easy-crop";
import { AiOutlineCloudUpload } from "react-icons/ai";

interface ImageCroperProps {
	showImageCropper: boolean;
	setShowImageCropper: React.Dispatch<React.SetStateAction<boolean>>;
	profileForm: EditProfileType;
	setProfileForm: React.Dispatch<React.SetStateAction<EditProfileType>>;
}


const ImageCropper = ({
	showImageCropper,
	setShowImageCropper,
	profileForm,
	setProfileForm,
}: ImageCroperProps) => {
	const [zoom, setZoom] = useState(1);
	const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
	const { theme } = useAppSelector((state) => state.themeStore);
	const [originalImage, setOriginalImage] = useState<string | null>(null);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

	useEffect(()=>{
		if(!showImageCropper){
			setOriginalImage(null);
			setZoom(1);
		}
	},[showImageCropper])


	// ------- Creating Image from URL
	const CreateImage = async (url: any) => {
		return new Promise((resolve, reject) => {
			const image = new Image();
			image.addEventListener("load", () => resolve(image));
			image.addEventListener("error", (error) => reject(error));
			image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
			image.src = url;
		});
	};

	const onCropComplete = useCallback(
		(croppedArea: Area, croppedAreaPixels: Area) => {
			setCroppedAreaPixels(croppedAreaPixels);
		},
		[]
	);

	// ------ Converting File data to Image URL
	const ConvertBlogImageData = async (file: any) => {
		const imgUrl: any = URL.createObjectURL(file);
		return imgUrl;
	};

	// ------ Loading File
	const OnFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			const file = event.target.files[0];
			const imgData = await ConvertBlogImageData(file);
			setOriginalImage(imgData);
		}
	};

	// ------ Croping Image
	const UploadCropedImage = async () => {
		const image:any = await CreateImage(originalImage);
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");

		if (!ctx) {
			return null;
		}

		canvas.width = image.width;
		canvas.height = image.height;

		ctx.drawImage(image, 0, 0);

		const croppedCanvas = document.createElement("canvas");
		const croppedCtx = croppedCanvas.getContext("2d");

		// Set the size of the cropped canvas
		croppedCanvas.width = croppedAreaPixels.width
		croppedCanvas.height = croppedAreaPixels.height


		if (!croppedCtx) {
			return null;
		}

		// Draw the cropped image onto the new canvas
		croppedCtx.drawImage(
			canvas,
			croppedAreaPixels.x,
			croppedAreaPixels.y,
			croppedAreaPixels.width,
			croppedAreaPixels.height,
			0,
			0,
			croppedAreaPixels.width,
			croppedAreaPixels.height
		  )
		
		  const base64 = croppedCanvas.toDataURL();

		setProfileForm((pre) => ({ ...pre, avtar: base64 }));
		setShowImageCropper(false);
		setOriginalImage(null);
	};

	return (
		<div
			className={`relative w-[50%] max-lg:w-[80%] h-auto rounded overflow-y-auto p-4 ${
				theme === "dark" ? "bg-slate-900" : "bg-slate-300"
			}`}
		>

			<div
				className={`relative w-full h-auto py-5 min-h-[400px] rounded flex justify-center items-center ${
					theme === "dark" ? "bg-slate-800" : "bg-slate-400"
				}`}
			>
				{originalImage ? (
					<Cropper
						image={originalImage}
						crop={crop}
						zoom={zoom}
						aspect={1 / 1}
						onCropChange={setCrop}
						onCropComplete={onCropComplete}
						onZoomChange={setZoom}
					/>
				) : (
					<div
						className={`relative flex w-[auto] px-4 py-3 rounded items-center justify-center  gap-3 bg-slate-300 font-bold font-inter cursor-pointer ${
							theme === "dark"
								? "text-slate-800"
								: "text-slate-300 bg-slate-800 shadow-md shadow-slate-600/30"
						}`}
					>
						<AiOutlineCloudUpload className="w-[30px] h-[30px]" />
						<button className={`w-auto h-auto text-[20px]`}>
							Upload Image
						</button>
						<input
							type="file"
							className="w-full h-full absolute left-0 top-0 opacity-0 cursor-pointer"
							onChange={OnFileChange}
						/>
					</div>
				)}
			</div>

			{originalImage && (
				<>
					<div
						className={`w-full h-auto flex justify-center items-center gap-3 mt-5 mb-3 text-[20px] font-inter font-bold ${
							theme === "dark"
								? "text-slate-300"
								: "text-slate-800"
						}`}
					>
						<label>Zoom : </label>
						<input
							type="range"
							className="w-[50%] bg-slate-600"
							value={zoom}
							min={1}
							max={3}
							step={0.1}
							onChange={(
								e: React.ChangeEvent<HTMLInputElement>
							) => setZoom(Number(e.target.value))}
						/>
					</div>

					<div className="w-full h-auto flex justify-end items-center gap-4">
						<button
							className={`w-auto h-auto px-4 py-1 font-inter font-bold text-[18px] rounded hover:scale-110 transition-all duration-300 ${
								theme === "dark"
									? "bg-slate-300 text-slate-800"
									: "bg-slate-800 text-slate-300"
							}`}
							onClick={() => {
								setShowImageCropper(false);
							}}
						>
							Close
						</button>
						<button
							className={`w-auto h-auto px-4 py-1 font-inter font-bold text-[18px] rounded bg-gradient-to-tr from-primary1 to-primary2 text-slate-300 hover:scale-110 transition-all duration-300`}
							onClick={() => {
								UploadCropedImage();
							}}
						>
							Upload
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default ImageCropper;
