export class Model {
  private type: number;
    private active: number[];
    private fun: any[];
    public data: string[];
    public info: string[];
    public errinfo: string[];
    public color: string[];
constructor(
    ) {
      this.type = -1;
      this.init();
    }
    regex = [
      /^[a-zA-Z]{1}[a-zA-Z0-9\-\_\@\.]{4,16}[a-zA-Z0-9]{1}$/,
      /^[\w\-\!\@\#\$\%\^\&\*]{6,16}$/,
      /^[\w\-\!\@\#\$\%\^\&\*]{6,16}$/,
      /^\w+((-\w+)|(\.\w+))*\@\w+((\.|-)\w+)*\.\w+$/,
      /^[a-zA-Z0-9]{4}$/
    ];
    init() {
      this.data = [null, null, null, null, null];
      this.info = ['Enter user name', 'Enter password', 'Re-enter password', 'Enter email', 'Enter code'];
      this.errinfo = ['Invalid user name', 'Invalid password', 'Invalid password', 'Invalid email', 'Invalid code'];
      this.color = ['#999', '#999', '#999', '#999', '#999'];
    }
    get(index: number): string {
        return this.data[index];
    }
    set(index: number, value: string) {
        this.data[index] = value;
    }
    setActive(type: number) {
      if (type !== this.type) {
        switch (type) {
          case 0: // 注册
            this.active = [0, 1, 2, 3, 4];
            this.fun = [this.checkUserName, undefined, this.check2password, undefined, undefined];
            break;
          case 1: // 登录
            this.active = [0, 1, -1, -1, 4];
            this.fun = [undefined, undefined, undefined, undefined, undefined];
            break;
          case 2: // 重置密码
            this.active = [0, -1, -1, 3, 4];
            this.fun = [undefined, undefined, undefined, undefined, undefined];
            break;
        }
        this.init();
        this.type = type;
      }
    }
    setInfo(index: number, value: string, color: string) {
      this.info[index] = value;
      this.color[index] = color;
    }
    validateInput(index, that) {
      let result = true;
      if (this.data[index] !== null && this.regex[index].test(this.data[index])) {
          this.info[index]  = 'Pass';
          this.color[index] = 'green';
      } else {
        // ev.target.focus();
        this.info[index]  = this.errinfo[index];
        this.color[index] = 'red';
        result = false;
      }
      if (result) {
        if (this.fun[index] !== undefined) {
          result = this.fun[index](that);
        }
      }
      return result;
    }

    validateAll(that) {
        for (const i in this.data) {
            if (this.data[i] !== null) {
                if (!this.validateInput(i, that)) {
                    return i;
                }
            }
        }
        return -1;
    }
    equal2password() {
      return this.data[1] === this.data[2];
    }
  // AJAX 检查用户名是否存在，如用户名存在，用绿色在 username_err_info 指定处显示"通过"，
  // 否则用红色在 username_err_info 指定处显示"用户名已存在"或其它错误信息。
  // @param string value - 包含用户名的字符串
  checkUserName(that) {
    // const that = this;
    const param = {
      filter: JSON.stringify(['id', 'username']),
      cond: JSON.stringify([{ field: 'username', value: that.model.data[0], operator: 'eq' }]),
      token: that.ls.get('sessionid')
    };
    const url = '/woo/index.php? cmd=Person';
    return that.requestService.get(url, param).then(rs => { // 从远程服务器取用户名
      if (rs.length !== 0) {
        that.model.info[0] = 'User name already exists';
        that.model.color[0] = 'red';
      } else {
        that.model.info[0] = 'Pass';
        that.model.color[0] = 'green';
      }
      return rs;
    });
  }
    check2password(that): boolean {
        let result = true;
        if (that.model.data[1] === that.model.data[2]) {
          that.model.info[2]  = 'Pass';
          that.model.color[2] = 'green';
        } else {
          if ( +that.model.data[2].length > 0) {
            that.model.info[2]  = 'Two passwords are different';
            that.model.color[2] = 'red';
            that.logonInputs._results[2].nativeElement.select();
          } else {
            that.model.info[2]  = 'Re-enter password';
            that.model.color[2] = '#999';
          }
          result = false;
        }
        return result;
    }

    canSubmit(): boolean {
        let result = true;
        for (const i of this.active) {
          if (i >= 0 && this.info[i] !== 'Pass') {
            result = false;
            break;
          }
        }
        return result;
    }
}
