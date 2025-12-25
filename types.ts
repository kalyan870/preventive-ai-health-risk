
export interface UserHealthData {
  age: number;
  gender: string;
  weight: number;
  height: number;
  systolicBP: number;
  diastolicBP: number;
  cholesterol: 'normal' | 'borderline' | 'high';
  smokingStatus: 'never' | 'former' | 'current';
  alcoholConsumption: 'none' | 'moderate' | 'heavy';
  physicalActivity: 'sedentary' | 'moderate' | 'active';
  existingConditions: string[];
  symptoms: string[];
}

export interface HealthRisk {
  category: string;
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Severe';
  score: number; // 0 to 100
  description: string;
  recommendations: string[];
}

export interface PredictionResult {
  summary: string;
  risks: HealthRisk[];
  lifestyleAnalysis: {
    strengths: string[];
    concerns: string[];
  };
  preventivePlan: {
    immediate: string[];
    longTerm: string[];
  };
  consultationUrgency: 'routine' | 'soon' | 'immediate';
}
