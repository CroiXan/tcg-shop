import { Injectable } from '@angular/core';
import { CardItem } from '../models/carditem.model';

@Injectable({
    providedIn: 'root'
})

export class CardItemService {

    private cardItemList: CardItem[] = [
        {
            Id: 1,
            CardName: 'Oko, Thief of Crowns',
            SetCode: 'ELD',
            SetName: 'Throne of Eldraine',
            CardNumber: 197,
            Condition: 'NM',
            Price: 30,
            CardType: 'Legendary Planeswalker — Oko',
            ManaValue: '3',
            CardText: '+2: Create a Food token.\n+1: Target artifact or creature loses all abilities and becomes a green Elk creature with base power and toughness 3/3.\n-5: Exchange control of target artifact or creature you control and target creature an opponent controls with power 3 or less.',
            CreatedBy: 0,
            Image: '',
            Quantity: 5
        },
        {
            Id: 2,
            CardName: 'Uro, Titan of Nature\'s Wrath',
            SetCode: 'THB',
            SetName: 'Theros Beyond Death',
            CardNumber: 229,
            Condition: 'NM',
            Price: 20,
            CardType: 'Legendary Creature — Elder Giant',
            ManaValue: '3',
            CardText: 'When Uro enters the battlefield, sacrifice it unless it escaped.\nWhenever Uro enters the battlefield or attacks, you gain 3 life and draw a card, then you may put a land card from your hand onto the battlefield.\nEscape—{G}{G}{U}{U}, Exile five other cards from your graveyard.',
            CreatedBy: 0,
            Image: '',
            Quantity: 5
        },
        {
            Id: 3,
            CardName: 'Fabled Passage',
            SetCode: 'ELD',
            SetName: 'Throne of Eldraine',
            CardNumber: 244,
            Condition: 'NM',
            Price: 5,
            CardType: 'Land',
            ManaValue: '0',
            CardText: '{T}, Sacrifice Fabled Passage: Search your library for a basic land card, put it onto the battlefield tapped, then shuffle your library. If you control four or more lands, untap that land.',
            CreatedBy: 0,
            Image: '',
            Quantity: 5
        },
        {
            Id: 4,
            CardName: 'Embercleave',
            SetCode: 'ELD',
            SetName: 'Throne of Eldraine',
            CardNumber: 120,
            Condition: 'NM',
            Price: 7,
            CardType: 'Legendary Artifact — Equipment',
            ManaValue: '6',
            CardText: 'Flash\nThis spell costs {1} less to cast for each attacking creature you control.\nWhen Embercleave enters the battlefield, attach it to target creature you control.\nEquipped creature gets +1/+1 and has double strike and trample.\nEquip {3}',
            CreatedBy: 0,
            Image: '',
            Quantity: 5
        },
        {
            Id: 5,
            CardName: 'The Great Henge',
            SetCode: 'ELD',
            SetName: 'Throne of Eldraine',
            CardNumber: 161,
            Condition: 'NM',
            Price: 50,
            CardType: 'Legendary Artifact',
            ManaValue: '9',
            CardText: 'This spell costs {X} less to cast, where X is the greatest power among creatures you control.\n{T}: Add {G}{G}. You gain 2 life.\nWhenever a nontoken creature enters the battlefield under your control, put a +1/+1 counter on it and draw a card.',
            CreatedBy: 0,
            Image: '',
            Quantity: 5
        },
        {
            Id: 6,
            CardName: 'Gilded Goose',
            SetCode: 'ELD',
            SetName: 'Throne of Eldraine',
            CardNumber: 160,
            Condition: 'NM',
            Price: 3,
            CardType: 'Creature — Bird',
            ManaValue: '1',
            CardText: 'Flying\nWhen Gilded Goose enters the battlefield, create a Food token.\n{1}{G}, {T}: Create a Food token.\n{T}, Sacrifice a Food: Add one mana of any color.',
            CreatedBy: 0,
            Image: '',
            Quantity: 5
        },
        {
            Id: 7,
            CardName: 'Heliod, Sun-Crowned',
            SetCode: 'THB',
            SetName: 'Theros Beyond Death',
            CardNumber: 18,
            Condition: 'NM',
            Price: 10,
            CardType: 'Legendary Enchantment Creature — God',
            ManaValue: '3',
            CardText: 'Indestructible\nAs long as your devotion to white is less than five, Heliod isn\'t a creature.\nWhenever you gain life, put a +1/+1 counter on target creature or enchantment you control.\n{1}{W}: Another target creature gains lifelink until end of turn.',
            CreatedBy: 0,
            Image: '',
            Quantity: 5
        },
        {
            Id: 8,
            CardName: 'Thassa\'s Oracle',
            SetCode: 'THB',
            SetName: 'Theros Beyond Death',
            CardNumber: 73,
            Condition: 'NM',
            Price: 15,
            CardType: 'Creature — Merfolk Wizard',
            ManaValue: '2',
            CardText: 'When Thassa\'s Oracle enters the battlefield, look at the top X cards of your library, where X is your devotion to blue. Put up to one of them on top of your library and the rest on the bottom of your library in a random order. If X is greater than or equal to the number of cards in your library, you win the game.',
            CreatedBy: 0,
            Image: '',
            Quantity: 5
        },
        {
            Id: 9,
            CardName: 'Dryad of the Ilysian Grove',
            SetCode: 'THB',
            SetName: 'Theros Beyond Death',
            CardNumber: 169,
            Condition: 'NM',
            Price: 8,
            CardType: 'Creature — Nymph Dryad',
            ManaValue: '3',
            CardText: 'You may play an additional land on each of your turns.\nLands you control are every basic land type in addition to their other types.',
            CreatedBy: 0,
            Image: '',
            Quantity: 5
        },
        {
            Id: 10,
            CardName: 'Questing Beast',
            SetCode: 'ELD',
            SetName: 'Throne of Eldraine',
            CardNumber: 171,
            Condition: 'NM',
            Price: 10,
            CardType: 'Legendary Creature — Beast',
            ManaValue: '4',
            CardText: 'Vigilance, deathtouch, haste\nQuesting Beast can\'t be blocked by creatures with power 2 or less.\nCombat damage that would be dealt by creatures you control can\'t be prevented.\nWhenever Questing Beast deals combat damage to an opponent, it deals that much damage to target planeswalker that player controls.',
            CreatedBy: 0,
            Image: '',
            Quantity: 5
        },
        {
            Id: 11,
            CardName: 'Fiery Emancipation',
            SetCode: 'M21',
            SetName: 'Core Set 2021',
            CardNumber: 143,
            Condition: 'NM',
            Price: 5,
            CardType: 'Enchantment',
            ManaValue: '6',
            CardText: 'If a source you control would deal damage to a permanent or player, it deals triple that damage to that permanent or player instead.',
            CreatedBy: 0,
            Image: '',
            Quantity: 5
        },
        {
            Id: 12,
            CardName: 'Shark Typhoon',
            SetCode: 'IKO',
            SetName: 'Ikoria: Lair of Behemoths',
            CardNumber: 67,
            Condition: 'NM',
            Price: 10,
            CardType: 'Enchantment',
            ManaValue: '6',
            CardText: 'Whenever you cast a noncreature spell, create an X/X blue Shark creature token with flying, where X is that spell\'s mana value.\nCycling {X}{1}{U}\nWhen you cycle Shark Typhoon, create an X/X blue Shark creature token with flying.',
            CreatedBy: 0,
            Image: '',
            Quantity: 5
        },
        {
            Id: 13,
            CardName: 'Winota, Joiner of Forces',
            SetCode: 'IKO',
            SetName: 'Ikoria: Lair of Behemoths',
            CardNumber: 216,
            Condition: 'NM',
            Price: 7,
            CardType: 'Legendary Creature — Human Warrior',
            ManaValue: '4',
            CardText: 'Whenever a non-Human creature you control attacks, look at the top six cards of your library. You may put a Human creature card from among them onto the battlefield tapped and attacking. It gains indestructible until end of turn. Put the rest on the bottom of your library in a random order.',
            CreatedBy: 0,
            Image: '',
            Quantity: 5
        },
        {
            Id: 14,
            CardName: 'Elder Gargaroth',
            SetCode: 'M21',
            SetName: 'Core Set 2021',
            CardNumber: 179,
            Condition: 'NM',
            Price: 5,
            CardType: 'Creature — Beast',
            ManaValue: '5',
            CardText: 'Vigilance, reach, trample\nWhenever Elder Gargaroth attacks or blocks, choose one —\n• Create a 3/3 green Beast creature token.\n• You gain 3 life.\n• Draw a card.',
            CreatedBy: 0,
            Image: '',
            Quantity: 5
        },
        {
            Id: 15,
            CardName: 'Scute Swarm',
            SetCode: 'ZNR',
            SetName: 'Zendikar Rising',
            CardNumber: 203,
            Condition: 'NM',
            Price: 2,
            CardType: 'Creature — Insect',
            ManaValue: '3',
            CardText: 'Landfall — Whenever a land enters the battlefield under your control, create a 1/1 green Insect creature token. If you control six or more lands, create a token that\'s a copy of Scute Swarm instead.',
            CreatedBy: 0,
            Image: '',
            Quantity: 5
        },
        {
            Id: 16,
            CardName: 'Goldspan Dragon',
            SetCode: 'KHM',
            SetName: 'Kaldheim',
            CardNumber: 139,
            Condition: 'NM',
            Price: 20,
            CardType: 'Creature — Dragon',
            ManaValue: '5',
            CardText: 'Flying, haste\nWhenever Goldspan Dragon attacks or becomes the target of a spell, create a Treasure token.\nTreasures you control have \'{T}, Sacrifice this artifact: Add two mana of any one color.\'',
            CreatedBy: 0,
            Image: '',
            Quantity: 5
        },
        {
            Id: 17,
            CardName: 'Valki, God of Lies // Tibalt, Cosmic Impostor',
            SetCode: 'KHM',
            SetName: 'Kaldheim',
            CardNumber: 114,
            Condition: 'NM',
            Price: 15,
            CardType: 'Legendary Creature — God // Legendary Planeswalker — Tibalt',
            ManaValue: '2 // 7',
            CardText: 'When Valki enters the battlefield, each opponent reveals their hand. For each opponent, exile a creature card they revealed this way until Valki leaves the battlefield.\n{X}: Choose a creature card exiled with Valki with mana value X. Valki becomes a copy of that card. // As Tibalt enters the battlefield, you get an emblem with \'You may play cards exiled with Tibalt, Cosmic Impostor, and you may spend mana as though it were mana of any color to cast those spells.\'\n+2: Exile the top card of each player\'s library.\n-3: Exile target artifact or creature.\n-8: Exile all cards from all graveyards. Add {R}{R}{R}.',
            CreatedBy: 0,
            Image: '',
            Quantity: 5
        },
        {
            Id: 18,
            CardName: 'Esika\'s Chariot',
            SetCode: 'KHM',
            SetName: 'Kaldheim',
            CardNumber: 169,
            Condition: 'NM',
            Price: 4,
            CardType: 'Legendary Artifact — Vehicle',
            ManaValue: '4',
            CardText: 'When Esika\'s Chariot enters the battlefield, create two 2/2 green Cat creature tokens.\nWhenever Esika\'s Chariot attacks, create a token that\'s a copy of target token you control.\nCrew 4',
            CreatedBy: 0,
            Image: '',
            Quantity: 5
        },
        {
            Id: 19,
            CardName: 'Vorinclex, Monstrous Raider',
            SetCode: 'KHM',
            SetName: 'Kaldheim',
            CardNumber: 199,
            Condition: 'NM',
            Price: 20,
            CardType: 'Legendary Creature — Phyrexian Praetor',
            ManaValue: '6',
            CardText: 'Trample, haste\nIf you would put one or more counters on a permanent or player, put twice that many of each of those kinds of counters on that permanent or player instead.\nIf an opponent would put one or more counters on a permanent or player, they put half that many of each of those kinds of counters on that permanent or player instead, rounded down.',
            CreatedBy: 0,
            Image: '',
            Quantity: 5
        },
        {
            Id: 20,
            CardName: 'Brazen Borrower // Petty Theft',
            SetCode: 'ELD',
            SetName: 'Throne of Eldraine',
            CardNumber: 39,
            Condition: 'NM',
            Price: 15,
            CardType: 'Creature — Faerie Rogue // Instant',
            ManaValue: '3',
            CardText: 'Flash\nFlying\nBrazen Borrower can block only creatures with flying. // Return target nonland permanent an opponent controls to its owner\'s hand.',
            CreatedBy: 0,
            Image: '',
            Quantity: 5
        },
        {
            Id: 21,
            CardName: 'Jegantha, the Wellspring',
            SetCode: 'IKO',
            SetName: 'Ikoria: Lair of Behemoths',
            CardNumber: 222,
            Condition: 'NM',
            Price: 3,
            CardType: 'Legendary Creature — Elemental Elk',
            ManaValue: '5',
            CardText: 'Companion — No card in your starting deck has more than one of the same mana symbol in its mana cost.\n{T}: Add {W}{U}{B}{R}{G}. This mana can\'t be spent to pay generic mana costs.',
            CreatedBy: 0,
            Image: '',
            Quantity: 5
        }
    ]

    getCardsList(): CardItem[]{
        return this.cardItemList;
    }

    getCardListWithFilters(category: string, search: string): CardItem[]{
        var result: CardItem[] = [];
        
        if(category !== ''){
            result = this.cardItemList.filter(cardItem =>
                cardItem.CardType.toLowerCase().includes(category.toLowerCase())
            );
        }
        
        if(category === '' && search !== ''){
            result = this.cardItemList;
        }
        
        if(search !== ''){
            result = result.filter(cardItem =>
                cardItem.CardName.toLowerCase().includes(search.toLowerCase())
            );
        }

        return result;
    }

    createOrUpdateCardItem(card: CardItem): boolean{
        if(card.Id === undefined || card.Id === 0){
            const newId = this.cardItemList.reduce((maxId, card) => {
                return Math.max(maxId, card.Id);
            }, 0) + 1;
            card.Id = newId;
            this.cardItemList.push(card);
            return true;
        }else{
            const index = this.cardItemList.findIndex(cardItem => cardItem.Id === card.Id);
            if(index !== -1){
                this.cardItemList[index] = card;
                return true;
            }
        }
        return false;
    }

    getCard(cardId: number): CardItem{
        return this.cardItemList.find(card => card.Id === cardId ) || {} as CardItem;
    }

    checkStock(cardId: number): boolean{
        return this.getCard(cardId).Quantity > 0;
    }

}