import ContentLayout from "@/layouts/ContentLayout.tsx";

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
      <div style={{ width: "43rem", height: "100%", overflowY: "scroll" }}>
        <ContentLayout />
      </div>
    </div>
  );
};

export default RootLayout;
