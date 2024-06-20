import { LocalUserChoices } from '@livekit/components-react';
import { makeAutoObservable, computed, keys } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

type User = {
  name: string;
  clientId: string;
  color: string;
};
class UserStore {
  userInfo = {
    userName: '',
    roomId: ''
  };
  userChoice: LocalUserChoices = {
    audioDeviceId: '',
    audioEnabled: false,
    username: '',
    videoDeviceId: '',
    videoEnabled: false
  };

  users: Array<User> = [];
  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: 'UserStore',
      properties: ['userInfo', 'users'],
      storage: window.localStorage
    }).then(r => console.log('持久化存储', r));
  }
  setUserInfo = (key: keyof typeof this.userInfo, value: string) => {
    this.userInfo[key] = value;
  };
  setUserChoice = (value: LocalUserChoices) => {
    this.userChoice = value;
  };
  setUsers = (value: Array<User>) => {
    this.users = value;
  };
  get hasUserInfo() {
    return Boolean(this.userInfo.roomId && this.userInfo.userName);
  }
  get curUser() {
    return this.users.find(user => user.name === this.userChoice.username);
  }
}

export default new UserStore();
