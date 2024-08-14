import axios from "axios";
import "./App.css";
import { useEffect } from "react";

function App() {
  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api");
    console.log(response.data.fruits);
  };

  useEffect(() => {
    fetchAPI();
  },[]);
  return <>
  
    <div>
      <h1>HEWEE</h1>
    </div>
    </>;
}

export default App;
