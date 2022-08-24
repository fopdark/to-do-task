import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  ResponderProvided,
  DraggableProvided,
  DroppableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TodoItemContainer from "../TodoItem";
import { DataItem } from "../TodoItem/model";
import TodoFormContainer from "../TodoForm";
import ConfirmDelete from "../ConfirmDelete";

const defaultTask = {
  id: "",
  title: "",
  shortDescription: "",
  assignedTo: undefined,
  dueDate: new Date(),
  status: "1",
}

export const TodoListContainer: React.FC<{ items: DataItem[] }> = ({
  items,
}) => {
  const [localItems, setLocalItems] = useState<Array<DataItem>>(items);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [formData, setFormData] = useState<DataItem>(defaultTask);
  const [taskId, setTaskId] = useState<string>("");

  const handleDragEnd = (result: DropResult, provided?: ResponderProvided) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    setLocalItems((prev: any) => {
      const temp = [...prev];
      const d = temp[result.destination!.index];
      temp[result.destination!.index] = temp[result.source.index];
      temp[result.source.index] = d;

      return temp;
    });
  };

  const onHandleEdit = (item: DataItem) => {
    setFormData(item);
    setOpenForm(true);
  };

  const onHandleSubmit = (dataItem: DataItem) => {
    if (dataItem.id) {
      onUpdateTask(dataItem);
    } else {
      onCreateTask(dataItem);
    }
    setOpenForm(false);
  };

  const onCreateTask = (dataItem: DataItem) => {
    const localItemsTmp = [...localItems];
    dataItem.id = Date.now().toString();
    localItemsTmp.push(dataItem);
    setLocalItems(localItemsTmp);
  };

  const onUpdateTask = (dataItem: DataItem) => {
    const localItemsTmp = [...localItems];
    const indexOfObject = localItemsTmp.findIndex((object: any) => {
      return object.id === dataItem.id;
    });
    localItemsTmp.splice(indexOfObject, 1, dataItem);
    setLocalItems(localItemsTmp);
  };

  const onHandleDelete = (item: DataItem) => {
    setTaskId(item.id);
    setOpenConfirm(true);
  };

  const onHandleConfirm = (id: string) => {
    const localItemsTmp = [...localItems];
    const indexOfObject = localItemsTmp.findIndex((object: DataItem) => {
      return object.id === id;
    });
    localItemsTmp.splice(indexOfObject, 1);
    setLocalItems(localItemsTmp);
    setOpenConfirm(false);
  };

  useEffect(() => {
    console.log("localItems", localItems)
  },[localItems])

  const handleClickAdd = () => {
    setFormData(defaultTask);
    setOpenForm(true);
  }

  return (
    <>
      <TodoFormContainer
        open={openForm}
        data={formData}
        handleSubmit={(dataItem: DataItem) => onHandleSubmit(dataItem)}
        handleClose={() => setOpenForm(false)}
      />
      <ConfirmDelete
        taskId={taskId}
        open={openConfirm}
        handleSubmit={(id: string) => onHandleConfirm(id)}
        handleClose={() => setOpenConfirm(false)}
      />
      <Button variant="outlined" onClick={() => handleClickAdd()}>Add new task</Button>
      <TableContainer>
        <Table>
          <colgroup>
            <col style={{ width: "5%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "30%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "5%" }} />
            <col style={{ width: "10%" }} />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell align="left">&nbsp;</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Short Description</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable" direction="vertical">
              {(droppableProvided: DroppableProvided) => (
                <TableBody
                  ref={droppableProvided.innerRef}
                  {...droppableProvided.droppableProps}
                >
                  {localItems.map((item: DataItem, index: number) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(
                        draggableProvided: DraggableProvided,
                        snapshot: DraggableStateSnapshot
                      ) => {
                        return (
                          <TodoItemContainer
                            draggableProvided={draggableProvided}
                            snapshot={snapshot}
                            item={item}
                            onHandleEdit={onHandleEdit}
                            onHandleDelete={onHandleDelete}
                          />
                        );
                      }}
                    </Draggable>
                  ))}
                  {droppableProvided.placeholder}
                </TableBody>
              )}
            </Droppable>
          </DragDropContext>
        </Table>
      </TableContainer>
    </>
  );
};
