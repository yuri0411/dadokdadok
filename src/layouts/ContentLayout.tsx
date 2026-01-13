import { Outlet, useNavigate } from "react-router-dom";
import { Typography } from "@/components";
import { BiArrowBack } from "react-icons/bi";

const ContentLayout = () => {
  const navigate = useNavigate();

  return (
    <div style={{ background: "white", height: "100%" }}>
      <header>
        <Typography as="h1">다독다독</Typography>
        <Typography as="a" onClick={() => navigate(-1)}>
          <BiArrowBack />
        </Typography>
      </header>
      <Outlet />
    </div>
  );
};

export default ContentLayout;
