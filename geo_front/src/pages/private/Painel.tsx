import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, CloseButton, Flex, Heading, Skeleton, Spinner, Stack, Text } from "@chakra-ui/react";
import api from "../../services/axios";
import { CheckCircleIcon } from "@chakra-ui/icons";
import MapsFrame from "../../components/Maps/MapsFrame";

interface FormInterface {
    name: string;
}

interface IVehicle {
    name: string;
}

interface ILatLng {
    lat: number;
    lng: number;
}

export default function Painel() {

    const navigate = useNavigate();

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formErro, setFormErro] = useState<string>("");
    const [hasVehicle, setHasVehicle] = useState<boolean>(false);
    const [vehicle, setVehicle] = useState<IVehicle>();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [carregandoLocalizacao, setCarregandoLocalizacao] = useState<boolean>(true);
    const [horarioUltimaAtualizacao, setHorarioUltimaAtualizacao] = useState<string>();

    const [positions, setPositions] = useState<ILatLng[]>([]);

    const Schema = yup.object({
        name: yup.string().required("* Campo obrigatório"),
    });

    const { register, handleSubmit, formState } = useForm<FormInterface>({
        resolver: yupResolver(Schema)
    });

    useEffect(() => {
        api.get("/vehicle").then(res => {
            if (res.data) {
                setHasVehicle(true);
                setVehicle(res.data);
            }
            setIsLoaded(true);
        })
    }, [])

    useEffect(() => {
        setInterval(() => {
            setCarregandoLocalizacao(true);
            api.get("/vehicle/locations").then(response => {
                if (response.data.length > 0) {
                    let last = response.data[response.data.length - 1];
                    setHorarioUltimaAtualizacao(last.date);
                    setPositions(response.data);
                }
                setCarregandoLocalizacao(false);
            })
        }, 10000);
    }, []);

    return (
        <Stack>
            {!isLoaded && <Skeleton height='400px' mb={10} />}
            {isLoaded && <>
                {vehicle?.name && <Box boxShadow="0 0 60px 0 rgb(0 0 0 / 12%)" px={10} py={5} mb={5}>
                <Flex justifyContent="center" mb={3} fontWeight="semibold" fontSize="18px" bg="gray.100" py={3} borderRadius={8}>Acompanhe a localização do seu veículo <span style={{margin:"0 6px",color:"#358fcc"}}>{vehicle?.name}</span> em tempo real</Flex>
                    <Flex justifyContent="space-between">
                        <Flex alignItems="center" color="blackAlpha.800" mb={4}>
                            {carregandoLocalizacao ? <Spinner size="sm" color='red.500' mr={1} /> : <CheckCircleIcon color="green.400" mr={1} />}
                            {horarioUltimaAtualizacao && <>Última atualização: <span style={{ paddingLeft: "6px", fontWeight: "semibold" }}>Hoje as {horarioUltimaAtualizacao}</span></>}
                            {!horarioUltimaAtualizacao && <Box textAlign="center">Nenhuma coordenada disponível!</Box>}
                        </Flex>
                    </Flex>
                    {horarioUltimaAtualizacao && <MapsFrame positions={positions} />}
                </Box>}
                {!vehicle?.name && <Alert status='warning' mb={20}>
                    <AlertIcon />
                    <Box width="100%">
                        <AlertTitle>Ooops!</AlertTitle>
                        <AlertDescription>
                            Parece que você ainda não cadastrou seu veículo.
                        </AlertDescription>
                    </Box>
                    <Flex width="100%" justifyContent="flex-end"><Button onClick={() => navigate("/add-vehicle")} colorScheme='black' maxW="200px" size='md'>Cadastrar</Button></Flex>
                </Alert>}
            </>}
        </Stack>
    );
}