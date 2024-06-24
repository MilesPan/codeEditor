import { Info } from 'lucide-react';
import { useState } from 'react';
import { Language } from '@Request/index';

export const languages = [
  {
    name: 'C++',
    value: Language.Cpp,
    defaultCode: '// C++ code here',
    info: 'C++ is a powerful, high-performance language.'
  },
  {
    name: 'Java',
    value: Language.Java,
    defaultCode: '// Java code here',
    info: 'Java is widely used in enterprise environments.'
  },
  {
    name: 'Python',
    value: Language.Python2,
    defaultCode: '# Python code here',
    info: 'Python is great for data science.'
  },
  {
    name: 'Python3',
    value: Language.Python3,
    defaultCode: '# Python 3 code here',
    info: 'Python 3 is the latest version of Python.'
  },
  {
    name: 'C',
    value: Language.C,
    defaultCode: '// C code here',
    info: 'C is a general-purpose programming language.'
  },
  {
    name: 'C#',
    value: Language.Csharp,
    defaultCode: '// C# code here',
    info: 'C# is a modern, object-oriented language.'
  },
  {
    name: 'JavaScript',
    value: Language.Javascript,
    defaultCode: '// JavaScript code here',
    info: 'JavaScript is a versatile language.'
  },
  {
    name: 'TypeScript',
    value: Language.Typescript,
    defaultCode: '// TypeScript code here',
    info: 'TypeScript is a typed superset of JavaScript.'
  },
  {
    name: 'PHP',
    value: Language.Php,
    defaultCode: '<?php // PHP code here ?>',
    info: 'PHP is a popular server-side scripting language.'
  },
  {
    name: 'Swift',
    value: Language.Swift,
    defaultCode: '// Swift code here',
    info: 'Swift is a powerful and intuitive language for macOS, iOS, watchOS, and tvOS.'
  },
  {
    name: 'Kotlin',
    value: Language.Kotlin,
    defaultCode: '// Kotlin code here',
    info: 'Kotlin is a modern, statically typed programming language.'
  },
  {
    name: 'Dart',
    value: Language.Dart,
    defaultCode: '// Dart code here',
    info: 'Dart is optimized for UI, developed by Google.'
  },
  {
    name: 'Go',
    value: Language.Go,
    defaultCode: '// Go code here',
    info: 'Go is an open-source programming language that makes it easy to build simple, reliable, and efficient software.'
  },
  {
    name: 'Ruby',
    value: Language.Ruby,
    defaultCode: '# Ruby code here',
    info: 'Ruby is a dynamic, open-source programming language with a focus on simplicity and productivity.'
  },
  {
    name: 'Rust',
    value: Language.Rust,
    defaultCode: '// Rust code here',
    info: 'Rust is a systems programming language focused on safety and performance.'
  }
];

const LanguageSelector = ({
  currentLanguage,
  onChange
}: {
  currentLanguage: Language;
  onChange: (lang: Language) => void;
}) => {
  const [hoveredLang, setHoveredLang] = useState(languages.find(lang => lang.name === currentLanguage)?.value || '');
  return (
    <>
      <div className=" language-selector flex flex-col flex-wrap max-h-64  gap-1 items-center justify-center px-2 py-1">
        {languages.map((lang, index) => {
          return (
            <div
              key={lang.value}
              className={`flex items-center justify-between w-28 overflow-y-auto _hoverTag py-1 language-item cursor-pointer ${
                currentLanguage === lang.name ? '_hoveredTag' : ''
              }`}
              onMouseEnter={() => setHoveredLang(lang.value)}
              onMouseLeave={() => setHoveredLang('')}
              onClick={() => onChange(lang.value)}
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
};

export default LanguageSelector;
