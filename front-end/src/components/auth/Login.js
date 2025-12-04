import {
    Field,
    Input,
    Button,
    Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { BeatLoader } from "react-spinners";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const fieldStyle = {
        position: "relative",
        border: "none",
        _before: { content: "none" },
        _after: { content: "none" },
        pb: 1,
    };

    const handleLogin = async () => {
        setLoading(true);
        await new Promise((res) => setTimeout(res, 2000));
        setLoading(false);
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
            >
                Guest
            </Button>
        </Stack>
    );
};

export default Login;
