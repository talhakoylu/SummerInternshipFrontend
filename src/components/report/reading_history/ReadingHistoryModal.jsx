import React, {useState} from "react";
import {useTranslation} from 'react-i18next';
import Modal from './../../Modal';
import notification from './../../../plugins/notification';
import { BookService } from "../../../redux/services";
import ReadingHistoryList from './ReadingHistoryList';
import Loading from './../../Loading';

export default function ReadingHistoryModal({user, getChildren, ...dist}) {
    const {t} = useTranslation();
    const [fetching, setFetching] = useState(null);
    const [data, setData] = useState([]);

    return (
        <Modal title={t('reports.reading_history.reading_history_page')} {...dist} onShow={() => {
            setFetching(true)
            BookService.readingHistoryList(user.id)
                .then(res => {
                    setData(res.data)
                })
                .catch(err => {
                    notification.add('danger', t('reports.error'), t('reports.undefined_error'))
                })
                .finally(() => {
                    setFetching(false)
                });
        }}>
            <Loading fetching={fetching}>
                <ReadingHistoryList data={data}/>
            </Loading>
        </Modal>
    );
}