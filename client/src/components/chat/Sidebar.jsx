// import React from "react";
// import { Typography, Avatar, Paper, Card, CardContent } from "@mui/material";

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

// export default Sidebar;

import React from "react";
import { Typography, Avatar, Paper, Card, CardContent } from "@mui/material";

const Sidebar = ({ users }) => {
  return (
    <Paper
      style={{
        position: "absolute",
        top: "60px", // Adjusted top position to match the height of the Header
        left: "0",
        width: "25%",
        height: "calc(100vh - 60px)", // Adjusted height to fill the remaining space
        overflowY: "auto",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(10px)",
        border: "2px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",

        backgroundColor:"orange"

      }}
    >
      {/* User Cards */}
      {users.map((obj, index) => (
        <Card
          key={index + 1}
          style={{
            margin: "8px",
            height:"60px",
            borderRadius: "5px",
            marginBottom: "2px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#1976d2", // Add grey background color
          }}
        >
          <CardContent style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={obj.profile}
              alt="User"
              sx={{ width: 30, height: 30, marginRight: "10px" }}
            />
            <Typography>{obj.username}</Typography>
          </CardContent>
        </Card>
      ))}
    </Paper>
  );
};

export default Sidebar;
