/**
 * @description
 * Estructura con valores para la validacion de recuperacion de contrasena 
 */
export interface Recovery{
    /**
     * Identificador de usuario
     */
    UserId: number;
    /**
     * Token de intento de recuperacion de contrasena
     */
    token: string;
    /**
     * Fecha de intento de recuperacion
     */
    date: Date;
}