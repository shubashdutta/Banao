import React, { useEffect, useState } from "react";
import { Layout, Menu, theme } from "antd";
import { ChevronLeft } from "lucide-react";
import { AdminNavList } from "@/utils/AdminNavList";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Header from "./HeaderLayout";
import { ModalProvider } from "@/providers/ModalProvider";

const { Sider, Content } = Layout;

const AdminLayout = ({ children }: { children?: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [location.pathname]);

  const menuItems = AdminNavList?.map((item) => {
    const IconComponent = item.icon;

    let badgeElement = null;
    if (item.badge) {
      const isHighlighted = item.id === "providers" || item.id === "booking";
      badgeElement = (
        <span
          className={
            isHighlighted
              ? "bg-[#FF6B35] text-white text-xs py-0.5 font-semibold px-2 rounded-2xl shadow-sm" // text-sm को text-xs कर दिया गया है
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
        <div className="flex items-center justify-between pr-2 text-xs">
          <span>{item.label}</span>
          {badgeElement}
        </div>
      ) : (
        item.label
      ),
    };
  });

  // const menuItems = AdminNavList?.map((item) => {
  //   const IconComponent = item.icon;

  //   let badgeElement = null;
  //   if (item.badge) {
  //     const isHighlighted = item.id === "providers" || item.id === "booking";
  //     badgeElement = (
  //       <span
  //         className={
  //           isHighlighted
  //             ? "bg-[#FF6B35] text-white text-sm py-0.5 font-semibold px-2 rounded-2xl shadow-sm"
  //             : "bg-neutral-100 text-neutral-500 text-xs px-2 rounded-2xl font-semibold"
  //         }
  //       >
  //         {item.badge}
  //       </span>
  //     );
  //   }

  //   return {
  //     key: item.link || `/${item.id}`,
  //     icon: <IconComponent className="w-5 h-5" />,
  //     label: item.badge ? (
  //       <div className="flex items-center justify-between pr-2 text-xs">
  //         <span>{item.label}</span>
  //         {badgeElement}
  //       </div>
  //     ) : (
  //       item.label
  //     ),
  //   };
  // });

  return (
    <Layout style={{ minHeight: "100vh" }} hasSider>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        width={260}
        style={{
          height: "100vh",
          position: "sticky",
          top: 0,
          borderRight: "1px solid #f0f0f0",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            overflow: "hidden",
          }}
        >
          <div className="flex items-center justify-between px-6 py-5 shrink-0">
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

          {/* Scrollable menu area - scrollbar appears here when items overflow */}
          <div
            className="no-scrollbar"
            style={{
              flex: 1,
              overflowY: "auto",
              overflowX: "hidden",
              paddingBottom: 8,
            }}
          >
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
            <div className="shrink-0 p-3">
              <div className="p-3 bg-neutral-50 border border-neutral-200/60 rounded-2xl">
                <div className="flex justify-between items-center text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                  <span>Nepal Operations</span>
                  <span>v2.4.0</span>
                </div>
                <div className="text-xs font-semibold text-neutral-700 truncate">
                  Kathmandu / Pokhara / Lalitpur
                </div>
              </div>
            </div>
          )}
        </div>
      </Sider>

      <Layout>
        <div style={{ position: "sticky", top: 0, zIndex: 10 }}>
          <Header colorBgContainer={colorBgContainer} />
        </div>

        <Content
          style={{
            margin: "10px 6px 6px",
            padding: 16,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <ModalProvider>{children || <Outlet />}</ModalProvider>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
