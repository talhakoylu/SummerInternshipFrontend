import { Button, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';

export default function AuthorCard({author, ...dist}) {
    const {t} = useTranslation()
    
    return (
        <Link to={"/author/" + author.slug} {...dist}>
            <Card>
                <div className={"d-flex align-items-center p-2"}>
                    <img style={{width: 28, height: 28, borderRadius: "100%"}} alt="" src={author.photo}
                         className={"border me-1"}/>
                    <div style={{flex: 1}}>{author.first_name + " " + author.last_name}</div>
                    <Button variant={"primary"}>{t("book.author.details")}</Button>
                </div>
            </Card>
        </Link>
    )
}