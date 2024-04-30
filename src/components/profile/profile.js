"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { FaUserAlt } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Stack } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Profile({userSession}) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [arrow, setArrow] = React.useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setArrow(!arrow);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setArrow(false);
  };

  const handleLogOut = async () => {
    try {
      await localStorage.removeItem("access-token");
      await signOut({ redirect: false });
      await router.push("/login", { scroll: true });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{
              "&:hover": { backgroundColor: "success.light" },
              borderRadius: 2,
            }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              <FaUserAlt />
            </Avatar>

            <Box sx={{ display: { xs: "none", md: "block" } }} pl={1}>
              <Stack direction="row" variant="body2" spacing={2}>
                {userSession.user.name}
                {arrow ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </Stack>
              <Typography variant="caption" component="">
              {userSession.user.email}
              </Typography>
            </Box>
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          sx={{ display: { xs: "block", md: "none" } }}
          onClick={handleClose}
        >
          <Box sx={{ display: "flex" }}>
            <AccountCircleOutlinedIcon fontSize="large" sx={{ pr: 0.5 }} />
            <Box>
              <Typography sx={{ fontWeight: 750 }} spacing={2}>
                Super Admin
              </Typography>
              <Typography
                sx={{ fontSize: 10 }}
                variant="caption"
                component="caption"
              >
                admin@gmail.com
              </Typography>
            </Box>
          </Box>
        </MenuItem>
        {/* <MenuItem onClick={handleClose}>
          <AccountCircleOutlinedIcon fontSize="large" sx={{ pr: 0.5 }} /> My
          account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Badge badgeContent={4} color="info">
            <CircleNotificationsOutlinedIcon
              fontSize="large"
              sx={{ pr: 0.5 }}
            />{" "}
          </Badge>{" "}
          Notification
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem> */}
        <MenuItem onClick={handleLogOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
