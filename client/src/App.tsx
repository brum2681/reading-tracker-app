import { useState, useEffect } from "react";
import { Student } from "./types";
import { ReadingLog } from "./types";
import { Book } from "./types";
import StudentItem from "./components/StudentItem";
import StudentEditForm from "./components/StudentEditForm";
import ReadingItem from "./components/ReadingLogItem";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "./api"; //"http://localhost:5000/api";
console.log(API_BASE)

export default function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [readinglog, setReadingLog] = useState<ReadingLog[]>([]);
  const [booklog, setBookLog] = useState<Book[]>([]);
  const [curruser, setCheckUser] = useState<string>(""); //use this for checking against name

  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    fetchReadingLog();
  }, []);

  useEffect(() => {
    fetchBookLog();
  }, []);

  const fetchBookLog = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/book`);
      if (!res.ok) throw new Error("Failed to load book log");
      const data = await res.json();
      setBookLog(data);
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };


  const fetchReadingLog = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/reading_log`);
      if (!res.ok) throw new Error("Failed to load reading log");
      const data = await res.json();
      setReadingLog(data);
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/students`);
      if (!res.ok) throw new Error("Failed to load students");
      const data = await res.json();
      setStudents(data);
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (updatedData: Student) => {
    try {
      const res = await fetch(`${API_BASE}/students/${updatedData.studentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error("Update failed");

      const savedStudent = await res.json();
      setStudents((prev) =>
        prev.map((s) => (s.studentId === savedStudent.studentId ? savedStudent : s))
      );
      setEditingStudent(null);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleSoftDelete = async (studentId: number) => {
    const confirmed = window.confirm(
      "Are you sure? This will remove the student from active lists and anonymize their personal data."
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`${API_BASE}/students/${studentId}/soft-delete`, {
        method: "POST",
      });

      if (!res.ok) throw new Error("Soft delete failed");

      setStudents((prev) => prev.filter((s) => s.studentId !== studentId));
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: "600px", margin: "20px auto" }}>
      <h2>Student Reading Tracker Directory</h2>
      <p>Live data managed via Neon PostgreSQL & Prisma</p>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {editingStudent && (
        <StudentEditForm
          student={editingStudent}
          onSave={handleUpdate}
          onCancel={() => setEditingStudent(null)}
        />
      )}

      {loading ? (
        <p>Loading active students...</p>
      ) : (
        <ul style={{ paddingLeft: 0 }}>
          {students.map((student) => (
            <StudentItem
              key={student.studentId}
              student={student}
              onEdit={setEditingStudent}
              onSoftDelete={handleSoftDelete}
            />
          ))}
          {students.length === 0 && <p>No active students found.</p>}
        </ul>
      )}

        <div style={{ marginBottom: '15px' }}> {/* use this to check for current user */}
            <label>
              User?: {' '}
              <input 
                type="string" 
                value={curruser} 
                onChange={(e) => setCheckUser(String(e.target.value))} 
                style={{ width: '60px', padding: '4px' }}
            />
          </label>
        </div>

      {loading ? (
        <p>Loading reading log...</p>
      ) : (
        <ul style={{ paddingLeft: 0 }}>
        {
          readinglog.map((reading) => {
          const matchbook = booklog.find((book) => book.bookId === reading.bookId); //these match students
          const matchstudent = students.find((student) => student.studentId === reading.studentId);

          const checkuser = students.find((student) => student.firstName === curruser);

          if (checkuser?.firstName === curruser && reading.studentId === checkuser.studentId){ //checks for correct user
            return(
              <ReadingItem
                key={reading.logId}
                readingitem={reading}
                book={matchbook}
                student={checkuser}
              />
            );
          }
          else{
            return("");
          }

          {/*return(
            <ReadingItem
              key={reading.logId}
              readingitem={reading}
              book={matchbook}
              student={checkuser}
            />
            );*/}
          })}
          {readinglog.length === 0 && <p>No reading log found.</p>}
        </ul>
      )}
    </div>
  );
}