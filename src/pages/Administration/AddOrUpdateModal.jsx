import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input, Upload, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const layout = {
	labelCol: { span: 5 },
	wrapperCol: { span: 19 },
};

const normFile = (e) => {
	if (Array.isArray(e)) {
		return e;
	}
	return e && e.fileList;
};

export default function AddOrUpdateModal({
	isModalVisible,
	setIsModalVisible,
	modalTitle,
	formItems,
	updateData,
	handleSubmit,
}) {
	const [form] = Form.useForm();

	useEffect(() => {
		form.setFieldsValue(updateData);
	}, [updateData]);

	const getUploader = (idx) => (
		<Form.Item
			key={idx}
			name="upload"
			label="Upload"
			valuePropName="fileList"
			getValueFromEvent={normFile}
		>
			<Upload name="logo" action="/upload.do" listType="picture">
				<Button icon={<UploadOutlined />}>Click to upload</Button>
			</Upload>
		</Form.Item>
	);

	const getSelect = ({ item, idx }) => (
		<Form.Item key={idx} name={item.name} label={item.label} rules={item.rules}>
			<Select placeholder={item.placeholder}>
				{item.data?.map((option, idx) => (
					<Select.Option key={idx} value={option.value}>
						{option.title}
					</Select.Option>
				))}
			</Select>
		</Form.Item>
	);

	return (
		<div>
			<Modal
				title={modalTitle}
				visible={isModalVisible}
				onCancel={() => {
					form.resetFields();
					setIsModalVisible(false);
				}}
				footer={null}
			>
				<Form
					{...layout}
					form={form}
					onFinish={(values) => {
						form.resetFields();
						handleSubmit(values);
					}}
				>
					{formItems.map((item, idx) =>
						item?.type === "file" ? (
							getUploader({ idx })
						) : item.type === "select" ? (
							getSelect({ item, idx })
						) : (
							<Form.Item
								key={idx}
								label={item.label}
								name={item.name}
								style={{ marginBottom: 10 }}
								rules={item.rules}
								hidden={item.hidden}
							>
								<Input placeholder={item.placeholder} />
							</Form.Item>
						)
					)}
					<div className="flex justify-end">
						<Form.Item>
							<Button htmlType="submit" style={{ width: 100 }}>
								{updateData ? "Update" : "Add"}
							</Button>
						</Form.Item>
					</div>
				</Form>
			</Modal>
		</div>
	);
}
