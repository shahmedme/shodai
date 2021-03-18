import axios from "axios";

export const coreAxios = axios.create({
	baseURL: process.env.REACT_APP_SERVICE_URL,
});
