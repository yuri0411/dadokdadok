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
      <div style={{ width: "43rem", padding: 20 }}>wrapper</div>
      <div style={{ width: "43rem", height: "100%", overflowY: "scroll", background: "white" }}>
        <div id="content-root" style={{ position: "relative", height: "100%" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
