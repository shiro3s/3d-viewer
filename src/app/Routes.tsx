import React from "react";
import { Route, Routes } from "react-router";
import { TopPage } from "@/pages/top";

export const AppRoutes: React.FC = () => {
	return (
		<Routes>
			<Route path="/" Component={TopPage} />
		</Routes>
	);
};
