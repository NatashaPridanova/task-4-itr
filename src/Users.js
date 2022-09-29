import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Toolbar from "./Toolbar";
import { baseUrl } from "./App";


const Checkbox = ({ id, type, name, handleClick, isChecked }) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      onChange={handleClick}
      checked={isChecked}
    />
  );
};

const Users = () => {
  const [users, setUsers] = React.useState([]);
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  let token = localStorage.getItem("token");
console.log('rerendering');
  const getUsers = async () => {
    let options = {};
    if (token) {
      options.headers = {
        Authorization: `Bearer ${token}`
      }
    }
    const response = await fetch(`${baseUrl}/users`, options);
    const users = await response.json();
    console.log(users);
    setUsers(users);
    forceUpdate();
  };
  const columns = [
    { id: "_id", label: "Id", minWidth: 170 },
    { id: "name", label: "Name", minWidth: 100 },
    {
      id: "email",
      label: "Email",
      minWidth: 170,
    },
    {
      id: "lastLoginTime",
      label: "Last login time",
      minWidth: 170,
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "registrationTime",
      label: "Registration time",
      minWidth: 170,
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "status",
      label: "Status",
      minWidth: 170,
    },
  ];

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);
  useEffect(() => {
    setList(users);
  }, [list]);

  const handleSelectAll = (e) => {
    console.log(isCheckAll)
    setIsCheckAll(!isCheckAll);
    setIsCheck(users.map((li) => li._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  console.log(isCheck);

  function StickyHeadTable() {
    return (
      <>
      <p>{!token ? 'Авторизуйтесь, чтобы иметь доступ к таблице с пользователями' : 'Таблица управления пользователями'}</p>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    type="checkbox"
                    name="selectAll"
                    id="selectAll"
                    handleClick={handleSelectAll}
                    isChecked={isCheckAll}
                  />
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={user._id}>
                    <Checkbox
                      color="primary"
                      type="checkbox"
                      name={user.name}
                      id={user._id}
                      handleClick={handleClick}
                      isChecked={isCheck.includes(user._id)}
                    />
                    {columns.map((column) => {
                      const value = user[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          id={column.id}
                          align={column.align}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      </>
    );
  }
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      <Toolbar selected={isCheck || []} forceUpdate={()=>{getUsers()}} />
      <StickyHeadTable />
    </>
  );
};
export default Users;
