import { Info } from 'lucide-react';
import { useState } from 'react';

export const languages = [
  { name: 'C++', value: 'cpp', defaultCode: '// C++ code here', info: 'C++ is a powerful, high-performance language.' },
  {
    name: 'Java',
    value: 'java',
    defaultCode: '// Java code here',
    info: 'Java is widely used in enterprise environments.'
  },
  { name: 'Python', value: 'python', defaultCode: '# Python code here', info: 'Python is great for data science.' },
  {
    name: 'Python3',
    value: 'python3',
    defaultCode: '# Python 3 code here',
    info: 'Python 3 is the latest version of Python.'
  },
  { name: 'C', value: 'c', defaultCode: '// C code here', info: 'C is a general-purpose programming language.' },
  { name: 'C#', value: 'csharp', defaultCode: '// C# code here', info: 'C# is a modern, object-oriented language.' },
  {
    name: 'JavaScript',
    value: 'javascript',
    defaultCode: '// JavaScript code here',
    info: 'JavaScript is a versatile language.'
  },
  {
    name: 'TypeScript',
    value: 'typescript',
    defaultCode: '// TypeScript code here',
    info: 'TypeScript is a typed superset of JavaScript.'
  },
  {
    name: 'PHP',
    value: 'php',
    defaultCode: '<?php // PHP code here ?>',
    info: 'PHP is a popular server-side scripting language.'
  },
  {
    name: 'Swift',
    value: 'swift',
    defaultCode: '// Swift code here',
    info: 'Swift is a powerful and intuitive language for macOS, iOS, watchOS, and tvOS.'
  },
  {
    name: 'Kotlin',
    value: 'kotlin',
    defaultCode: '// Kotlin code here',
    info: 'Kotlin is a modern, statically typed programming language.'
  },
  {
    name: 'Dart',
    value: 'dart',
    defaultCode: '// Dart code here',
    info: 'Dart is optimized for UI, developed by Google.'
  },
  {
    name: 'Go',
    value: 'go',
    defaultCode: '// Go code here',
    info: 'Go is an open-source programming language that makes it easy to build simple, reliable, and efficient software.'
  },
  {
    name: 'Ruby',
    value: 'ruby',
    defaultCode: '# Ruby code here',
    info: 'Ruby is a dynamic, open-source programming language with a focus on simplicity and productivity.'
  },
  {
    name: 'Scala',
    value: 'scala',
    defaultCode: '// Scala code here',
    info: 'Scala combines object-oriented and functional programming.'
  },
  {
    name: 'Rust',
    value: 'rust',
    defaultCode: '// Rust code here',
    info: 'Rust is a systems programming language focused on safety and performance.'
  },
  {
    name: 'Racket',
    value: 'racket',
    defaultCode: '#lang racket\n; Racket code here',
    info: 'Racket is a general-purpose, multi-paradigm programming language.'
  },
  {
    name: 'Erlang',
    value: 'erlang',
    defaultCode: '% Erlang code here',
    info: 'Erlang is a programming language used to build massively scalable soft real-time systems.'
  },
  {
    name: 'Elixir',
    value: 'elixir',
    defaultCode: '# Elixir code here',
    info: 'Elixir is a dynamic, functional language designed for building scalable and maintainable applications.'
  }
];

const LanguageSelector = ({
  currentLanguage,
  onChange
}: {
  currentLanguage: string;
  onChange: (lang: string) => void;
}) => {
  console.log('languageSelector render')
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
              onClick={() => onChange(lang.name)}
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
