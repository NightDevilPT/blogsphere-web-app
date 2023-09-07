"use client"

import React, { useState } from "react";

import {BiSearchAlt} from "react-icons/bi";

const SearchFrame = () => {
	const [showSearch, setShowSearch] = useState<boolean>(false);

	return (
		<React.Fragment>
			<button className={`fixed border-none outline-none z-50 left-5 bottom-20 rounded-full animate-bounce w-[50px] h-[50px] p-1 flex justify-center items-center bg-gradient-to-tr from-primary1 to-primary2`}>
				<BiSearchAlt className="w-full h-full text-slate-300" />
			</button>
		</React.Fragment>
	);
};

export default SearchFrame;
