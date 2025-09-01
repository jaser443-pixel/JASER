
import React, { useState, useMemo } from 'react';
import { Employee, Department } from '../types';
import { UserPlusIcon } from './icons/UserPlusIcon';

interface EmployeeListProps {
  employees: Employee[];
  onSelectEmployee: (id: string) => void;
  onAddEmployeeClick: () => void;
}

export const EmployeeList: React.FC<EmployeeListProps> = ({ employees, onSelectEmployee, onAddEmployeeClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<Department | 'all'>('all');

  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      const nameMatch = employee.name.toLowerCase().includes(searchTerm.toLowerCase());
      const departmentMatch = departmentFilter === 'all' || employee.department === departmentFilter;
      return nameMatch && departmentMatch;
    });
  }, [employees, searchTerm, departmentFilter]);

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">قائمة الموظفين</h1>
        <button
          onClick={onAddEmployeeClick}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          <UserPlusIcon className="w-5 h-5 me-2" />
          إضافة موظف جديد
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 bg-gray-50 rounded-lg border">
        <input
          type="text"
          placeholder="ابحث بالاسم..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value as Department | 'all')}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">جميع الأقسام</option>
          {Object.values(Department).map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الاسم</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المنصب</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">القسم</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تاريخ التعيين</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} onClick={() => onSelectEmployee(employee.id)} className="hover:bg-gray-100 cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.hiringDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredEmployees.length === 0 && <p className="text-center p-6 text-gray-500">لا يوجد موظفين يطابقون معايير البحث.</p>}
        </div>
      </div>
    </div>
  );
};
