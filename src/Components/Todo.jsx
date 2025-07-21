import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { useContext } from "react";
import { TodosContext } from "../Contexts/TodoContext";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
function Todo({ todo }) {
  const [updatedtodo, setupdatedtodo] = useState({
    title: todo.title,
    details: todo.details,
  });
  const [showeditdialog, setshoweditdialog] = useState(false);
  const [showdeletedialog, setshowdeletedialog] = useState(false);
  const { todos, setTodos } = useContext(TodosContext);
  function handlecheckclick() {
    setTodos([...todos, (todos.completed = "true")]);
    const updatedtodo = todos.map((t) => {
      if (t.id == todo.id) {
        t.completed = !t.completed;
      }
      return t;
    });
    setTodos(updatedtodo);
    localStorage.setItem("todos", JSON.stringify(updatedtodo));
  }
  function handeldeleteconfirm() {
    const updatedtodo = todos.filter((t) => {
      return t.id != todo.id;
    });
    setTodos(updatedtodo);
    localStorage.setItem("todos", JSON.stringify(updatedtodo));
  }
  function handelupdatechanges() {
    const updatedtodos = todos.map((t) => {
      if (t.id == todo.id) {
        return {
          ...t,
          title: updatedtodo.title,
          details: updatedtodo.details,
        };
      } else {
        return t;
      }
    });
    setTodos(updatedtodos);
    setshoweditdialog(false);
    localStorage.setItem("todos", JSON.stringify(updatedtodos));
  }
  return (
    <>
      <Dialog
        open={showdeletedialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onClose={() => {
          setshowdeletedialog(false);
        }}
        style={{ direction: "rtl" }}
      >
        <DialogTitle id="alert-dialog-title">"حذف ؟"</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            هل انت متاكد من انك تريد حذف المهمة ؟
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setshowdeletedialog(false);
            }}
          >
            لا
          </Button>
          <Button autoFocus onClick={handeldeleteconfirm}>
            نعم
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showeditdialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onClose={() => {
          setshoweditdialog(false);
        }}
        style={{ direction: "rtl" }}
      >
        <DialogTitle id="alert-dialog-title">تعديل</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="عنوان المهمة"
            type="title"
            fullWidth
            variant="standard"
            value={updatedtodo.title}
            onChange={(e) => {
              setupdatedtodo({ ...updatedtodo, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="details"
            name="details"
            label="تفاصيل المهمة"
            type="details"
            fullWidth
            variant="standard"
            value={updatedtodo.details}
            onChange={(e) => {
              setupdatedtodo({ ...updatedtodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setshoweditdialog(false);
            }}
          >
            لا
          </Button>
          <Button autoFocus onClick={handelupdatechanges}>
            نعم
          </Button>
        </DialogActions>
      </Dialog>
      <Card
        className="todocard"
        sx={{
          minWidth: 275,
          background: "#dcaee2",
          color: "#44445a",
          marginTop: 5,
        }}
      >
        <CardContent>
          <Grid container spacing={2} sx={{ textAlign: "right" }}>
            <Grid size={8}>
              <Typography
                variant="h6"
                sx={{
                  textDecoration:
                    todo.completed == true ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography variant="h7" sx={{ fontFamily: "A" }}>
                {todo.details}
              </Typography>
            </Grid>
            <Grid
              size={4}
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <IconButton
                onClick={() => {
                  handlecheckclick();
                }}
                sx={{
                  color: "green",
                  background: todo.completed ? "" : "#44445a",
                  border: "solid green 3px",
                }}
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                sx={{
                  color: "#3d5fff",
                  background: "#44445a",
                  border: "solid #3d5fff 3px",
                }}
                onClick={() => {
                  setshoweditdialog(true);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                sx={{
                  color: "red",
                  background: "#44445a",
                  border: "solid red 3px",
                }}
                onClick={() => {
                  setshowdeletedialog(true);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default Todo;
