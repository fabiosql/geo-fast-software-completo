import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/authentication/useAuth";
import { logout } from "../../services/authentication/utils";

interface IProtectedLayout {
  exception?: boolean,
  children: JSX.Element
}

export const ProtectedLayout = ({ exception = false, children }: IProtectedLayout) => {
  const auth = useAuth();
  let navigate = useNavigate();

  useEffect(() => {
    if (exception === false && !localStorage.getItem("token")) {
      logout();
      navigate("/");
    }
  }, [])

  if (exception === false && !localStorage.getItem("token")) {
    return <div style={{ textAlign: "center" }}>
      <p style={{ marginTop: "20px", padding: "10px", color: "white", fontSize: "18px", fontWeight: 500 }} >Você não está logado! </p>
      <a href="/welcome">Caso você não seja redirecionado para a tela de login, <b>clique aqui</b></a>
    </div>
  }
  return children;
};
