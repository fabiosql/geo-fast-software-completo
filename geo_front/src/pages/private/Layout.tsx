import { Box, Text} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import Header from "../../components/Layout/Header/Header"

export const Layout = ({ children }: { children: JSX.Element }) => {

    const [transformContentGrid, setTransformContentGrid] = useState("translate(0, 0)");
    const contentGridref = useRef(null);

    return <>

        <Header />

        <Box ref={contentGridref} className="content-grid" style={{ transform: transformContentGrid }} >
            {children}
            <Text color="gray.600" textAlign="center">&copy; Fabio da Silva Carvalho - SI Mackenzie 2022 - Todos os direitos reservados</Text>
        </Box>

    </>
}