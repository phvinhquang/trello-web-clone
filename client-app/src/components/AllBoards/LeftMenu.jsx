import Box from "@mui/material/Box";

import ShowChartIcon from "@mui/icons-material/ShowChart";

import LeftMenuItem from "./LeftMenuItem";
import Divider from "@mui/material/Divider";

export default function LeftMenu() {
  return (
    <Box
      sx={{
        width: "15vw",
        backgroundColor: "#ccc",
        maxWidth: "300px",
        minWidth: "150px",
      }}
    >
      <LeftMenuItem title="Boards" svg={true} />
      <LeftMenuItem title="Templates" svg={true} />
      <LeftMenuItem
        title="Home"
        icon={<ShowChartIcon sx={{ fontSize: "medium" }} />}
      />
      <Divider />
    </Box>
  );
}
