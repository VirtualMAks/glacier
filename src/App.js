import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./component/Main/index";
import Signup from "./component/SignUp/index";
import Login from "./component/Login/index";
import Importt from "./component/Import/import"
import Dashboard from "./component/DashBoard/dashboard";


function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/import" exact element={<Importt />} />
			<Route path="/dashboard" exact element={<Dashboard />} />

			<Route path="/" element={<Navigate replace to="/login" />} />
		</Routes>
	);
}

export default App;