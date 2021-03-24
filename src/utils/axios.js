import axios from "axios";
import Storage from "./storage";

export const coreAxios = axios.create({
	baseURL: process.env.REACT_APP_SERVICE_URL,
});

coreAxios.interceptors.request.use(function (req) {
	let token = Storage.get("token");

	if (token) {
		req.headers.authorization = "Bearer " + token;
	}

	return req;
});
