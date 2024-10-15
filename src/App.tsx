import { useState } from 'react';
import { Code2, CoffeeIcon, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import OpenAI from 'openai';
import CodeEditor from './code-editor';

const languages = ['JavaScript', 'Python', 'Java', 'C++', 'Ruby'];

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export default function AICodeConverter() {
  const [inputCode, setInputCode] = useState('');
  const [outputCode, setOutputCode] = useState('');
  const [outputLang, setOutputLang] = useState(languages[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConvert = async () => {
    setIsLoading(true);
    setError('');
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: `You are a helpful assistant that converts code to ${outputLang}. Please ensure the converted code is syntactically correct and optimized for performance. Respond only with the converted code, nothing else.` },
          { role: "user", content: `Convert this code to ${outputLang}: ${inputCode}` }
        ],
        model: "gpt-3.5-turbo",
      });

      setOutputCode(completion.choices[0].message.content || 'No conversion result received.');
    } catch (aiError) {
      setError('Failed to convert code: ' + (aiError as Error).message);
      setOutputCode('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex flex-col">
      <main className="flex-grow flex items-center justify-center p-8 sm:p-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full w-4/5 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-2xl p-6 sm:p-8 border border-white border-opacity-20"
        >
          <motion.h1 
            className="text-3xl sm:text-4xl font-bold mb-6 text-center flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Code2 className="mr-4 text-blue-300" size={36} />
            AI Code Converter
          </motion.h1>
          
          <div className="flex flex-col sm:flex-row justify-center items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
            <p className='text-white'>Convert to</p>
            <select
              className="bg-white bg-opacity-20 border border-white border-opacity-20 rounded-lg p-2 transition-all duration-300 hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-blue-300 text-white"
              value={outputLang}
              onChange={(e) => setOutputLang(e.target.value)}
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div 
              className="space-y-2"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
            <CodeEditor onChangeCode={setInputCode} inputCode={inputCode} showCodeSwitcher={true} />
              {/* <textarea
                id="inputCode"
                className="w-full h-64 bg-white bg-opacity-20 border border-white border-opacity-20 rounded-lg p-3 text-white placeholder-blue-200 resize-none transition-all duration-300 hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Enter code here"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
              /> */}
            </motion.div>
            <motion.div 
              className="space-y-2"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
            <CodeEditor onChangeCode={setInputCode} inputCode={outputCode} showCodeSwitcher={false} />
              {/* <textarea
                id="outputCode"
                className="w-full h-64 bg-white bg-opacity-20 border border-white border-opacity-20 rounded-lg p-3 text-white placeholder-blue-200 resize-none"
                placeholder="Converted code will appear here"
                value={outputCode}
                readOnly
              /> */}
            </motion.div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-4 text-red-300 text-center"
            >
              {error}
            </motion.div>
          )}

          <div className="mt-6 flex justify-center">
            <motion.button
              className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-6 py-3 rounded-full font-semibold flex items-center transition-all duration-300 hover:from-blue-500 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-indigo-700"
              onClick={handleConvert}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Zap className="mr-2" size={20} />
                </motion.div>
              ) : (
                <Zap className="mr-2" size={20} />
              )}
              {isLoading ? 'Converting...' : 'Convert Code'}
            </motion.button>
          </div>
        </motion.div>
      </main>

      <footer className="bg-gray-900 text-white mt-12">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-center text-sm">
            &copy; 2024 AI Code Converter. All rights reserved.
          </p>
          <button
            onClick={() => window.open('https://buymeacoffee.com/pallavjha', '_blank')}
            className="inline-flex items-center px-4 py-2 text-sm bg-transparent hover:bg-white hover:bg-opacity-10 rounded-md transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <CoffeeIcon style={{ marginRight: '12px' }} />
            Buy Me a Coffee
          </button>
        </div>
      </footer>
    </div>
  );
}