/**
 * @description
 * Objeto para definir la estructura para la informacion de entrega de los usuarios.
 */
export interface Address{
    /**
     * Identificador de objeto.
     */
    id: number;
    /**
     * Valor numerico que se corresponde al id del Objeto User.
     */
    UserId: number;
    /**
     * Nombre de direccion.
     */
    Name: string;
    /**
     * Numero de direccion.
     */
    Number: number;
    /**
     * Region de direccion.
     */
    Region: string;
    /**
     * Comuna de direccion.
     */
    Commune: string;
}