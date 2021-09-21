import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import Modal from './../../Modal';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import notification from '../../../plugins/notification';
import { AuthService } from '../../../redux/services';
import { Button } from 'react-bootstrap';

export default function RegisterModal({ ...dist }) {
    const today = new Date();
    const { t } = useTranslation();
    const [fetching, setFetching] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [identityNumber, setIdentityNumber] = useState(null);
    const [userType, setUserType] = useState(null);
    const [gender, setGender] = useState(null);
    const [birthDate, setBirthDate] = useState(null);


    const RegisterRequest = () => {
        setFetching(true);
        AuthService.register({
            data: {
                username: username,
                password: password,
                email: email,
                first_name: firstName,
                last_name: lastName,
                identity_number: identityNumber,
                user_type: userType,
                gender: gender,
                birth_date: birthDate,
            }
        })
            .then(res => {
                dist.handleClose()
                notification.add('success', t("account.register_modal.registration_success_title"), t("account.register_modal.registration_success_content"))
            })
            .catch(err => {
                Object.keys(err.response.data).filter(x => x !== "status_code").forEach(element => {
                    if (element === "non_field_errors") {
                        return notification.add('danger', t("account.register_modal.errors.registration_error_title"), <li>{err.response.data[element]}</li>)
                    }
                    notification.add('danger', t("account.register_modal.errors.registration_error_title"), <div ><strong> {t("account.register_modal." + element)}</strong> : {err.response.data[element]}</div>)
                });


            })
            .finally(() => {
                setFetching(false)
            });
    }

    return (
        <>
            <Modal title={t("account.register")} {...dist}>
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                        identityNumber: '',
                        userType: undefined,
                        birthDate: '',
                        gender: undefined,
                        username: '',
                        acceptTerms: false
                    }}
                    validationSchema={yup.object().shape({
                        firstName: yup.string()
                            .required(t("account.register_modal.errors.first_name_required"))
                            .min(3, t("account.register_modal.errors.first_name_min")),
                        lastName: yup.string()
                            .required(t("account.register_modal.errors.last_name_required"))
                            .min(3, t("account.register_modal.errors.last_name_min")),
                        email: yup.string()
                            .email(t("account.register_modal.errors.email_not_valid"))
                            .required(t("account.register_modal.errors.email_required")),
                        username: yup.string()
                            .min(5, t("account.register_modal.errors.username_min"))
                            .required(t("account.register_modal.errors.username_required")),
                        password: yup.string()
                            .required(t("account.register_modal.errors.password_required"))
                            .matches(/^.*(?=.{8,})(?=.*\d)(?=.*[a-zA-Z]).*$/, t("account.register_modal.errors.password_regex")),
                        confirmPassword: yup.string()
                            .oneOf([yup.ref('password'), null], t("account.register_modal.errors.password_match"))
                            .required(t("account.register_modal.errors.re_password_required")),
                        identityNumber: yup.string()
                            .required(t("account.register_modal.errors.identity_number_required"))
                            .matches(/^[0-9]+$/, t("account.register_modal.errors.identity_number_positive"))
                            .max(11, t("account.register_modal.errors.identity_number_length")),
                        gender: yup.number()
                            .required(t("account.register_modal.errors.gender_required")),
                        birthDate: yup.date()
                            .required(t("account.register_modal.errors.birth_date_required"))
                            .max(today, t("account.register_modal.errors.birth_date_earlier")),
                        userType: yup.number()
                            .required(t("account.register_modal.errors.user_type_required")),
                        acceptTerms: yup.bool()
                            .oneOf([true], t("account.register_modal.errors.terms_of_use_required"))
                    })}
                    onSubmit={fields => {
                        RegisterRequest()
                    }}
                >
                    {({ errors, status, touched, handleChange }) => (
                        <Form>
                            <div className="form-row">
                                <div className="row">
                                    <div className="form-group col-lg-6 col-sm-12 mb-2">
                                        <label htmlFor="firstName" className="mb-1">{t("account.register_modal.first_name")}</label>
                                        <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} onChange={e => {
                                            handleChange(e)
                                            setFirstName(e.target.value)
                                        }} />
                                        <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group col-lg-6 col-sm-12 mb-2">
                                        <label htmlFor="lastName" className="mb-1">{t("account.register_modal.last_name")}</label>
                                        <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} onChange={e => {
                                            handleChange(e)
                                            setLastName(e.target.value)
                                        }} />
                                        <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="username" className="mb-1">{t("account.register_modal.username")}</label>
                                <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} onChange={e => {
                                    handleChange(e)
                                    setUsername(e.target.value)
                                }} />
                                <ErrorMessage name="username" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="email" className="mb-1">{t("account.register_modal.email")}</label>
                                <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} onChange={e => {
                                    handleChange(e)
                                    setEmail(e.target.value)
                                }} />
                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-row">
                                <div className="row">
                                    <div className="form-group col-lg-6 col-sm-12 mb-2">
                                        <label htmlFor="identityNumber" className="mb-1">{t("account.register_modal.identity_number")}</label>
                                        <Field name="identityNumber" type="text" className={'form-control' + (errors.identityNumber && touched.identityNumber ? ' is-invalid' : '')} onChange={e => {
                                            handleChange(e)
                                            setIdentityNumber(e.target.value)
                                        }} />
                                        <ErrorMessage name="identityNumber" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group col-lg-6 col-sm-12 mb-2">
                                        <label htmlFor="birthDate" className="mb-1">{t("account.register_modal.birth_date")}</label>
                                        <Field name="birthDate" type="date" className={'form-control' + (errors.birthDate && touched.birthDate ? ' is-invalid' : '')} onChange={e => {
                                            handleChange(e)
                                            setBirthDate(e.target.value)
                                        }} />
                                        <ErrorMessage name="birthDate" component="div" className="invalid-feedback" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="row">
                                    <div className="form-group col-lg-6 col-sm-12 mb-2">
                                        <label htmlFor="password" className="mb-1">{t("account.register_modal.password")}</label>
                                        <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} onChange={e => {
                                            handleChange(e)
                                            setPassword(e.target.value)
                                        }} />
                                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group col-lg-6 col-sm-12 mb-2">
                                        <label htmlFor="confirmPassword" className="mb-1">{t("account.register_modal.re_password")}</label>
                                        <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                                        <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="row">
                                    <div className="form-group col-lg-6 col-sm-12 mb-2">
                                        <label htmlFor="gender" className="mb-1">{t("account.register_modal.gender")}</label>
                                        <Field name="gender" type="text" as="select" className={'form-control' + (errors.gender && touched.gender ? ' is-invalid' : '')} onChange={e => {
                                            handleChange(e)
                                            setGender(e.target.value)
                                        }} >
                                            <option>{t("account.select_gender")}</option>
                                            <option value="1">{t("account.male")}</option>
                                            <option value="2">{t("account.female")}</option>
                                            <option value="3">{t("account.other")}</option>
                                        </Field>
                                        <ErrorMessage name="gender" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group col-lg-6 col-sm-12 mb-2">
                                        <label htmlFor="userType" className="mb-1">{t("account.register_modal.user_type")}</label>
                                        <Field name="userType" type="text" as="select" className={'form-control' + (errors.userType && touched.userType ? ' is-invalid' : '')} onChange={e => {
                                            handleChange(e)
                                            setUserType(e.target.value)
                                        }} >
                                            <option>{t("account.select_user_type")}</option>
                                            <option value="2">{t("account.child_student")}</option>
                                            <option value="3">{t("account.parent")}</option>
                                            <option value="4">{t("account.instructor")}</option>
                                        </Field>
                                        <ErrorMessage name="userType" component="div" className="invalid-feedback" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group form-check mb-2">
                                <Field type="checkbox" name="acceptTerms" className={'form-check-input ' + (errors.acceptTerms && touched.acceptTerms ? ' is-invalid' : '')} />
                                <label htmlFor="acceptTerms" className="form-check-label">{t("account.register_modal.terms_of_use")}</label>
                                <ErrorMessage name="acceptTerms" component="div" className="invalid-feedback" />
                            </div>
                            <div className="d-grid gap-2 mt-2">
                                <Button type="submit" disabled={fetching ? true : false} className="btn btn-warning block">{t("account.register")}</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal>

        </>
    );
}

