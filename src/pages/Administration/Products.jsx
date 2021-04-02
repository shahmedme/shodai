import React, { useEffect, useState } from "react";
import { Table, Space, Button, Spin, message } from "antd";
import { coreAxios } from "../../utils/axios";
import { Link } from "react-router-dom";
import AddOrUpdateModal from "./AddOrUpdateModal";

let formItems = [
	{
		label: "ID",
		name: "_id",
		placeholder: "Product ID",
		hidden: true,
	},
	{
		label: "Title",
		name: "title",
		placeholder: "Product Title",
		rules: [{ required: true, message: "Product must have a title" }],
	},
	{
		label: "Description",
		name: "description",
		placeholder: "Product Description",
		rules: [{ required: true, message: "Product must have a description" }],
	},
	{
		label: "Price",
		name: "price",
		placeholder: "Product Price",
		rules: [{ required: true, message: "Product must have a price" }],
	},
	{
		label: "Thumbnail",
		name: "image",
		placeholder: "Product Thumbnail",
	},
	{
		label: "Category",
		name: "category",
		placeholder: "Product Category",
		type: "select",
		data: [],
		rules: [{ required: true, message: "Product must have a category" }],
	},
];

export default function Products() {
	const [products, setProducts] = useState();
	const [singleProduct, setSingleProduct] = useState();
	const [categories, setCategories] = useState();
	const [addOrUpdateModalVisibility, setAddOrUpdateModalVisibility] = useState(
		false
	);

	useEffect(() => {
		loadProducts();

		coreAxios
			.get("api/products/categories")
			.then((res) => {
				let tempCategories = res.data.map((category) => ({
					title: category.title,
					value: category._id,
				}));
				setCategories(tempCategories);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		formItems = formItems.map((item) => {
			if (item.name === "category") {
				item.data = categories;
			}

			return item;
		});
	}, [categories]);

	const columns = [
		{
			title: "Thumbnail",
			dataIndex: "image",
			key: "image",
			width: 100,
			render: (path, record) => (
				<div>
					<img src={path} alt={record.title} />
				</div>
			),
		},
		{
			title: "Title",
			dataIndex: "title",
			key: "title",
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
			render: (category) => category?.title,
		},
		{
			title: "Action",
			key: "action",
			render: (text, record) => (
				<Space size="middle">
					<div
						style={linkStyle}
						onClick={() => {
							handleEdit(record.slug);
						}}
					>
						Edit
					</div>
					<Link to="#" onClick={() => handleDelete(record._id)}>
						Delete
					</Link>
				</Space>
			),
		},
	];

	const loadProducts = () => {
		coreAxios
			.get("api/products")
			.then((res) => {
				setProducts(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleSubmit = (values) => {
		if (singleProduct) {
			coreAxios
				.put("api/products", values)
				.then((res) => {
					message.success("Product Updated Successfully");
					setAddOrUpdateModalVisibility(false);
					loadProducts();
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			coreAxios
				.post("api/products", values)
				.then((res) => {
					message.success("Product Added Successfully");
					setAddOrUpdateModalVisibility(false);
					loadProducts();
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	const handleEdit = (slug) => {
		coreAxios
			.get("/api/product", {
				params: {
					slug: slug,
				},
			})
			.then((res) => {
				setSingleProduct(res.data);
				setAddOrUpdateModalVisibility(true);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleDelete = (_id) => {
		coreAxios
			.delete("api/products", { data: { _id } })
			.then((res) => {
				message.info("Product Deleted Successfully");
				loadProducts();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div>
			<div className="flex justify-between items-center mb-5">
				<h1 className="text-2xl font-semibold">Products</h1>
				<Button
					type="primary"
					onClick={() => setAddOrUpdateModalVisibility(true)}
				>
					Create New Product
				</Button>
			</div>
			<Spin spinning={!products}>
				<Table dataSource={products} columns={columns} rowKey="_id" />
			</Spin>
			<AddOrUpdateModal
				isModalVisible={addOrUpdateModalVisibility}
				setIsModalVisible={(value) => {
					setSingleProduct();
					setAddOrUpdateModalVisibility(value);
				}}
				handleSubmit={handleSubmit}
				modalTitle="Add New Product"
				formItems={formItems}
				updateData={singleProduct}
			/>
		</div>
	);
}

const linkStyle = { color: "#40a9ff", cursor: "pointer" };
