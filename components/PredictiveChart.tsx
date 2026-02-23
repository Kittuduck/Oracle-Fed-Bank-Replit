import React from 'react';

interface PredictiveChartProps {
    isDarkMode: boolean;
}

const PredictiveChart: React.FC<PredictiveChartProps> = ({ isDarkMode }) => {
    // Mock data for the next 30 days balance prediction
    const data = [
        { day: 0, balance: 1240000 },
        { day: 5, balance: 1200000 },
        { day: 10, balance: 1150000 },
        { day: 15, balance: 1000000 }, // Rent/Bills drop
        { day: 20, balance: 950000 },
        { day: 25, balance: 1400000 }, // Salary credit
        { day: 30, balance: 1350000 },
    ];

    const maxBalance = 1500000;
    const minBalance = 800000;
    const width = 400;
    const height = 200;
    const padding = 20;

    const getX = (day: number) => (day / 30) * (width - 2 * padding) + padding;
    const getY = (balance: number) => height - ((balance - minBalance) / (maxBalance - minBalance)) * (height - 2 * padding) - padding;

    const points = data.map(d => `${getX(d.day)},${getY(d.balance)}`).join(' ');

    // Create an area path
    const areaPoints = `${getX(0)},${height - padding} ` + points + ` ${getX(30)},${height - padding}`;

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-end px-2">
                <div>
                    <h5 className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest">30-Day Forecast</h5>
                    <p className="text-sm font-bold text-federalblue-900 dark:text-white">Cash Flow Prediction</p>
                </div>
                <div className="text-right">
                    <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-1 rounded-full">+₹1.6L Net</span>
                </div>
            </div>

            <div className="relative h-[200px] w-full bg-white dark:bg-zinc-900/50 rounded-3xl border border-slate-100 dark:border-zinc-800 p-4 overflow-hidden shadow-inner">
                {/* Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between py-6 px-4 pointer-events-none opacity-20">
                    <div className="border-b border-slate-200 dark:border-zinc-700 w-full"></div>
                    <div className="border-b border-slate-200 dark:border-zinc-700 w-full"></div>
                    <div className="border-b border-slate-200 dark:border-zinc-700 w-full"></div>
                </div>

                <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
                    <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#004d9c" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#004d9c" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Area fill */}
                    <polyline
                        points={areaPoints}
                        fill="url(#chartGradient)"
                    />

                    {/* The Line */}
                    <polyline
                        points={points}
                        fill="none"
                        stroke="#004d9c"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="drop-shadow-lg"
                    />

                    {/* Data Points */}
                    {data.map((d, i) => (
                        <circle
                            key={i}
                            cx={getX(d.day)}
                            cy={getY(d.balance)}
                            r="4"
                            fill={i === 3 ? "#ef4444" : "#004d9c"} // Highlight drop
                            stroke="white"
                            strokeWidth="2"
                        />
                    ))}

                    {/* Drop Annotation */}
                    <g transform={`translate(${getX(15) - 30}, ${getY(1000000) - 35})`}>
                        <rect width="60" height="20" rx="4" fill="#ef4444" className="shadow-lg" />
                        <text x="30" y="14" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">Bill Cycle</text>
                        <line x1="30" y1="20" x2="30" y2="30" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" />
                    </g>
                </svg>

                {/* Day Labels */}
                <div className="absolute bottom-2 left-0 right-0 px-6 flex justify-between text-[8px] font-bold text-slate-400">
                    <span>Today</span>
                    <span>10 Mar</span>
                    <span>20 Mar</span>
                </div>
            </div>
        </div>
    );
};

export default PredictiveChart;
