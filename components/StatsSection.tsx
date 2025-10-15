import React from 'react';
import AnimatedSection from './common/AnimatedSection';
import AnimatedHeading from './common/AnimatedHeading';
import AnimatedStat from './common/AnimatedStat';

const stats = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18h16.5a1.5 1.5 0 011.5 1.5v16.5a1.5 1.5 0 01-1.5 1.5H3.75a1.5 1.5 0 01-1.5-1.5V4.5a1.5 1.5 0 011.5-1.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v16.5m-4.5-1.5h9" />
      </svg>
    ),
    value: 500,
    label: 'Projects Accomplished',
    suffix: '+',
    isFloat: false,
  },
  {
    icon: (
       <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
         <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
       </svg>
    ),
    value: 2.5,
    label: 'Capacity Installed',
    suffix: ' MW',
    isFloat: true,
  },
  {
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a15.3 15.3 0 01-6.4-1.5M12 3a15.3 15.3 0 016.4 1.5" />
        </svg>
    ),
    value: 3300,
    label: 'Annual CO₂ Reduction',
    suffix: '+ Tonnes',
    isFloat: false,
  },
];


const StatsSection: React.FC = () => {
    return (
        <AnimatedSection className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <AnimatedHeading text="Our Impact in Numbers" className="text-3xl font-bold text-gray-800 mb-12" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {stats.map((stat, index) => (
                        <div key={index} className="p-6">
                            {stat.icon}
                            <div className="text-4xl md:text-5xl font-extrabold text-green-600">
                                <AnimatedStat finalValue={stat.value} isFloat={stat.isFloat} />
                                <span className="text-3xl">{stat.suffix}</span>
                            </div>
                            <p className="mt-2 text-lg text-gray-600">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    )
}

export default StatsSection;
