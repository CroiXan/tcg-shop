import { TestBed } from '@angular/core/testing';
import * as CardItemJsonList from '../../../assets/cards.json';
import { CardsService } from './cards.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CardItem } from '../../models/carditem.model';
import { BehaviorSubject, Subject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('CardsService', () => {
  let service: CardsService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get','post']);
    service = new CardsService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Obtener Listado de Cartas', () => {
    const dummyData = CardItemJsonList as CardItem[];

    httpClientSpy.get.and.returnValue(of(dummyData));

    service.getAllCards().subscribe(data => {
      expect(data.length).toBe(21);
      expect(data).toEqual(dummyData);
    });

  });

  it('Editar Carta en Catalogo', () => {
    let dummyData = CardItemJsonList as CardItem[];

    httpClientSpy.get.and.returnValue(of(dummyData));

    dummyData[0].CardName = 'OKO';

    httpClientSpy.post.and.returnValue(new Subject<any>().asObservable());

    service.editCardsJson(dummyData).subscribe(data => {
      service.getAllCards().subscribe(data => {
        expect(data.length).toBe(21);
        expect(data[0].CardName).toEqual('OKO');
      });
    });

  });

  it('Crear Carta en Catalogo', () => {
    let dummyData = CardItemJsonList as CardItem[];
    let newCard = {} as CardItem;

    httpClientSpy.get.and.returnValue(of(dummyData));
    httpClientSpy.post.and.returnValue(new Subject<any>().asObservable());

    newCard.CardName = 'Prueba';
    newCard.CardNumber = 123;
    newCard.SetName = 'Testing';
    newCard.SetCode = 'TST';

    dummyData[21] = newCard;

    service.editCardsJson(dummyData).subscribe(data => {
      service.getAllCards().subscribe(data => {
        expect(data.length).toBe(22);
        expect(data[21].CardName).toEqual('Prueba');
        expect(data[21].CardNumber).toBe(123);
        expect(data[21].SetName).toEqual('Testing');
        expect(data[21].SetCode).toEqual('TST');
      });
    });

  });

});
