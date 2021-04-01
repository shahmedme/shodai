import React, { useEffect, useState } from "react";
import { Table, Space, Button, Spin } from "antd";
import { coreAxios } from "../../utils/axios";
import { Link } from "react-router-dom";

export default function Users() {
	const [users, setUsers] = useState();

	useEffect(() => {
		coreAxios
			.get("api/users")
			.then((res) => {
				setUsers(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div>
			<div className="flex justify-between items-center mb-5">
				<h1 className="text-2xl font-semibold">Users</h1>
				<Button type="primary">Create New User</Button>
			</div>
			<Spin spinning={!users}>
				<Table dataSource={users} columns={columns} rowKey="_id" />
			</Spin>
		</div>
	);
}

const columns = [
	{
		title: "Name",
		dataIndex: "firstName",
		key: "firstName",
	},
	{
		title: "Username",
		dataIndex: "username",
		key: "username",
	},
	{
		title: "Email",
		dataIndex: "email",
		key: "email",
	},
	{
		title: "Role",
		key: "Role",
		dataIndex: "Role",
	},
	{
		title: "Action",
		key: "action",
		render: (text, record) => (
			<Space size="middle">
				<Link to={""}>Edit</Link>
				<Link to={""}>Delete</Link>
			</Space>
		),
	},
];
