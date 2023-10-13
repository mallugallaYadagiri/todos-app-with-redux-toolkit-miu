import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Modal,
  Paper,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo, editTodo } from "./todosSlice";

function Todos() {
  const [taskStatus, setTaskStatus] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTaskText, setModalTaskText] = useState("");
  const [modalTaskStatus, setModalTaskStatus] = useState("incomplete");
  const [editTodoId, setEditTodoId] = useState(null);

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));

    if (storedTodos) {
      dispatch({ type: "todos/clear" });

      storedTodos.forEach((todo) => dispatch(addTodo(todo)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = todos.filter((todo) => {
    if (taskStatus === "all") {
      return true;
    } else if (taskStatus === "completed") {
      return todo.status === "completed";
    } else if (taskStatus === "incomplete") {
      return todo.status === "incomplete";
    }

    return true;
  });

  const handleModalOpen = (todo) => {
    setModalOpen(true);
    if (todo) {
      setModalTaskText(todo.text);
      setModalTaskStatus(todo.status);
      setEditTodoId(todo.id);
    }
  };
  const handleModalClose = () => {
    setModalOpen(false);
    setModalTaskText("");
    setModalTaskStatus("incomplete");
    setEditTodoId(null);
  };

  const handleAddTask = () => {
    if (editTodoId !== null) {
      dispatch(
        editTodo({
          id: editTodoId,
          text: modalTaskText,
          status: modalTaskStatus,
        })
      );
    } else {
      dispatch(addTodo({ text: modalTaskText, status: modalTaskStatus }));
    }

    handleModalClose();
  };

  const handleDeleteTask = (id) => {
    dispatch(removeTodo(id));
  };

  return (
    <Box
      sx={{
        border: "2px solid white",
        width: "45%",
        height: "auto",
        backgroundColor: "primary.light",
        borderRadius: "1em",
        m: 1,
      }}
    >
      <Typography
        variant="h4"
        textTransform="uppercase"
        color="white"
        sx={{ fontWeight: "bold" }}
        p={2}
      >
        Todos List
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={3}
      >
        <Button
          variant="contained"
          onClick={() => handleModalOpen(null)}
          color="success"
          sx={{ width: "10em", p: 1.5, fontSize: "1em", fontWeight: "bold" }}
        >
          Add Task
        </Button>
        <Stack width="25%">
          <TextField
            select
            fullWidth
            defaultValue="all"
            color="success"
            sx={{
              backgroundColor: "white",
              borderRadius: "0.5em",
            }}
            onChange={(e) => setTaskStatus(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="incomplete">Incomplete</MenuItem>
          </TextField>
        </Stack>
      </Box>
      {filteredTodos.map((todo) => (
        <Box
          key={todo.id}
          sx={{
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            m: 2,
            p: 0.5,
            borderRadius: "1em",
          }}
        >
          <Checkbox size="medium" checked={todo.status === "completed"} />
          <Typography
            variant="body1"
            flexGrow={1}
            textAlign="start"
            fontWeight="bold"
          >
            {todo.text}
          </Typography>
          <Stack sx={{ display: "flex", flexDirection: "row" }}>
            <Button onClick={() => handleDeleteTask(todo.id)}>
              <DeleteIcon fontSize="medium" color="error" />
            </Button>
            <Button onClick={() => handleModalOpen(todo)}>
              <EditIcon fontSize="medium" />
            </Button>
          </Stack>
        </Box>
      ))}

      <Modal open={modalOpen} onClose={handleModalClose}>
        <Paper
          sx={{
            position: "absolute",
            width: "25%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            p: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" textTransform="uppercase" fontWeight="bold">
            {editTodoId ? "Update Task" : "Add Task"}
          </Typography>
          {editTodoId ? (
            <TextField
              label="Task"
              fullWidth
              margin="normal"
              value={modalTaskText}
              onChange={(e) => setModalTaskText(e.target.value)}
            />
          ) : (
            <TextField
              label="Task"
              fullWidth
              margin="normal"
              value={modalTaskText}
              onChange={(e) => setModalTaskText(e.target.value)}
            />
          )}

          <TextField
            label="Status"
            select
            fullWidth
            margin="normal"
            value={modalTaskStatus}
            onChange={(e) => setModalTaskStatus(e.target.value)}
            defaultValue="incomplete"
          >
            <MenuItem value="incomplete">Incomplete</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </TextField>
          <Button
            variant="contained"
            sx={{
              width: "8em",
              mt: 2,
              p: 1.5,
              fontSize: "1em",
              fontWeight: "bold",
            }}
            onClick={handleAddTask}
          >
            {editTodoId ? "Update" : "Add"}
          </Button>
        </Paper>
      </Modal>
    </Box>
  );
}

export default Todos;
