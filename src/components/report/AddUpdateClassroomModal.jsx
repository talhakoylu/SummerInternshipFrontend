import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { notification } from '../../plugins';
import { SchoolService } from '../../redux/services';
import Modal from '../Modal';

export default function AddUpdateClassroomModal({classroom, getClassrooms, ...dist}) {
    const {t} = useTranslation();
    const [fetching, setFetching] = useState(null);

    const [form, setForm] = useState({
        name: classroom?.name,
        grade: classroom?.grade,
    });

    useEffect(() => {
        setForm({
            name: classroom?.name || "",
            grade: classroom?.grade || "",
        })
    }, [classroom])

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFetching(true);

        (classroom ? SchoolService.classUpdate(classroom.id, form) : SchoolService.classAdd(form))
            .then(res => {
                dist.handleClose();
                getClassrooms()
            })
            .catch(err => {
                let errors = Object.entries(err?.response?.data).filter((v, k) => v[0] !== "status_code")
                if (errors) {
                    for (const [key, value] of errors) { // eslint-disable-line no-unused-vars
                        notification.add('danger', t('reports.error'), `${value}`)
                    }
                } else {
                    notification.add('danger', t('reports.error'), t('reports.undefined_error'))
                }
            })
            .finally(() => {
                setFetching(false);
            });
    }

    return (
        <Modal title={classroom ? t('reports.student_record.update_classroom') : t('reports.student_record.add_new_classroom')} {...dist}>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>{t('reports.student_record.classroom_name')}</Form.Label>
                    <Form.Control type="text" name={"name"} value={form.name} onChange={onChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>{t('reports.student_record.classroom_grade')}</Form.Label>
                    <Form.Control type="number" placeholder={"Example: 1"} value={form.grade} name={"grade"}
                                  onChange={onChange}/>
                </Form.Group>
                <Button type={"submit"} disabled={fetching ? true : false} variant="primary" className={"w-100"}>
                    {classroom ? t('reports.student_record.update') : t('reports.student_record.add')}
                </Button>
            </Form>
        </Modal>
    );
}