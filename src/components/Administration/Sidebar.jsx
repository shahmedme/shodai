import React from "react";
import { Layout, Menu } from "antd";
import {
	DashboardOutlined,
	InboxOutlined,
	BookOutlined,
	TeamOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Sider } = Layout;
// const { SubMenu } = Menu;

export default function Sidebar({ collapsed, setCollapsed }) {
	const onCollapse = (collapsed) => {
		setCollapsed(collapsed);
	};

	return (
		<>
			<Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
				<div className="logo-wrapper">
					<img
						src="https://upload.wikimedia.org/wikipedia/en/d/de/Chaldal.com_logo.png"
						alt="logo"
						className="logo"
					/>
				</div>
				<Menu theme="dark" defaultSelectedKeys={["dashboard"]} mode="inline">
					<Menu.Item key="dashboard" icon={<DashboardOutlined />}>
						<Link to="/admin">Dashboard</Link>
					</Menu.Item>
					<Menu.Item key="products" icon={<InboxOutlined />}>
						<Link to="/admin/products">Products</Link>
					</Menu.Item>
					<Menu.Item key="orders" icon={<BookOutlined />}>
						<Link to="/admin/orders">Orders</Link>
					</Menu.Item>
					<Menu.Item key="users" icon={<TeamOutlined />}>
						<Link to="/admin/users">Users</Link>
					</Menu.Item>
				</Menu>
			</Sider>
			<style jsx>{`
				.logo-wrapper {
					height: 32px;
					margin: 16px 16px 12px;
				}

				.logo {
					height: 100%;
					width: auto;
				}
			`}</style>
		</>
	);
}
