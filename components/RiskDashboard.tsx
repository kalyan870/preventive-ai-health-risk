
import React from 'react';
import { PredictionResult, HealthRisk } from '../types';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell
} from 'recharts';
import { AlertTriangle, CheckCircle2, Info, ArrowRight, ShieldCheck, HeartPulse, Sparkles } from 'lucide-react';

interface Props {
  result: PredictionResult;
  onReset: () => void;
}

export const RiskDashboard: React.FC<Props> = ({ result, onReset }) => {
  const chartData = result.risks.map(r => ({
    subject: r.category,
    A: r.score,
    fullMark: 100,
  }));

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'routine': return 'bg-green-100 text-green-700 border-green-200';
      case 'soon': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'immediate': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'moderate': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'severe': return 'text-red-600 bg-red-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      {/* Summary Header */}
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <div className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getUrgencyColor(result.consultationUrgency)}`}>
                Consultation: {result.consultationUrgency}
              </div>
              <span className="text-slate-400 text-sm">VitalScan Report #{Math.floor(Math.random() * 90000) + 10000}</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">Health Analysis Summary</h2>
            <p className="text-slate-600 leading-relaxed max-w-2xl">{result.summary}</p>
          </div>
          <button 
            onClick={onReset}
            className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors font-medium text-sm"
          >
            Start New Scan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Risk Visualization */}
        <div className="lg:col-span-1 bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
          <h3 className="text-xl font-bold mb-6 flex items-center text-slate-800">
            <HeartPulse className="mr-2 text-indigo-500" /> Risk Profile
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Risk Score"
                  dataKey="A"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 space-y-4">
            {result.risks.map((risk, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50">
                <span className="font-medium text-slate-700">{risk.category}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getRiskColor(risk.riskLevel)}`}>
                  {risk.riskLevel}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="lg:col-span-2 space-y-8">
          {/* Actionable Plan */}
          <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <ShieldCheck className="mr-3" /> Preventive Strategy
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-indigo-200 font-bold uppercase text-xs tracking-widest mb-4">Immediate Actions</h4>
                <ul className="space-y-3">
                  {result.preventivePlan.immediate.map((item, i) => (
                    <li key={i} className="flex items-start space-x-3 text-sm">
                      <div className="bg-white/20 rounded-full p-1 mt-0.5">
                        <ArrowRight size={12} className="text-white" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-indigo-200 font-bold uppercase text-xs tracking-widest mb-4">Long-Term Goals</h4>
                <ul className="space-y-3">
                  {result.preventivePlan.longTerm.map((item, i) => (
                    <li key={i} className="flex items-start space-x-3 text-sm">
                      <div className="bg-white/20 rounded-full p-1 mt-0.5">
                        <Sparkles size={12} className="text-white" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Lifestyle Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
              <h4 className="text-emerald-600 font-bold flex items-center mb-4">
                <CheckCircle2 size={20} className="mr-2" /> Current Strengths
              </h4>
              <ul className="space-y-2">
                {result.lifestyleAnalysis.strengths.map((s, i) => (
                  <li key={i} className="text-slate-600 text-sm flex items-center bg-emerald-50 p-2 rounded-xl">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-3"></span> {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
              <h4 className="text-amber-600 font-bold flex items-center mb-4">
                <AlertTriangle size={20} className="mr-2" /> Primary Concerns
              </h4>
              <ul className="space-y-2">
                {result.lifestyleAnalysis.concerns.map((s, i) => (
                  <li key={i} className="text-slate-600 text-sm flex items-center bg-amber-50 p-2 rounded-xl">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-3"></span> {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Deep Dive Risk Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {result.risks.map((risk, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 group hover:border-indigo-200 transition-all">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-xl font-bold text-slate-800">{risk.category}</h4>
              <span className={`px-4 py-1 rounded-full text-xs font-bold ${getRiskColor(risk.riskLevel)}`}>
                {risk.riskLevel} Risk
              </span>
            </div>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed italic border-l-4 border-indigo-100 pl-4">"{risk.description}"</p>
            <div className="space-y-3">
              <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Key Recommendations</h5>
              {risk.recommendations.map((rec, i) => (
                <div key={i} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-2xl text-sm text-slate-700 group-hover:bg-indigo-50/30 transition-all">
                  <div className="w-8 h-8 flex items-center justify-center bg-white rounded-xl shadow-sm border border-slate-100 text-indigo-500 font-bold shrink-0">
                    {i+1}
                  </div>
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-3xl p-10 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500 rounded-full blur-[100px]"></div>
        </div>
        <div className="relative z-10 space-y-4">
          <h3 className="text-2xl font-bold">Important Medical Disclaimer</h3>
          <p className="text-slate-400 max-w-3xl mx-auto text-sm">
            VitalScan AI provides screening assessments based on statistical models and AI patterns. 
            This is <strong>not a medical diagnosis</strong>. Always consult with a certified healthcare professional 
            before making significant health decisions or starting new treatments. 
            If you are experiencing a medical emergency, call your local emergency services immediately.
          </p>
          <div className="pt-4 flex justify-center space-x-6">
            <div className="flex items-center space-x-2 text-slate-300">
              <ShieldCheck className="text-emerald-400" size={18} />
              <span className="text-xs">Secure Analysis</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-300">
              <Sparkles className="text-indigo-400" size={18} />
              <span className="text-xs">AI Reasoning</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
