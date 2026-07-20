import { Student } from '../../types/Student';
import { StudentTableHeader } from './StudentTableHeader';
import { StudentTableRow } from './StudentTableRow';

interface StudentTableProps {
  students: Student[];
  onEdit: (id: number) => void;
}

export const StudentTable = ({ students, onEdit }: StudentTableProps) => {
  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle">
          <table className="min-w-full divide-y divide-gray-300">
            <StudentTableHeader />
            <tbody className="divide-y divide-gray-200 bg-white">
              {students.map((student) => (
                <StudentTableRow 
                  key={student.id} 
                  student={student}
                  onEdit={onEdit}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
