import React from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import {
  Typography,
  CardHeader,
  CardContent,
  Avatar,
  Card,
  Box,
} from "@mui/material/";
import { UserContext } from "components/LoggedIn";
import { makeStyles, useTheme } from "@mui/styles";
import CommentIcon from "@mui/icons-material/Comment";
const getUserDataFromUID = (uid, users) => {
  return users.find((user) => user.uid === uid);
};

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    "&:hover": {
      cursor: "pointer",
    },
    backgroundColor: theme.palette.foreground,
  },
  comment: {
    marginLeft: "10px",
    fontsize: "12px",
    color: "grey"
  }
}));

export default function Post({ post }) {
  const theme = useTheme();
  const classes = useStyles(theme);
  const navigate = useNavigate();
  const context = React.useContext(UserContext);
  const users = context.userList;
  const user = getUserDataFromUID(post.author, users);

  function getNumCommentsText(post) {
    if (!("numComments" in post)) return "0 Comments"
    const num = post.numComments;
    if (num === 0) return "0 Comments"
    else if (num === 1) return "1 Comment"
    else return `${num} Comments`
  }
  return (
    <Card
      className={classes.card}
      sx={{ m: 5 }}
      onClick={() => {
        navigate(`/post/${post.id}`);
      }}
    >
      <CardHeader
        align="left"
        avatar={<Avatar src={user.photoURL} aria-label="avatar" />}
        title={user.displayName}
        subheader={moment(post.time).format("MMMM Do YYYY, h:mm a")}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" align="left">
          {post.description}
        </Typography>
      </CardContent>
      <Box sx={{ display: "flex", m: 1 }}>
        <Typography className={classes.comment} variant="body2">
          {getNumCommentsText(post)}
        </Typography>
      </Box>
    </Card>
  );
}