import { useState } from "react";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    role: "Admin",
  });
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Viewer" },
  ]);

  const closeModal = () => {
    setFormData({});
    setIsAddEditModalOpen(false);
  };

  const handleAdd = () => {
    setCurrentUser(null);
    setFormData({ id: "", name: "", email: "", role: "Admin" });
    setIsAddEditModalOpen(true);
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    debugger;
    setFormData((prev) => ({
      ...prev,
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }));
    setIsAddEditModalOpen(true);
  };

  const handleDelete = (userId) => {
    let currUsers = [...users];
    let filteredUsers = currUsers.filter((user) => user.id !== userId);
    setUsers(filteredUsers);
  };

  const handleEmailUpdate = (e) => {
    setFormData((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  };

  const handleNameUpdate = (e) => {
    setFormData((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const handleRoleUpdate = (e) => {
    setFormData((prev) => ({
      ...prev,
      role: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const currUsers = [...users];
    if (currentUser) {
      let finalUsers = currUsers.map((user) =>
        currentUser?.id === user.id ? formData : user,
      );
      setUsers(finalUsers);
    } else {
      debugger;
      let currFormData = { ...formData };
      currFormData.id = Date.now();
      let finalUsers = [currFormData, ...currUsers];
      setUsers(finalUsers);
    }

    setFormData({});
    setIsAddEditModalOpen(false);
  };
  return (
    <div className="page-container">
      <div className="page-header">
        <div>User content</div>
        <div>
          <button className="add-user" onClick={handleAdd}>
            Add User
          </button>
        </div>
      </div>
      <div className="table">
        <div className="table-row table-header">
          <div className="cell">Name</div>
          <div className="cell">Email</div>
          <div className="cell">Role</div>
          <div className="cellActions">Action</div>
        </div>
        {users && users.length > 0 ? (
          users.map((user) => {
            return (
              <div key={user.id} className="table-row">
                <div className="cell">{user.name}</div>
                <div className="cell">{user.email}</div>
                <div className="cell">{user.role}</div>
                <div className="cellActions">
                  <button className="btn-edit" onClick={() => handleEdit(user)}>
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div style= {{ padding: '15px'}}>No Users found.</div>
        )}
      </div>
      {isAddEditModalOpen && (
        <div className="modal-container">
          <div className="modal-popup">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name: </label>
                <input
                  value={formData.name}
                  onChange={(e) => handleNameUpdate(e)}
                />
              </div>
              <div className="form-group">
                <label>Email: </label>{" "}
                <input
                  value={formData.email}
                  onChange={(e) => handleEmailUpdate(e)}
                />
              </div>
              <div className="form-group">
                <label>Role:</label>
                <select
                  value={formData.role}
                  onChange={(e) => handleRoleUpdate(e)}
                >
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>
              <div style={{ padding: '20px 0px'}}>
              <button style={{ marginRight: '10px'}} onClick={closeModal}>Close</button>
              <button type="submit">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
