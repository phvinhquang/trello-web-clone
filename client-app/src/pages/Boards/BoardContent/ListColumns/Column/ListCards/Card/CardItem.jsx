import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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

const CardItem = function ({ card }) {
  // DndKit
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card._id,
    data: { ...card },
    animateLayoutChanges: () => false,
  });

  const dndKitCardStyles = {
    touchAction: "none",
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? "1px solid #2ecc71" : undefined,
  };

  const showCardActions =
    card.memberIds?.length > 0 ||
    card.comments?.length > 0 ||
    card.attachments?.length > 0;

  return (
    <Card
      ref={setNodeRef}
      style={dndKitCardStyles}
      {...attributes}
      {...listeners}
      sx={{
        cursor: "pointer",
        boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.2)",
        overflow: "unset",
        display: card?.FE_placeholderCard ? "none" : "block",
        border: "1px solid transparent",
        "&:hover": { borderColor: (theme) => theme.palette.primary.light },
      }}
    >
      {card.cover && (
        <CardMedia
          sx={{ height: 140 }}
          image={card.cover}
          // title="green iguana"
        />
      )}

      <CardContent
        sx={{
          padding: 1.5,
          "&:last-child": {
            padding: 1.5,
          },
        }}
      >
        <Typography sx={{ textAlign: "left" }}>{card?.title}</Typography>
      </CardContent>
      {showCardActions && (
        <CardActions sx={{ padding: "0 4px 8px 4px" }}>
          {card?.memberIds.length > 0 && (
            <Button size="small" startIcon={<GroupIcon />}>
              {card.memberIds.length}
            </Button>
          )}
          {card?.comments.length > 0 && (
            <Button size="small" startIcon={<ModeCommentIcon />}>
              {card.comments.length}
            </Button>
          )}
          {card?.attachments.length > 0 && (
            <Button size="small" startIcon={<AttachmentIcon />}>
              {card.attachments.length}
            </Button>
          )}
        </CardActions>
      )}
    </Card>
  );
};

export default CardItem;
