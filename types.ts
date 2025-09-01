
export enum Department {
  IT = "تقنية المعلومات",
  HR = "الموارد البشرية",
  FINANCE = "المالية",
  SALES = "المبيعات",
  OPERATIONS = "العمليات"
}

export enum EvaluationType {
  DAILY = "يومي",
  MONTHLY = "شهري"
}

export interface Employee {
  id: string;
  name: string;
  position: string;
  department: Department;
  hiringDate: string;
}

export interface Evaluation {
  id: string;
  employeeId: string;
  date: string;
  type: EvaluationType;
  score: number; // Score from 1 to 5
  notes: string;
}
