import React from "react";
import { Button } from "@mui/material";
import { baseUrl } from "./App";
function Toolbar(props) {
  let token = localStorage.getItem("token");

  const block = (id) => {
    console.log(id);
    fetch(`${baseUrl}/users/${id}/block`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((response) => {
        console.log(response);
        if (response.status === 403) {
          window.location.reload(false);
          localStorage.clear();
        }
        console.log("blocked");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const unblock = (id) => {
    fetch(`${baseUrl}/users/${id}/unblock`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((response) => {
        console.log(response);
        console.log("unblocked");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const deleteUser = (id) => {
    let options = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    if (token) {
      options.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    fetch(`${baseUrl}/users/${id}`, options)
      .then((response) => {
        console.log(response);
        console.log("deleted");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="toolbar">
      <Button
        onClick={() => {
          props.selected.forEach((item) => {
            block(item);
            props.forceUpdate();
          });
        }}
        variant="contained"
      >
        Block
      </Button>
      <Button
        onClick={() => {
          props.selected.forEach((item) => {
            unblock(item);
            props.forceUpdate();
          });
        }}
        variant="contained"
      >
        Unblock
      </Button>
      <Button
        onClick={() => {
          props.selected.forEach((item) => {
            deleteUser(item);
            props.forceUpdate();
          });
        }}
        variant="contained"
      >
        Delete
      </Button>
    </div>
  );
}

export default Toolbar;
