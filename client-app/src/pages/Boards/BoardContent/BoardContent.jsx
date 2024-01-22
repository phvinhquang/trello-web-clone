import ListColumns from "./ListColumns/ListColumns";
import { mapOrder } from "~/utils/sortArray";
import {
  DndContext,
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
import { cloneDeep } from "lodash";

// Import Components from MUI
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { ContactSupportOutlined } from "@mui/icons-material";

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

  // Tạo data cho columns
  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, "_id"));
  }, [board]);

  // Hàm tìm column theo card id
  const findColumnByCardId = function (cardId) {
    return orderedColumns.find((column) =>
      column.cards.map((card) => card._id)?.includes(cardId)
    );
  };

  // Hàm xử lý sự kiện kéo thả
  const dragEndHandler = function (event) {
    //active là item được kéo, over là vị trí item được kéo đến cuối cùng
    const { active, over } = event;
    if (!over) return;

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      console.log("card dragging");
    }

    // KÉO THẢ COLUMN
    // Nếu sau khi kéo thả, vị trí không thay đổi thì không làm gì
    if (active.id === over.id) return;

    // Nếu có thay đổi về vị trí của COLUMN thì tiến hành thay đổi vị trí trong array
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

  const dragOverHandler = function (event) {
    // Nếu đang kéo Column thì không làm gì
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;

    const { active, over } = event;
    if (!over) return;
    const {
      id: activeCardId,
      data: { current: activeDraggingCardData },
    } = active;
    const { id: overCardId } = over;

    // Tìm và so sánh column bắt đầu và kết thúc
    const activeColumn = findColumnByCardId(activeCardId);
    const overColumn = findColumnByCardId(overCardId);
    if (!activeColumn || !overColumn) return;
    if (activeColumn._id === overColumn._id) return;

    setOrderedColumns((prev) => {
      // console.log(active);
      const overCardIndex = overColumn?.cards.findIndex(
        (card) => card._id === overCardId
      );

      // Tính toán vị trí cho index mới của card
      let newCardIndex;
      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height;
      const modifier = isBelowOverItem ? 1 : 0;
      newCardIndex =
        overCardIndex >= 0
          ? overCardIndex + modifier
          : overColumn?.cards?.length + 1;

      // Deep clone with Lodash
      // Xóa card ở column cũ và add vào column mới
      const nextColumns = cloneDeep(prev);
      const nextActiveColumn = nextColumns.find(
        (column) => column._id === activeColumn._id
      );
      const nextOverColumn = nextColumns.find(
        (column) => column._id === overColumn._id
      );

      if (nextActiveColumn) {
        // Xóa card khỏi column cũ
        nextActiveColumn.cards = nextActiveColumn.cards.filter(
          (card) => card._id !== activeCardId
        );
        // Cập nhật array cardOrderIds
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
          (card) => card._id
        );
      }
      if (nextOverColumn) {
        // Kiểm tra card đang kéo có tồn tại ở overColumn hay không, nếu có thì xóa
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card) => card._id !== activeCardId
        );

        // Thêm card đang kéo vào overColumn theo vị trí mới
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(
          newCardIndex,
          0,
          activeDraggingCardData
        );
        // Cập nhật array cardOrderIds
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
          (card) => card._id
        );
      }

      return nextColumns;
    });
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
      onDragOver={dragOverHandler}
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
