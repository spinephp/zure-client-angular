import { TestBed, inject, async } from '@angular/core/testing';
import { EvalReply, EvalReplyData, AEvalReply } from '../classes/eval-reply';
import { User, UserData } from '../classes/user';

describe('Grade', () => {
    let evalreply: EvalReply;
    let user: User;
    let evalreplydata: EvalReplyData[];
    let userdata: UserData[];
    beforeEach(() => {
        userdata = [
            {id: '3', username: 'liuxingming', picture: 'u00000003.png', nick: '', country: '48'},
            {id: '46', username: 'jinlihua', picture: 'u00000013.png', nick: '', country: '48'}
        ];
      evalreplydata = [
        {id: '1', evalid: 1, userid: 46, parentid: 0, content: 'fdasfa fdsaf', time: '2014-09-23 21:37:13'}
    ];
      user = new User(userdata);
      evalreply = new EvalReply(evalreplydata, user);
    });

    it('should be create', () => {
      expect(evalreply).toBeTruthy();
      expect(evalreply.data.length).toBe(evalreplydata.length);
    });

    it('function should have been called and return right value', () => {
        spyOn(AEvalReply.user, 'find').and.callThrough();
      const item = evalreply.findByEvalId(1);

      expect(item.length).toBe(1);
      expect(item[0].item).toBe(evalreplydata[0]);
      expect(item[0].value('username')).not.toBeDefined();
      expect(item[0].value('preusername')).not.toBeDefined();

      item[0].extends();
      expect(AEvalReply.user.find).toHaveBeenCalled();
      expect(AEvalReply.user.find).toHaveBeenCalledTimes(2);
      expect(item[0].value('username')).toBe(userdata[1].username);
      expect(item[0].value('preusername')).not.toBeDefined();
    });
  });
