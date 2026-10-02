// import React, { useState } from "react";
// import { Layout, Menu, theme } from "antd";
// import {
//   ChevronLeft,
//   Search,
//   Command,
//   Bell,
//   ShieldCheck,
//   Menu as MenuIcon,
// } from "lucide-react";
// import { AdminNavList } from "@/utils/AdminNavList";

// const { Header, Sider, Content } = Layout;

// const DashboardPage = ({ children }: { children?: React.ReactNode }) => {
//   const [collapsed, setCollapsed] = useState(false);
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();

//   const menuItems = AdminNavList?.map((item) => {
//     const IconComponent = item.icon;

//     let badgeElement = null;
//     if (item.badge) {
//       const isHighlighted = item.id === "providers" || item.id === "booking";
//       badgeElement = (
//         <span
//           className={
//             isHighlighted
//               ? "bg-[#FF6B35] text-white text-sm py-0.5    font-semibold  px-2  rounded-2xl shadow-sm"
//               : "bg-neutral-100 text-neutral-500 text-xs px-2  rounded-2xl font-semibold"
//           }
//         >
//           {item.badge}
//         </span>
//       );
//     }

//     return {
//       key: item.id,
//       icon: <IconComponent className="w-5 h-5" />,
//       label: item.badge ? (
//         <div className="flex items-center justify-between pr-2">
//           <span>{item.label}</span>
//           {badgeElement}
//         </div>
//       ) : (
//         item.label
//       ),
//     };
//   });

//   return (
//     <Layout style={{ minHeight: "100vh" }}>
//       <Sider
//         trigger={null}
//         collapsible
//         collapsed={collapsed}
//         theme="light"
//         width={260}
//         style={{
//           borderRight: "1px solid #f0f0f0",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "space-between",
//         }}
//       >
//         <div>
//           <div className="flex items-center justify-between px-6 py-5">
//             {!collapsed && (
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 bg-[#FF6B35] rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md shadow-orange-500/30">
//                   B
//                 </div>
//                 <span className="font-extrabold text-xl tracking-wider text-neutral-900">
//                   BANAO
//                 </span>
//               </div>
//             )}
//             <button
//               onClick={() => setCollapsed(!collapsed)}
//               className="text-neutral-400 hover:text-neutral-600 transition-colors"
//             >
//               <ChevronLeft
//                 className={` cursor-pointer w-5 h-5 transition-transform duration-300 ${
//                   collapsed ? "rotate-180" : ""
//                 }`}
//               />
//             </button>
//           </div>

//           <Menu
//             theme="light"
//             mode="inline"
//             defaultSelectedKeys={["dashboard"]}
//             style={{ borderRight: 0, fontWeight: 500 }}
//             items={menuItems}
//           />
//         </div>

//         {!collapsed && (
//           <div className="p-3 m-3 bg-neutral-50 border border-neutral-200/60 rounded-2xl">
//             <div className="flex justify-between items-center text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
//               <span>Nepal Operations</span>
//               <span>v2.4.0</span>
//             </div>
//             <div className="text-xs font-semibold text-neutral-700 truncate">
//               Kathmandu / Pokhara / Lalitpur
//             </div>
//           </div>
//         )}
//       </Sider>

//       <Layout>
//         <Header
//           style={{
//             padding: "0 32px",
//             background: colorBgContainer,
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             borderBottom: "1px solid #f0f0f0",
//             height: 72,
//           }}
//         >
//           <div className="flex items-center">
//             <div className="relative w-80 shrink-0">
//               <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="h-10 w-full rounded-full border border-neutral-200/80 bg-neutral-50/80 pl-11 pr-14 text-sm text-neutral-800 placeholder-neutral-400 transition-all focus:border-[#FF6B35] focus:bg-white focus:outline-none"
//               />
//               <kbd className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded-md border border-neutral-300/50 bg-neutral-200/60 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-neutral-500">
//                 <Command className="h-3 w-3" />
//                 <span>K</span>
//               </kbd>
//             </div>
//           </div>

//           <div className="flex items-center gap-5">
//             <div className="flex items-center gap-2 px-3.5 py-1.5 bg-neutral-50 border border-neutral-200/80 rounded-full text-xs font-semibold text-neutral-700 shadow-sm">
//               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
//               <span>Online</span>
//             </div>

//             <button className="relative p-2.5 bg-neutral-50 border border-neutral-200/80 rounded-full text-neutral-600 hover:bg-neutral-100 transition-colors shadow-sm">
//               <Bell className="w-4 h-4" />
//               <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full ring-2 ring-white"></span>
//             </button>

//             <div className="h-6 w-[1px] bg-neutral-200"></div>

//             <div className="flex items-center gap-3 cursor-pointer">
//               <div className="relative">
//                 <img
//                   src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
//                   alt="Binod Pokhrel"
//                   className="w-10 h-10 rounded-full object-cover border border-neutral-200 shadow-sm"
//                 />
//                 <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
//               </div>
//               <div className="flex flex-col text-left">
//                 <div className="flex items-center gap-1">
//                   <span className="text-sm font-bold text-neutral-900">
//                     Binod Pokhrel
//                   </span>
//                   <ShieldCheck className="w-4 h-4 text-orange-500 fill-orange-500/10" />
//                 </div>
//                 <span className="text-xs text-neutral-400 font-medium">
//                   Super Admin
//                 </span>
//               </div>
//             </div>
//           </div>
//         </Header>

//         <Content
//           style={{
//             margin: "10px 6px",
//             padding: 24,
//             minHeight: 280,
//             background: colorBgContainer,
//             borderRadius: borderRadiusLG,
//           }}
//         >
//           {children || "Dashboard Content Here"}
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default DashboardPage;

import React from "react";

const DashboardPage = () => {
  return <div>hey</div>;
};

export default DashboardPage;
