import { TestBed } from "@angular/core/testing";
import { User } from "../models/user.model";
import { UserService } from "./user.service";

describe('User Service', () => {
    let userService: UserService;

    beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [UserService]
        });
        userService = TestBed.inject(UserService);
    });

    it('should be created', () => {
        expect(userService).toBeTruthy();
    });
    
    it('Prueba de Creacion de usuario', () => {

        let result: boolean = userService.createUser( 
            'UsuarioPrueba', 
            'NombreUsuario',
            'ApellidoUsuario',
            'Contrasena',
            'prueba@email.com'
        );

        expect(result).toBe(true);
    });

    it('Prueba de Creacion de Usuario repetido', () => {

        let resultUserRepetido: boolean = userService.createUser( 
            'user1', 
            'NombreUsuario',
            'ApellidoUsuario',
            'Contrasena',
            'prueba@email.com'
        );

        let resultEmailRepetido: boolean = userService.createUser( 
            'UsuarioPrueba', 
            'NombreUsuario',
            'ApellidoUsuario',
            'Contrasena',
            'mail2@mail.cl'
        );

        expect(resultUserRepetido).toBe(false);
        expect(resultEmailRepetido).toBe(false);
    });

    it('Prueba de login', () => {
        let notLogedUser = userService.getUserAuth('user1','qwerty1234');
        let logedUser = userService.getUserAuth('user1','qwerty');

        expect(notLogedUser.id == undefined).toBe(true);
        expect(logedUser.id).toBe(2);
    });
    
    it('Prueba de recuperacion de contraseña', () => {
        let token = userService.createRecovery('emailnoregistrado@mail.com');
        expect(token).toBe('');

        token = userService.createRecovery('mail2@mail.cl');

        let checkRecovery = userService.checkRecovery('');
        expect(checkRecovery).toBe('error de recuperacion');

        checkRecovery = userService.checkRecovery(token);
        expect(checkRecovery).toBe('');

        let updatePassword = userService.updatePassword(token,'Asd.1234');
        expect(updatePassword).toBe('');

        let logedUser = userService.getUserAuth('user1','Asd.1234');
        expect(logedUser.id).toBe(2);
    });
    
});
