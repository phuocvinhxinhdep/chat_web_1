import {
    Field,
    Input,
    Button,
    Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { toaster } from "../../components/ui/toaster";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [pic, setPic] = useState();
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

    const postDetails = (pics) => {
        setLoading(true);

        if (!pics) {
            toaster.create({
                title: "No Image Selected",
                description: "Please choose an image before uploading",
                type: "warning",
                duration: 4000,
                placement: "top",
            });
            setLoading(false);
            return;
        }

        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "chat-web-1");
            data.append("cloud_name", "dsqhzy43m");

            fetch("https://api.cloudinary.com/v1_1/dsqhzy43m/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {

                    if (!data.secure_url) {
                        toaster.create({
                            title: "Upload failed",
                            description: "Cloudinary did not return an image URL",
                            type: "error",
                        });
                        setLoading(false);
                        return;
                    }

                    setPic(data.secure_url);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        } else {
            toaster.create({
                title: "Invalid image type",
                description: "Only JPEG or PNG allowed",
                type: "warning",
            });
            setLoading(false);
        }
    };

    const handleClick = async () => {
        setLoading(true);
        // await new Promise((res) => setTimeout(res, 2000));
        if (!name || !email || !password || !confirmPassword) {
            toaster.create({
                title: "Please fill all the fields",
                type: "warning",
                duration: 4000,
                placement: "top",
            });
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            toaster.create({
                title: "Passwords do not match",
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

            const { data } = await axios.post("/api/user", { name, email, password, pic }, config);

            toaster.create({
                title: "Registration Successful",
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
                    onChange={(e) => postDetails(e.target.files[0])}
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
