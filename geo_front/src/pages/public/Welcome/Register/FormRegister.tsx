import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAuth } from "../../../../services/authentication/useAuth";
import { FormMessageField } from "../../../../components/Forms/FormMessageField";
import { Box } from "@chakra-ui/react";

interface FormInterface {
  full_name: string;
  email: string;
  password: string;
  plan_id: string;
}

export default function FormRegister() {

  const auth = useAuth();
  let navigate = useNavigate();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErro, setFormErro] = useState<string>("");

  const Schema = yup.object({
    full_name: yup.string().required("* Campo obrigatório"),
    email: yup.string().email("* Informe um e-mail verdadeiro").required("* Campo obrigatório"),
    password: yup.string().required("* Campo obrigatório").min(8, "A senha deve conter no mínimo 8 caracteres").max(255),
    plan_id: yup.string().required("* Campo obrigatório"),
  });

  const { register, handleSubmit, formState } = useForm<FormInterface>({
    resolver: yupResolver(Schema)
  });

  useEffect(() => {
    const errorParam = new URLSearchParams(window.location.search).get("errmsg");
    if (errorParam) {
      setFormErro(errorParam);
    }
  }, [])

  const { errors } = formState;

  const handleRegister: SubmitHandler<FormInterface> = async (values) => {

    setFormErro("");

    setFormSubmitted(true);
    let response = await auth.authenticateRegister(values);

    setFormSubmitted(false);
    if (response) {
      if ("token" in response) {
        window.location.href = "/painel";
      } else if ("error" in response.data) {
        setFormErro(response.data.error);
      }
    } else {
      setFormErro("Ooops! Algo de errado não está certo, tente novamente ou entre em contato com nosso suporte");
    }

  }

  return (
    <div className="form-box login-register-form-element">

      <h2 className="form-box-title">Assine e mantenha seu veículo protegido</h2>

      <form className="form" onSubmit={handleSubmit(handleRegister)}>

      <div className="form-row">
          <div className="form-item">
            <div className="form-input active">
              <label htmlFor="register-full-name">NOME COMPLETO</label>
              <input type="text" id="register-full-name"  {...register("full_name")} />
            </div>
            {errors.email && <FormMessageField message={errors.email.message} type="error" />}
          </div>
        </div>

        <div className="form-row">
          <div className="form-item">
            <div className="form-input active">
              <label htmlFor="register-email">SEU E-MAIL</label>
              <input type="email" id="register-email"  {...register("email")} />
            </div>
            {errors.email && <FormMessageField message={errors.email.message} type="error" />}
          </div>
        </div>

        <div className="form-row">
          <div className="form-item">
            <div className="form-input active">
              <label htmlFor="register-password">SENHA</label>
              <input type="password" id="register-password" {...register("password")} />
            </div>
            {errors.password && <FormMessageField message={errors.password.message} type="error" />}
          </div>
        </div>

        <hr />

        <Box py={3} mb={3} fontWeight="medium" color="blackAlpha.800">Dados do plano</Box>

        <div className="form-row">
          <div className="form-item">
            <div className="form-select active">
              <label htmlFor="register-email">SELECIONE SEU PLANO</label>
              <select {...register("plan_id")}>
                <option value="1">
                  Plano 1
                </option>
              </select>
            </div>
            {errors.email && <FormMessageField message={errors.email.message} type="error" />}
          </div>
        </div>

        {formErro && <FormMessageField message={formErro} type="error" margin="12px 0" />}

        <div className="form-row">
          <div className="form-item">
            <button className="button medium secondary" type="submit">CRIAR CONTA</button>
          </div>
        </div>

      </form>

    </div>
  );
}