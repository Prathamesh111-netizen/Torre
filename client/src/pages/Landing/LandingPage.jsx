import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  InputBase,
  Card,
  CardContent,
  Grid,
  Paper,
  Container,
  Button,
} from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./LandingPage.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Avatar from "react-avatar";

const usersData = [
  { id: 1, username: "User 1" },
  { id: 2, username: "User 2" },
  { id: 3, username: "User 3" },
  { id: 4, username: "User 4" },
  // Add more user data here
];

function App() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [anchorEll, setAnchorEll] = useState(null);
  const [allrecentSearches, setAllRecentSearches] = useState([]);

  const handleProfileMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };
  const handlerecentMenuClick = (event) => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_SERVER}/api/search/recent`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setAllRecentSearches(res.data.recentQueries);
      });
    setAnchorEll(event.currentTarget);
  };

  const handlerecentMenuClose = () => {
    setAnchorEll(null);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchQuery === "") {
      setFilteredUsers([]);
      return;
    }
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_SERVER}/api/search?q=${searchQuery}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        setFilteredUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logout = () => {
    navigate("/login");
  };

  return (
    <div className="app-root">
      <AppBar position="static" className="app-bar">
        <Container>
          <Toolbar>
            <Typography variant="h6" className="title">
              Torre Search
            </Typography>

            <IconButton
              aria-label="Profile"
              color="inherit"
              onClick={handleProfileMenuClick}
            >
              <AccountCircleIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleProfileMenuClose}
            >
              <MenuItem onClick={handleProfileMenuClose}>My Profile</MenuItem>
              <MenuItem onClick={handleProfileMenuClose}>My Favorites</MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
      <Container>
        <div className="search-container">
          <div className="search-icon">{/* <SearchIcon /> */}</div>
          <InputBase
            placeholder="Search users by name"
            className="input-root input-input"
            onChange={handleSearchInputChange}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearchSubmit();
              }
            }}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          className="signup-button"
          onClick={handlerecentMenuClick}
          sx={{
            marginLeft: "32px",
          }}
        >
          Get Recent Searches
        </Button>
        <Menu
          anchorEl={anchorEll}
          open={Boolean(anchorEll)}
          onClose={handlerecentMenuClose}
        >
          {allrecentSearches.map((query, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                setSearchQuery(query.query);
                handleSearchSubmit();
                handlerecentMenuClose();
              }}
            >
              {query.query}
            </MenuItem>
          ))}
        </Menu>
        <Grid container className="user-container">
          {filteredUsers.map((user) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
              <Paper elevation={3} className="app-card">
                <Card>
                  <CardContent className="card-content">
                    <Avatar color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])} name={user.username} value="86%" size="60" round="20px" />
                    <Typography variant="h5" sx={{marginLeft:"2rem"}}>{user.username}</Typography>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
