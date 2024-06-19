import { LocalUserChoices } from '@livekit/components-react';
import { makeAutoObservable, computed, keys } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

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
  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: 'UserStore',
      properties: ['userInfo'],
      storage: window.localStorage
    }).then(r => console.log('持久化存储', r));
  }
  setUserInfo = (key: keyof typeof this.userInfo, value: string) => {
    this.userInfo[key] = value;
  };
  setUserChoice = (value: LocalUserChoices) => {
    this.userChoice = value
  };
  get hasUserInfo() {
    return Boolean(this.userInfo.roomId && this.userInfo.userName);
  }
}

export default new UserStore();
