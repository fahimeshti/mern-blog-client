 import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import Popup from "../../components/popup/Popup";
import { axiosInstance } from "../../config";

export default function Settings() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const { user, dispatch } = useContext(Context);


  const handleDelete = async () => {
      
      try {
        await axiosInstance.delete(`/users/${user._id}`, {
          data: { userId: user._id },
        });
        dispatch({ type: "LOGOUT" });
        window.location.replace("/");
      } catch (err) {
        console.log(err);
      }
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    if (username && email && password) {
      setErrorMsg(false)
      const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
      };
      if (file) {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        updatedUser.profilePic = filename;
        try {
          await axiosInstance.post("/upload", data);
        } catch (err) {}
      }
      try {
        const res = await axiosInstance.put("/users/" + user._id, updatedUser);
        setSuccess(true);
        dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      } catch (err) {
        dispatch({ type: "UPDATE_FAILURE" });
      }

  } else {
    setErrorMsg(true)
  }
};
  const closePopup = () => {
    setShowPopup(false)
  }
  return (
    <div className="settings">
      <div className="settingsWrapper">
        {showPopup && <Popup closePopup={closePopup} handleDelete={handleDelete} />}
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle" onClick={()=>setShowPopup(true)}>Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : process.env.REACT_APP_PF+user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder='********'
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmit" type="submit">
            Update
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}
          {errorMsg && (
            <span
              style={{ color: "red", textAlign: "center", marginTop: "20px" }}
            >
              Fill in all the inputs.
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
