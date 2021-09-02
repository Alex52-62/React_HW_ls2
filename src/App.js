import "./App.css";
import { Message } from "./components/Message/index.js";
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [MessageList, setMessageList] = useState([]);
  const [value, setValue] = useState("");
  const [names,setNames] = useState(['Alex','Peter','John','Alan','Phil','Bryan','Boris']);
  const rand = Math.floor(Math.random() * names.length);

  useEffect (() => {
    console.log("App did mount");
    }, []);

  useEffect (() =>{
    if (MessageList[MessageList.length-1]?.author === 'Boris'){
      const timer = setTimeout(setMessageList(prevMessageList => [...prevMessageList,{text:<h4 style={{color: "red"}}>message from Bot!</h4>, author:'Bot in fact', id:`${Math.round(Math.random()*100)}`}]),1500);
      return () => clearTimeout(timer);
    };

  },[value,MessageList,names]);  

  const handleMessageList = () =>{
    setMessageList(prevMessageList => [...prevMessageList,{text:value, author:names[rand], id:`${Math.round(Math.random()*100)}`}]);

  };
  const handleChange = (e) =>{
    setValue(e.target.value)

  }
  const handleNames = () => {
    setNames(names => [...names,names[rand]])
    console.log(names[rand]);
  };

  return (
    <div className="App">
      <button type="button" className="btn btn-outline-success" onClick={handleMessageList}>Add message</button>
      <button type="button" className="btn btn-outline-info" onClick={handleNames}>Add name</button>
      <input value={value} onChange={handleChange} />
      {MessageList.map((message,id) => <Message key={id} text={message.text} author={message.author} id={message.id}/>)}
    </div>
  );
}

export default App;
