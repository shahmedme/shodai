import { Layout, Menu, Dropdown } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Administration/Sidebar";

const { Header, Content } = Layout;

export default function AdminLayout({ children }) {
	const [collapsed, setCollapsed] = useState(false);

	return (
		<>
			<Layout style={{ minHeight: "100vh" }}>
				<Sidebar {...{ collapsed, setCollapsed }} />
				<Layout className="site-layout">
					<HeaderContent />
					<Content style={{ margin: "16px" }}>
						<div
							className="site-layout-background"
							style={{ padding: 24, minHeight: 360 }}
						>
							{children}
						</div>
					</Content>
				</Layout>
			</Layout>
			<style>{`
				.site-layout-background {
					background: white;
				}

				.ant-modal-close:focus {
					outline: none;
				}
			`}</style>
		</>
	);
}

function HeaderContent() {
	return (
		<Header className="header">
			<Dropdown overlay={menu} trigger={["click"]}>
				<button className="text-gray-200 ml-auto block focus:outline-none">
					<span className="material-icons pt-5" style={{ fontSize: 25 }}>
						account_circle
					</span>
				</button>
			</Dropdown>
		</Header>
	);
}

const menu = (
	<Menu>
		<Menu.Item key="profile">
			<Link to="/profile">Profile</Link>
		</Menu.Item>
		<Menu.Item key="settings">
			<Link to="/settings">Settings</Link>
		</Menu.Item>
		<Menu.Divider />
		<Menu.Item key="logout">
			<Link to="/logout">Logout</Link>
		</Menu.Item>
	</Menu>
);
