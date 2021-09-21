import React from "react";
import { Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import notification from './../../plugins/notification';
import { useTranslation } from "react-i18next";

export default function ChildCard({ readingHistoryHandleShow, quizHistoryHandleShow, setUser, children, setChildren, deleteService, child: { child: { user } }, ...dist }) {

    const { t } = useTranslation();
    return (
        <div>
            <Card className={"text-dark"} {...dist}>
                <div className={"d-flex align-items-center p-2"}>
                    <FontAwesomeIcon className={"me-3 ms-2"} icon={"user"} size={"lg"} />
                    <div style={{ lineHeight: 1.2, flex: 1 }}>
                        <div className={"fw-bold"}>{user.get_full_name}</div>
                        <small>{user.username}</small>
                    </div>
                    <div className="d-flex mx-n1 align-items-center">
                        <Button className={"mx-1"} size={"sm"} variant={"info"} onClick={() => {
                            setUser(user);
                            quizHistoryHandleShow();
                        }}>
                            <FontAwesomeIcon icon={"eye"} className={"me-2"} />
                            {t('reports.quiz_history.quiz_history')}
                        </Button>
                        <Button className={"mx-1"} size={"sm"} variant={"success"} onClick={() => {
                            setUser(user);
                            readingHistoryHandleShow();
                        }}>
                            <FontAwesomeIcon icon={"eye"} className={"me-2"} />
                            {t('reports.reading_history.reading_history')}
                        </Button>
                        <Button className={"mx-1"} size={"sm"} variant={"danger"} onClick={() => {
                            deleteService()
                                .then(res => {
                                    setChildren(children.filter(x => x.child.user.id !== user.id))
                                })
                                .catch(err => {
                                    notification.add('danger', '', err.response?.data?.detail || "Hata oluştu!")
                                })
                                .finally(() => {
                                });
                        }}>
                            <FontAwesomeIcon icon={"trash"} />
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    )
}
