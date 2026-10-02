import React, { useState } from "react";
import { Layout, Menu, theme } from "antd";
import { ChevronLeft } from "lucide-react";
import { AdminNavList } from "@/utils/AdminNavList";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Header from "./HeaderLayout";

const { Sider, Content } = Layout;

const AdminLayout = ({ children }: { children?: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = AdminNavList?.map((item) => {
    const IconComponent = item.icon;

    let badgeElement = null;
    if (item.badge) {
      const isHighlighted = item.id === "providers" || item.id === "booking";
      badgeElement = (
        <span
          className={
            isHighlighted
              ? "bg-[#FF6B35] text-white text-sm py-0.5 font-semibold px-2 rounded-2xl shadow-sm"
              : "bg-neutral-100 text-neutral-500 text-xs px-2 rounded-2xl font-semibold"
          }
        >
          {item.badge}
        </span>
      );
    }

    return {
      key: item.link || `/${item.id}`,
      icon: <IconComponent className="w-5 h-5" />,
      label: item.badge ? (
        <div className="flex items-center justify-between pr-2">
          <span>{item.label}</span>
          {badgeElement}
        </div>
      ) : (
        item.label
      ),
    };
  });

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        width={260}
        style={{
          borderRight: "1px solid #f0f0f0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div className="flex items-center justify-between px-6 py-5">
            {!collapsed && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FF6B35] rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md shadow-orange-500/30">
                  B
                </div>
                <span className="font-extrabold text-xl tracking-wider text-neutral-900">
                  BANAO
                </span>
              </div>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              <ChevronLeft
                className={`cursor-pointer w-5 h-5 transition-transform duration-300 ${
                  collapsed ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          <Menu
            theme="light"
            mode="inline"
            selectedKeys={[location?.pathname]}
            onClick={({ key }) => navigate(key)}
            style={{ borderRight: 0, fontWeight: 500 }}
            items={menuItems}
          />
        </div>

        {!collapsed && (
          <div className="p-3 m-3 bg-neutral-50 border border-neutral-200/60 rounded-2xl">
            <div className="flex justify-between items-center text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
              <span>Nepal Operations</span>
              <span>v2.4.0</span>
            </div>
            <div className="text-xs font-semibold text-neutral-700 truncate">
              Kathmandu / Pokhara / Lalitpur
            </div>
          </div>
        )}
      </Sider>

      <Layout>
        <Header colorBgContainer={colorBgContainer} />

        <Content
          style={{
            margin: "10px 6px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
