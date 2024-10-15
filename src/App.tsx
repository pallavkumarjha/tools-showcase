import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Search, Moon, Sun, ExternalLink, Check } from 'lucide-react'

const tools = [
  { id: 1, name: 'JSON Formatter', description: 'Format and validate your JSON with ease', icon: '🔧', url: 'https://ai-json.vercel.app/' },
  { id: 2, name: 'Code Converter', description: 'Convert code between different programming languages', icon: '🐼', url: 'https://ai-codeswitch.vercel.app/' },
  { id: 3, name: 'Regex Generator', description: 'Generate regular expressions for your needs', icon: '🧬', url: 'https://ai-reg.vercel.app/' },
  { id: 4, name: 'Prompt Generator', description: 'Create engaging prompts for AI models', icon: '💡', url: 'https://ai-prompt-gen.vercel.app/' },
  { id: 5, name: 'Color Palette Generator', description: 'Generate beautiful color palettes for your projects', icon: '🎨', url: 'https://www.coolorbrew.art/' },
  // { id: 6, name: 'Markdown Editor', description: 'Write and preview Markdown in real-time', icon: '📝', url: '/markdown-editor' },
  // { id: 7, name: 'Image Optimizer', description: 'Optimize your images for web performance', icon: '🖼️', url: '/image-optimizer' },
  // { id: 8, name: 'CSS Flexbox Generator', description: 'Generate and visualize CSS Flexbox layouts', icon: '📏', url: '/flexbox-generator' },
]

export default function ToolShowcase() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredTools, setFilteredTools] = useState(tools)
  const pricingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  useEffect(() => {
    const filtered = tools.filter(tool =>
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredTools(filtered)
  }, [searchTerm])

  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
          <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-rose-500 dark:text-rose-400">ToolKit</span>
              </div>
              <div className="flex items-center space-x-4">
                <button onClick={scrollToPricing} className="text-gray-500 dark:text-gray-300 hover:text-rose-500 dark:hover:text-rose-400 transition-colors duration-200">
                  Pricing
                </button>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="bg-gray-200 dark:bg-gray-700 p-1 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-colors duration-200"
                >
                  {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </nav>
        </header>

        <main className="transition-colors duration-200">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl">
                  <span className="block">Discover Our</span>
                  <span className="block text-rose-500 dark:text-rose-400">Powerful Tools</span>
                </h1>
                <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                  Explore our collection of web tools designed to make your development process smoother and more efficient.
                </p>
              </motion.div>

              <div className="mt-10 max-w-xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search tools..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-6 py-3 rounded-full border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
                  />
                  <Search className="absolute right-4 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="mt-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTools.map((tool, index) => (
                    <motion.div
                      key={tool.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <a href={tool.url} target='_blank' className="block h-full">
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
                          <div className="p-6 flex-grow">
                            <div className="flex items-start">
                              <div className="flex-shrink-0 text-5xl group-hover:scale-110 transition-transform duration-300">{tool.icon}</div>
                              <div className="ml-4">
                                <h3 className="text-xl leading-6 font-semibold text-gray-900 dark:text-gray-100 group-hover:text-rose-500 dark:group-hover:text-rose-400 transition-colors duration-300">{tool.name}</h3>
                                <p className="mt-2 text-base text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-300">{tool.description}</p>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-between items-center">
                            <div className="text-sm font-medium text-rose-500 dark:text-rose-400 group-hover:text-rose-600 dark:group-hover:text-rose-300 transition-colors duration-300">
                              Use tool
                            </div>
                            <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-rose-500 dark:group-hover:text-rose-400 transition-colors duration-300" />
                          </div>
                        </div>
                      </a>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div ref={pricingRef} className="mt-20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl md:text-5xl">
                    <span className="block">Simple</span>
                    <span className="block text-rose-500 dark:text-rose-400">Pricing Plans</span>
                  </h2>
                  <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                    Choose the plan that works best for you and your projects.
                  </p>
                </motion.div>

                <div className="mt-10">
                  <div className="lg:max-w-4xl lg:mx-auto">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="px-6 py-8">
                          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Free</h3>
                          <p className="mt-4 text-gray-500 dark:text-gray-400">Perfect for getting started</p>
                          <p className="mt-8">
                            <span className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">$0</span>
                            <span className="text-base font-medium text-gray-500 dark:text-gray-400">/month</span>
                          </p>
                          <ul className="mt-8 space-y-4">
                            <li className="flex items-center">
                              <Check className="h-5 w-5 text-green-500" />
                              <span className="ml-3 text-gray-500 dark:text-gray-400">Access to all basic tools</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="h-5 w-5 text-green-500" />
                              <span className="ml-3 text-gray-500 dark:text-gray-400">Unlimited usage</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="h-5 w-5 text-green-500" />
                              <span className="ml-3 text-gray-500 dark:text-gray-400">
                                Community support
                              </span>
                            </li>
                          </ul>
                        </div>
                        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700">
                          <a href="mailto:pallavkumarjha26@gmail.com" className="w-full px-4 py-2 text-base font-medium text-white bg-rose-500 rounded-md hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-colors duration-200">Email Us</a>
                        </div>
                      </div>
                    </motion.div>

                    {/* <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="px-6 py-8">
                          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Pay What You Want</h3>
                          <p className="mt-4 text-gray-500 dark:text-gray-400">Support our project, get more features</p>
                          <p className="mt-8">
                            <span className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">$X</span>
                            <span className="text-base font-medium text-gray-500 dark:text-gray-400">/month</span>
                          </p>
                          <ul className="mt-8 space-y-4">
                            <li className="flex items-center">
                              <Check className="h-5 w-5 text-green-500" />
                              <span className="ml-3 text-gray-500 dark:text-gray-400">Access to all premium tools</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="h-5 w-5 text-green-500" />
                              <span className="ml-3 text-gray-500 dark:text-gray-400">Unlimited usage</span>
                            </li>
                            <li  className="flex items-center">
                              <Check className="h-5 w-5 text-green-500" />
                              <span className="ml-3 text-gray-500 dark:text-gray-400">Priority support</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="h-5 w-5 text-green-500" />
                              <span className="ml-3 text-gray-500 dark:text-gray-400">Early access to new features</span>
                            </li>
                          </ul>
                        </div>
                        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700">
                          <button className="w-full px-4 py-2 text-base font-medium text-white bg-rose-500 rounded-md hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-colors duration-200">
                            Choose Your Price
                          </button>
                        </div>
                      </div>
                    </motion.div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}