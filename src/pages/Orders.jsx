import { Spin, Table } from "antd";
import React, { useEffect, useState } from "react";
import { coreAxios } from "../utils/axios";

const columns = [
	{
		title: "Order No",
		dataIndex: "orderNo",
		key: "orderNo",
		render: (orderNo) => <span>#{orderNo}</span>,
	},
	{
		title: "Date",
		dataIndex: "timestamp",
		key: "timestamp",
		render: (timestamp) => {
			let date = new Date(timestamp);
			return <span>{date.toLocaleDateString("en-US", options)}</span>;
		},
	},
	{
		title: "Address",
		dataIndex: "shippingAddress",
		key: "shippingAddress",
	},
	{
		title: "Status",
		dataIndex: "status",
		key: "status",
	},
];

var options = {
	year: "numeric",
	month: "long",
	day: "numeric",
};

export default function Orders() {
	const [orders, setOrders] = useState();

	useEffect(() => {
		coreAxios
			.get("/api/my-orders")
			.then((res) => setOrders(res.data))
			.catch((err) => console.log(err));
	}, []);

	return (
		<div className="p-5">
			<Spin spinning={!orders}>
				<Table dataSource={orders} columns={columns} rowKey="_id" />
			</Spin>
		</div>
	);
}
