import React from "react";
import Modal from "antd/lib/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { DISABLE_LOGIN_MODE } from "../state/misc";
import { Form, Input } from "antd";

export default function LoginPrompt() {
	const loginMode = useSelector((state) => state.misc.loginMode);
	const dispatch = useDispatch();

	const handleModalClose = () => {
		dispatch({
			type: DISABLE_LOGIN_MODE,
		});
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
				<h3 className="text-center text-xl font-bold mb-8">Login</h3>
				<Form>
					<Form.Item name="username" style={{ marginBottom: 10 }}>
						<Input placeholder="Username" style={inputStyle} />
					</Form.Item>
					<Form.Item name="password" style={{ marginBottom: 10 }}>
						<Input placeholder="Password" style={inputStyle} />
					</Form.Item>
					<button className="w-full py-2 rounded bg-yellow-200 font-semibold focus:outline-none">
						Login
					</button>
					<div className="flex justify-between items-center mt-5">
						<small>Forgot Password?</small>
						<div>
							New to us? <span className="font-semibold">Register</span>
						</div>
					</div>
				</Form>
			</Modal>
		</div>
	);
}

const inputStyle = {
	borderColor: "rgba(0, 0, 0, 0.2)",
	outline: 0,
	// boxShadow: "0 0 0 2px rgba(0, 0, 0, .2)",
};
