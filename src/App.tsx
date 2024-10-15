import React, { useState } from 'react';
import { ArrowRightLeft, Code2, Zap } from 'lucide-react';

const languages = ['JavaScript', 'Python', 'Java', 'C++', 'Ruby'];

function App() {
  const [inputCode, setInputCode] = useState('');
  const [outputCode, setOutputCode] = useState('');
  const [inputLang, setInputLang] = useState(languages[0]);
  const [outputLang, setOutputLang] = useState(languages[1]);

  const handleConvert = () => {
    setOutputCode(`Converted ${inputLang} code to ${outputLang}:\n\n${inputCode}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 flex flex-col items-center justify-center p-4 text-white">
      <div className="w-full max-w-5xl bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-2xl p-8 transition-all duration-300 hover:shadow-3xl border border-white border-opacity-20">
        <h1 className="text-4xl font-bold mb-8 text-center flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
          <Code2 className="mr-4 text-blue-300" size={36} />
          Code Converter
        </h1>
        <div className="flex justify-center items-center mb-6 space-x-4">
          <select
            className="bg-white bg-opacity-20 border border-white border-opacity-20 rounded-lg p-2 transition-all duration-300 hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={inputLang}
            onChange={(e) => setInputLang(e.target.value)}
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
          <ArrowRightLeft className="animate-pulse text-blue-300" size={24} />
          <select
            className="bg-white bg-opacity-20 border border-white border-opacity-20 rounded-lg p-2 transition-all duration-300 hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={outputLang}
            onChange={(e) => setOutputLang(e.target.value)}
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="inputCode" className="block text-sm font-medium text-blue-200">Input Code</label>
            <textarea
              id="inputCode"
              className="w-full h-64 bg-white bg-opacity-20 border border-white border-opacity-20 rounded-lg p-3 text-white placeholder-blue-200 resize-none transition-all duration-300 hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder={`Enter ${inputLang} code here`}
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="outputCode" className="block text-sm font-medium text-blue-200">Output Code</label>
            <textarea
              id="outputCode"
              className="w-full h-64 bg-white bg-opacity-20 border border-white border-opacity-20 rounded-lg p-3 text-white placeholder-blue-200 resize-none"
              placeholder="Converted code will appear here"
              value={outputCode}
              readOnly
            />
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-6 py-3 rounded-full font-semibold flex items-center transition-all duration-300 hover:from-blue-500 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-indigo-700"
            onClick={handleConvert}
          >
            <Zap className="mr-2" size={20} />
            Convert Code
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;