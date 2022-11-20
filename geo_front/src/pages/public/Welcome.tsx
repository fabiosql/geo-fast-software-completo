import FormRegister from "./Welcome/Register/FormRegister";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import FormLogin from "./Welcome/Login/FormLogin";
import { getUserInfo, isLogged } from "../../services/authentication/utils";
import { useState } from "react";
import Logo from "../../components/public/Logo";

const Welcome = () => {

  const [tabActive, setTabActive] = useState("login");

  useEffect(() => {
    isLogged().then(logged => {
      if (logged) {
        window.location.href = "/painel";
      } else {
        localStorage.clear();
      }
    })
  }, [])

  return (
    <>

      <div className="landing" style={{backgroundImage: "url('https://thumbs.dreamstime.com/b/conceito-de-geolocaliza%C3%A7%C3%A3o-e-navega%C3%A7%C3%A3o-com-marcas-pinos-digitais-brilhantes-modelo-mapa-do-mundo-azul-no-plano-fundo-escuro-o-220148828.jpg')"}}>


        <div className="landing-info">

          <div className="landing-info-title" style={{display:"flex", justifyContent:"center"}}><Logo style={{maxWidth:"200px"}}/></div>

          <div className="tab-switch">
            <p className={`tab-switch-button login-register-form-trigger ${tabActive == 'login' ? 'active' : ''}`} onClick={() => setTabActive('login')}>Entrar</p>
            <p className={`tab-switch-button login-register-form-trigger  ${tabActive == 'register' ? 'active' : ''}`} onClick={() => setTabActive('register')}>Assinar</p>
          </div>
        </div>

        <div className="landing-form">
          {tabActive == "login" && <FormLogin />}
          {tabActive == "register" && <FormRegister />}
        </div>

      </div>

    </>
  );
};

export default Welcome;