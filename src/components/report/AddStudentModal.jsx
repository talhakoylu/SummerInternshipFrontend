import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { notification } from '../../plugins';
import { AuthService, SchoolService } from '../../redux/services';
import Modal from './../Modal';

export default function AddStudentModal({classroom, getChildren, ...dist}) {
    const {t} = useTranslation();
    const [fetching, setFetching] = useState(null);
    const [identityNumber, setIdentityNumber] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFetching(true);

        AuthService.getChildByIdentity(identityNumber)
            .then(res => {
                SchoolService.addStudentListItem({
                    school_class: classroom.id,
                    child: res.data.id
                })
                    .then(res => {
                        setIdentityNumber(null);
                        dist.handleClose();
                        getChildren()
                    })
                    .catch(err => {
                        if (err?.response?.data?.child) {
                            for (const [key, value] of Object.entries(err.response.data.child)) { // eslint-disable-line no-unused-vars
                                notification.add('danger', t('reports.error'), `${value}`)
                            }
                        } else {
                            notification.add('danger', t('reports.error'), t('reports.undefined_error'))
                        }
                    })
                    .finally(() => {
                        setFetching(false);
                    });
            })
            .catch(err => {
                notification.add('warning', t('reports.error'), t('reports.student_record.student_not_found'))
                setFetching(false);
            })
            .finally(() => {
            });
    }

    return (
        <Modal title={t('reports.student_record.add_new_student')} {...dist}>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>{t('reports.student_record.identity_number')}</Form.Label>
                    <Form.Control type="text" onChange={(e) => setIdentityNumber(e.target.value)}/>
                </Form.Group>

                <Button type={"submit"} disabled={fetching ? true : false} variant="primary" className={"w-100"}>
                    {t('reports.student_record.add')}
                </Button>
            </Form>
        </Modal>
    );
}
