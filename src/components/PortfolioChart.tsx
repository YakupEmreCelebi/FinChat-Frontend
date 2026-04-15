
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface PortfolioItem {
  name: string;
  value: number;
  color: string;
}

interface PortfolioChartProps {
  data: PortfolioItem[];
}

export default function PortfolioChart({ data }: PortfolioChartProps) {
  // Toplam portföy değerini hesaplıyoruz ki ortasında gösterelim
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="mt-4 p-4 bg-white dark:bg-fin-card rounded-xl border border-slate-200 dark:border-slate-800 w-full flex flex-col items-center">
      <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2 w-full text-left">
        Güncel Portföy Dağılımı
      </p>
      
      {/* ÇÖZÜM 1: ResponsiveContainer'ın çökmesini engellemek için h-[250px] ile kesin yükseklik verdik */}
      <div className="relative w-full h-62.5">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            
            {/* ÇÖZÜM 2: Typescript Hatası için value: any yaptık ve Number() ile güvene aldık */}
            <Tooltip 
              formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Değer']}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>

        {/* Ortadaki "Toplam Değer" yazısı */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-6">
          <span className="text-xs text-slate-400">Toplam</span>
          <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
            ${totalValue.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}