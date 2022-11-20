
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import theme from "./components/theme";

import { GlobalRoutes } from "./Routes";
import { AuthProvider } from "./services/authentication";
import "./public/css/global.css"
import "./public/css/vendor/bootstrap.min.css";
import "./public/css/raw/styles.css";

import "./public/css/vendor/simplebar.css";

export default function App() {

  const queryClient = new QueryClient();

  return (

    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <GlobalRoutes />
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </ChakraProvider>
  )
}