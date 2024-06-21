/**
 * @description
 * Objeto para definir la estructura de Cartas del catalogo y el sitio.
 */
export interface CardItem{
    /**
     * Identificador de objeto.
     */
    Id: number;
    /**
     * Nombre de carta.
     */
    CardName: string;
    /**
     * Id de Ususario que agrego la carta al catalogo.
     */
    CreatedBy: number;
    /**
     * Catidad de la carta en catalogo.
     */
    Quantity: number;
    /**
     * Sigla de la edicion de la carta.
     */
    SetCode: string;
    /**
     * Nombre de la edicion de la carta.
     */
    SetName: string;
    /**
     * Numero de edicion de la carta.
     */
    CardNumber: number;
    /**
     * Estado de la carta.
     */
    Condition: string;
    /**
     * Precio de la carta.
     */
    Price: number;
    /**
     * Url de la imagen de la carta.
     */
    Image: string;
    /**
     * tipo de carta de juego.
     */
    CardType: string;
    /**
     * Coste para jugar la carta
     */
    ManaValue: string;
    /**
     * Habilidad de juego de la carta.
     */
    CardText: string;
}