import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username && password) {
      Cookies.set("isLoggedIn", "true", { expires: 1 }); // 1일 동안 유지
      setIsLoggedIn(true);
      navigate("/boards");
    } else {
      alert("사용자 이름과 비밀번호를 입력하세요.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <Typography variant="h4" component="h1" gutterBottom>
          로그인
        </Typography>
        <TextField
          label="사용자 이름"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="비밀번호"
          variant="outlined"
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleLogin}>
          로그인
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
