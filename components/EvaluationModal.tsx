
import React, { useState } from 'react';
import { Evaluation, EvaluationType, Employee } from '../types';
import { Modal } from './Modal';

interface EvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee;
  evaluationType: EvaluationType;
  onAddEvaluation: (evaluation: Omit<Evaluation, 'id'>) => void;
}

export const EvaluationModal: React.FC<EvaluationModalProps> = ({ isOpen, onClose, employee, evaluationType, onAddEvaluation }) => {
  const [score, setScore] = useState(3);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (notes.trim() === '') {
      setError('يرجى كتابة ملاحظات التقييم.');
      return;
    }

    onAddEvaluation({
      employeeId: employee.id,
      date: new Date().toISOString().split('T')[0],
      type: evaluationType,
      score,
      notes,
    });
    setScore(3);
    setNotes('');
    setError('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`تقييم ${evaluationType} لـ ${employee.name}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">{error}</div>}
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">التقييم (1-5)</label>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">ضعيف</span>
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setScore(s)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-colors ${
                  score >= s ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {s}
              </button>
            ))}
            <span className="text-sm text-gray-500">ممتاز</span>
          </div>
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">الملاحظات</label>
          <textarea
            id="notes"
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        <div className="flex justify-end pt-4 space-s-3">
          <button type="button" onClick={onClose} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">إلغاء</button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">حفظ التقييم</button>
        </div>
      </form>
    </Modal>
  );
};
