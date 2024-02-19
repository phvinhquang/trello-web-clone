import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import ShowChartIcon from "@mui/icons-material/ShowChart";

import LeftMenuItem from "./LeftMenuItem";
import LeftMenuWorkspaces from "./LeftMenuWorkspaces";

export default function LeftMenu() {
  return (
    <Box
      sx={{
        width: "20vw",
        // border: "1px solid #ccc",
        maxWidth: "300px",
        minWidth: "150px",
        height: "100vh",
        flex: 1,
      }}
    >
      <LeftMenuItem title="Boards" svg={true} />
      <LeftMenuItem title="Templates" svg={true} />
      <LeftMenuItem
        title="Home"
        icon={<ShowChartIcon sx={{ fontSize: "medium" }} />}
      />
      <Divider />

      <LeftMenuWorkspaces />
    </Box>
  );
}
