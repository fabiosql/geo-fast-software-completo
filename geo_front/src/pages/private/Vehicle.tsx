import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Box } from "@chakra-ui/react";
import { useAuth } from "../../services/authentication/useAuth";
import { FormMessageField } from "../../components/Forms/FormMessageField";
import api from "../../services/axios";

interface FormInterface {
    name: string;
}

interface IVehicle{
    name: string;
}

export default function Vehicle() {

    const navigate = useNavigate();

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formErro, setFormErro] = useState<string>("");
    const [hasVehicle, setHasVehicle] = useState<boolean>(false);
    const [vehicle, setVehicle] = useState<IVehicle>();

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
        })
    }, [])

    const { errors } = formState;

    const handleVehicle: SubmitHandler<FormInterface> = async (values) => {

        setFormErro("");

        setFormSubmitted(true);

        let response = await api.post("vehicle", values);

        setFormSubmitted(false);
        if (response) {
            if (response.status === 201) {
                window.location.href = "/painel";
            } else if ("error" in response.data) {
                setFormErro(response.data.error);
            }
        } else {
            setFormErro("Ooops! Algo de errado não está certo, tente novamente ou entre em contato com nosso suporte");
        }

    }

    return (
        <div className="form-box" style={{ marginBottom: "20px" }}>

            <h2 className="form-box-title">Cadastrar veículo</h2>

            {!hasVehicle && <form className="form" onSubmit={handleSubmit(handleVehicle)}>

                <div className="form-row">
                    <div className="form-item">
                        <div className="form-input active">
                            <label htmlFor="register-name">Placa</label>
                            <input type="text" id="register-name"  {...register("name")} />
                        </div>
                        {errors.name && <FormMessageField message={errors.name.message} type="error" />}
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-item">
                        <button className="button medium secondary" type="submit">CADASTRAR</button>
                    </div>
                </div>

            </form>}

            {hasVehicle && <Box>
                <h2 style={{color:"#333", fontWeight:"semibold", fontSize:"18px", margin:"20px 0", textAlign:"center"}}>Você já cadastrou um veículo!</h2>
                <h2 style={{color:"#333", fontWeight:"bold", fontSize:"18px", margin:"20px 0", textAlign:"center"}}>{vehicle?.name}</h2>
                <button className="button medium secondary" type="button" onClick={() => navigate("/painel")}>VOLTAR</button>
                </Box>}

        </div>
    );
}