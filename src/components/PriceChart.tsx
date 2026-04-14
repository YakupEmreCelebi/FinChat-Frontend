import React from 'react';
import { LineChart, Line, ResponsiveContainer, YAxis, Tooltip } from 'recharts';

// Component'in dışarıdan alacağı verinin tipini (Interface) belirliyoruz
interface PriceChartProps {
  data: number[];
}

export default function PriceChart({ data }: PriceChartProps) {
  // Gelen ham sayı dizisini Recharts'ın anladığı obje formatına çeviriyoruz
  const formattedData = data.map((price, index) => ({
    day: `Gün ${index + 1}`,
    price: price
  }));

  return (
    <div className="mt-4 p-4 bg-white dark:bg-fin-dark rounded-xl border border-slate-200 dark:border-slate-700 w-full h-48">
      
      <div className="w-full h-[250px]">
        <p className="text-xs font-semibold text-slate-500 mb-2">7 Günlük Fiyat Trendi (USD)</p>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedData}>
            <YAxis domain={['auto', 'auto']} hide={true} />
            
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              // 'any' kullanarak TypeScript'i sakinleştiriyoruz ve güvene almak için Number() ile zorluyoruz
              formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Fiyat']}
              labelStyle={{ color: '#64748b' }}
            />
            
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#10b981" 
              strokeWidth={3} 
              dot={false} 
              activeDot={{ r: 6, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
    </div>
  );
}