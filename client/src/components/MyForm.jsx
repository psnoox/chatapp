import React, { useState, useRef, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { socket } from "../socket";
import {Room} from '../utils/api';
import EmojiPicker from "emoji-picker-react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import Tooltip from "@mui/material/Tooltip";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Snackbar from "@mui/material/Snackbar";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Stack from "@mui/material/Stack";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import LogoutIcon from "@mui/icons-material/Logout";
import TextField from "@mui/material/TextField";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MuiAlert from "@mui/material/Alert";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "#121212" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export function MyForm({roomId}) {
  const [value, setValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [valid, setValid] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (roomId === undefined) return;
    else {
      Room(roomId).then((data) => {
        console.log(data.data.valid)
        setValid(data.data.valid)
      })
    }
  }, [])
  function onSubmit(event) {
    event.preventDefault();
    if(value.length < 1) return;
    setIsLoading(true);
    const v = {
      message: value,
      user: user,
      room: roomId
    };
    socket.timeout(500).emit("new-message", v, () => {
      setIsLoading(false);
    });
    setValue("")
  }
  const [ShowEmojiBar, setShowEmojiBar] = useState(false);
  if(valid === false || !roomId) return null;
  else
  return (
    <>
      {ShowEmojiBar ? <EmojiPicker theme="dark" /> : null}
      <form onSubmit={onSubmit}>
        <Grid container spacing={1} justifyContent="center" sx={{pb:1,pt:1, bgcolor: "rgba(255, 255, 255, 0.09)", maxWidth: '100%'}}>
          <Grid item xs={7} sm={8} md={10}>
            <TextField
              hiddenLabel
              id="outlined-multiline-flexible"
              label="Message"
              multiline
              maxRows={1}
              size="small"
              sx={{ width: "100%" }}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </Grid>
          <Grid item xs={0} sm={2} md={1}>
            <Button
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
              disabled={value ? false:true}
              sx={{ width: "100%", height: "100%" }}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
