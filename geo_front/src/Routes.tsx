import { Routes, Route } from "react-router-dom";
import Welcome from "./pages/public/Welcome";
import { ProtectedLayout } from "./components/ProtectedLayout";
import { Layout } from "./pages/private/Layout";
import Vehicle from "./pages/private/Vehicle";
import Painel from "./pages/private/Painel";

export function GlobalRoutes() {

  return (
    <Routes>
      <Route path="/" element={<Welcome />}></Route>

      <Route path="/painel" element={
          <ProtectedLayout>
          <Layout>
              <Painel/>
          </Layout>
          </ProtectedLayout>
      }></Route>

      <Route path="/add-vehicle" element={
          <ProtectedLayout>
          <Layout>
              <Vehicle/>
          </Layout>
          </ProtectedLayout>
      }></Route>

      <Route path="*" element={
        <ProtectedLayout>
          <NotFound />
        </ProtectedLayout>
      }>
      </Route>

    </Routes>
  );
}

function NotFound() {
  return <h2 style={{ textAlign: "center", marginTop: "20px" }}>Ooops! Essa página não existe!</h2>;
}