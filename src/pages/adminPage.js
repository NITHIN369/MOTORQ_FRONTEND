import { Button, FormControl, FormLabel, Input, VStack ,useToast} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import AdminNavBar from "../components/AdminNav";
function AdminPage(){
    const toast=useToast();
    const [event_name,setName]=useState("")
    const [description,setdes]=useState("")
    const [event_starttime,setTime]=useState("")
    const [event_stoptime,setStopTime]=useState("")
    const [lat,setLat]=useState()
    const [lon,setLon]=useState()
    const [Capacity,setCapacity]=useState()
    async function CreateEvent(){
        try{
            const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
          const { data } = await axios.post(
            "http://localhost:5000/events",
            {
              event_name,
              event_description: description,
              event_start_timestamp: event_starttime,
              event_end_timestamp: event_stoptime,
              Lat: lat,
              Lon: lon,
              event_capacity: Capacity,
            },
            config
          );
           toast({
             title: "Successfully Created Event",
             status: "success",
             duration: 2000,
             isClosable: true,
           });
        }catch(err){
            toast({
              title: "error: "+err,
              status: "error",
              duration: 2000,
              isClosable: true,
            });
        }
    }
    return (
      <><AdminNavBar/>
        <VStack className="topMargin">
          <FormControl isRequired>
            <FormLabel>Event Name</FormLabel>
            <Input
              type={"string"}
              placeholder="Enter event name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Event Description</FormLabel>
            <Input
              type={"string"}
              placeholder="Enter event description"
              onChange={(e) => {
                setdes(e.target.value);
              }}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Start time</FormLabel>
            <input
              type="datetime-local"
              onChange={(e) => {
                setTime(e.target.value);
              }}
            ></input>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Stop time</FormLabel>
            <input
              type="datetime-local"
              onChange={(e) => {
                setStopTime(e.target.value);
              }}
            ></input>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Lat</FormLabel>
            <Input type={"Number"} onChange={(e) => setLat(e.target.value)} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Lon</FormLabel>
            <Input type={"Number"} onChange={(e) => setLon(e.target.value)} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Event Capacity</FormLabel>
            <Input type={"Number"} onChange={(e) => setCapacity(e.target.value)} />
          </FormControl>
          <Button onClick={CreateEvent}>Create Event</Button>
        </VStack>
      </>
    );
}
export default AdminPage;