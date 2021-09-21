import React, {useState} from "react";
import Modal from "../Modal";
import {Button, Card} from "react-bootstrap";
import {QuizService} from "../../redux/services";
import {useTranslation} from 'react-i18next';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Loading from "../Loading";
import {useBeforeunload} from 'react-beforeunload';

export default function QuizModal({book, listen, cancel, speak, voices, ...dist}) {
    const {t} = useTranslation();
    const [quiz, setQuiz] = useState(false);
    const [errMessage, setErrMessage] = useState(null);

    useBeforeunload((event) => {
        cancel();
    });

    const play = (text) => {
        cancel();

        let voice = voices.find(x => x.lang === book.language_code) || voices[0];

        speak({
            text: text,
            voice
        });
    }

    const [activeQuestion, setActiveQuestion] = useState(null);
    const [takingQuiz, setTakingQuiz] = useState(null);
    const question = quiz && quiz.questions.length ? quiz.questions.find((i, k) => (k + 1) === activeQuestion) : null
    const [finished, setFinished] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = useState({});

    return (
        <Modal title={quiz ? quiz.title : null} size={book && (!activeQuestion ? "sm" : "lg")} onShow={() => {
            setFetching(true);
            QuizService.lastQuizByBook(book.id)
                .then((res) => {
                    setQuiz(res.data)
                    setErrMessage(null)
                })
                .catch((err) => {
                    setErrMessage(err.response)
                })
                .finally(() => setFetching(false))
        }} {...dist}>
            <Loading error={errMessage} fetching={fetching}>
                {quiz ? <>
                    {finished ? (
                        <div className={"text-center py-5 h4"}>{t("book.quiz_modal.answers_saved")}</div>
                    ) : (
                        activeQuestion ? <>
                            {quiz.questions.length ? <div className={"m-n1"}>
                                <div className="d-flex align-items-center">
                                    <Button variant={"light"} size={"sm"} className={"m-1 py-1"}>{t("book.quiz_modal.questions")}:</Button>
                                    {quiz.questions.map((question, k) => {
                                        return (
                                            <Button onClick={() => setActiveQuestion(k + 1)}
                                                    variant={k + 1 === activeQuestion ? "secondary" : "light"}
                                                    size={"sm"}
                                                    className={"m-1 py-1"} style={{minWidth: 32}}>{k + 1}</Button>
                                        )
                                    })}
                                </div>
                            </div> : null}
                            <Card className={"bg-light h4 mb-0 mt-3"}>
                                <Card.Body>
                                    <div className="d-flex align-items-center">
                                        <div className={"me-2"} onClick={() => {
                                            play(question.question)
                                        }}><FontAwesomeIcon icon={"volume-up"}/></div>
                                        {question.question}
                                    </div>
                                </Card.Body>
                            </Card>
                            <div>
                                {question.answers.length ? <div className={"my-1"}>
                                    {question.answers.map((answer, k) => {
                                        return (
                                            <Button onClick={() => {
                                                setFetching(true);
                                                QuizService.createTakingQuizAnswer({
                                                    question: question.id,
                                                    taking_quiz: takingQuiz.id,
                                                    answer: answer.id,
                                                })
                                                    .then(res => {
                                                        setSelectedAnswers({
                                                            ...selectedAnswers,
                                                            [question.id]: answer.id,
                                                        })
                                                    })
                                                    .catch(err => {
                                                    })
                                                    .finally(() => {
                                                        setFetching(false);
                                                    });
                                            }} className={"border w-100 my-1"} style={{textAlign: "left"}}
                                                    variant={selectedAnswers[question.id] === answer.id ? "secondary" : "light"}>
                                                <div className="d-flex align-items-center w-100">
                                                    <div className={"me-2"} onClick={() => {
                                                        play(answer.answer)
                                                    }}><FontAwesomeIcon icon={"volume-up"}/></div>
                                                    {answer.answer}
                                                </div>
                                            </Button>
                                        )
                                    })}
                                </div> : null}
                            </div>
                            {selectedAnswers[question.id] ? (
                                <div className={"mt-2"}>
                                    {quiz.questions.length > activeQuestion ?
                                        <Button className={"w-100"}
                                                onClick={() => {
                                                    setActiveQuestion(activeQuestion + 1)
                                                }}>{t("book.quiz_modal.next_question")}</Button> : <Button className={"w-100"} variant={"success"}
                                                                    onClick={async () => {
                                                                        setFetching(true)
                                                                        await QuizService.updateTakingQuiz(takingQuiz.id)

                                                                        setFetching(false)
                                                                        setFinished(true)
                                                                    }}>{t("book.quiz_modal.finish_quiz")}</Button>}
                                </div>
                            ) : null}
                        </> : (
                            <div className={"position-relative bg-dark "}>
                                <img src={book.cover_image} className={"w-100"} alt="" style={{opacity: 0.25}}/>
                                <div
                                    className="top-0 left-0 fw-bold position-absolute w-100 h-100 justify-content-center align-items-center d-flex h4 mb-0">
                                    <Button onClick={() => {
                                        setFetching(true);
                                        QuizService.createTakingQuiz({
                                            quiz: quiz.id
                                        })
                                            .then((res) => {
                                                setTakingQuiz(res.data)
                                                setActiveQuestion(1)
                                                setErrMessage(null)
                                            })
                                            .catch((err) => {
                                                setErrMessage(err.response)
                                            })
                                            .finally(() => setFetching(false))
                                    }} size={"lg"} variant={"success"}>{t("book.quiz_modal.start_quiz")}</Button>
                                </div>
                            </div>
                        )
                    )}
                </> : null}
            </Loading>
        </Modal>
    );
}
