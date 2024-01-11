import React from 'react'
import "./Books.css"
const Books = () => {
  return (
    <>
  <h1>My Books</h1>
  &lt;% books.forEach(function(book) {"{"} %&gt; &lt;% {"}"}); %&gt;
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Genre</th>
        <th>Publication Date</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>&lt;%= book.title %&gt;</td>
        <td>&lt;%= book.author %&gt;</td>
        <td>&lt;%= book.genre %&gt;</td>
        <td>&lt;%= book.publication_date %&gt;</td>
      </tr>
    </tbody>
  </table>
</>

  )
}

export default Books