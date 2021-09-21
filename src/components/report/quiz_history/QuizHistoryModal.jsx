import React, {useState} from "react";
import { useTranslation } from "react-i18next";
import { notification } from "../../../plugins";
import { QuizService } from "../../../redux/services";
import Modal from './../../Modal';
import Loading from './../../Loading';
import QuizHistoryList from './QuizHistoryList';


export default function QuizHistoryModal({user, getChildren, ...dist}) {
    const {t} = useTranslation();
    const [fetching, setFetching] = useState(null);
    const [data, setData] = useState([]);

    return (
        <Modal title={t('reports.quiz_history.quiz_history')} size={"xl"} {...dist} onShow={() => {
            setFetching(true)
            QuizService.getQuizHistoryByChildId(user.id)
                .then((res) => {
                    setData(res.data)
                })
                .catch(() => {
                    notification.add('danger', t('reports.error'), t('reports.undefined_error'))
                })
                .finally(() => {
                    setFetching(false)
                })
        }}>
            <Loading fetching={fetching}>
                <QuizHistoryList data={data}/>
            </Loading>
        </Modal>
    );
}
