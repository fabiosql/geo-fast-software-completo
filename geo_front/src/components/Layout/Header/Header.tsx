
import { HamburgerIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuList, MenuItem, MenuGroup, Divider, IconButton } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../services/authentication/useAuth";
import { logout } from "../../../services/authentication/utils";
import Logo from "../../public/Logo";
export default function Header() {

    const auth = useAuth();
    const navigate = useNavigate();

    return <>
        <header className="header">

            <div className="header-actions">
                <div className="header-brand">
                    <div className="logo">
                        <Logo style={{maxHeight: "1.5rem"}} />
                    </div>
                </div>
            </div>
            <div className="header-actions"></div>
            <div className="header-actions">
                <Menu>
                    <MenuButton mr={3}
                        as={IconButton}
                        aria-label='Menu'
                        icon={<HamburgerIcon />}
                        variant='primary'
                    />
                    <MenuList>
                        <MenuItem onClick={() => navigate("/painel")}>Painel</MenuItem>
                        <MenuItem onClick={() => navigate("/add-vehicle")}>Cadastrar veículo</MenuItem>
                        <Divider mb={3} />
                        <MenuItem onClick={() => { logout(); navigate("/") }}>Sair</MenuItem>
                    </MenuList>
                </Menu>
            </div>
        </header>
    </>
}