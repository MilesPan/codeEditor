// a-zA-Z0-9
export function randomString(length: number): string {
  const getRandomChar = () => {
    const chars = [
      () => String.fromCharCode(48 + Math.floor(Math.random() * 10)), // 0-9
      () => String.fromCharCode(65 + Math.floor(Math.random() * 26)), // A-Z
      () => String.fromCharCode(97 + Math.floor(Math.random() * 26)) // a-z
    ];
    return chars[Math.floor(Math.random() * chars.length)]();
  };

  return Array.from({ length }, getRandomChar).join('');
}

export function generateRoomId(): string {
  return randomString(8);
}

export function validRoomId(roomId: string): boolean {
  return /^[a-zA-Z0-9]+$/.test(roomId);
}

export function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// 判断是不是某些类型
export function isType(...args: ('Object' | 'Array' | 'Number' | 'String')[]) {
  return (target: any) => {
    return args.some(arg => Object.prototype.toString.call(target) === `[object ${arg}]`);
  };
}
