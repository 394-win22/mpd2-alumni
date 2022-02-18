import SignInButton from "./SignInButton";

import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import theme from "theme";

const Login = () => {
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            "url(https://ideas.ted.com/wp-content/uploads/sites/3/2018/11/featured_art_loosetouch_yifan_wu.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid
        backgroundColor="#f1b844"
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="%PUBLIC_URL%/logo.png"
            alt="The Hive Logo"
            sx={{ flexGrow: 1, paddingLeft: 1 }}
            style={{ height: "10em" }}
          />
          <Box component="form" sx={{ mt: 15, width: 200 }}>
            <SignInButton />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
