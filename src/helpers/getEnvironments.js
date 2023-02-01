
// Este archivo se crea exclusivamente para poder cambiar entre entorno de testing y desarrollo
export const getEnvironments = () => {

    import.meta.env;

    return {
        ...import.meta.env,
    }

}
