import { Flex, Text } from "@chakra-ui/react";

interface IMessage {
    message?: string;
    type: "success" | "error" | "warning";
    margin?: string;
}

const MessageColor = {
    success: "green.500",
    error: "red.500",
    warning:"orange.500"
}

export function FormMessageField({ message, type, margin }: IMessage) {
    return <Flex
        alignItems="center"
        color="#ff3333"
        p="2px 10px 4px 12px"
        m={!margin ? "5px 0 0 0":margin}
        maxWidth="fit-content"
        backgroundColor={MessageColor[type]}
        borderRadius="7px">
        <Text fontSize="14px">{message}</Text>
    </Flex>;
}