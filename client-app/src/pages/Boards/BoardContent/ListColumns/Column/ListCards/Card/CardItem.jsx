// Components from MUI
import { Box, Typography, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

// Import Icons from MUI
import GroupIcon from "@mui/icons-material/Group";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import AttachmentIcon from "@mui/icons-material/Attachment";

const CardItem = function () {
  return (
    <Card
      sx={{
        cursor: "pointer",
        boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.2)",
        overflow: "unset",
      }}
    >
      <CardMedia
        sx={{ height: 140 }}
        image="https://c4.wallpaperflare.com/wallpaper/448/174/357/neon-4k-hd-best-for-desktop-wallpaper-preview.jpg"
        title="green iguana"
      />
      <CardContent
        sx={{
          padding: 1.5,
          "&:last-child": {
            padding: 1.5,
          },
        }}
      >
        <Typography sx={{ textAlign: "left" }}>Some Card</Typography>
      </CardContent>
      <CardActions sx={{ padding: "0 4px 8px 4px" }}>
        <Button size="small" startIcon={<GroupIcon />}>
          20
        </Button>
        <Button size="small" startIcon={<ModeCommentIcon />}>
          15
        </Button>
        <Button size="small" startIcon={<AttachmentIcon />}>
          10
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardItem;
