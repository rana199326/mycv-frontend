import { Student } from '../../types/Student';

interface StudentTableRowProps {
  student: Student;
  onEdit: (id: number) => void;
}

export const StudentTableRow = ({ student, onEdit }: StudentTableRowProps) => {
  const getStatusColor = (status: Student['status']) => {
    return status === 'Active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="py-4 px-3">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900">{student.name}</span>
          <span className="text-sm text-gray-500">{student.email}</span>
        </div>
      </td>
      <td className="py-4 px-3">
        <div className="flex flex-col">
          <span className="text-sm text-gray-900">{student.grade}</span>
          <span className="text-sm text-gray-500">{student.promotion}</span>
        </div>
      </td>
      
      <td className="py-4 px-3">
        <span className="text-sm text-gray-900 font-medium">
          {student.averageGrade}/20
        </span>
      </td>
      <td className="py-4 px-3">
        <span className={`inline-flex rounded-full px-2 text-xs font-semibold ${getStatusColor(student.status)}`}>
          {student.status}
        </span>
      </td>
      <td className="py-4 text-right px-3">
        <button 
          onClick={() => onEdit(student.id)}
          className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
        >
          Modifier
        </button>
      </td>
    </tr>
  );
};
