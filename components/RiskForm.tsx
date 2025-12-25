
import React, { useState } from 'react';
import { UserHealthData } from '../types';
import { Activity, User, Heart, Wind, GlassWater, Thermometer } from 'lucide-react';

interface Props {
  onSubmit: (data: UserHealthData) => void;
  isLoading: boolean;
}

export const RiskForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<UserHealthData>({
    age: 30,
    gender: 'Other',
    weight: 70,
    height: 175,
    systolicBP: 120,
    diastolicBP: 80,
    cholesterol: 'normal',
    smokingStatus: 'never',
    alcoholConsumption: 'none',
    physicalActivity: 'moderate',
    existingConditions: [],
    symptoms: []
  });

  const [conditionInput, setConditionInput] = useState('');
  const [symptomInput, setSymptomInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
  };

  const handleAddItem = (type: 'conditions' | 'symptoms') => {
    const value = type === 'conditions' ? conditionInput : symptomInput;
    if (!value.trim()) return;

    setFormData(prev => ({
      ...prev,
      [type === 'conditions' ? 'existingConditions' : 'symptoms']: [
        ...prev[type === 'conditions' ? 'existingConditions' : 'symptoms'],
        value.trim()
      ]
    }));

    if (type === 'conditions') setConditionInput('');
    else setSymptomInput('');
  };

  const removeItem = (type: 'conditions' | 'symptoms', index: number) => {
    setFormData(prev => ({
      ...prev,
      [type === 'conditions' ? 'existingConditions' : 'symptoms']: 
        prev[type === 'conditions' ? 'existingConditions' : 'symptoms'].filter((_, i) => i !== index)
    }));
  };

  return (
    <form 
      onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }}
      className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100"
    >
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Vitals Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center text-blue-600">
              <User className="mr-2" size={20} /> Basic Info & Vitals
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Age</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full rounded-xl border-slate-200 bg-slate-50 p-3 focus:ring-2 focus:ring-blue-500 transition-all outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange} className="w-full rounded-xl border-slate-200 bg-slate-50 p-3 focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Non-binary</option>
                  <option>Prefer not to say</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Weight (kg)</label>
                <input type="number" name="weight" value={formData.weight} onChange={handleChange} className="w-full rounded-xl border-slate-200 bg-slate-50 p-3 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Height (cm)</label>
                <input type="number" name="height" value={formData.height} onChange={handleChange} className="w-full rounded-xl border-slate-200 bg-slate-50 p-3 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-600 mb-1">Blood Pressure (Systolic/Diastolic)</label>
              <div className="flex items-center space-x-2">
                <input type="number" name="systolicBP" value={formData.systolicBP} onChange={handleChange} placeholder="Sys" className="w-full rounded-xl border-slate-200 bg-slate-50 p-3 focus:ring-2 focus:ring-blue-500 outline-none" />
                <span className="text-slate-400 font-bold">/</span>
                <input type="number" name="diastolicBP" value={formData.diastolicBP} onChange={handleChange} placeholder="Dia" className="w-full rounded-xl border-slate-200 bg-slate-50 p-3 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Cholesterol Level</label>
              <select name="cholesterol" value={formData.cholesterol} onChange={handleChange} className="w-full rounded-xl border-slate-200 bg-slate-50 p-3 focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="normal">Normal</option>
                <option value="borderline">Borderline High</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          {/* Lifestyle & Symptoms Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center text-green-600">
              <Activity className="mr-2" size={20} /> Lifestyle & Symptoms
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Smoking Status</label>
                <select name="smokingStatus" value={formData.smokingStatus} onChange={handleChange} className="w-full rounded-xl border-slate-200 bg-slate-50 p-3 outline-none focus:ring-2 focus:ring-green-500">
                  <option value="never">Never Smoked</option>
                  <option value="former">Former Smoker</option>
                  <option value="current">Current Smoker</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Alcohol Consumption</label>
                <select name="alcoholConsumption" value={formData.alcoholConsumption} onChange={handleChange} className="w-full rounded-xl border-slate-200 bg-slate-50 p-3 outline-none focus:ring-2 focus:ring-green-500">
                  <option value="none">None</option>
                  <option value="moderate">Moderate</option>
                  <option value="heavy">Heavy</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Physical Activity</label>
                <select name="physicalActivity" value={formData.physicalActivity} onChange={handleChange} className="w-full rounded-xl border-slate-200 bg-slate-50 p-3 outline-none focus:ring-2 focus:ring-green-500">
                  <option value="sedentary">Sedentary (Little/no exercise)</option>
                  <option value="moderate">Moderate (3-4 times/week)</option>
                  <option value="active">Very Active (Daily exercise)</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Existing Conditions</label>
                <div className="flex space-x-2">
                  <input value={conditionInput} onChange={(e) => setConditionInput(e.target.value)} placeholder="e.g. Diabetes" className="flex-1 rounded-xl border-slate-200 bg-slate-50 p-3 outline-none" />
                  <button type="button" onClick={() => handleAddItem('conditions')} className="px-4 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">+</button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.existingConditions.map((c, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full flex items-center">
                      {c} <button type="button" onClick={() => removeItem('conditions', i)} className="ml-2 hover:text-red-500">×</button>
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Current Symptoms</label>
                <div className="flex space-x-2">
                  <input value={symptomInput} onChange={(e) => setSymptomInput(e.target.value)} placeholder="e.g. Fatigue, Chest pain" className="flex-1 rounded-xl border-slate-200 bg-slate-50 p-3 outline-none" />
                  <button type="button" onClick={() => handleAddItem('symptoms')} className="px-4 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">+</button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.symptoms.map((s, i) => (
                    <span key={i} className="px-3 py-1 bg-red-50 text-red-700 text-xs font-semibold rounded-full flex items-center">
                      {s} <button type="button" onClick={() => removeItem('symptoms', i)} className="ml-2 hover:text-red-500">×</button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <button 
          disabled={isLoading}
          className="w-full mt-10 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-bold py-4 rounded-2xl transition-all shadow-lg flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <span className="animate-pulse">Analyzing Vital Signs...</span>
          ) : (
            <>
              <Activity size={20} />
              <span>Generate Health Risk Prediction</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
