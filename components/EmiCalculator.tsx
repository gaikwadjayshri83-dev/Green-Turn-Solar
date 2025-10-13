import React, { useState, useMemo, useEffect } from 'react';
import AnimatedHeading from './common/AnimatedHeading';

interface EmiCalculatorProps {
  initialLoanAmount: number;
}

const EmiCalculator: React.FC<EmiCalculatorProps> = ({ initialLoanAmount }) => {
  const [loanAmount, setLoanAmount] = useState<number | ''>(initialLoanAmount);
  const [interestRate, setInterestRate] = useState(9); // Default 9%
  const [tenure, setTenure] = useState(5); // Default 5 years

  useEffect(() => {
    setLoanAmount(initialLoanAmount);
  }, [initialLoanAmount]);

  const { emi, totalInterest, totalAmountPayable } = useMemo(() => {
    const principal = Number(loanAmount);
    if (isNaN(principal) || principal <= 0) {
      return { emi: 0, totalInterest: 0, totalAmountPayable: 0 };
    }
    const monthlyRate = interestRate / 12 / 100;
    const numberOfMonths = tenure * 12;

    if (monthlyRate === 0) {
      const emiValue = numberOfMonths > 0 ? principal / numberOfMonths : principal;
      return { emi: emiValue, totalInterest: 0, totalAmountPayable: principal };
    }

    const emiCalc = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) / (Math.pow(1 + monthlyRate, numberOfMonths) - 1);
    const totalAmount = emiCalc * numberOfMonths;
    const totalInterestPayable = totalAmount - principal;

    return {
      emi: emiCalc,
      totalInterest: totalInterestPayable,
      totalAmountPayable: totalAmount,
    };
  }, [loanAmount, interestRate, tenure]);

  const formatCurrency = (value: number) => {
    const roundedValue = Math.round(value);
    if (!isFinite(roundedValue)) {
        return '₹ 0';
    }
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(roundedValue);
  };

  const handleLoanAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
        setLoanAmount('');
    } else {
        const num = parseFloat(value);
        if (!isNaN(num) && num >= 0) {
            setLoanAmount(num);
        }
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl">
      <AnimatedHeading el="h3" text="Financing Calculator" className="text-2xl font-bold text-center mb-6 text-gray-800" />
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div>
          <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700">
            Loan Amount (₹)
          </label>
          <input
            type="number"
            id="loanAmount"
            value={loanAmount}
            onChange={handleLoanAmountChange}
            className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-lg"
            placeholder="e.g., 275000"
          />
        </div>
        <div className="md:col-span-2">
            <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700">
                Interest Rate: <span className="font-bold text-green-600">{interestRate.toFixed(2)}%</span>
            </label>
            <input
                type="range"
                id="interestRate"
                min="6"
                max="14"
                step="0.25"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-3 accent-green-600"
            />
        </div>
      </div>

      <div className="mb-8">
        <label htmlFor="tenure" className="block text-sm font-medium text-gray-700">
          Loan Tenure: <span className="font-bold text-green-600">{tenure} {tenure > 1 ? 'Years' : 'Year'}</span>
        </label>
        <input
            type="range"
            id="tenure"
            min="1"
            max="10"
            step="1"
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-3 accent-green-600"
        />
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
            <div className="py-2 md:py-0">
                <p className="text-sm text-gray-500">Monthly EMI</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(emi)}</p>
            </div>
            <div className="py-2 md:py-0 md:px-4">
                <p className="text-sm text-gray-500">Total Interest</p>
                <p className="text-2xl font-bold text-gray-800">{formatCurrency(totalInterest)}</p>
            </div>
            <div className="py-2 md:py-0">
                <p className="text-sm text-gray-500">Total Amount Payable</p>
                <p className="text-2xl font-bold text-gray-800">{formatCurrency(totalAmountPayable)}</p>
            </div>
        </div>
      </div>
       <p className="text-xs text-gray-500 text-center mt-4">
        *This is an estimate. Actual EMI may vary based on your bank and loan agreement.
      </p>
    </div>
  );
};

export default EmiCalculator;
