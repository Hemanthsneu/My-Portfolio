import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, VolumeX, X, Brain, Sparkles } from 'lucide-react';

interface VoiceAgentProps {
  className?: string;
}

const VoiceAgent: React.FC<VoiceAgentProps> = ({ className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [response, setResponse] = useState('');
  const [conversation, setConversation] = useState<Array<{ id: string, type: 'user' | 'agent', content: string, timestamp: Date }>>([]);
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState('');
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Portfolio knowledge base
  // Portfolio knowledge base (Placeholder for future use or can be removed if strictly linting)
  // const portfolioData = { ... };

  // Load and select the best English female voice
  const loadVoices = useCallback(() => {
    if (synthRef.current) {
      const voices = synthRef.current.getVoices();
      setAvailableVoices(voices);

      // Blacklist of voices that might sound scary or robotic
      const voiceBlacklist = [
        'albert', 'alex', 'bad', 'bahh', 'bells', 'boing', 'bubbles', 'cellos',
        'deranged', 'good', 'hysterical', 'junior', 'pipe', 'trinoids', 'whisper',
        'zarvox', 'robot', 'machine', 'synthetic', 'artificial', 'scary', 'spooky',
        'monster', 'demon', 'ghost', 'creepy', 'horror', 'dark', 'evil', 'deep'
      ];

      // Filter out blacklisted voices
      const safeVoices = voices.filter(voice =>
        !voiceBlacklist.some(blacklisted =>
          voice.name.toLowerCase().includes(blacklisted)
        )
      );

      // Priority order for voice selection - ONLY gentle, pleasant voices
      const voicePreferences = [
        // Specifically gentle British English Female voices
        (v: SpeechSynthesisVoice) => v.name.includes('Emma') && v.lang.includes('en-GB'),
        (v: SpeechSynthesisVoice) => v.name.includes('Kate') && v.lang.includes('en-GB'),
        (v: SpeechSynthesisVoice) => v.name.includes('Serena') && v.lang.includes('en-GB'),
        (v: SpeechSynthesisVoice) => v.name.includes('Amy') && v.lang.includes('en-GB'),

        // Gentle American English Female voices
        (v: SpeechSynthesisVoice) => v.name.includes('Samantha') && v.lang.includes('en-US'),
        (v: SpeechSynthesisVoice) => v.name.includes('Victoria') && v.lang.includes('en-US'),
        (v: SpeechSynthesisVoice) => v.name.includes('Allison') && v.lang.includes('en-US'),
        (v: SpeechSynthesisVoice) => v.name.includes('Susan') && v.lang.includes('en-US'),

        // Safe female voices only
        (v: SpeechSynthesisVoice) => v.lang.includes('en-GB') && v.name.toLowerCase().includes('female'),
        (v: SpeechSynthesisVoice) => v.lang.includes('en-US') && v.name.toLowerCase().includes('female'),

        // Pleasant female names only
        (v: SpeechSynthesisVoice) => v.lang.includes('en') && (
          ['anna', 'bella', 'claire', 'diana', 'elena', 'fiona', 'grace', 'helen',
            'iris', 'julia', 'laura', 'maria', 'nina', 'olivia', 'rachel', 'sarah',
            'tessa', 'victoria', 'wendy', 'lily', 'rose', 'sophie', 'emily', 'charlotte'].some(name =>
              v.name.toLowerCase().includes(name)
            )
        ),

        // Final fallback - any gentle English voice (exclude male-sounding names)
        (v: SpeechSynthesisVoice) => v.lang.includes('en-GB') &&
          !['daniel', 'david', 'james', 'john', 'michael', 'robert', 'thomas', 'william', 'alex'].some(male =>
            v.name.toLowerCase().includes(male)
          ),
      ];

      // Find the best SAFE voice based on preferences
      for (const preference of voicePreferences) {
        const voice = safeVoices.find(preference);
        if (voice) {
          setSelectedVoice(voice);
          console.log('Selected safe voice:', voice.name, voice.lang);
          return;
        }
      }

      // If no safe voice found, disable voice features
      console.log('No safe voice found, disabling voice features');
      setSelectedVoice(null);
    }
  }, []);

  // Enhanced text-to-speech function with proper English voice
  const speak = useCallback((text: string) => {
    if (synthRef.current && text && selectedVoice) {
      synthRef.current.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = selectedVoice;
      utterance.rate = 0.75;
      utterance.pitch = 1.2;
      utterance.volume = 0.7;

      const enhancedText = text
        .replace(/\./g, '. ')
        .replace(/,/g, ', ')
        .replace(/!/g, '.')
        .replace(/\?/g, '?');

      utterance.text = enhancedText;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => {
        setIsSpeaking(false);
        console.log('Speech error - stopping voice');
      };

      if (selectedVoice) {
        synthRef.current.speak(utterance);
      }
    }
  }, [selectedVoice]);

  // Process user queries and generate responses
  const processQuery = useCallback((query: string) => {
    setIsProcessing(true);
    const lowerQuery = query.toLowerCase();

    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      content: query,
      timestamp: new Date()
    };

    setConversation(prev => [...prev, userMessage]);

    let agentResponse = '';

    if (lowerQuery.includes('name') || lowerQuery.includes('who are you') || lowerQuery.includes('introduce')) {
      agentResponse = `Hello! I'm Hemanth's personal AI assistant. Hemanth Saragadam is a talented Senior Software Engineer currently working at Labs196 Innovations. He's quite passionate about full-stack development, cloud technologies, and building scalable applications that make a real difference.`;
    }
    else if (lowerQuery.includes('experience') || lowerQuery.includes('work') || lowerQuery.includes('job')) {
      agentResponse = `Hemanth has quite impressive experience! He's currently serving as a Senior Software Engineer at Labs196 Innovations since September 2024, where he leads full-stack development initiatives. Previously, he contributed as a Full Stack Developer at Northeastern University and worked as a Software Engineer at KYC Hub. He's skilled with modern technologies including React, Node.js, AWS, and Golang.`;
    }
    else if (lowerQuery.includes('skill') || lowerQuery.includes('technology') || lowerQuery.includes('programming')) {
      agentResponse = `Hemanth possesses quite diverse technical expertise! He's proficient in various programming languages such as Swift, Java, Python, JavaScript, TypeScript, and Go. For web development, he excels with React, Angular, Next.js, and Node.js. He's also well-versed in cloud platforms like AWS and GCP, along with databases including MySQL, MongoDB, and PostgreSQL.`;
    }
    else if (lowerQuery.includes('project') || lowerQuery.includes('build') || lowerQuery.includes('develop')) {
      agentResponse = `Hemanth has developed some truly fascinating projects! His recent work includes a Geo-Anonymous Chat App for iOS using Swift and Firebase, an Assignment Management System with Node.js and AWS, and a Healthcare Progressive Web Application with offline capabilities. Each project beautifully showcases his full-stack expertise and attention to detail.`;
    }
    else if (lowerQuery.includes('contact') || lowerQuery.includes('reach') || lowerQuery.includes('email') || lowerQuery.includes('phone')) {
      agentResponse = `You can easily reach Hemanth at hemanthsaragadam.dev@gmail.com or give him a call at +1(857)-313-2694. He's also quite active on LinkedIn at linkedin.com/in/hemanths31 and you can find his work on GitHub at github.com/Hemanthsneu. He's currently based in the lovely city of Boston, Massachusetts.`;
    }
    else if (lowerQuery.includes('education') || lowerQuery.includes('study') || lowerQuery.includes('university')) {
      agentResponse = `Hemanth has a solid educational foundation in computer science and gained valuable academic and practical experience during his time as a Full Stack Developer at Northeastern University, where he honed both his technical skills and collaborative abilities.`;
    }
    else if (lowerQuery.includes('hire') || lowerQuery.includes('available') || lowerQuery.includes('opportunity')) {
      agentResponse = `Hemanth is always open to discussing exciting new opportunities and meaningful collaborations! While he's currently contributing at Labs196 Innovations, he's genuinely interested in challenging projects that push boundaries. I'd highly recommend reaching out to him directly via email or LinkedIn to explore potential opportunities.`;
    }
    else if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery.includes('hey')) {
      agentResponse = `Hello there! Lovely to meet you! I'm Hemanth's AI assistant, and I'm delighted to help. I can tell you all about his professional experience, technical skills, exciting projects, and how to get in touch with him. What would you particularly like to know?`;
    }
    else {
      agentResponse = `That's quite an interesting question! I'd be happy to help you learn more about Hemanth. I can share details about his professional experience, technical expertise, innovative projects, contact information, or career background. What specific aspect interests you most?`;
    }

    const agentMessage = {
      id: (Date.now() + 1).toString(),
      type: 'agent' as const,
      content: agentResponse,
      timestamp: new Date()
    };

    setConversation(prev => [...prev, agentMessage]);
    setResponse(agentResponse);
    setIsProcessing(false);

    speak(agentResponse);
  }, [speak]);

  // Initialize speech recognition and synthesis
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const speechSynthesis = window.speechSynthesis;

      if (SpeechRecognition && speechSynthesis) {
        setIsSupported(true);
        synthRef.current = speechSynthesis;

        loadVoices();
        if (speechSynthesis.onvoiceschanged !== undefined) {
          speechSynthesis.onvoiceschanged = loadVoices;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          setIsListening(true);
          setError('');
        };

        recognition.onresult = (event) => {
          const lastResult = event.results[event.results.length - 1];
          if (lastResult.isFinal) {
            processQuery(lastResult[0].transcript);
          }
        };

        recognition.onerror = (event) => {
          setError(`Speech recognition error: ${event.error}`);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      } else {
        setError('Speech recognition not supported in this browser');
      }
    }
  }, [loadVoices, processQuery]);

  // Start voice recognition
  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      setError('');
      recognitionRef.current.start();
    }
  }, [isListening]);

  // Stop voice recognition
  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  }, [isListening]);

  // Stop speaking
  const stopSpeaking = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  }, []);

  // Clear conversation
  const clearConversation = useCallback(() => {
    setConversation([]);
    setResponse('');
    stopSpeaking();
  }, [stopSpeaking]);

  if (!isSupported) {
    return null;
  }

  return (
    <>
      {/* Floating Voice Agent Button */}
      <motion.div
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 ${className}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 1 }}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        >
          {/* Pulsing effect when listening */}
          {isListening && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}

          {/* Processing effect */}
          {isProcessing && (
            <motion.div
              className="absolute inset-0 border-4 border-white/30 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          )}

          <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-white relative z-10" />

          {/* Sparkle effects */}
          <Sparkles className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 text-yellow-300 animate-pulse" />
        </motion.button>
      </motion.div>

      {/* Voice Agent Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-20 right-4 left-4 sm:bottom-24 sm:right-6 sm:left-auto sm:w-96 h-[70vh] max-h-[500px] bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 z-40 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 sm:p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Brain className="w-5 h-5 sm:w-6 sm:h-6" />
                <div>
                  <h3 className="font-bold text-sm sm:text-base">AI Assistant</h3>
                  <p className="text-xs opacity-90">
                    {selectedVoice ? `Voice: ${selectedVoice.name.split(' ')[0]}` : 'Ask me about Hemanth'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors touch-manipulation"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Conversation */}
            <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3" style={{ height: 'calc(70vh - 180px)', maxHeight: '300px' }}>
              {conversation.length === 0 ? (
                <div className="text-center text-gray-500 py-4 sm:py-8">
                  <Brain className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 text-purple-300" />
                  <p className="text-sm">👋 Hello! I'm Hemanth's AI assistant.</p>
                  <p className="text-xs mt-2">Ask me about his experience, skills, projects, or contact info!</p>
                  {selectedVoice && (
                    <p className="text-xs mt-1 text-purple-600">🎙️ Speaking with {selectedVoice.name.split(' ')[0]}</p>
                  )}
                </div>
              ) : (
                conversation.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[80%] p-2 sm:p-3 rounded-xl text-xs sm:text-sm ${message.type === 'user'
                          ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                          : 'bg-gray-100 text-gray-800'
                        }`}
                    >
                      {message.content}
                    </div>
                  </motion.div>
                ))
              )}

              {isProcessing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 p-2 sm:p-3 rounded-xl">
                    <div className="flex space-x-1">
                      <motion.div
                        className="w-2 h-2 bg-purple-500 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-purple-500 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-purple-500 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Controls */}
            <div className="border-t border-gray-200 p-3 sm:p-4 space-y-3">
              {error && (
                <div className="text-xs text-red-500 bg-red-50 p-2 rounded">
                  {error}
                </div>
              )}

              <div className="flex items-center justify-center space-x-2 sm:space-x-4">
                <motion.button
                  onClick={isListening ? stopListening : startListening}
                  disabled={isProcessing}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 rounded-xl font-medium transition-all touch-manipulation ${isListening
                      ? 'bg-red-500 text-white'
                      : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                    } disabled:opacity-50 text-xs sm:text-sm`}
                >
                  {isListening ? (
                    <>
                      <MicOff className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Stop</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Listen</span>
                    </>
                  )}
                </motion.button>

                <motion.button
                  onClick={isSpeaking ? stopSpeaking : () => response && speak(response)}
                  disabled={!response || isProcessing || !selectedVoice}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-emerald-500 text-white rounded-xl font-medium disabled:opacity-50 touch-manipulation text-xs sm:text-sm"
                >
                  {isSpeaking ? (
                    <>
                      <VolumeX className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Quiet</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Speak</span>
                    </>
                  )}
                </motion.button>
              </div>

              {!selectedVoice && (
                <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded text-center">
                  🔇 Voice disabled for safety - text responses only
                </div>
              )}

              {conversation.length > 0 && (
                <div className="flex justify-between items-center">
                  <button
                    onClick={clearConversation}
                    className="text-xs text-gray-500 hover:text-gray-700 transition-colors touch-manipulation"
                  >
                    Clear conversation
                  </button>
                  <button
                    onClick={stopSpeaking}
                    className="text-xs text-red-500 hover:text-red-700 transition-colors touch-manipulation"
                  >
                    🔇 Stop all voice
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VoiceAgent; 