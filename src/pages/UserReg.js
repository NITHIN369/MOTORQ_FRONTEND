import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import contextAPI from "../contextAPI";
import axios from "axios";
import NavBar from "../components/NavBar";
function UserReg() {
  const navigate = useNavigate();
  const [regEvents, setRegEvents] = useState([]);
  const { user, setUser } = useContext(contextAPI);
  async function updateRegEvents() {
    setUser(JSON.parse(localStorage.getItem("user")).user);
    console.log("user: ", JSON.parse(localStorage.getItem("user")).user._id);
    let { data } = await axios.get(
      `http://localhost:5000/events/user/${
        JSON.parse(localStorage.getItem("user")).user._id
      }`
    );
    console.log("data: ", JSON.stringify(data));
    setRegEvents(data);
  }
  useEffect(() => {
    if (!user) {
      navigate("/");
    } else if (user.isAdmin) {
      navigate("/admin");
    }
    updateRegEvents();
  }, []);
  return (
    <>
      <NavBar />
      <div className="topMargin">
        {regEvents.length == 0 && (
          <h2>Opps You didnt registered for events yet</h2>
        )}
        {regEvents.lenght > 0 && <h2>You Registered events</h2>}
        {regEvents.map((e) => {
          return (
            <div>
              <h2>{e.event_name}</h2>

              <p>{e.event_description}</p>
              <h5>
                {e.event_start_timestamp} to {e.event_end_timestamp}
              </h5>
              <h5>Code: </h5>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default UserReg;
