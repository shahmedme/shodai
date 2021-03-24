import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DISABLE_LOGIN_MODE } from "../state/misc";
import { Form, Input, Row, Modal, Col, message } from "antd";
import { coreAxios } from "../utils/axios";
import Storage from "../utils/storage";

export default function LoginPrompt() {
	const [mode, setMode] = useState("login");
	const loginMode = useSelector((state) => state.misc.loginMode);
	const dispatch = useDispatch();

	const handleModalClose = () => {
		dispatch({
			type: DISABLE_LOGIN_MODE,
		});
	};

	const togglePromptMode = () => {
		if (mode === "login") {
			setMode("register");
		} else {
			setMode("login");
		}
	};

	return (
		<div>
			<Modal
				visible={loginMode}
				centered
				closeIcon={<span />}
				onCancel={handleModalClose}
				footer={null}
				width={350}
			>
				{mode === "login" ? (
					<LoginForm togglePromptMode={togglePromptMode} />
				) : (
					<RegistrationForm togglePromptMode={togglePromptMode} />
				)}
			</Modal>
		</div>
	);
}

const inputStyle = {
	borderColor: "rgba(0, 0, 0, 0.2)",
	outline: 0,
	// boxShadow: "0 0 0 2px rgba(0, 0, 0, .2)",
};

export function LoginForm({ togglePromptMode }) {
	const handleFormSubmit = (values) => {
		coreAxios
			.post("/api/login", values)
			.then((res) => {
				if (res.data.token) {
					message.success("Login Success");
					Storage.set("token", res.data.token);
					window.setTimeout(() => {
						window.location.reload();
					}, 500);
				}
			})
			.catch((err) => {
				message.error(err.response.data.msg);
			});
	};

	return (
		<>
			<h3 className="text-center text-xl font-bold mb-8">Login</h3>
			<Form onFinish={handleFormSubmit}>
				<Form.Item name="username" style={{ marginBottom: 10 }}>
					<Input placeholder="Username" style={inputStyle} />
				</Form.Item>
				<Form.Item name="password" style={{ marginBottom: 10 }}>
					<Input type="password" placeholder="Password" style={inputStyle} />
				</Form.Item>
				<button className="w-full py-2 rounded bg-yellow-200 font-semibold focus:outline-none">
					Login
				</button>
				<div className="flex justify-between items-center mt-5">
					<small>Forgot Password?</small>
					<div>
						New to us?{" "}
						<span className="font-semibold" onClick={togglePromptMode}>
							Register
						</span>
					</div>
				</div>
			</Form>
		</>
	);
}

export function RegistrationForm({ togglePromptMode }) {
	const handleFormSubmit = (values) => {
		coreAxios
			.post("/api/register", values)
			.then((res) => {
				togglePromptMode();
				message.success("User Created Successfully");
			})
			.catch((err) => {
				let { errors } = err.response.data;
				let keys = Object.keys(errors);
				keys.forEach((key) => {
					message.error(errors[key].message);
				});
			});
	};

	return (
		<>
			<h3 className="text-center text-xl font-bold mb-8">Sign Up</h3>
			<Form onFinish={handleFormSubmit}>
				<Row gutter={10}>
					<Col span={12}>
						<Form.Item name="firstName" style={{ marginBottom: 10 }}>
							<Input placeholder="First Name" style={inputStyle} />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="lastName" style={{ marginBottom: 10 }}>
							<Input placeholder="Last Name" style={inputStyle} />
						</Form.Item>
					</Col>
				</Row>
				<Form.Item name="username" style={{ marginBottom: 10 }}>
					<Input placeholder="Username" style={inputStyle} />
				</Form.Item>
				<Form.Item name="email" style={{ marginBottom: 10 }}>
					<Input placeholder="Email" style={inputStyle} />
				</Form.Item>
				<Form.Item name="password" style={{ marginBottom: 10 }}>
					<Input type="password" placeholder="Password" style={inputStyle} />
				</Form.Item>
				<button className="w-full py-2 rounded bg-yellow-200 font-semibold focus:outline-none">
					Sign Up
				</button>
				<div className="flex justify-center items-center mt-5">
					<div>
						Already have an account?{" "}
						<span className="font-semibold" onClick={togglePromptMode}>
							Login
						</span>
					</div>
				</div>
			</Form>
		</>
	);
}
