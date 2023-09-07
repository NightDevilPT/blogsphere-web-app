import React from "react";

export interface ChildrenNode {
	children: React.ReactNode;
}

export interface ThemeContextType {
	theme: boolean;
	setTheme: () => void;
}

export interface UserType {
	avtar: string;
	firstname: string;
	lastname:string;
	email: string;
	gender: string;
	bio:string;
	followers: string[];
	following: string[];
	blogs: string[];
	saved: string[];
	liked: string[];
	youtube:string;
	facebook:string;
	instagram:string;
	thread:string;
	github:string;
	portfolio:string;
	linkedin:string
}

export interface UserSlicerType {
	isUser: boolean;
	user: UserType;
}


export interface SignupFormType {
	firstname?:string,
	lastname?:string,
	gender?:string,
	email:string,
	password:string
}


export interface EditProfileType {
	avtar: string;
	firstname: string;
	lastname:string;
	email: string;
	gender: string;
	bio:string;
	youtube:string;
	facebook:string;
	instagram:string;
	thread:string;
	github:string;
	portfolio:string;
	linkedin:string
}