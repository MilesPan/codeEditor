declare global {
  interface ResponseResult<T> {
    code: string;
    msg: string;
    data: T;
  }

  type JSONString<T> = string & { _: never; __: T };

  interface JSON {
    stringify<T>(value: T): JSONString<T>;
    parse<T>(text: JSONString<T>): T;
  }
}
export {}
