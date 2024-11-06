import { useState } from "react";
import "./App.css";
import { v4 as uuid } from "uuid";

export default function App() {
  const [users, setUsers] = useState([]);
  const [buttonState, setButtonState] = useState("add");
  const [userInfo, setUserInfo] = useState({
    id: uuid(),
    name: "",
    age: "",
    email: "",
    phone: "",
  });

  console.log(users);

  const addData = () => {
    setUsers((currUser) => [...currUser, userInfo]);
    setUserInfo({
      id: uuid(),
      name: "",
      age: "",
      email: "",
      phone: "",
    });
    setButtonState("add");
  };

  const deletData = (id) => {
    setUsers((currUser) => {
      return currUser.filter((user) => user.id !== id);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((currInfo) => {
      console.log(e);
      return {
        ...currInfo,
        [name]: value,
      };
    });
  };

  const startEditing = (user) => {
    setUserInfo(user);
    setButtonState("edit");
  };

  const cancelEditing = () => {
    setUserInfo({
      id: uuid(),
      name: "",
      age: "",
      email: "",
      phone: "",
    });
    setButtonState("add");
  };

  const updateEditing = () => {
    setUsers((currUsers) => {
      return currUsers.map((user) => {
        if (user.id === userInfo.id) {
          return userInfo;
        }
        return user;
      });
    });
    cancelEditing();
  };

  return (
    <div className="App">
      <h1>React CRUD</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Enter a name"
          name="name"
          value={userInfo.name}
          onChange={handleChange}
        />
        <br />
        <input
          type="number"
          placeholder="Enter a age"
          name="age"
          value={userInfo.age}
          onChange={handleChange}
        />
        <br />
        <input
          type="email"
          placeholder="Enter a email"
          name="email"
          value={userInfo.email}
          onChange={handleChange}
        />
        <br />
        <input
          type="number"
          placeholder="Enter a phone"
          name="phone"
          value={userInfo.phone}
          onChange={handleChange}
        />
        <br />
        {buttonState === "add" ? (
          <button onClick={addData} disabled={!userInfo.name || !userInfo.age || !userInfo.email || !userInfo.phone}>
            Add
          </button>
        ) : (
          <div>
            <button onClick={updateEditing}>Update</button>
            <button onClick={cancelEditing}>Cancel</button>
          </div>
        )}
      </div>
      <div className="dataTable">
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Age</td>
              <td>Email</td>
              <td>Phone</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <button onClick={() => startEditing(user)}>Edit</button>

                    <button onClick={() => deletData(user.id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
