import TodoList from "./Components/TodoList";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { TodosContext } from "./Contexts/TodoContext";
import { purple } from "@mui/material/colors";
const theme = createTheme({
  typography: {
    fontFamily: ["A"],
  },
  palette: {
    primary: {
      main: purple[300],
    },
  },
});
const initodos = [
  {
    id: uuidv4(),
    title: "Todo 1",
    details: "dsgfsadkfsdafads",
    completed: false,
  },
  {
    id: uuidv4(),
    title: "Todo 2",
    details: "dsgfsadkfsdafads",
    completed: false,
  },
  {
    id: uuidv4(),
    title: "Todo 3",
    details: "dsgfsadkfsdafads",
    completed: false,
  },
];
function App() {
  const [todos, setTodos] = useState(initodos);
  return (
    <ThemeProvider theme={theme}>
      <div
        className="app"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "#44445a",
          textAlign: "center",
          direction: "rtl",
        }}
      >
        <TodosContext.Provider value={{ todos, setTodos }}>
          <TodoList />
        </TodosContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
