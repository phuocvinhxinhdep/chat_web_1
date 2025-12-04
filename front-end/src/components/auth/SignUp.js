import {
    Field,
    Input,
    Button,
    Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { BeatLoader } from "react-spinners";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [pic, setPic] = useState();
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const fieldStyle = {
        position: "relative",
        border: "none",
        _before: { content: "none" },
        _after: { content: "none" },
        pb: 1,
    };

    const handleClick = async () => {
        setLoading(true);
        await new Promise((res) => setTimeout(res, 2000));
        setLoading(false);
    };

    return (
        <Stack spacing={2} divider={null}>
            <Field.Root {...fieldStyle}>
                <Field.Label>Name</Field.Label>
                <Input
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </Field.Root>

            <Field.Root {...fieldStyle}>
                <Field.Label>Email</Field.Label>
                <Input
                    placeholder="me@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Field.Root>

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

            <Field.Root {...fieldStyle}>
                <Field.Label>Confirm Password</Field.Label>

                <Input
                    type={show ? "text" : "password"}
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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

            <Field.Root {...fieldStyle}>
                <Field.Label>Upload Avatar</Field.Label>
                <Input
                    type="file"
                    accept="image/*"
                    p={1.5}
                    onChange={(e) => setPic(e.target.files[0])}
                />
            </Field.Root>

            <Button
                loading={loading}
                spinner={<BeatLoader size={8} />}
                colorPalette="blue"
                onClick={handleClick}
            >
                Sign Up
            </Button>
        </Stack>
    );
};

export default SignUp;
