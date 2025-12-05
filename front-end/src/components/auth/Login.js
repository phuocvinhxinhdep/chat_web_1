import {
    Field,
    Input,
    Button,
    Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { toaster } from './../ui/toaster';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fieldStyle = {
        position: "relative",
        border: "none",
        _before: { content: "none" },
        _after: { content: "none" },
        pb: 1,
    };

    const handleLogin = async () => {
        setLoading(true);
        // await new Promise((res) => setTimeout(res, 2000));
        if (!email || !password) {
            toaster.create({
                title: "Please fill all the fields",
                type: "warning",
                duration: 4000,
                placement: "top",
            });
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post("/api/user/login", { email, password }, config);

            toaster.create({
                title: "Login Successful",
                type: "success",
                duration: 4000,
                placement: "top",
            });

            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            navigate('/chats');
        } catch (error) {
            toaster.create({
                title: "Error Occured",
                description: error.response.data.message,
                type: "error",
                duration: 4000,
                placement: "top",
            });
            setLoading(false);
        }
    };

    return (
        <Stack spacing={3} divider={null}>
            {/* EMAIL */}
            <Field.Root {...fieldStyle}>
                <Field.Label>Email</Field.Label>
                <Input
                    placeholder="me@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Field.Root>

            {/* PASSWORD */}
            <Field.Root {...fieldStyle}>
                <Field.Label>Password</Field.Label>

                <Input
                    type={show ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    pr="3.5rem"
                />

                <Button
                    size="xs"
                    variant="outline"
                    position="absolute"
                    right="0.2rem"
                    top="42.5%"
                    onClick={() => setShow(!show)}
                >
                    {show ? "Hide" : "Show"}
                </Button>
            </Field.Root>

            {/* LOGIN BUTTON */}
            <Button
                loading={loading}
                spinner={<BeatLoader size={8} />}
                colorPalette="blue"
                onClick={handleLogin}
            >
                Login
            </Button>
            <Button
                loading={loading}
                spinner={<BeatLoader size={8} />}
                colorPalette="red"
                onClick={() => {
                    setEmail("guest@gmail.com");
                    setPassword("123456")
                }}
            >
                Guest
            </Button>
        </Stack>
    );
};

export default Login;
