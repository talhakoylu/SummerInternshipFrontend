import React from 'react';
import { Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function BookImage({ book, buttons }) {
    const lang = useSelector((state) => state.auth.lang)

    return (
        <div className="position-relative overflow-hidden rounded">
            <img className="w-100" style={{ height: 360, objectFit: "cover" }} src={book.cover_image} alt={book.name + " cover image"} />
            {buttons ? <div className={"p-2 position-absolute top-0 right-0"}>
                <Badge bg={"warning"} className={"m-1"}>{lang === "en" ? book.level_english : book.level}</Badge>
                <Badge bg={"white"} className={"m-1 text-dark"}>{lang === "en" ? book.category_english : book.category}</Badge>
                <Badge bg={"info"} className={"m-1 text-dark"}>{book.language}</Badge>
                <Badge bg={"primary"} className={"m-1"}>{book.author}</Badge>
            </div> : null}
        </div>
    )
}