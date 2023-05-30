import "./index.scss";
import Container from "react-bootstrap/Container";
// import Div from "react-bootstrap";

import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import { Container } from "react-bootstrap";

const App = () => {
	return (
		<div>
			<MainView />
		</div>
	);
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<App />);
