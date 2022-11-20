// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react"

export default extendTheme({
    colors: {
        black: {
            300: "#323e5b",
            500: "#161b28"
        },
        green: {
            500: "#1da82c",
            600: "#288932"
        },
        purple: {
            500: "#2293df",
            600: "#5530cd"
        }
    },
    components: {
        Button: {
            baseStyle: {
                fontSize: "0.8rem",
                display: "inline-block",
                borderRadius: "34px",
                color: "white",
                fontWeight: 500,
                textAlign: "center",
                cursor: "pointer",
                transition: "background-color .2s ease-in-out, color .2s ease-in-out, border-color .2s ease-in-out, box-shadow .2s ease-in-out"
            },
            sizes: {
                sm: {
                    padding: "7px 25px",
                    height: "auto !important",
                },
            },
            variants: {
                default: {
                    bg: "black.300"
                },
                primary: {
                    backgroundColor: "blue.500",
                    _hover: {
                        backgroundColor: "blue.600"
                    }
                },
                outline: {
                    _hover: {
                        backgroundColor: "black.500"
                    }
                },
                green: {
                    backgroundColor: "green.500",
                    boxShadow: "4px 7px 12px 0 #14451a",
                    _hover: {
                        backgroundColor: "green.600"
                    }
                },
                red: {
                    _hover: {
                        backgroundColor: "red.600"
                    }
                }
            },
        },
    },

    styles: {
        global: {
            body: {
                backgroundColor: "#FAF9F8"
            },
            a: {
                color: "white",
                cursor: "pointer"
            },
            'a:not([href])': {
                color: "white",
                _hover: {
                    color: "white !important"
                }
            },
            textarea: {
                padding: "14px 18px !important",
                color: "white"
            }
        }
    }
})