import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


const Import = () => {
	const [data, setData] = useState();
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

    const handleFile = (e) => {
        setData(e.target.files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/v1/import";
			const { data: res } = await axios.post(url, data);
			navigate("/dashboard");
			console.log(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		
			<div>
                    <form onSubmit={handleSubmit}>
                        <input type="file" name="file" onChange={(e)=>{handleFile(e)}}/>
                        <button type="submit">Submit</button>
                    </form>
			</div>
		
	);
};

export default Import;