
import React, { useState, useMemo } from 'react';
import { Employee, Evaluation, Department, EvaluationType } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface MonthlyReportProps {
  employees: Employee[];
  evaluations: Evaluation[];
}

export const MonthlyReport: React.FC<MonthlyReportProps> = ({ employees, evaluations }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

  const filteredEvaluations = useMemo(() => {
    return evaluations.filter(e => e.date.startsWith(selectedMonth) && e.type === EvaluationType.MONTHLY);
  }, [evaluations, selectedMonth]);

  const reportData = useMemo(() => {
    const dataByDept = Object.values(Department).reduce((acc, dept) => {
      acc[dept] = { totalScore: 0, count: 0, employees: new Set() };
      return acc;
    }, {} as Record<Department, { totalScore: number, count: number, employees: Set<string> }>);

    filteredEvaluations.forEach(e => {
      const employee = employees.find(emp => emp.id === e.employeeId);
      if (employee) {
        dataByDept[employee.department].totalScore += e.score;
        dataByDept[employee.department].count++;
        dataByDept[employee.department].employees.add(employee.name);
      }
    });

    const chartData = Object.entries(dataByDept)
      .filter(([, data]) => data.count > 0)
      .map(([dept, data]) => ({
        name: dept,
        "متوسط التقييم": (data.totalScore / data.count).toFixed(1)
      }));

    const topPerformers = filteredEvaluations
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(e => {
        const employee = employees.find(emp => emp.id === e.employeeId);
        return { name: employee?.name || 'Unknown', score: e.score, department: employee?.department };
      });
      
    return { chartData, topPerformers };
  }, [filteredEvaluations, employees]);


  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">التقرير الشهري</h1>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="mt-4 md:mt-0 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {filteredEvaluations.length === 0 ? (
        <div className="text-center p-10 bg-white rounded-lg shadow-md">
            <p className="text-gray-500 text-lg">لا توجد تقييمات شهرية لهذا الشهر.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h2 className="text-xl font-bold text-gray-700 mb-4">متوسط التقييمات حسب القسم</h2>
                <ResponsiveContainer width="100%" height={300}>
                <BarChart data={reportData.chartData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 5]} />
                    <YAxis type="category" dataKey="name" width={120} />
                    <Tooltip />
                    <Bar dataKey="متوسط التقييم" fill="#3b82f6" />
                </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h2 className="text-xl font-bold text-gray-700 mb-4">أفضل 5 موظفين أداءً</h2>
                <ul className="space-y-3">
                    {reportData.topPerformers.map((p, index) => (
                    <li key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <div>
                            <p className="font-semibold text-gray-800">{p.name}</p>
                            <p className="text-sm text-gray-500">{p.department}</p>
                        </div>
                        <span className="text-lg font-bold text-blue-600">{p.score}/5</span>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
      )}
    </div>
  );
};
