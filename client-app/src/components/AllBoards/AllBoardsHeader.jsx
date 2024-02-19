import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import LockIcon from "@mui/icons-material/Lock";

export default function AllBoardsHeader() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <div
          style={{
            height: "60px",
            width: "60px",
            fontSize: 35,
            borderRadius: "4px",
            background: " #cc4223",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          Y
        </div>

        <Box>
          <Typography variant="h5" sx={{ ml: 3, fontWeight: 500 }}>
            Your Workspace
            <ModeEditIcon
              sx={{
                fontSize: "medium",
                ml: 1,
                ":hover": {
                  cursor: "pointer",
                  backgroundColor: "#bbb",
                  borderRadius: "3px",
                },
              }}
            />
          </Typography>

          <Typography
            sx={{
              textAlign: "left",
              ml: 3,
              display: "flex",
              alignItems: "center",
            }}
          >
            <LockIcon sx={{ fontSize: "small", mr: 0.5 }} />
            Private
          </Typography>
        </Box>
      </Box>

      <Divider />
    </>
  );
}
