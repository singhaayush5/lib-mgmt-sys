import { useState, useEffect } from "react";
import ListComponent from "./listcomponent";

function BookList(){
    const [bookData, setBookData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/books')
        .then(data => {
        return data.json();
        })
        .then(book => {
            setBookData(book);
        });
    })

    return(
        <div style={{textAlign: "center"}}>
        {bookData.map((book) => (
            <ListComponent 
                key={book._id}
                _id={book._id}
                title={book.title}
                author={book.author}
                publisher={book.publisher}
                category={book.category}
                quantity={book.quantity}
            />
          ))}
        </div>
    );
}

export default BookList;