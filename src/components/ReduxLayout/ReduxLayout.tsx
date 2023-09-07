"use client";

import { store } from "@/redux/store";
import { ChildrenNode } from "@/types/AllType";
import React from "react";
import { Provider } from "react-redux";

const ReduxLayout = ({ children }: ChildrenNode) => {
	return <Provider store={store}>{children}</Provider>;
};

export default ReduxLayout;
