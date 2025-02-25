import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { AiOutlineUser } from "react-icons/ai";

const ProfileInput = ({ analyzeProfile }) => {
  const [username, setUsername] = useState("");

  return (
    <div className="w-full max-w-md p-4 bg-white shadow-md rounded-lg">
      <div className="flex items-center gap-2">
        <AiOutlineUser className="text-2xl text-blue-500" />
        <TextField
          fullWidth
          label="Enter Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <Button
        variant="contained"
        color="primary"
        className="mt-3 w-full"
        onClick={() => analyzeProfile(username)}
      >
        Analyze Profile
      </Button>
    </div>
  );
};

export default ProfileInput;
