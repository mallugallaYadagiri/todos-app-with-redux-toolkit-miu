import "./App.css";
import Todos from "../src/features/todos/Todos";
import { Box } from "@mui/material";
import { Provider } from "react-redux";
import store from "./app/store";

function App() {
  return (
    <Box
      className="App"
      sx={{
        backgroundColor: "primary.main",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Provider store={store}>
        <Todos />
      </Provider>
    </Box>
  );
}

export default App;
