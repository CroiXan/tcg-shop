import { CartStatus } from "../enum/cart-status.enum";
import { CardItem } from "./carditem.model";

/**
 * @description
 * Objeto que define la estructura del carrito de compras del sitio.
 */
export interface ShoppingCart{
    /**
     * Identificador de objeto.
     */
    id: number;
    /**
     * Usuario que creo el carrito de compras.
     */
    UserId: number;
    /**
     * Estado del carito de compras definido en CartStatus.
     */
    Status: CartStatus;
    /**
     * Listado que contiene las cartas a comprar.
     */
    CardList: CardItem[];
    /**
     * Direccion de entrega del pedido.
     */
    AddressId: number;
    /**
     * Valor total del carrito de compras.
     */
    Price: number;
}