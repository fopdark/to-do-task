import { Container, Paper } from "@mui/material";
import HeaderComponent from "../components/Header";
import { TodoListContainer } from "../containers/TodoList";
import { todoTasksData } from "../ultils/MockupData";

function TodoList() {
  
  return (
    <Container>
      <Paper style={{ padding: 10 }}>
        <HeaderComponent title={"To Do Task"}/>
        <TodoListContainer items={todoTasksData} />
      </Paper>
    </Container>
  );
}

export default TodoList;
