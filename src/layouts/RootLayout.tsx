import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "43rem", padding: 20 }}></div>
      <div style={{ width: "43rem", padding: 20 }}>
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
