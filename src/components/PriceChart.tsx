import { LineChart, Line, ResponsiveContainer, YAxis, Tooltip } from 'recharts';

interface PriceChartProps {
  data: number[];
}

export default function PriceChart({ data }: PriceChartProps) {
  const formattedData = data.map((price, index) => ({
    day: `Gün ${index + 1}`,
    price: price
  }));

  return (
    // 1. DIŞ KUTU: h-48 sınıfını sildik, yüksekliği içeriğe göre otomatik ayarlanacak
    <div className="mt-4 p-4 bg-white dark:bg-fin-dark rounded-xl border border-slate-200 dark:border-slate-700 w-full">
      
      <p className="text-xs font-semibold text-slate-500 mb-4">{data.length} Günlük Fiyat Trendi (USD)</p>

      {/* 2. İÇ KUTU: h-62.5 gibi geçersiz bir sınıf yerine grafiğe net bir yükseklik (h-48) verdik */}
      <div className="w-full h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedData}>
            <YAxis domain={['auto', 'auto']} hide={true} />
            
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
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