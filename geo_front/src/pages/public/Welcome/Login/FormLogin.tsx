import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from "react-router-dom";
import { FormMessageField } from "../../../../components/Forms/FormMessageField";
import { Button, useToast } from "@chakra-ui/react";
import api from "../../../../services/axios";

interface FormInterface {
  email: string;
  password: string;
}

export default function FormLogin() {

  const toast = useToast();
  let navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [formErro, setFormErro] = useState("");

  const Schema = yup.object({
    email: yup.string().required("* Campo obrigatório"),
    password: yup.string().required("* Campo obrigatório").min(8, "A senha deve conter no mínimo 8 caracteres").max(255),
  });

  const { register, handleSubmit, formState, setValue } = useForm<FormInterface>({
    resolver: yupResolver(Schema)
  });

  useEffect(() => {
  }, [isLoading, formErro])

  const handleLogin: SubmitHandler<FormInterface> = async (values) => {

    let data = {
      email: values.email,
      password: values.password
    }

    setIsLoading(true);

    const response = await api.post("/login", data).then(r => {
      setIsLoading(false);

      if (r.data.token) {
        localStorage.setItem("token", r.data.token);
        navigate("/painel");
      }

    }).catch(function (error) {
      setIsLoading(false);
      let description = "Erro interno! Atualize a página e tente novamente!";

      if (error.response.status === 401) {
        description = error.response.data.error;
      }
      toast({
        title: "OOOPS!",
        description: description,
        status: "error",
        duration: 5000,
        isClosable: true
      })
    })

    return response;
  }

  return (
    <>
      <div className="form-box login-register-form-element">

        <h2 className="form-box-title">Entrar</h2>

        <form className="form" onSubmit={handleSubmit(handleLogin)}>
          <div className="form-row">
            <div className="form-item">
              <div className="form-input active">
                <label htmlFor="email">E-MAIL</label>
                <input type="text" id="email" {...register("email")} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-item">
              <div className="form-input active">
                <label htmlFor="login-password">SENHA</label>
                <input type="password" id="login-password"  {...register("password")} />
              </div>
            </div>
          </div>
          {formErro && <FormMessageField message={formErro} type="error" margin="10px 0" />}
          <div className="form-row">
            <div className="form-item">
              <Button type="submit" isLoading={isLoading} className="button medium secondary button-login"><span style={{ fontSize: "13px" }}>ENTRAR</span></Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}