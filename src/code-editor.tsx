import { useEffect, useState } from 'react'
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Loader2 } from 'lucide-react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'

const languages = ['JavaScript', 'Python', 'Java', 'C++', 'Ruby'];


export default function CodeEditor({onChangeCode, inputCode, showCodeSwitcher}) {
  const [code, setCode] = useState(inputCode || '')
  const [language, setLanguage] = useState('javascript')
  const [theme] = useState('dark')

//   console.log('inputCode', inputCode)

  const handleLanguageChange = (value: string) => {
    setLanguage(value)
  }

  useEffect(() => {
    setCode(inputCode)
  }, [inputCode])

//   const handleThemeChange = () => {
//     setTheme(theme === 'dark' ? 'light' : 'dark')
//   }

  const handleCodeChange = (value: string) => {
    setCode(value)
    onChangeCode(value)
  }

  const getLanguageExtension = () => {
    switch (language) {
      case 'javascript':
        return javascript()
      case 'python':
        return python()
      case 'html':
        return html()
      case 'css':
        return css()
      default:
        return javascript()
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <CodeMirror
        value={code}
        height="400px"
        theme={theme === 'dark' ? vscodeDark : undefined}
        extensions={[getLanguageExtension()]}
        onChange={handleCodeChange}
        className="border rounded"
      />
      { showCodeSwitcher && ( <div className="mb-4 flex justify-between items-center">
        <div className='mt-2'>
            <label className="text-sm font-medium text-blue-200 mr-4">Editor theme</label>
            <select
                className="bg-white bg-opacity-20 border border-white border-opacity-20 rounded-lg p-2 transition-all duration-300 hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-blue-300 text-white"
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
            >
                {languages.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
                ))}
            </select>
        </div>


      </div>)}
    </div>
  )
}