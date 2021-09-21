import { Button, DropdownButton, Dropdown } from 'react-bootstrap'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LoginModal from '../Nav/Modals/LoginModal'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/actions/auth.action';
import notification from './../../plugins/notification';
import localStorageClear from '../../plugins/localStorageClear';
import { Link } from 'react-router-dom';

export default function AccountArea() {
    const { t } = useTranslation();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const user = useSelector((state) => state.auth.user)
    const dispatch = useDispatch()

    return (
        <>
            {!user ? <Button onClick={() => setShow(true)}>
                <FontAwesomeIcon icon={"user"} className="me-2"></FontAwesomeIcon>
                {t("account.account_management")}
            </Button> :
                <DropdownButton variant = "secondary" title={t("account.welcome") + ", " + user.username}>
                    {user.user_type !== 1 ? <Dropdown.Item as={Link} to = "/profile/update">{t("account.profile_page")}</Dropdown.Item> : null}
                    <Dropdown.Item as={Link} to = "/profile/password-change">{t("account.password_change_page")}</Dropdown.Item>
                    {user.user_type === 2 ? <Dropdown.Item as={Link} to = "/profile/reading-history">{t('reports.reading_history.reading_history_page')}</Dropdown.Item> : null}
                    {user.user_type === 2 ? <Dropdown.Item as={Link} to = "/profile/quiz-history">{t('reports.quiz_history.quiz_history_page')}</Dropdown.Item> : null}
                    {user.user_type === 3 ? <Dropdown.Item as={Link} to = "/profile/my-children">{t('reports.my_children_page')}</Dropdown.Item> : null}
                    {user.user_type === 4 ? <Dropdown.Item as={Link} to = "/profile/my-classrooms">{t('reports.student_record.my_classes')}</Dropdown.Item> : null}
                    {user.user_type === 4 & user.is_principal === true ? <Dropdown.Item as={Link} to = "/profile/my-school">{t('reports.school_record.my_school')}</Dropdown.Item> : null}
                    <Dropdown.Item onClick={() => {
                        dispatch(setUser(null));
                        localStorageClear();
                        notification.add('info', t("account.log_out"), t("account.log_out_content"))
                    }}>{t("account.log_out")}</Dropdown.Item>
                </DropdownButton>
            }

            <LoginModal show={show} handleClose={handleClose}></LoginModal>
        </>
    )
}