import { message } from 'antd';
import { useEffect, useState } from 'react';

export function useCopy(initValue?: string) {
  const [copiedText, setCopiedText] = useState<string | null | undefined>(initValue);
  const copy = async (text: string) => {
    if (!navigator?.clipboard) {
      message.error('浏览器不支持剪贴板');
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
    } catch (error) {
      message.error('复制失败');
      setCopiedText(null);
    }
  };

  useEffect(() => {
    if (initValue) {
      copy(initValue);
    }
  }, [initValue]);

  return [copiedText, copy] as const;
}
