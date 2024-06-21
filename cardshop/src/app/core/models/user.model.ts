/**
 * @description
 * Objeto para definir estructura de usuarios del sistema.
 */
export interface User{
    /**
     * Identificador de Objeto.
     */
    id: number;
    /**
     * Nombre del usuario.
     */
    UserName: string;
    /**
     * Nombre del usuario.
     */
    FirstName: string;
    /**
     * apellido del usuario.
     */
    LastName: string;
    /**
     * Contrasena del usuario.
     */
    Password: string;
    /**
     * Correo Electronico del usuario.
     */
    Email: string;
    /**
     * Rol del usuario que define las acciones disponibles que puede realizar.
     */
    Role: string;
    /**
     * Indicador para representar que el usuario se encuentre Habilitado/Deshabilitado.
     */
    IsActive: boolean;
}