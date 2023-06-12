import React, { useState, useEffect, useRef } from "react";
import {useNavigate} from 'react-router-dom';
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CreateIcon from "@mui/icons-material/Create";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { socket } from "../socket";
import { styled } from "@mui/material/styles";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export function Events({ events, roomId, openJoin, setOpenJoin, openCreate, setOpenCreate }) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState();
  const listRef = useRef(null);
  useEffect(() => {
    if (roomId === undefined) return;
    else {
      socket.emit("chat-history", roomId);
      socket.on("chat-empty", (msg) => {});
      socket.on("chat-history-res", (messages) => {
        setMessages(messages);
      });
    }
  }, []);
  if (!messages)
    return (
      <>
        <Box sx={{ flexGrow: 1, px: 0, maxWidth: "98%", height: "85vh" }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            justifyContent={{ md: "center", sm: "center", xs: "center" }}
          >
            <Grid xs={10} sm={10} md={2}>
              <Item sx={{ pt: 5, pb: 5, cursor: 'pointer' }} onClick={() => setOpenCreate(!openCreate)}>
                <Stack spacing={2} alignItems={"center"}>
                  <Avatar
                    sx={{
                      width: 70,
                      height: 70,
                      bgcolor:
                        "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
                      fontSize: "5vh",
                    }}
                  >
                    <CreateIcon />
                  </Avatar>
                  <Typography>CREATE ROOM</Typography>
                </Stack>
              </Item>
            </Grid>
            <Grid xs={10} sm={10} md={2}>
              <Item sx={{ pt: 5, pb: 5, cursor: 'pointer' }} onClick={() => setOpenJoin(!openJoin)}>
                <Stack spacing={2} alignItems={"center"}>
                  <Avatar
                    sx={{
                      width: 70,
                      height: 70,
                      bgcolor:
                        "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
                      fontSize: "5vh",
                    }}
                  >
                    <AddCircleIcon />
                  </Avatar>
                  <Typography>JOIN ROOM</Typography>
                </Stack>
              </Item>
            </Grid>
            <Grid xs={10} sm={10} md={2}>
              <Item sx={{ pt: 5, pb: 5, cursor: 'pointer' }} onClick={() => navigate("/profile")}>
                <Stack spacing={2} alignItems={"center"}>
                  <Avatar
                    sx={{
                      width: 70,
                      height: 70,
                      bgcolor:
                        "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
                      fontSize: "5vh",
                    }}
                  >
                    <AccountCircleIcon />
                  </Avatar>
                  <Typography>VIEW PROFILE</Typography>
                </Stack>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </>
    );
  else
    return (
      <>
        <Box
          sx={{
            flexGrow: 1,
            overflow: "auto",
            px: 0,
            maxWidth: "100%",
            height: "85vh",
            paddingLeft: 2
          }}
          className="scrollBar"
        >
          {messages.map((message) => (
            <>
              <Item
                sx={{
                  my: 1,
                  p: 1,
                  width: "fit-content",
                  maxWidth: "60%",
                  height: "fit-content",
                  borderRadius: 2,
                }}
              >
                <Stack spacing={1} direction="row" alignItems="start">
                  <Avatar
                    sx={{
                      bgcolor: message.author.avatar
                    }}
                  >
                    {message.author.name.toUpperCase().slice(0, 2)}
                  </Avatar>
                  <Stack direction="column">
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography align="left" color="rgba(255, 255, 255, 0.5)">
                        {message.author.name}
                      </Typography>
                      <Typography
                        align="left"
                        color="rgba(255, 255, 255, 0.2)"
                        sx={{ fontSize: 12 }}
                      >
                        {message.date}
                      </Typography>
                    </Stack>
                    <Typography align="left" sx={{ wordWrap: "break-word" }}>
                      {message.message}
                    </Typography>
                  </Stack>
                </Stack>
              </Item>
            </>
          ))}
          {events.map((event) => (
            <Item
              sx={{
                my: 1,
                p: 1,
                width: "fit-content",
                maxWidth: "60%",
                height: "fit-content",
                borderRadius: 2,
              }}
            >
              <Stack spacing={1} direction="row" alignItems="center">
                <Avatar sx={{ bgcolor: event.author.avatar }}>
                  {event.author.name.toUpperCase().slice(0, 2)}
                </Avatar>
                <Stack direction="column">
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography align="left" color="rgba(255, 255, 255, 0.5)">
                      {event.author.name}
                    </Typography>
                    <Typography
                      align="left"
                      color="rgba(255, 255, 255, 0.2)"
                      sx={{ fontSize: 12 }}
                    >
                      {event.date}
                    </Typography>
                  </Stack>
                  <Typography align="left" sx={{ wordWrap: "break-word" }}>
                    {event.message}
                  </Typography>
                </Stack>
              </Stack>
            </Item>
          ))}
          <div id="l" ref={listRef}></div>
        </Box>
      </>
    );
}
