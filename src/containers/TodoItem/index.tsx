import {
  Box,
  TableCell,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ReorderIcon from "@mui/icons-material/Reorder";
import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import { DataItem, Status } from "./model";
import { format } from "date-fns";

interface TodoItemContainerModel {
  draggableProvided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  item: DataItem;
  onHandleEdit: (item: DataItem) => void;
  onHandleDelete: (item: DataItem ) => void;
}

function TodoItemContainer(props: TodoItemContainerModel) {
  const { draggableProvided, snapshot, item, onHandleEdit, onHandleDelete } = props;
  return (
    <TableRow
      ref={draggableProvided.innerRef}
      {...draggableProvided.draggableProps}
      style={{
        ...draggableProvided.draggableProps.style,
        background: snapshot.isDragging ? "rgba(245,245,245, 0.75)" : "none",
      }}
    >
      <TableCell align="left">
        <div {...draggableProvided.dragHandleProps}>
          <ReorderIcon />
        </div>
      </TableCell>
      <TableCell data-testid="item-title">{item.title}</TableCell>
      <TableCell data-testid="item-short-description">{item.shortDescription}</TableCell>
      <TableCell data-testid="item-assigned-to">{item.assignedTo?.name}</TableCell>
      <TableCell data-testid="item-due-date">{format(item.dueDate, "dd/MM/yyyy")}</TableCell>
      <TableCell data-testid="item-status">{item.status == Status.closed ? "close" : "open"}</TableCell>
      <TableCell>
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <EditIcon sx={{ cursor: "pointer" }} onClick={() => onHandleEdit(item)}/>
          <DeleteIcon sx={{ cursor: "pointer" }} onClick={() => onHandleDelete(item)}/>
        </Box>
      </TableCell>
    </TableRow>
  );
}

export default TodoItemContainer;
