// import React, { useState } from "react";
// import { Typography, Button } from "@mui/material";
// import { format } from "date-fns";

// const Message = ({ sender, message, timeStamp, isCurrentUser }) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const truncatedMessage = message.substring(0, 100); // Truncate message to first 100 characters

//   const toggleExpand = () => {
//     setIsExpanded(!isExpanded);
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: isCurrentUser ? "row-reverse" : "row", // Reverse direction for current user's messages
//         justifyContent: "flex-start",
//         alignItems: "flex-start",
//         margin: "0px 30px 10px 30px",
//         position: "relative"
//       }}
//     >
//       <div
//         style={{
//           backgroundColor: isCurrentUser ? "#1976d2" : "#ffffff",
//           borderRadius: isCurrentUser
//             ? "20px 20px 5px 20px"
//             : "20px 20px 20px 5px",
//           padding: "10px",
//           maxWidth: "80%",
//           boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
//           wordWrap: "break-word",
//         }}
//       >
//         <Typography>{isExpanded ? message : truncatedMessage}</Typography>
//         <Typography
//           variant="caption"
//           sx={{ color: "#ffd700", fontSize: "0.7rem" }}
//         >
//           {isCurrentUser ? "You" : sender}
//         </Typography>
//         <Typography
//           variant="caption"
//           sx={{ color: "#ffd700", marginLeft: "3rem", fontSize: "0.6rem" }}
//         >
//           {format(new Date(timeStamp), "hh:mm")}
//         </Typography>

//         {message.length > 500 && (
//           <Button variant="text" size="small" onClick={toggleExpand}>
//             {isExpanded ? "Read less" : "Read more"}
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Message;


import React, { useState } from "react";
import { Typography, Button } from "@mui/material";
import { format } from "date-fns";

const Message = ({ sender, message, timeStamp, isCurrentUser }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const truncatedMessage = message.substring(0, 100); // Truncate message to first 100 characters

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isCurrentUser ? "row-reverse" : "row", // Reverse direction for current user's messages
        justifyContent: "flex-start",
        alignItems: "flex-start",
        margin: "0px 24px 8px 24px", // 20% smaller
        position: "relative"
      }}
    >
      <div
        style={{
          backgroundColor: isCurrentUser ? "#1976d2" : "#ffffff",
          borderRadius: isCurrentUser
            ? "16px 16px 4px 16px" // 20% smaller
            : "16px 16px 16px 4px", // 20% smaller
          padding: "8px", // 20% smaller
          maxWidth: "64%", // 20% smaller
          boxShadow: "0px 1.6px 4px rgba(0, 0, 0, 0.1)", // 20% smaller
          wordWrap: "break-word",
        }}
      >
        <Typography sx={{ fontSize: "0.8rem" }}>{isExpanded ? message : truncatedMessage}</Typography> {/* 20% smaller */}
        <Typography
          variant="caption"
          sx={{ color: "#ffd700", fontSize: "0.56rem" }} // 20% smaller
        >
          {isCurrentUser ? "You" : sender}
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: "#ffd700", marginLeft: "2.4rem", fontSize: "0.48rem" }} // 20% smaller
        >
          {format(new Date(timeStamp), "hh:mm")}
        </Typography>

        {message.length > 500 && (
          <Button variant="text" size="small" onClick={toggleExpand}>
            {isExpanded ? "Read less" : "Read more"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Message;
