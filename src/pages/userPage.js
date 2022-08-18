import contextAPI from "../contextAPI";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { Button, useToast, Input } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
function UserPage() {
  const { user } = useContext(contextAPI);
  const navigate = useNavigate();
  const toast = useToast();
  const [events, setEvents] = useState([]);
  const [inputText, setInputText] = useState("");
  const fetchEvents = async () => {
    const { data } = await axios.get(
      `http://localhost:5000/events`
    );
    setEvents(data);
  };
  //
  async function registerButton(e) {
    var { data } = await axios.post(
      `http://localhost:5000/events/${e}`,
      {user}
    );
    if (data.includes("You successfully registered for this Event your id")) {
      toast({
        title: "Successfully Registered",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      //   updateRegEvents();
    } else {
      toast({
        title: data,
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }
  }
  const textChanged = async (v) => {
    console.log("text changing");
    setInputText(v);
  };
  async function getResult(){
    const { data } = await axios.get(
      `http://localhost:5000/events?search=${inputText}`
    );
    setEvents(data);
  }
  useEffect(() => {
    if (!user) {
      navigate("/");
    } else if (user.isAdmin) {
      navigate("/admin");
    }
    fetchEvents();
    // updateRegEvents()
  }, []);
  return (
    <>
      <NavBar />
      {/* {regEvents.lenght>0 && <h1>You registered events</h1>}
      {regEvents.map(r=>{return (<div></div>)})} */}
      <div className="topMargin textBox">
        <Input sx={{width:300}}
          type={"text"}
          placeholder="Enter Name of Event"
          onChange={(e) => textChanged(e.target.value)}
        />
        <Button onClick={getResult}>Enter</Button>
      </div>
      <div className="OrderEvent">
        {events.map((e) => {
          return (
            <div className="child" key={e._id}>
              <h3>{e.event_name}</h3>
              <p>{e.event_description}</p>
              <h5>
                {e.event_start_timestamp} to {e.event_end_timestamp}
              </h5>
              <Button 
                onClick={() => {
                  registerButton(e._id);
                }}
              >
                Register
              </Button>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default UserPage;
