import { ReadingLog } from "../types";
import { Book } from "../types";
import { Student } from "../types";

interface ReadingItemProps {
  readingitem: ReadingLog;
  book?: Book;
  student? : Student
}
//this just displays reading log currently
//we do not include log or student id as thats private info
//currently this will just display the whole reading log,
//we need to eventually change this to only display the requested user
export default function ReadingItem({ readingitem, book, student }: ReadingItemProps) {
  const formatteddate = readingitem.dateFinished
  ? new Date(readingitem.dateFinished).toLocaleDateString() //formatting date
  : "in progress"

  return (
    <li style={{ marginBottom: "10px", listStyle: "none", borderBottom: "1px solid #eee", paddingBottom: "8px" }}>
      <div>
        <strong>Student: {student? student.firstName: ''} {student? student.lastName: ''} </strong>
        <strong>Book Title: {book ? book.title: `ID #${readingitem.bookId}`}</strong> {" "}
        <strong>Book ID #{readingitem.bookId}</strong> {" "} 
        <strong>Date Finished: {formatteddate}</strong> {" "}
        <strong>Rating Number {readingitem.rating}</strong> {" "}
        {/* <strong>hello :D</strong> this was debug to ensure rendering*/}
      </div>
    </li>
  );
}