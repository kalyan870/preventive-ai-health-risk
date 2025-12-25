
import React, { useState } from 'react';
import { UserHealthData, PredictionResult } from './types';
import { getHealthRiskPrediction } from './services/geminiService';
import { RiskForm } from './components/RiskForm';
import { RiskDashboard } from './components/RiskDashboard';
import { Activity, ShieldCheck, Heart, User, Sparkles, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async (data: UserHealthData) => {
    setLoading(true);
    setError(null);
    try {
      const prediction = await getHealthRiskPrediction(data);
      setResult(prediction);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      setError("Failed to analyze health data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-indigo-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={handleReset}>
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                <Activity size={24} />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900">Vital<span className="text-indigo-600">Scan</span></span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-500">
              <a href="#" className="hover:text-indigo-600 transition-colors">Risk Assessment</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Preventive Guide</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">How it Works</a>
            </div>

            <button className="bg-indigo-50 text-indigo-700 px-5 py-2 rounded-xl text-sm font-bold hover:bg-indigo-100 transition-all border border-indigo-100">
              Health Professionals
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!result && (
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center space-x-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-indigo-100 mb-4 animate-fade-in">
              <Sparkles size={14} />
              <span>Powered by Gemini 3.0 reasoning</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-tight">
              Predict your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-500">health future</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
              Advanced AI-driven health risk assessment that turns your vitals and lifestyle habits into actionable preventive strategies.
            </p>
          </div>
        )}

        {error && (
          <div className="mb-8 max-w-4xl mx-auto bg-red-50 border border-red-200 rounded-3xl p-6 flex items-start space-x-4">
            <AlertCircle className="text-red-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-red-800">Analysis Error</h4>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
        )}

        {result ? (
          <RiskDashboard result={result} onReset={handleReset} />
        ) : (
          <RiskForm onSubmit={handlePredict} isLoading={loading} />
        )}

        {/* Benefits Section */}
        {!result && !loading && (
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4 p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                <Heart size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Cardiovascular Risk</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Early detection of heart disease risks by analyzing blood pressure, BMI, and lifestyle triggers before they escalate.</p>
            </div>
            <div className="space-y-4 p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Preventive Strategies</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Receive personalized lifestyle adjustment plans designed to lower your risk scores through evidence-based AI reasoning.</p>
            </div>
            <div className="space-y-4 p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-4">
                <User size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Holistic Analysis</h3>
              <p className="text-slate-500 text-sm leading-relaxed">From metabolic syndrome to mental fatigue, our AI monitors a wide spectrum of indicators for total body wellness.</p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 mt-20">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white">
                <Activity size={18} />
              </div>
              <span className="text-lg font-black tracking-tight text-slate-900">VitalScan</span>
            </div>
            <div className="flex space-x-8 text-sm text-slate-400 font-medium">
              <a href="#" className="hover:text-indigo-600">Privacy Policy</a>
              <a href="#" className="hover:text-indigo-600">Terms of Service</a>
              <a href="#" className="hover:text-indigo-600">Medical Data Security</a>
            </div>
            <div className="text-sm text-slate-400">
              © 2024 VitalScan AI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
