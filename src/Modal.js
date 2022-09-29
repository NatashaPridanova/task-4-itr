import * as React from "react";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import { baseUrl } from "./App";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let userName = "";
  let userPassword = "";
  let userEmail = "";
  const signIn = () => {
    fetch(`${baseUrl}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        localStorage.setItem("token", json.token);
        console.log(json);
        console.log("signed in");
        handleClose();
        window.location.reload(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const signUp = async () => {
    console.log(userName);
    console.log(userEmail);
    console.log(userPassword);

    return fetch(`${baseUrl}/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userName,
        email: userEmail,
        password: userPassword,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        handleClose();
        console.log("signed up");
        console.log(json);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <Button onClick={handleOpen}>Авторизация</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div id="modalAuth" className="auth-modal">
            <div className="modal-content">
              <input
                type="radio"
                id="register"
                name="view"
                className="input-view"
              />
              <input
                type="radio"
                id="signin"
                name="view"
                defaultChecked
                className="input-view"
              />

              <div id="views">
                <div className="register-view">
                  <form
                    className="register-form"
                    action="#"
                    onSubmit={() => false}
                  >
                    <div className="input-group">
                      <TextField
                        id="name-reg"
                        onChange={(e) => {
                          userName = e.target.value;
                        }}
                        label="Имя пользователя"
                        variant="outlined"
                        required
                      />
                    </div>
                    <div className="input-group">
                      <TextField
                        id="email-reg"
                        onChange={(e) => {
                          userEmail = e.target.value;
                        }}
                        label="Электронная почта"
                        variant="outlined"
                        required
                        type="email"
                      />
                    </div>
                    <div className="input-group">
                      <TextField
                        id="password-reg"
                        onChange={(e) => {
                          userPassword = e.target.value;
                        }}
                        label="Пароль"
                        variant="outlined"
                        required
                        type="password"
                        minLength="1"
                      />
                      <span className="error-message"></span>
                    </div>
                    <div className="modal-footer">
                      <Button
                        onClick={() => {
                          Promise.resolve(signUp()).then(() => {
                            signIn();
                          });
                        }}
                        variant="contained"
                        className="waves-effect waves-green btn-flat yellow register-btn"
                      >
                        Зарегистрироваться
                      </Button>
                    </div>
                  </form>
                  <label htmlFor="signin">
                    <p className="auth-header auth-header-log">
                      Уже есть аккаунт?{" "}
                      <span className="auth-header-accent">Войти</span>
                    </p>
                  </label>
                </div>

                <div className="signin-view blue-text text-darken-2">
                  <form
                    className="login-form"
                    action="#"
                    onSubmit={() => false}
                  >
                    <div className="input-group">
                      <TextField
                        id="email-log"
                        onChange={(e) => {
                          userEmail = e.target.value;
                        }}
                        label="Электронная почта"
                        variant="outlined"
                        required
                        type="email"
                      />
                    </div>
                    <div className="input-group">
                      <TextField
                        id="password-log"
                        onChange={(e) => {
                          userPassword = e.target.value;
                        }}
                        label="Пароль"
                        variant="outlined"
                        required
                        type="password"
                        minLength="1"
                      />
                    </div>
                    <div className="modal-footer">
                      <Button
                        onClick={() => signIn()}
                        variant="contained"
                        className="waves-effect waves-green btn-flat yellow login-btn"
                      >
                        Войти
                      </Button>
                    </div>
                  </form>
                  <label htmlFor="register">
                    <p className="auth-header auth-header-reg">
                      Нет аккаунта?{" "}
                      <span className="auth-header-accent">
                        Зарегистрироваться
                      </span>
                    </p>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
