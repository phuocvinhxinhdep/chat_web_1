import { Box, Container, Tabs, Text } from "@chakra-ui/react"
import Login from "../components/auth/Login"
import SignUp from "../components/auth/SignUp"

const HomePage = () => {
    return (
        <Container maxW="md" centerContent>
            <Box
                display={"flex"}
                justifyContent="center"
                p={1}
                bg={"white"}
                w="100%"
                m="20px 0 5px 0"
                borderRadius="lg"
                borderWidth="1px"
            >
                <Text fontSize="2xl" fontFamily="Work sans" color={"black"}>
                    Talk-A-Tive
                </Text>
            </Box>
            <Box bg='white' w="100%" p={4} borderRadius={"lg"} color={'black'} borderWidth={"1px"}>
                <Tabs.Root
                    defaultValue="login"
                    variant="plain"
                    css={{
                        "--tabs-indicator-bg": "colors.gray.subtle",
                        "--tabs-indicator-shadow": "shadows.xs",
                        "--tabs-trigger-radius": "radii.full",
                    }}
                >
                    <Tabs.List mb='1em' width={"100%"}>
                        <Tabs.Trigger flex="1" textAlign="center" display="flex"
                            justifyContent="center" value="login">Login</Tabs.Trigger>
                        <Tabs.Trigger flex="1" textAlign="center" display="flex"
                            justifyContent="center" value="signup">Sign Up</Tabs.Trigger>
                        <Tabs.Indicator />
                    </Tabs.List>
                    <Tabs.Content value="login"><Login /></Tabs.Content>
                    <Tabs.Content value="signup"><SignUp /></Tabs.Content>
                </Tabs.Root>
            </Box>
        </Container>
    )
}

export default HomePage