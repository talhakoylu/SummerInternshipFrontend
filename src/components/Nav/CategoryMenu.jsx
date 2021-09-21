import React, { useEffect, useState } from 'react'
import { Badge, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCategories } from '../../redux/actions/auth.action';
import { BookService } from "../../redux/services"


/**
 * A function created to return a list of categories and output HTML.
 * It was designed as a menu that will be located under the navbar area.
 * @returns HTML output.
 */

function Categories() {
    const lang = useSelector((state) => state.auth.lang)
    const categories = useSelector((state) => state.auth.categories)
    const dispatch = useDispatch()
    const [fetching, setFetching] = useState(false);

    //create a category item
    const CategoryItem = ({ category }) => {
        return (
            <Link to={"/books?category=" + category.id}>
                <Badge bg="secondary" className="text-dark my-1 me-2 py-2">{lang === "en" ? category.title_english : category.title}</Badge>
            </Link>
        )
    }

    useEffect(() => {
        setFetching(true);
        BookService.categoryList()
            .then((res) => {
                dispatch(setCategories(res.data));
            })
            .catch()
            .finally(() => {
                setFetching(false);
            })
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="section1-bg">
            <Container>
                <div className="d-flex py-2 pe-1">
                    {fetching ? (<Badge bg={"light"} className={"text-dark m-1"}>...</Badge>) : (
                        categories.length ? categories.map((category) => {
                            return (
                                <CategoryItem key={category.slug}  category={category} />
                            )
                        }) : null
                    )}
                </div>
            </Container>
        </div>
    )
}

export default Categories