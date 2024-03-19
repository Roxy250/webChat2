import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { Container, Grid } from '@mui/material';
import Header from '../components/chat/Header';
import Sidebar from '../components/chat/Sidebar';
import Mainbar from '../components/chat/Mainbar';
import SendMessageForm from '../components/chat/SendMessageForm';

const socket = io('http://localhost:3000');

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(location.state);
  const [users, setUsers] = useState([]);
  const [fetch, setFetch] = useState(true);
  const [msges, setMsges] = useState([]);
  const messagesEndRef = useRef(null);

  const logout = (userId) => {
    axios.post('http://localhost:3000/api/user/logout', { user_id: userId })
      .then(response => {
        console.log(response.data.message);
      })
      .catch(error => {
        console.error('Error occurred:', error);
      });
    setUsers(prevUsers => prevUsers.filter(u => u.user_id !== userId));
    setUser(null);
    navigate('/login');
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const send = (message) => {
    console.log(message);
    socket.emit('send_message', message, user.user_id, user.room_id, user.username);
  }

  useEffect(() => {
    socket.emit('Join', user?.room_id, user?.username);
    axios.post('http://localhost:3000/api/message/getmessage', { room_id: user?.room_id })
      .then(response => {
        setMsges(response.data.messages);
        scrollToBottom(); // Scroll to bottom after messages are fetched
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
      });
  }, [fetch]);

  useEffect(() => {
    socket.on('receive_message', () => {
      setFetch(prev => !prev);
    });
    return () => {
      socket.off('receive_message');
    }
  }, []);

  useEffect(() => {
    axios
      .post('http://localhost:3000/api/user/getall', { room_id: user?.room_id })
      .then((response) => {
        if (response.data.users) {
          setUsers(response.data.users);
        } else {
          console.log(response.data.message);
        }
      });
  }, [users]);

  return (
    <div style={{ backgroundColor: "black", height: "100vh" }}>
      <Container maxWidth="xl" style={{ height: "100%", overflow: "hidden" }}>
        <Grid container spacing={0} style={{ height: "100%" }}>
          {/* Header */}
          <Grid item xs={12}>
            <Header user={user} logout={logout} />
          </Grid>

          {/* Sidebar - Users List */}
          <Grid item xs={12} sm={3} md={2} lg={2} xl={2}>
            <Sidebar users={users} />
          </Grid>

          {/* Main Content - Messages List and Send Message Form */}
          <Grid item xs={12} sm={9} md={10} lg={10} xl={10}>
            <Mainbar msges={msges} user={user} messagesEndRef={messagesEndRef} send={send} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;

// import React, { useState, useEffect, useRef } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import io from 'socket.io-client';
// import { Container, Grid, Typography, Avatar, Button, Paper, Card, CardContent, IconButton, TextField } from '@mui/material';
// import { format } from 'date-fns';
// import SendIcon from "@mui/icons-material/Send";

// const socket = io('http://localhost:3000');

// const Home = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [user, setUser] = useState(location.state);
//   const [users, setUsers] = useState([]);
//   const [fetch, setFetch] = useState(true);
//   const [msges, setMsges] = useState([]);
//   const messagesEndRef = useRef(null);

//   const logout = (userId) => {
//     axios.post('http://localhost:3000/api/user/logout', { user_id: userId })
//       .then(response => {
//         console.log(response.data.message);
//       })
//       .catch(error => {
//         console.error('Error occurred:', error);
//       });
//     setUsers(prevUsers => prevUsers.filter(u => u.user_id !== userId));
//     setUser(null);
//     navigate('/login');
//   }

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const send = (message) => {
//     console.log(message);
//     socket.emit('send_message', message, user.user_id, user.room_id, user.username);
//   }

//   useEffect(() => {
//     socket.emit('Join', user?.room_id, user?.username);
//     axios.post('http://localhost:3000/api/message/getmessage', { room_id: user?.room_id })
//       .then(response => {
//         setMsges(response.data.messages);
//         scrollToBottom(); // Scroll to bottom after messages are fetched
//       })
//       .catch(error => {
//         console.error('Error fetching messages:', error);
//       });
//   }, [fetch]);

//   useEffect(() => {
//     socket.on('receive_message', () => {
//       setFetch(prev => !prev);
//     });
//     return () => {
//       socket.off('receive_message');
//     }
//   }, []);

//   useEffect(() => {
//     axios
//       .post('http://localhost:3000/api/user/getall', { room_id: user?.room_id })
//       .then((response) => {
//         if (response.data.users) {
//           setUsers(response.data.users);
//         } else {
//           console.log(response.data.message);
//         }
//       });
//   }, [users]);

//   return (
//     <div style={{
//       backgroundColor:"black",
//       height: '100vh', // Set background height to cover the entire viewport
//     }}>
//       <Container maxWidth="xl" style={{ height: '100%', overflow: 'hidden' }}>
//         <Grid container spacing={0} style={{ height: '100%' }}>
//           {/* Header */}
//           <Grid item xs={12} >
//             <Header user={user} logout={logout}  />
//           </Grid>

//           {/* Sidebar - Users List */}
//           <Grid item xs={12} sm={3} md={2} lg={2} xl={2}>
//             <Sidebar users={users} />
//           </Grid>

//           {/* Main Content - Messages List and Send Message Form */}
//           <Mainbar msges={msges} user={user} messagesEndRef={messagesEndRef} send={send}>
//             <SendMessageForm  />
//           </Mainbar>
//         </Grid>
//       </Container>
//     </div>
//   );
// };

// const Header = ({ user, logout }) => {
//   return (
//     <Paper style={{
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       right: 0,
//       padding: '20px',
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       backgroundColor: 'rgba(255, 255, 255, 0.2)',
//       backdropFilter: 'blur(10px)',
//       border: '2px solid rgba(255, 255, 255, 0.1)',
//       boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
//       zIndex: 9999, // Set a high z-index value
//     }}>
//       <div style={{ display: 'flex', alignItems: 'center' }}>
//         <Avatar src={user?.profile} alt="User Profile" sx={{ width: 50, height: 50, marginRight: '10px' }} />
//         <Typography variant="h5" sx={{ color: "black" }}>{user?.username}</Typography>
//       </div>
//       <Button variant="contained" onClick={() => logout(user?.user_id)}>Logout</Button>
//     </Paper>
//   );
// };

// const Mainbar = ({ msges, user, messagesEndRef,send}) => {
//   useEffect(() => {
//     // Scroll to the bottom of the container when messages change
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [msges, messagesEndRef]);

//   return (
//     <Grid item xs={10} style={{ position: 'absolute', top: '90px',bottom:'0', right: '0', width: '70%', height: '80vh', display: 'flex', flexDirection: 'column' }}>
//       <Paper style={{ flexGrow: 1,
//          overflowY: 'auto',
//        backgroundColor: 'rgba(255, 255, 255, 0.2)',
//        backdropFilter: 'blur(10px)',
//        border: '2px solid rgba(255, 255, 255, 0.1)',
//        boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
//       //  position: 'relative',
//        paddingBottom: '90px'
//        }}>
//         {msges && msges.length > 0 ? (
//           msges.map((msg, i) => (
//             <Message
//               key={i}
//               sender={msg.sender}
//               message={msg.message}
//               timeStamp={msg.timeStamp}
//               isCurrentUser={msg.sender === user.username}
//             />
//           ))
//         ) : (
//           <Typography variant="body1" style={{ textAlign: 'center', marginTop: '20px'}}>No messages yet</Typography>
//         )}
//         <div ref={messagesEndRef} />
//       </Paper>
//       <SendMessageForm  send={send}/>
//     </Grid>
//   );
// };

// const Message = ({ sender, message, timeStamp, isCurrentUser }) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const truncatedMessage = message.substring(0, 100); // Truncate message to first 100 characters

//   const toggleExpand = () => {
//     setIsExpanded(!isExpanded);
//   };

//   return (
//     <div style={{
//       display: 'flex',
//       flexDirection: isCurrentUser ? 'row-reverse' : 'row', // Reverse direction for current user's messages
//       justifyContent: 'flex-start',
//       alignItems: 'flex-start',
//       margin:'0px 30px 10px 30px'
//     }}>
//       <div style={{
//         backgroundColor: isCurrentUser ? "#dcf8c6" : "#ffffff",
//         borderRadius: isCurrentUser ? '20px 20px 5px 20px' : '20px 20px 20px 5px',
//         padding: '10px',
//         maxWidth: '80%',
//         boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
//         wordWrap: 'break-word',
//       }}>
//         <Typography variant="caption" sx={{ color: "blue" }}>{isCurrentUser ? "You" : sender}</Typography>
//         <Typography variant="caption" sx={{ color: "green", marginLeft: '1rem' }}>{format(new Date(timeStamp), 'hh:mm')}</Typography>
//         <Typography>{isExpanded ? message : truncatedMessage}</Typography>
//         {message.length > 500 && (
//           <Button variant="text" size="small" onClick={toggleExpand}>
//             {isExpanded ? "Read less" : "Read more"}
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// };

// const SendMessageForm = ({ send }) => {
//   const [text, setText] = useState("");

//   const handleSend = () => {
//     if (text.trim() !== "") {
//       send(text);
//       setText("");
//     }
//   };

//   return (
//     <div>
//         <div style={{
//           position: 'absolute',
//           bottom: 0,
//           left: 0,
//           right: 0,
//           backgroundColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(8px)',
//           padding: '1.6px', // 20% smaller
//           display: 'flex',
//           height:'38.4px', // 20% smaller
//           justifyContent: 'space-between',
//           alignItems: 'center',
//         }}>
//           <TextField
//             fullWidth
//             variant="outlined"
//             placeholder="Type your message"
//             onChange={(e) => setText(e.target.value)}
//             value={text}
//             InputProps={{
//               style: {
//                 backgroundColor: "transparent",
//                 border: "none",
//                 outline: "none",
//                 color: "black",
//                 padding: "8px", // 20% smaller
//                 color: 'white',
//                 borderColor: 'transparent', // Remove blue border
//               },
//             }}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") {
//                 handleSend();
//               }
//             }}
//           />
//           <IconButton onClick={handleSend} color="primary">
//             <SendIcon />
//           </IconButton>
//         </div>

//     </div>
//   );
// };

// const Sidebar = ({ users }) => {
//   return (
//     <Paper
//       style={{
//         position: 'absolute',
//         top: '90px',
//         bottom:'0',
//         left: '0',
//         width: '30%',
//         height: "80vh",
//         overflowY: "auto",
//         backgroundColor: "rgba(255, 255, 255, 0.2)",
//         backdropFilter: "blur(10px)",
//         border: "2px solid rgba(255, 255, 255, 0.1)",
//         boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
//       }}
//     >

//       {/* User Cards */}
//       {users.map((obj, index) => (
//         <Card
//           key={index + 1}
//           style={{
//             marginBottom: "2px",
//             boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
//             backgroundColor: "grey", // Add grey background color
//           }}
//         >
//           <CardContent style={{ display: "flex", alignItems: "center" }}>
//             <Avatar src={obj.profile} alt="User" sx={{ width: 50, height: 50, marginRight: "10px" }} />
//             <Typography>{obj.username}</Typography>
//           </CardContent>
//         </Card>
//       ))}
//     </Paper>
//   );
// };

// export default Home;

// import React, { useState, useEffect, useRef } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import io from 'socket.io-client';

// const socket = io('http://localhost:3000');

// const Home = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [user, setUser] = useState(location.state);
//   const [users, setUsers] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [fetchMessages, setFetchMessages] = useState(true);
//   const messagesEndRef = useRef(null);

//   const logout = (userId) => {
//     axios.post('http://localhost:3000/api/user/logout', { user_id: userId })
//       .then(response => {
//         console.log(response.data.message);
//       })
//       .catch(error => {
//         console.error('Error occurred:', error);
//       });
//     setUsers(prevUsers => prevUsers.filter(u => u.user_id !== userId));
//     setUser(null);
//     navigate('/login');
//   }

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const sendMessage = (message) => {
//     console.log(message);
//     socket.emit('send_message', message, user.user_id, user.room_id, user.username);
//   }

//   useEffect(() => {
//     socket.emit('Join', user?.room_id, user?.username);
//     axios.post('http://localhost:3000/api/message/getmessage', { room_id: user?.room_id })
//       .then(response => {
//         setMessages(response.data.messages);
//         scrollToBottom(); // Scroll to bottom after messages are fetched
//       })
//       .catch(error => {
//         console.error('Error fetching messages:', error);
//       });
//   }, [fetchMessages]);

//   useEffect(() => {
//     socket.on('receive_message', () => {
//       setFetchMessages(prev => !prev);
//     });
//     return () => {
//       socket.off('receive_message');
//     }
//   }, []);

//   useEffect(() => {
//     axios
//       .post('http://localhost:3000/api/user/getall', { room_id: user?.room_id })
//       .then((response) => {
//         if (response.data.users) {
//           setUsers(response.data.users);
//         } else {
//           console.log(response.data.message);
//         }
//       });
//   }, [users]);

//   return (
//     <div>
//       <Header user={user} logout={logout} />
//       <div>
//         <Sidebar users={users} />
//         <MainContent messages={messages} user={user} messagesEndRef={messagesEndRef} sendMessage={sendMessage} />
//       </div>
//     </div>
//   );
// };

// const Header = ({ user, logout }) => {
//   return (
//     <div>
//       <h1>Welcome, {user?.username}</h1>
//       <button onClick={() => logout(user?.user_id)}>Logout</button>
//     </div>
//   );
// };

// const MainContent = ({ messages, user, messagesEndRef, sendMessage }) => {
//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages, messagesEndRef]);

//   return (
//     <div>
//       <div>
//         {messages && messages.length > 0 ? (
//           messages.map((msg, i) => (
//             <Message key={i} sender={msg.sender} message={msg.message} timeStamp={msg.timeStamp} isCurrentUser={msg.sender === user.username} />
//           ))
//         ) : (
//           <p>No messages yet</p>
//         )}
//         <div ref={messagesEndRef} />
//       </div>
//       <SendMessageForm sendMessage={sendMessage} />
//     </div>
//   );
// };

// const Message = ({ sender, message, timeStamp, isCurrentUser }) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const truncatedMessage = message.substring(0, 100);

//   const toggleExpand = () => {
//     setIsExpanded(!isExpanded);
//   };

//   return (
//     <div>
//       <div>
//         <p>{isCurrentUser ? "You" : sender} - {format(new Date(timeStamp), 'hh:mm')}</p>
//         <p>{isExpanded ? message : truncatedMessage}</p>
//         {message.length > 100 && (
//           <button onClick={toggleExpand}>{isExpanded ? "Read less" : "Read more"}</button>
//         )}
//       </div>
//     </div>
//   );
// };

// const SendMessageForm = ({ sendMessage }) => {
//   const [text, setText] = useState("");

//   const handleSend = () => {
//     if (text.trim() !== "") {
//       sendMessage(text);
//       setText("");
//     }
//   };

//   return (
//     <div>
//       <input type="text" placeholder="Type your message" onChange={(e) => setText(e.target.value)} value={text} />
//       <button onClick={handleSend}>Send</button>
//     </div>
//   );
// };

// const Sidebar = ({ users }) => {
//   return (
//     <div>
//       <h2>Users</h2>
//       <ul>
//         {users.map((obj, index) => (
//           <li key={index}>{obj.username}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Home;

// import React, { useState, useEffect, useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import io from "socket.io-client";
// import { format } from "date-fns";

// const socket = io("http://localhost:3000");

// const Home = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [user, setUser] = useState(location.state);
//   const [users, setUsers] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [fetchMessages, setFetchMessages] = useState(true);
//   const messagesEndRef = useRef(null);

//   const logout = (userId) => {
//     axios
//       .post("http://localhost:3000/api/user/logout", { user_id: userId })
//       .then((response) => {
//         console.log(response.data.message);
//       })
//       .catch((error) => {
//         console.error("Error occurred:", error);
//       });
//     setUsers((prevUsers) => prevUsers.filter((u) => u.user_id !== userId));
//     setUser(null);
//     navigate("/login");
//   };

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const sendMessage = (message) => {
//     console.log(message);
//     socket.emit(
//       "send_message",
//       message,
//       user.user_id,
//       user.room_id,
//       user.username
//     );
//   };

//   useEffect(() => {
//     socket.emit("Join", user?.room_id, user?.username);
//     axios
//       .post("http://localhost:3000/api/message/getmessage", {
//         room_id: user?.room_id,
//       })
//       .then((response) => {
//         setMessages(response.data.messages);
//         scrollToBottom(); // Scroll to bottom after messages are fetched
//       })
//       .catch((error) => {
//         console.error("Error fetching messages:", error);
//       });
//   }, [fetchMessages]);

//   useEffect(() => {
//     socket.on("receive_message", () => {
//       setFetchMessages((prev) => !prev);
//     });
//     return () => {
//       socket.off("receive_message");
//     };
//   }, []);

//   useEffect(() => {
//     axios
//       .post("http://localhost:3000/api/user/getall", { room_id: user?.room_id })
//       .then((response) => {
//         if (response.data.users) {
//           setUsers(response.data.users);
//         } else {
//           console.log(response.data.message);
//         }
//       });
//   }, [users]);

//   return (
//     <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
//       <Header user={user} logout={logout} />
//       <div style={{ display: "flex", flex: 1 }}>
//         <Sidebar users={users} />
//         <MainContent
//           messages={messages}
//           user={user}
//           messagesEndRef={messagesEndRef}
//           sendMessage={sendMessage}
//         />
//       </div>
//     </div>
//   );
// };

// const Header = ({ user, logout }) => {
//   return (
//     <div
//       style={{
//         padding: "10px 20px",
//         height: "50px",
//         backgroundColor: "#333",
//         color: "#fff",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between",
//       }}
//     >
//       <h3 style={{ margin: 0 }}>Welcome, {user?.username}</h3>
//       <button
//         onClick={() => logout(user?.user_id)}
//         style={{
//           padding: "8px",
//           backgroundColor: "#fff",
//           color: "#333",
//           border: "none",
//           cursor: "pointer",
//         }}
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// const MainContent = ({ messages, user, messagesEndRef, sendMessage }) => {
//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages, messagesEndRef]);

//   return (
//     <div style={{ flex: 1, padding: "20px", backgroundColor: "#f4f4f4" }}>
//       <div
//         style={{
//           marginBottom: "20px",
//           overflowY: "scroll",
//           height: "calc(100% - 150px)",
//         }}
//       >
//         {messages && messages.length > 0 ? (
//           messages.map((msg, i) => (
//             <Message
//               key={i}
//               sender={msg.sender}
//               message={msg.message}
//               timeStamp={msg.timeStamp}
//               isCurrentUser={msg.sender === user.username}
//             />
//           ))
//         ) : (
//           <p>No messages yet</p>
//         )}
//         <div ref={messagesEndRef} />
//       </div>
//       <SendMessageForm sendMessage={sendMessage} />
//     </div>
//   );
// };



// const Message = ({ sender, message, timeStamp, isCurrentUser }) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const truncatedMessage = message.substring(0, 100);

//   const toggleExpand = () => {
//     setIsExpanded(!isExpanded);
//   };

//   return (
//     <div
//       style={{
//         marginBottom: "10px",
//         maxHeight: "10vh",
//         padding: "8px",
//         backgroundColor: isCurrentUser ? "#dcf8c6" : "#fff",
//         // borderRadius: "20px",
//         maxWidth: "20vh", // Limit message bubble width
//         alignSelf: isCurrentUser ? "flex-end" : "flex-start", // Align messages to right for current user and left for others
//       }}
//     >
//       <p style={{ fontSize: "14px", marginBottom: "5px" }}>
//         {isExpanded ? message : truncatedMessage}
//       </p>
//       <div style={{ textAlign: "right", fontSize: "12px", color: "#666" }}>
//         {format(new Date(timeStamp), "hh:mm")} -{" "}
//         {isCurrentUser ? "You" : sender}
//       </div>
//       {message.length > 100 && (
//         <button
//           onClick={toggleExpand}
//           style={{
//             border: "none",
//             backgroundColor: "transparent",
//             color: "blue",
//             cursor: "pointer",
//             fontSize: "14px",
//           }}
//         >
//           {isExpanded ? "Read less" : "Read more"}
//         </button>
//       )}
//     </div>
//   );
// };

// const SendMessageForm = ({ sendMessage }) => {
//   const [text, setText] = useState("");

//   const handleSend = () => {
//     if (text.trim() !== "") {
//       sendMessage(text);
//       setText("");
//     }
//   };

//   return (
//     <div style={{ display: "flex", marginTop: "20px" }}>
//       <input
//         type="text"
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         style={{ flex: 1, padding: "10px", marginRight: "10px" }}
//       />
//       <button
//         onClick={handleSend}
//         style={{
//           padding: "10px",
//           backgroundColor: "#333",
//           color: "#fff",
//           border: "none",
//           cursor: "pointer",
//         }}
//       >
//         Send
//       </button>
//     </div>
//   );
// };

// const Sidebar = ({ users }) => {
//   return (
//     <div
//       style={{
//         padding: "20px",
//         backgroundColor: "#ddd",
//         width: "200px",
//         overflowY: "auto",
//       }}
//     >
//       <h2>Users</h2>
//       <ul style={{ listStyleType: "none", padding: 0 }}>
//         {users.map((obj, index) => (
//           <li key={index} style={{ marginBottom: "10px" }}>
//             {obj.username}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Home;
