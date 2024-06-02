import { CartStatus } from "../enum/cart-status.enum";
import { CardItem } from "./carditem.model";

export interface ShoppingCart{
    id: number;
    UserId: number;
    Status: CartStatus;
    CardList: CardItem[];
    AddressId: number;
    Price: number;
}