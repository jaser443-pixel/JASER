
import React from 'react';
import { Employee, Evaluation, EvaluationType } from '../types';
import { Card } from './Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  employees: Employee[];
  evaluations: Evaluation[];
}

export const Dashboard: React.FC<DashboardProps> = ({ employees, evaluations }) => {
  const totalEmployees = employees.length;
  const today = new Date().toISOString().split('T')[0];
  const evaluationsToday = evaluations.filter(e => e.date === today && e.type === EvaluationType.DAILY).length;
  
  const thisMonth = new Date().toISOString().slice(0, 7);
  const monthlyEvaluationsThisMonth = evaluations.filter(e => e.date.startsWith(thisMonth) && e.type === EvaluationType.MONTHLY);
  const avgMonthlyScore = monthlyEvaluationsThisMonth.length > 0
    ? (monthlyEvaluationsThisMonth.reduce((acc, curr) => acc + curr.score, 0) / monthlyEvaluationsThisMonth.length).toFixed(1)
    : 'N/A';

  const evaluationsByMonth = evaluations.reduce((acc, e) => {
    const month = e.date.slice(0, 7);
    if (!acc[month]) {
      acc[month] = { totalScore: 0, count: 0, month };
    }
    acc[month].totalScore += e.score;
    acc[month].count++;
    return acc;
  }, {} as Record<string, { totalScore: number, count: number, month: string }>);

  const chartData = Object.values(evaluationsByMonth)
    .map(data => ({
      name: data.month,
      'متوسط التقييم': (data.totalScore / data.count).toFixed(1)
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(-6); // Last 6 months

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">اللوحة الرئيسية</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card title="إجمالي الموظفين">
          <p className="text-4xl font-bold text-blue-600">{totalEmployees}</p>
        </Card>
        <Card title="التقييمات اليومية (اليوم)">
          <p className="text-4xl font-bold text-green-600">{evaluationsToday}</p>
        </Card>
        <Card title="متوسط التقييم الشهري (هذا الشهر)">
          <p className="text-4xl font-bold text-purple-600">{avgMonthlyScore}</p>
        </Card>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h2 className="text-xl font-bold text-gray-700 mb-4">متوسط التقييمات خلال آخر 6 أشهر</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 5]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="متوسط التقييم" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
