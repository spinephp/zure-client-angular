import { TestBed, inject, async } from '@angular/core/testing';
import { User, UserData } from '../classes/user';

describe('User', () => {
    let user: User;
    let userdata: UserData[];

    beforeEach(() => {
        userdata = [
            {id: '3', username: 'liuxingming', picture: 'u00000003.png', nick: '', country: '48'}
        ];
        user = new User(userdata);
    });

    it('should be create', () => {
      expect(user).toBeTruthy();
    });

    it('function should have been called and return right value', () => {
      const item = user.find(3);
      expect(item.item).toBe(userdata[0]);

      const name = item.getName();
      expect(name).toBe(userdata[0].username);
    });
  });
