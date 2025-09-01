
import { Employee, Evaluation, Department, EvaluationType } from '../types';

export const getInitialEmployees = (): Employee[] => [
  { id: '1', name: 'أحمد الغامدي', position: 'مهندس برمجيات', department: Department.IT, hiringDate: '2022-08-15' },
  { id: '2', name: 'فاطمة الزهراني', position: 'أخصائية موارد بشرية', department: Department.HR, hiringDate: '2021-05-20' },
  { id: '3', name: 'خالد الشهري', position: 'محاسب', department: Department.FINANCE, hiringDate: '2023-01-10' },
  { id: '4', name: 'نورة العتيبي', position: 'مديرة مبيعات', department: Department.SALES, hiringDate: '2020-11-01' },
];

export const getInitialEvaluations = (): Evaluation[] => [
    { id: 'e1', employeeId: '1', date: '2024-05-01', type: EvaluationType.MONTHLY, score: 4, notes: 'أداء ممتاز خلال الشهر.' },
    { id: 'e2', employeeId: '1', date: '2024-05-15', type: EvaluationType.DAILY, score: 5, notes: 'أنجز المهمة المطلوبة بكفاءة عالية.' },
    { id: 'e3', employeeId: '1', date: '2024-04-01', type: EvaluationType.MONTHLY, score: 3, notes: 'أداء جيد، يحتاج لتحسين في إدارة الوقت.' },
    { id: 'e4', employeeId: '2', date: '2024-05-01', type: EvaluationType.MONTHLY, score: 5, notes: 'مبادرات ممتازة في تحسين بيئة العمل.' },
    { id: 'e5', employeeId: '2', date: '2024-05-18', type: EvaluationType.DAILY, score: 4, notes: 'تعامل احترافي مع المرشحين.' },
    { id: 'e6', employeeId: '4', date: '2024-05-01', type: EvaluationType.MONTHLY, score: 4, notes: 'تحقيق أهداف المبيعات للشهر.' },
];
