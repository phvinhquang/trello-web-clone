import ListColumns from "./ListColumns/ListColumns";
import { mapOrder } from "~/utils/sortArray";
import {
  DndContext,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import Column from "./ListColumns/Column/Column";
import CardItem from "./ListColumns/Column/ListCards/Card/CardItem";

// Import Components from MUI
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
  CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD",
};

const BoardContent = function ({ board }) {
  const [orderedColumns, setOrderedColumns] = useState([]);
  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 250, tolerance: 500 },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, "_id"));
  }, [board]);

  // Hàm xử lý sự kiện kéo thả Column
  const dragEndHandler = function (event) {
    //active là item được kéo, over là vị trí item được kéo đến cuối cùng
    const { active, over } = event;
    if (!over) return;

    // Nếu sau khi kéo thả, vị trí không thay đổi thì không làm gì
    if (active.id === over.id) return;

    // Nếu có thay đổi về vị trí thì tiến hành thay đổi vị trí trong array
    // Lấy vị trí cũ của active item
    const oldIndex = orderedColumns.findIndex((c) => c._id === active.id);
    // Lấy vị trí mới
    const newIndex = orderedColumns.findIndex((c) => c._id === over.id);
    // Đổi vị trí
    const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex);
    const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);
    setOrderedColumns(dndOrderedColumns);

    // Set Active Item về null
    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
  };

  const dragStartHandler = function (event) {
    // Xác định xem đang kéo card hay column
    setActiveDragItemId(event?.active?.id);
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    );
    setActiveDragItemData(event?.active?.data?.current);
  };

  // Hiệu ứng khi thả item (drop)
  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.5",
        },
      },
    }),
  };

  return (
    <DndContext
      onDragStart={dragStartHandler}
      onDragEnd={dragEndHandler}
      sensors={sensors}
    >
      <Box
        sx={{
          backgroundColor: "primary.main",
          paddingBottom: "5px",
          width: "100%",
          height: (theme) => theme.customVars.boardContentHeight,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
        }}
      >
        <ListColumns columns={orderedColumns} />
        <DragOverlay dropAnimation={dropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
            <Column column={activeDragItemData} />
          )}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
            <CardItem card={activeDragItemData} />
          )}
        </DragOverlay>
      </Box>
    </DndContext>
  );
};

export default BoardContent;
