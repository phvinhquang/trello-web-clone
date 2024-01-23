import ListColumns from "./ListColumns/ListColumns";
import { mapOrder } from "~/utils/sortArray";
import { generatePlaceHolderCard } from "~/utils/helpers";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  pointerWithin,
  getFirstCollision,
} from "@dnd-kit/core";

import { arrayMove } from "@dnd-kit/sortable";
import Column from "./ListColumns/Column/Column";
import CardItem from "./ListColumns/Column/ListCards/Card/CardItem";
import { cloneDeep, isEmpty } from "lodash";

// Import Components from MUI
import { Box } from "@mui/material";
import { useEffect, useState, useCallback, useRef } from "react";

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
  CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD",
};

const BoardContent = function ({ board }) {
  const [orderedColumns, setOrderedColumns] = useState([]);
  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);
  const [originalColumn, setOriginalColumn] = useState(null);
  const lastOverId = useRef();

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

  // Hàm xử lý di chuyển card sang column khác
  const moveCardToDiffColumn = function (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeCardId,
    activeDragItemData
  ) {
    setOrderedColumns((prev) => {
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
          ? overCardIndex + modifier // Đang luôn vào dòng này
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

        // Thêm placholderCard nếu array cards rỗng
        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceHolderCard(nextActiveColumn)];
        }

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

        // Cập nhật column id mới cho card đang được kéo
        const updatedCardData = {
          ...activeDragItemData,
          columnId: nextOverColumn._id,
        };

        // Thêm card đang kéo vào overColumn theo vị trí mới
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(
          newCardIndex,
          0,
          updatedCardData
        );

        // Xóa placeholder card
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card) => !card.FE_placeholderCard
        );

        // Cập nhật array cardOrderIds
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
          (card) => card._id
        );
      }

      return nextColumns;
    });
  };

  // Xử lý bug trong collision detection
  // args = arguments :)
  const collisionDetectionStrategy = useCallback(
    (args) => {
      // Nếu kéo column thì dùng thuật toán mặc định
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN)
        return closestCorners({ ...args });

      // Tìm các điểm giao nhau với con trỏ
      const pointerIntersections = pointerWithin(args);
      if (pointerIntersections?.length === 0) return;

      // Trả về 1 array chứa các va chạm
      // const intersections =
      //   pointerIntersections?.length > 0
      //     ? pointerIntersections
      //     : rectIntersection(args);

      // Tìm overId đầu tiên trong pointerIntersections
      let overId = getFirstCollision(pointerIntersections, "id");
      if (overId) {
        const intersectedColumn = orderedColumns.find((c) => c._id === overId);
        if (!intersectedColumn) return;
        overId = closestCorners({
          ...args,
          droppableContainers: args.droppableContainers.filter(
            (container) =>
              container.id !== overId &&
              intersectedColumn?.cardOrderIds?.includes(container.id)
          ),
        })[0]?.id;

        lastOverId.current = overId;
        return [{ id: overId }];
      }

      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeDragItemType, orderedColumns]
  );

  // Xử lý sự kiện bắt đầu kéo thả
  // Lưu data của item được kéo thả vào state riêng
  const dragStartHandler = function (event) {
    setActiveDragItemId(event?.active?.id);
    setActiveDragItemData(event?.active?.data?.current);
    // Xác định xem đang kéo card hay column
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    );

    // Chỉ set State khi kéo card
    if (event?.active?.data?.current?.columnId) {
      setOriginalColumn(findColumnByCardId(event?.active?.id));
    }
  };

  // Xử lý sự kiện khi đang kéo thả
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

    moveCardToDiffColumn(
      overColumn,
      overCardId,
      active,
      over,
      activeColumn,
      activeCardId,
      activeDragItemData
    );
  };

  // Hàm xử lý kết thúc sự kiện kéo thả
  const dragEndHandler = function (event) {
    //active là item được kéo, over là vị trí item được kéo đến cuối cùng
    const { active, over } = event;
    if (!over || !active) return;

    // KÉO THẢ CARD
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const {
        id: activeCardId,
        data: { current: activeDraggingCardData },
      } = active;
      const { id: overCardId } = over;

      // Tìm và so sánh column bắt đầu và kết thúc
      const activeColumn = findColumnByCardId(activeCardId);
      const overColumn = findColumnByCardId(overCardId);
      if (!activeColumn || !overColumn) return;

      if (originalColumn._id !== overColumn._id) {
        // Kéo thả sang column khác
        moveCardToDiffColumn(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeCardId,
          activeDragItemData
        );
      } else {
        // Kéo card trong cùng column
        // Lấy vị trí cũ của active item
        const oldIndex = originalColumn?.cards?.findIndex(
          (c) => c._id === activeDragItemId
        );
        // Lấy vị trí mới
        const newIndex = overColumn?.cards?.findIndex(
          (c) => c._id === overCardId
        );
        // Đổi vị trí
        const dndOrderedCards = arrayMove(
          originalColumn?.cards,
          oldIndex,
          newIndex
        );

        // Cập nhật vị trí card trong column
        setOrderedColumns((prev) => {
          // Clone state cũ để mutate
          const copiedColumns = cloneDeep(prev);

          // Tìm column đang thực hiện kéo thả
          const currentColumn = copiedColumns.find(
            (c) => c._id === overColumn._id
          );
          currentColumn.cards = dndOrderedCards;
          currentColumn.cardOrderIds = dndOrderedCards.map((c) => c._id);

          return copiedColumns;
        });
      }
    }

    // KÉO THẢ COLUMN
    if (
      activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN &&
      // Nếu sau khi kéo thả, vị trí không thay đổi thì không làm gì
      active.id !== over.id
    ) {
      // Lấy vị trí cũ của active item
      const oldIndex = orderedColumns.findIndex((c) => c._id === active.id);
      // Lấy vị trí mới
      const newIndex = orderedColumns.findIndex((c) => c._id === over.id);
      // Đổi vị trí
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex);
      const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);
      setOrderedColumns(dndOrderedColumns);
    }

    // Set Active Item về null
    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
    setOriginalColumn(null);
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
      // Xử lý khi kéo 1 card kích thước lớn (có cover) sang column khác. Không có code sẽ không chạy
      // collisionDetection={closestCorners}
      collisionDetection={collisionDetectionStrategy}
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
