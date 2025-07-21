import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Todo from "./Todo";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useContext } from "react";
import { useEffect } from "react";
import { TodosContext } from "../Contexts/TodoContext";

export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);
  const [titleinput, settitleinput] = useState("");
  const [displaytodostype, setdisplaytodostype] = useState("all");
  const comptodos = todos.filter((t) => {
    return t.completed;
  });
  const notcomptodos = todos.filter((t) => {
    return !t.completed;
  });
  let todostoberendered = todos;
  if (displaytodostype == "completed") {
    todostoberendered = comptodos;
  } else if (displaytodostype == "non-completed") {
    todostoberendered = notcomptodos;
  } else {
    todostoberendered = todos;
  }
  const todosjsx = todostoberendered.map((t) => {
    return <Todo key={t.id} todo={t} />;
  });

  useEffect(() => {
    const storagedtodos = JSON.parse(localStorage.getItem("todos"));
    if (Array.isArray(storagedtodos)) {
      setTodos(storagedtodos);
    }
  }, [setTodos]);
  function changedisplaytype(e) {
    setdisplaytodostype(e.target.value);
  }
  function handleaddclick() {
    const newtodo = {
      id: uuidv4(),
      title: titleinput,
      details: "",
      completed: false,
    };
    const updatedtodos = [...todos, newtodo];
    setTodos(updatedtodos);
    settitleinput("");

    localStorage.setItem("todos", JSON.stringify(updatedtodos));
  }

  return (
    <Container maxWidth="sm">
      <Card
        sx={{ minWidth: 275 }}
        style={{ maxHeight: "80vh", overflow: "auto" }}
      >
        <CardContent>
          <Typography sx={{ color: "#bc67d5" }} variant="h3">
            قائمة المهام
          </Typography>
          <Divider />
          <ToggleButtonGroup
            exclusive
            aria-label="text alignment"
            style={{
              direction: "ltr",
              marginTop: "30px",
              background: "#dcaee2",
            }}
            value={displaytodostype}
            onChange={changedisplaytype}
          >
            <ToggleButton value="non-completed">غير المنجز</ToggleButton>
            <ToggleButton value="completed">المنجز</ToggleButton>
            <ToggleButton value="all">الكل </ToggleButton>
          </ToggleButtonGroup>

          {todosjsx}
          <Grid container spacing={2} sx={{ textAlign: "right" }}>
            <Grid size={8}>
              <TextField
                label=" مهمة جديدة "
                color="secondary"
                sx={{ width: "100%", marginTop: "25px" }}
                value={titleinput}
                onChange={(e) => {
                  settitleinput(e.target.value);
                }}
              />
            </Grid>
            <Grid
              size={4}
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  marginTop: "20px",
                  height: "65px",
                  background: "#bc67d5",
                }}
                onClick={() => handleaddclick()}
                disabled={titleinput.length == 0}
              >
                اضافة
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
