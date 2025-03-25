import { Info } from 'lucide-react';
import { memo, useState } from 'react';
import { Language } from '@Request/index';

export type LanguageItemType = {
  name: string;
  value: Language;
  defaultCode: string;
  info: string;
  isDisabled?: boolean;
};
export const languages: LanguageItemType[] = [
  {
    name: 'JavaScript',
    value: Language.nodejs,
    defaultCode: `function main() {
  console.log("Hello, World!");
}`,
    info: 'JavaScript is a versatile language.'
  },
  {
    name: 'TypeScript',
    value: Language.ts,
    defaultCode: `function main(): void {
  console.log("Hello, World!");
}`,
    info: 'TypeScript is a typed superset of JavaScript.'
  },
  {
    name: 'C++',
    value: Language.cpp,
    defaultCode: '// C++ code here',
    info: 'C++ is a powerful, high-performance language.',
    isDisabled: true
  },
  {
    name: 'Java',
    value: Language.java,
    defaultCode: '// Java code here',
    info: 'Java is widely used in enterprise environments.',
    isDisabled: true
  },
  {
    name: 'Python3',
    value: Language.python3,
    defaultCode: '# Python 3 code here',
    info: 'Python 3 is the latest version of Python.',
    isDisabled: true
  },
  {
    name: 'C',
    value: Language.c,
    defaultCode: '// C code here',
    info: 'C is a general-purpose programming language.',
    isDisabled: true
  },
  {
    name: 'PHP',
    value: Language.php,
    defaultCode: '<?php // PHP code here ?>',
    info: 'PHP is a popular server-side scripting language.',
    isDisabled: true
  },
  {
    name: 'Go',
    value: Language.go,
    defaultCode: '// Go code here',
    info: 'Go is an open-source programming language that makes it easy to build simple, reliable, and efficient software.',
    isDisabled: true
  },
  {
    name: 'Rust',
    value: Language.rust,
    defaultCode: '// Rust code here',
    info: 'Rust is a systems programming language focused on safety and performance.',
    isDisabled: true
  }
];

const LanguageSelector = memo(
  ({
    currentLanguage,
    onChange
  }: {
    currentLanguage: Language | undefined;
    onChange: (lang: LanguageItemType) => void;
  }) => {
    const [hoveredLang, setHoveredLang] = useState(languages.find(lang => lang.name === currentLanguage)?.value || '');
    return (
      <>
        <div className=" language-selector flex flex-col flex-wrap max-h-64  gap-1 items-center px-2 py-1">
          {languages.map(lang => {
            return (
              <div
                key={lang.value}
                className={`flex items-center justify-between w-28 overflow-y-auto _hoverTag py-1 language-item  ${lang.isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${
                  currentLanguage === lang.name ? '_hoveredTag' : ''
                }`}
                onMouseEnter={() => setHoveredLang(lang.value)}
                onMouseLeave={() => setHoveredLang('')}
                onClick={() => onChange(lang)}
              >
                <span>{lang.name}</span>
                {hoveredLang === lang.value && (
                  <Info
                    size={15}
                    onClick={e => {
                      e.stopPropagation(); // 阻止冒泡以防止触发 onChange
                      alert(lang.info);
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </>
    );
  }
);

export default LanguageSelector;
