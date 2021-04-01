import React, { useEffect, useState } from "react";
import { Table, Space, Button, Spin } from "antd";
import { coreAxios } from "../../utils/axios";
import { Link } from "react-router-dom";

export default function Orders() {
	const [orders, setOrders] = useState();

	useEffect(() => {
		coreAxios
			.get("api/orders")
			.then((res) => {
				setOrders(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div>
			<div className="flex justify-between items-center mb-5">
				<h1 className="text-2xl font-semibold">Orders</h1>
				<Button type="primary">Create New Order</Button>
			</div>
			<Spin spinning={!orders}>
				<Table dataSource={orders} columns={columns} rowKey="_id" />
			</Spin>
		</div>
	);
}

const columns = [
	{
		title: "Order No",
		dataIndex: "orderNo",
		key: "orderNo",
		render: (orderNo) => <div>#{orderNo}</div>,
	},
	{
		title: "Customer",
		dataIndex: "customer",
		key: "customer",
		render: (customer) => (
			<div>
				{customer.firstName} {customer.lastName}
			</div>
		),
	},
	{
		title: "Email",
		dataIndex: "email",
		key: "email",
	},
	{
		title: "Shipping Address",
		key: "shippingAddress",
		dataIndex: "shippingAddress",
	},
	{
		title: "Order Date",
		key: "timestamp",
		dataIndex: "timestamp",
		render: (timestamp) => {
			let date = new Date(timestamp);
			return <span>{date.toLocaleDateString("en-US", options)}</span>;
		},
	},
	{
		title: "Status",
		key: "status",
		dataIndex: "status",
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

var options = {
	year: "numeric",
	month: "long",
	day: "numeric",
};
