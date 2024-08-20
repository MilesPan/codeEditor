export namespace Debugger {
  export interface PropertyItemType {
    name: string;
    value: { subtype?: string, preview?: any; type: string; value: string; description: string; objectId?: string; className?: string };
    writable: boolean;
    configurable: boolean;
    enumerable: boolean;
    isOwn: boolean;
  }
  export interface CallFrameItemType {
    callFrameId: string;
    functionName: string;
    functionLocation: Location;
    location: Location;
    url: string;
    scopeChain: ScopeChain[];
    this: This;
  }
  // setBreakpointByUrl的参数类型
  export interface SetBreakpointByUrlParamType {
    urlRegex?: string;
    url?: string;
    lineNumber: number;
    columnNumber: number;
    condition: string;
  }
  // getProperties的参数类型
  export interface GetPropertiesParamType {
    objectId: string;
    ownProperties: boolean;
    accessorPropertiesOnly: boolean;
    nonIndexedPropertiesOnly: boolean;
    generatePreview: boolean;
  }
  export interface Location {
    scriptId: string;
    lineNumber: number;
    columnNumber: number;
  }

  export interface ScopeChain {
    type: ScopeChainType;
    object: This;
    startLocation?: Location;
    endLocation?: Location;
    name?: string;
  }

  export interface This {
    type: ThisType;
    className?: ClassName;
    description?: string;
    objectId?: string;
  }

  export enum ClassName {
    Function = 'Function',
    Global = 'global',
    Module = 'Module',
    Object = 'Object'
  }

  export enum ThisType {
    Function = 'function',
    Object = 'object',
    Undefined = 'undefined'
  }

  export enum ScopeChainType {
    Block = 'block',
    Closure = 'closure',
    Global = 'global',
    Local = 'local'
  }
}
