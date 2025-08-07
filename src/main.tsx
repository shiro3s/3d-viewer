import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import {App} from "./app"

import "./styles/global-style.css"
import "normalize.css";

const root = document.getElementById("root");

// biome-ignore lint: lint/style/noNonNullAssertion
createRoot(root!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
