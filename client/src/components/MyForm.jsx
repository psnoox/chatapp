import React, { useState, useRef, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { socket } from "../socket";
import {Room} from '../utils/api';
import EmojiPicker from "emoji-picker-react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
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
        <Grid container spacing={1} justifyContent="center" sx={{pt:1, bgcolor: "rgba(255, 255, 255, 0.09)", maxWidth: '100%', margin: 0}}>
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
