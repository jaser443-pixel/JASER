
import React, { useMemo } from 'react';
import { Employee, Evaluation, EvaluationType } from '../types';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface EmployeeProfileProps {
  employee: Employee;
  evaluations: Evaluation[];
  onBack: () => void;
  onAddDailyEval: () => void;
  onAddMonthlyEval: () => void;
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' });
};

export const EmployeeProfile: React.FC<EmployeeProfileProps> = ({ employee, evaluations, onBack, onAddDailyEval, onAddMonthlyEval }) => {
  const employeeEvaluations = useMemo(() => {
    return evaluations
      .filter(e => e.employeeId === employee.id)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [evaluations, employee.id]);

  const chartData = useMemo(() => {
    return employeeEvaluations
      .map(e => ({
        date: new Date(e.date).toLocaleDateString('ar-SA', { month: 'short', day: 'numeric' }),
        score: e.score,
        type: e.type,
      }))
      .reverse();
  }, [employeeEvaluations]);

  const avgScore = employeeEvaluations.length > 0
    ? (employeeEvaluations.reduce((acc, curr) => acc + curr.score, 0) / employeeEvaluations.length).toFixed(1)
    : 'N/A';

  return (
    <div className="p-8">
      <button onClick={onBack} className="flex items-center text-blue-600 hover:underline mb-6">
        <ChevronLeftIcon className="w-5 h-5 me-2 transform scale-x-[-1]" />
        العودة إلى قائمة الموظفين
      </button>

      <div className="bg-white shadow-lg rounded-xl p-8 mb-8 border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
                <h1 className="text-4xl font-bold text-gray-800">{employee.name}</h1>
                <p className="text-lg text-gray-500 mt-1">{employee.position} - {employee.department}</p>
                <p className="text-sm text-gray-500 mt-2">تاريخ التعيين: {formatDate(employee.hiringDate)}</p>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
                <button onClick={onAddDailyEval} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">تقييم يومي</button>
                <button onClick={onAddMonthlyEval} className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600">تقييم شهري</button>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white shadow-md rounded-xl p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">سجل التقييمات</h2>
          <div className="max-h-96 overflow-y-auto">
            {employeeEvaluations.length > 0 ? (
              employeeEvaluations.map(e => (
                <div key={e.id} className="border-b last:border-b-0 py-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${e.type === EvaluationType.MONTHLY ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                        {e.type}
                      </span>
                      <p className="text-sm text-gray-500 mt-2">{formatDate(e.date)}</p>
                    </div>
                    <div className="flex items-center">
                        <span className="text-2xl font-bold text-blue-600">{e.score}/5</span>
                    </div>
                  </div>
                  <p className="text-gray-700 mt-2">{e.notes}</p>
                </div>
              ))
            ) : <p className="text-center p-6 text-gray-500">لا يوجد تقييمات لهذا الموظف بعد.</p>}
          </div>
        </div>

        <div className="space-y-8">
            <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-700 mb-2">متوسط التقييم العام</h3>
                <p className="text-5xl font-bold text-center text-blue-600 py-4">{avgScore}</p>
            </div>
            <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-700 mb-4">مؤشر الأداء</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={[0, 5]}/>
                        <Tooltip />
                        <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} name="التقييم"/>
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>
    </div>
  );
};
