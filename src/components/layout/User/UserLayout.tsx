import React from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { Profile } from "@/pages/User/Profile";

const { Content, Footer, Sider } = Layout;

const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  UserOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

const UserLayout: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  return (
    <Layout className="h-[100vh]">
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <section className="flex flex-col justify-between">
          <div>
            <div className="flex h-16 items-center justify-center">
              <span className="text-sm font-black tracking-[0.16em] text-white">
                KINETIC
              </span>
            </div>{" "}
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["4"]}
              items={items}
            />
          </div>
          <div>
            <Button
              variant="outline"
              className="w-fit border-red-600 bg-transparent text-red-500 hover:bg-red-300/30 m-4"
              onClick={() => {
                localStorage.removeItem("kinetic-session");
                navigate("/");
              }}
            >
              Sign out
            </Button>
          </div>
        </section>
      </Sider>
      <Layout>
        <Content style={{ margin: "24px 16px 0" }}>
          <div className="overflow-auto">
            <Profile />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{currentYear} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default UserLayout;
