import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

/**
 * @description
 * Funciones Mock para abordar la informacion del usuario.
 */
@Injectable({
    providedIn: 'root'
})

export class UserService {

    /**
     * Mock de listado de Usuarios de la aplicacion.
     */
    userList: User[] = [
        {
            id: 1,
            UserName: 'admin',
            FirstName: 'first',
            LastName: 'second',
            Password: 'admin',
            Email: 'mail@mail.cl',
            Role: 'admin',
            IsActive: true
        },
        {
            id: 2,
            UserName: 'user1',
            FirstName: 'prueba',
            LastName: 'prueba',
            Password: 'qwerty',
            Email: 'mail2@mail.cl',
            Role: 'user',
            IsActive: true
        }
    ];

    /**
     * Funcion Mock para crear usuarios.
     * Agrega un usuario a listado UsarList.
     * Valida que el nombre de usuario no se repita con los ya existentes.
     * Valida si email ya se encuentra en uso.
     * Se agrega un usario con id correlativo a los id existentes.
     * El rol por defecto es 'user' que representa un cliente normal.
     * @param userName Nombre de usuario
     * @param firstName Nombre
     * @param lastName Apellido
     * @param password Contrasena
     * @param email Correo Electronico
     * @returns booleno que indica si se logro crear el usuario.
     */
    createUser(userName: string, firstName: string, lastName: string, password: string, email: string): boolean{
        if(this.userList.find(user => user.UserName === userName) !== undefined){
            return false;
        }

        if(this.checkEmail(email)){
            return false;
        }

        let newUser: User = {} as User;
        const newId = this.userList.reduce((maxId, user) => {
            return Math.max(maxId, user.id);
        }, 0) + 1;

        newUser.id = newId;
        newUser.UserName = userName;
        newUser.FirstName = firstName;
        newUser.LastName = lastName;
        newUser.Password = password;
        newUser.Email = email;
        newUser.Role = 'user';
        newUser.IsActive = true;

        this.userList.push(newUser);

        return true;
    }

    /**
     * Funcion Mock para validar credenciales del usuario.
     * @param userName Nombre de usuario
     * @param password Contrasena del usuario
     * @returns Objeto User encontrado de lo contrario un objeto usuario vacio.
     */
    getUserAuth(userName: string, password: string): User{
        return this.userList.find(user => user.UserName === userName && user.Password === password) || {} as User;
    }

    /**
     * Funcion Mock para actualizar usuario.
     * Se Valida que encuentre en el listado (BD) segun id y nombre de usuario.
     * Si se encuentra se pisa objeto con nueva informacion.
     * @param updatedUser Objeto User con valores actualizados
     * @returns booleano si se logro actualizar usuario.
     */
    updateUser(updatedUser: User): boolean{
        const index = this.userList.findIndex(user => user.id === updatedUser.id && user.UserName === updatedUser.UserName);
        if(index !== -1){
            this.userList[index] = updatedUser;
            return true;
        }
        return false;
    }

    /**
     * Funcion Mock para deshabilitar usuario.
     */
    deactivateUser(){

    }

    /**
     * Funcion para validar si email ya se encuentra en uso
     */
    checkEmail(email: string): boolean{
        return (this.userList.find(user => user.Email === email) !== undefined)
    }
}