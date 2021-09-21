import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Modal from './../../Modal';
import RegisterModal from './RegisterModal';
import notification from './../../../plugins/notification';
import { AuthService } from '../../../redux/services';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/actions/auth.action';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import TokenService from '../../../services/token.service';

export default function LoginModal({ ...dist }) {
    const { t } = useTranslation();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [fetching, setFetching] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const dispatch = useDispatch();

    const loginRequest = () => {
        setFetching(true);
        AuthService.token({
            data: {
                username: username,
                password: password
            }
        })
            .then(res => {
                TokenService.setToken(res.data);

                AuthService.me()
                    .then(res => {
                        dispatch(setUser(res.data));
                        TokenService.setUser(res.data);
                        dist.handleClose();
                        notification.add('success', t('services.auth.token.success_title'), t('services.auth.token.success_content'))
                    })
                    .catch(err => {
                        notification.add('danger', t('services.auth.token.went_wrong_title'), t('services.auth.token.went_wrong_content'))
                    })
                    .finally(() => {
                        setFetching(false);
                    });
            })
            .catch(err => {
                notification.add('danger', t('services.auth.token.failure_title'), t('services.auth.token.failure_content'))
                setFetching(false);
            })
            .finally(() => {
            });
    }

    return (
        <>
            <Modal title={t("account.login")} {...dist}>
                <Formik
                    initialValues={{
                        password: '',
                        username: '',
                    }}
                    validationSchema={yup.object().shape({
                        username: yup.string()
                            .required(t("account.register_modal.errors.username_required")),
                        password: yup.string()
                            .required(t("account.register_modal.errors.password_required"))
                    })}
                    onSubmit={fields => {
                        loginRequest()
                    }}
                >
                    {({ errors, status, touched, handleChange }) => (
                        <Form>
                            <div className="form-group mb-2">
                                <label htmlFor="username" className="mb-1">{t("account.register_modal.username")}</label>
                                <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} onChange={e => {
                                    handleChange(e)
                                    setUsername(e.target.value)
                                }} />
                                <ErrorMessage name="username" component="div" className="invalid-feedback" />
                            </div>

                            <div className="form-group mb-2">
                                <label htmlFor="password" className="mb-1">{t("account.register_modal.password")}</label>
                                <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} onChange={e => {
                                    handleChange(e)
                                    setPassword(e.target.value)
                                }} />
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>

                            <div className="d-grid gap-2 mt-4">
                                <Button type="submit" disabled={fetching ? true : false} className="btn btn-primary block">{t("account.login")}</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
                <div className="d-flex my-4">
                    <hr className="my-auto flex-grow-1" />
                    <div className="px-4">{t("account.modal_or")}</div>
                    <hr className="my-auto flex-grow-1" />

                </div>

                <div className="d-grid gap-2">
                    <Button variant="warning" className="block" type="submit" onClick={() => {
                        dist.handleClose()
                        setShow(true)
                    }}>
                        {t("account.register")}
                    </Button>
                </div>

            </Modal>
            <RegisterModal show={show} handleClose={handleClose}></RegisterModal>

        </>
    );
}
