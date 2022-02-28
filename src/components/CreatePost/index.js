import { useState, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Stack,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Chip,
  MenuItem,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { RichTextEditor } from '@mantine/rte';

import { createPostInFirebase } from "utilities/posts.js";
import { useUserState, uploadPhotoToStorage } from "utilities/firebase.js";
import { UserContext } from 'components/LoggedIn'
import { createNotification } from "utilities/notifications";

const useStyles = makeStyles({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: "40px 24px 40px 24px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    "& .MuiTextField-root": { my: 1, width: "100%" },
  },
});

const postTagNames = [
  "Ethnography",
  "Market Research",
  "Brainstorming",
  "Idea Convergence",
  "Prototyping",
  "Engineering/Design",
  "Materials Selection",
  "Business Modeling",
  "Story/Presentation"
];



const topicTags = [
  { id: 1, value: 'JavaScript' },
  { id: 2, value: 'TypeScript'  },
  { id: 3, value: 'Ruby'  },
  { id: 4, value: 'Python'  },
];


const CreatePost = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext)

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState('<p>Enter post detail here. Type @ or # to see mentions autocomplete</p>');
  const [postTags, setPostTags] = useState([]);

  const user = useUserState();


  const classes = useStyles();

  const handlePostTagsChange = (event) => {
    const {
      target: { value },
    } = event;
    setPostTags(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const people = context.userList.map((u) => { return { id: u.uid, value: u.displayName }; });

  const handleSubmit = async (e) => {
    const postId = createPostInFirebase({
      title: title,
      tags: postTags,
      description: description,
      time: Date.now(),
      author: user.uid,
      numComments: 0,
    });
    

    // add mentioned to notification
    var el = document.createElement('html');
    el.innerHTML = description;
    var mentionSpans = el.getElementsByClassName("mention");

    mentionSpans && Array.from(mentionSpans).forEach(function (mentionSpan) {
      if (mentionSpan.getAttribute("data-denotation-char") === "@") {
        createNotification(mentionSpan.getAttribute("data-id"), user.uid, postId, "click to check the post", "mention");
        console.log("postId", postId);
      }
    });

    setTitle("");
    setDescription("");
    navigate("/");
  };

  const mentions = useMemo(
    () => ({
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ['@', '#'],
      source: (searchTerm, renderList, mentionChar) => {
        const list = mentionChar === '@' ? people : topicTags;
        const includesSearchTerm = list.filter((item) =>
          item.value.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        // limit the items in list to 5
        renderList(includesSearchTerm.slice(0, 5));
      },
    }),
    []
  );

  const handleImageUpload = (file) => uploadPhotoToStorage(file);

  


  return (
    <Box className={classes.container}>
      <Typography align="center" variant="h4" sx={{ mb: 3 }}>
        Create Post
      </Typography>
      <Box className={classes.form}>
        <TextField
          margin="normal"
          label="Title"
          value={title}
          variant="outlined"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          autoComplete="off"
        />

        <FormControl sx={{ mt: 1, width: "100%" }}>
          <InputLabel>Tags</InputLabel>
          <Select
            multiple
            value={postTags}
            onChange={handlePostTagsChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {postTagNames.map((tags) => (
              <MenuItem key={tags} value={tags}>
                {tags}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <RichTextEditor
          value={description}
          onChange={setDescription}
          placeholder="Type @ or # to see mentions autocomplete"
          mentions={mentions}
          onImageUpload={handleImageUpload}
          style={{ marginTop: "12px", width: "100%" }}
        />


        <Stack spacing={2} direction="row" sx={{ mt: 3 }}>
          <Button
            variant="contained"
            style={{ backgroundColor: "#808080" }}
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button variant="contained" type="submit" onClick={handleSubmit}>
            Post
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default CreatePost;
