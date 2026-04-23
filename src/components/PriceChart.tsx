import { LineChart, Line, ResponsiveContainer, YAxis, Tooltip } from 'recharts';

interface PriceChartProps {
  data: any;
}

export default function PriceChart({ data }: PriceChartProps) {

  const isLegacy = Array.isArray(data);
  const prices = isLegacy ? data : data.prices;
  const title = isLegacy ? "Seçili Dönem Fiyat Trendi" : data.title;
  const intervalLabel = isLegacy ? "Nokta" : data.interval;

  if (!prices || !Array.isArray(prices)) {
    return <div className="p-4 text-sm text-red-500">Grafik verisi okunamadı. Lütfen sohbeti temizleyin.</div>;
  }

  const formattedData = prices.map((price: number, index: number) => ({
    label: `${intervalLabel} ${index + 1}`,
    price: price
  }));

  return (
    <div className="mt-4 p-4 bg-white dark:bg-fin-dark rounded-xl border border-slate-200 dark:border-slate-700 w-full">
      
      <p className="text-xs font-semibold text-slate-500 mb-4">{title}</p>

      <div className="w-full h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedData}>
            <YAxis domain={['auto', 'auto']} hide={true} />
            
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Fiyat']}
              labelStyle={{ color: '#64748b', fontWeight: 'bold', marginBottom: '4px' }}
              // YENİ: Tooltip'in en üstünde "Saat 166" yazmasını sağlıyoruz
              labelFormatter={(label) => `${label}`} 
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