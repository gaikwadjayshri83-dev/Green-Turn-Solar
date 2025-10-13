import React, { useState } from 'react';
import { getFaqAnswer } from '../services/geminiService';
import { FAQ_QUESTIONS } from '../constants';
import AnimatedSection from './common/AnimatedSection';
import AnimatedHeading from './common/AnimatedHeading';
import Spinner from './common/Spinner';

const FaqItem: React.FC<{ question: string; children: React.ReactNode; }> = ({ question, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left text-gray-800 focus:outline-none"
      >
        <span className="font-medium">{question}</span>
        <svg
          className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && <div className="mt-3 text-gray-600 animate-fade-in-down">{children}</div>}
    </div>
  );
};

const Faq: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingQuestion, setLoadingQuestion] = useState<string | null>(null);

  const fetchAnswer = async (q: string) => {
    if (!q.trim() || isLoading) return;
    setIsLoading(true);
    setLoadingQuestion(q);
    setError(null);
    setAnswer('');
    try {
      const result = await getFaqAnswer(q);
      setAnswer(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
      setLoadingQuestion(null);
    }
  };

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    fetchAnswer(question);
  };

  const handlePresetQuestion = async (q: string) => {
    setQuestion(q);
    fetchAnswer(q);
  };

  return (
    <AnimatedSection id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedHeading text="Frequently Asked Questions" className="text-3xl font-bold text-gray-800" />
          <p className="mt-4 text-gray-600">
            Have questions about going solar in Nagpur? We've got answers. Ask our AI assistant or check out some common queries below.
          </p>
        </div>
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <form onSubmit={handleQuestionSubmit}>
              <label htmlFor="faq-question" className="sr-only">Ask a question</label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  id="faq-question"
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Type your question here..."
                  className="flex-grow px-4 py-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-green-600 text-white font-bold py-3 px-6 rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center min-w-[110px]"
                >
                  {isLoading && loadingQuestion === question ? <Spinner className="h-5 w-5" /> : 'Ask AI'}
                </button>
              </div>
            </form>
            {error && <p className="mt-4 text-center text-red-600">{error}</p>}
            {answer && (
              <div className="mt-6 p-4 bg-green-100 border border-green-200 rounded-md text-gray-800 animate-fade-in">
                <strong className="block">Answer:</strong>
                <p>{answer}</p>
              </div>
            )}
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Common Questions</h3>
            <div>
              {FAQ_QUESTIONS.map((q, i) => (
                <FaqItem 
                  key={i} 
                  question={q}
                >
                  {isLoading && loadingQuestion === q ? (
                    <div className="flex items-center text-gray-500">
                      <Spinner className="h-4 w-4 mr-2 text-green-600" />
                      <span>Getting answer...</span>
                    </div>
                  ) : (
                    <button onClick={() => handlePresetQuestion(q)} className="text-green-600 hover:underline">
                        Ask AI for an answer...
                    </button>
                  )}
                </FaqItem>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Faq;