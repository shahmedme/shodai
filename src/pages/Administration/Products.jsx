import React, { useEffect, useState } from "react";
import { Table, Space, Button, Spin } from "antd";
import { coreAxios } from "../../utils/axios";
import { Link } from "react-router-dom";

export default function Products() {
	const [products, setProducts] = useState();

	useEffect(() => {
		coreAxios
			.get("api/products")
			.then((res) => {
				setProducts(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div>
			<div className="flex justify-between items-center mb-5">
				<h1 className="text-2xl font-semibold">Products</h1>
				<Button type="primary">Create New Product</Button>
			</div>
			<Spin spinning={!products}>
				<Table dataSource={products} columns={columns} rowKey="_id" />
			</Spin>
		</div>
	);
}

const columns = [
	{
		title: "Title",
		dataIndex: "title",
		key: "title",
		render: (text) => <Link to={""}>{text}</Link>,
	},
	{
		title: "Description",
		dataIndex: "description",
		key: "description",
		width: 300,
		render: (text) => text.substr(0, 60),
	},
	{
		title: "Price",
		dataIndex: "price",
		key: "price",
	},
	{
		title: "Category",
		key: "category",
		dataIndex: "category",
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
