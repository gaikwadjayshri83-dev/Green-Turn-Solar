import React, { useState } from 'react';
import type { SolarEstimate } from '../types';
import AnimatedHeading from './common/AnimatedHeading';
import Spinner from './common/Spinner';

interface SolarCalculatorProps {
  onEstimateChange: (estimate: SolarEstimate | null) => void;
}

const SolarCalculator: React.FC<SolarCalculatorProps> = ({ onEstimateChange }) => {
  const [monthlyBill, setMonthlyBill] = useState('');
  const [roofSize, setRoofSize] = useState('');
  const [estimate, setEstimate] = useState<SolarEstimate | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getInstallationCost = (sizeKw: number): number => {
      if (sizeKw <= 2) {
        // Avg price for 2kW is 150k, so 75k/kW
        return sizeKw * 75000;
      }
      if (sizeKw <= 3) {
        // Avg price for 3kW is 200k, so ~67k/kW
        return sizeKw * 67000;
      }
      if (sizeKw <= 5) {
        // Avg price for 5kW is 301k, so ~60k/kW
        return sizeKw * 60200;
      }
      // For systems larger than 5kW
      return sizeKw * 58000;
  };

  const calculateSolarEstimate = (bill: number, size: number | null): SolarEstimate => {
      const AVG_KWH_RATE_INR = 8;
      const SQFT_PER_KW = 100;
      const KWH_PER_DAY_PER_KW = 4.5;
      const CO2_SAVED_KG_PER_KWH = 0.82;

      const annualBill = bill * 12;
      const annualKwhConsumption = annualBill / AVG_KWH_RATE_INR;
      const requiredSystemSize = annualKwhConsumption / (KWH_PER_DAY_PER_KW * 365);

      let systemSizeKw = requiredSystemSize;
      if (size && size > 0) {
          const maxSystemSizeByRoof = size / SQFT_PER_KW;
          systemSizeKw = Math.min(requiredSystemSize, maxSystemSizeByRoof);
      }
      
      // Align with new pricing structure by setting a minimum of 2kW
      systemSizeKw = Math.max(2, Math.round(systemSizeKw * 2) / 2);

      const annualGenerationKwh = systemSizeKw * KWH_PER_DAY_PER_KW * 365;
      const annualSavingsInr = annualGenerationKwh * AVG_KWH_RATE_INR;
      const installationCostInr = getInstallationCost(systemSizeKw);
      const co2SavedKgPerYear = annualGenerationKwh * CO2_SAVED_KG_PER_KWH;

      const recommendation = `A ${systemSizeKw} kW system is a great fit for you! It can offset a significant portion of your electricity usage, leading to substantial savings and a positive environmental impact. This is a solid investment in a sustainable future.`;

      return {
          systemSizeKw,
          annualSavingsInr,
          installationCostInr,
          co2SavedKgPerYear,
          recommendation,
      };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const billAmount = Number(monthlyBill);
    if (!monthlyBill || isNaN(billAmount) || billAmount <= 0) {
      setError('Please enter a valid monthly bill amount.');
      setEstimate(null);
      onEstimateChange(null);
      return;
    }
    setError(null);
    setEstimate(null);
    onEstimateChange(null);
    setIsLoading(true);

    // Simulate a short delay to make the spinner visible, as local calculation is instant.
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      const size = roofSize ? Number(roofSize) : null;
      const result = calculateSolarEstimate(billAmount, size);
      setEstimate(result);
      onEstimateChange(result);
    } catch (err) {
      setError("An unexpected error occurred during calculation.");
    } finally {
        setIsLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  const handleNumericInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setter(value);
    }
  };

  return (
    <section id="calculator" className="py-20 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
            <div className="p-8 lg:p-12">
              <AnimatedHeading text="Calculate Your Solar Savings" className="text-3xl font-bold text-gray-800 mb-4" />
              <p className="text-gray-600 mb-6">
                Enter your average monthly electricity bill to get a personalized, AI-powered estimate of your potential savings with a rooftop solar system in Nagpur.
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="monthlyBill" className="block text-sm font-medium text-gray-700">
                    Average Monthly Electricity Bill (in ₹)
                  </label>
                  <div className="mt-1">
                    <input
                      type="tel"
                      name="monthlyBill"
                      id="monthlyBill"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      placeholder="e.g., 3000"
                      value={monthlyBill}
                      onChange={handleNumericInputChange(setMonthlyBill)}
                      required
                      inputMode="numeric"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="roofSize" className="block text-sm font-medium text-gray-700">
                    Available Roof Size (in sq. ft.) - Optional
                  </label>
                  <div className="mt-1">
                    <input
                      type="tel"
                      name="roofSize"
                      id="roofSize"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      placeholder="e.g., 500"
                      value={roofSize}
                      onChange={handleNumericInputChange(setRoofSize)}
                      inputMode="numeric"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-lg font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                  >
                    {isLoading ? <Spinner /> : 'Calculate Now'}
                  </button>
                </div>
              </form>
            </div>
            <div className="p-8 lg:p-12 bg-green-50 flex flex-col justify-center">
              {error && <div className="text-center text-red-600 bg-red-100 p-4 rounded-md">{error}</div>}
              {estimate && (
                <div className="space-y-4 animate-fade-in">
                    <h3 className="text-xl font-bold text-gray-800">Your Personal Estimate:</h3>
                    <div className="space-y-3 text-gray-700">
                        <p><strong>Recommended System Size:</strong> {estimate.systemSizeKw} kW</p>
                        <p><strong>Estimated Annual Savings:</strong> <span className="text-green-600 font-bold">{formatCurrency(estimate.annualSavingsInr)}</span></p>
                        <p><strong>Estimated Installation Cost:</strong> {formatCurrency(estimate.installationCostInr)}</p>
                        <p><strong>CO₂ Saved per Year:</strong> {estimate.co2SavedKgPerYear.toLocaleString('en-IN')} kg</p>
                    </div>
                    <p className="mt-4 pt-4 border-t border-green-200 text-gray-600 italic">"{estimate.recommendation}"</p>
                </div>
              )}
              {isLoading && (
                <div className="text-center text-gray-500 flex flex-col items-center">
                  <Spinner className="h-8 w-8 text-green-600 mb-2" />
                  <p>Calculating your savings...</p>
                </div>
              )}
              {!estimate && !error && !isLoading && (
                <div className="text-center text-gray-500">
                  <p>Your results will appear here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolarCalculator;