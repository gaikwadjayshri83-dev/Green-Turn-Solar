// FIX: Added SolarEstimate interface based on the schema in geminiService.ts
export interface SolarEstimate {
  systemSizeKw: number;
  annualSavingsInr: number;
  installationCostInr: number;
  co2SavedKgPerYear: number;
  recommendation: string;
}
