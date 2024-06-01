import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})

export class UserService {

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
    
    createUser(userName: string, firstName: string, lastName: string, password: string, email: string): boolean{
        if(this.userList.find(user => user.UserName === userName) === undefined){
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

        this.consoleLogForTesting();

        return true;
    }

    getUserAuth(userName: string, password: string): User{
        return this.userList.find(user => user.UserName === userName && user.Password === password) || {} as User;
    }

    updateUser(){

    }

    deactivateUser(){

    }

    consoleLogForTesting(){
        this.userList.forEach(user => {
            console.log('id: '+user.id+' userName: '+user.UserName);
        })
    }
}