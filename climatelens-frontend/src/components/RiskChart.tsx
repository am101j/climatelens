import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface RiskData {
  name: string;
  value: number;
  level: string;
}

interface RiskChartProps {
  data: RiskData[];
  type?: 'bar' | 'pie';
}

const RiskChart = ({ data, type = 'bar' }: RiskChartProps) => {
  const riskColors = {
    'Low': 'hsl(155, 60%, 70%)',
    'Medium': 'hsl(45, 85%, 70%)', 
    'Moderate': 'hsl(35, 75%, 70%)',
    'High': 'hsl(15, 75%, 70%)'
  };

  if (type === 'pie') {
    return (
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ name, value }) => `${name}: ${value}%`}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={riskColors[entry.level as keyof typeof riskColors]} 
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12 }}
            stroke="hsl(var(--muted-foreground))"
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            stroke="hsl(var(--muted-foreground))"
          />
          <Bar 
            dataKey="value" 
            radius={[8, 8, 0, 0]}
          >
            {
              data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={riskColors[entry.level as keyof typeof riskColors]} />
              ))
            }
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RiskChart;