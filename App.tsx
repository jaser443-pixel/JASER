
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { EmployeeList } from './components/EmployeeList';
import { EmployeeProfile } from './components/EmployeeProfile';
import { MonthlyReport } from './components/MonthlyReport';
import { AddEmployeeForm } from './components/AddEmployeeForm';
import { EvaluationModal } from './components/EvaluationModal';
import { Modal } from './components/Modal';
import { Employee, Evaluation, EvaluationType } from './types';
import useLocalStorage from './hooks/useLocalStorage';
import { getInitialEmployees, getInitialEvaluations } from './services/storageService';

type View = 'dashboard' | 'employees' | 'reports';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  
  const [employees, setEmployees] = useLocalStorage<Employee[]>('employees', []);
  const [evaluations, setEvaluations] = useLocalStorage<Evaluation[]>('evaluations', []);
  
  useEffect(() => {
    // Populate with initial data if local storage is empty
    if (employees.length === 0) {
      setEmployees(getInitialEmployees());
    }
    if (evaluations.length === 0) {
      setEvaluations(getInitialEvaluations());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isAddEmployeeModalOpen, setAddEmployeeModalOpen] = useState(false);
  const [isEvaluationModalOpen, setEvaluationModalOpen] = useState(false);
  const [evaluationType, setEvaluationType] = useState<EvaluationType>(EvaluationType.DAILY);

  const handleSelectEmployee = (id: string) => {
    setSelectedEmployeeId(id);
    setCurrentView('employees');
  };

  const handleBackToList = () => {
    setSelectedEmployeeId(null);
  };

  const handleAddEmployee = (employeeData: Omit<Employee, 'id'>) => {
    const newEmployee: Employee = {
      ...employeeData,
      id: new Date().getTime().toString(),
    };
    setEmployees([...employees, newEmployee]);
  };
  
  const handleAddEvaluation = (evaluationData: Omit<Evaluation, 'id'>) => {
    const newEvaluation: Evaluation = {
        ...evaluationData,
        id: new Date().getTime().toString(),
    };
    setEvaluations([...evaluations, newEvaluation]);
  };

  const openEvaluationModal = (type: EvaluationType) => {
    setEvaluationType(type);
    setEvaluationModalOpen(true);
  };
  
  const selectedEmployee = employees.find(e => e.id === selectedEmployeeId);

  const renderContent = () => {
    if (currentView === 'employees' && selectedEmployee) {
      return <EmployeeProfile 
        employee={selectedEmployee} 
        evaluations={evaluations}
        onBack={handleBackToList}
        onAddDailyEval={() => openEvaluationModal(EvaluationType.DAILY)}
        onAddMonthlyEval={() => openEvaluationModal(EvaluationType.MONTHLY)}
      />;
    }
    
    switch (currentView) {
      case 'dashboard':
        return <Dashboard employees={employees} evaluations={evaluations} />;
      case 'employees':
        return <EmployeeList 
          employees={employees} 
          onSelectEmployee={handleSelectEmployee} 
          onAddEmployeeClick={() => setAddEmployeeModalOpen(true)}
        />;
      case 'reports':
        return <MonthlyReport employees={employees} evaluations={evaluations} />;
      default:
        return <Dashboard employees={employees} evaluations={evaluations} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header currentView={currentView} setCurrentView={setCurrentView} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        {renderContent()}
      </main>

      <Modal isOpen={isAddEmployeeModalOpen} onClose={() => setAddEmployeeModalOpen(false)} title="إضافة موظف جديد">
        <AddEmployeeForm onAddEmployee={handleAddEmployee} onClose={() => setAddEmployeeModalOpen(false)} />
      </Modal>

      {selectedEmployee && (
        <EvaluationModal 
            isOpen={isEvaluationModalOpen}
            onClose={() => setEvaluationModalOpen(false)}
            employee={selectedEmployee}
            evaluationType={evaluationType}
            onAddEvaluation={handleAddEvaluation}
        />
      )}
    </div>
  );
};

export default App;
