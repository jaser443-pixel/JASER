
import React, { useState } from 'react';
import { Employee, Department } from '../types';

interface AddEmployeeFormProps {
  onAddEmployee: (employee: Omit<Employee, 'id'>) => void;
  onClose: () => void;
}

export const AddEmployeeForm: React.FC<AddEmployeeFormProps> = ({ onAddEmployee, onClose }) => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState<Department>(Department.IT);
  const [hiringDate, setHiringDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !position || !hiringDate) {
      setError('يرجى ملء جميع الحقول الإلزامية.');
      return;
    }
    onAddEmployee({ name, position, department, hiringDate });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">الاسم الكامل</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
      </div>
      <div>
        <label htmlFor="position" className="block text-sm font-medium text-gray-700">المنصب الوظيفي</label>
        <input type="text" id="position" value={position} onChange={(e) => setPosition(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
      </div>
      <div>
        <label htmlFor="department" className="block text-sm font-medium text-gray-700">القسم</label>
        <select id="department" value={department} onChange={(e) => setDepartment(e.target.value as Department)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
          {Object.values(Department).map((dept) => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="hiringDate" className="block text-sm font-medium text-gray-700">تاريخ التعيين</label>
        <input type="date" id="hiringDate" value={hiringDate} onChange={(e) => setHiringDate(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
      </div>
      <div className="flex justify-end pt-4 space-s-3">
        <button type="button" onClick={onClose} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">إلغاء</button>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">إضافة موظف</button>
      </div>
    </form>
  );
};
