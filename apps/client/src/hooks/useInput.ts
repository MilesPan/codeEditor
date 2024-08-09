import { useState } from "react";

//  只允许输入数字和英文字母，并且不允许数字开头
export function useFunctionName(defaultValue: string): [string, (val: string) => void] {
  const [val, setVal] = useState(defaultValue);
  const handleChange = (val: string) => {
    val = val.replace(/[^a-zA-Z0-9]/g, '');
    if (/^\d/.test(val)) {
      val = val.replace(/^\d+/, '');
    }
    setVal(val);
  };
  return [val, handleChange];
}
