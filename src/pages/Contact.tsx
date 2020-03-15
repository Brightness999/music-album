import React, { createRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';
import parseHtml from 'html-react-parser';
import { Button, Col } from 'reactstrap';
import {environment} from "../environments/envrionment";

export default function ContactPage() {

    const [gRecaptchaResponse, setGRecaptchaResponse] = useState('');
    const [text_2, setText_2] = useState('');
    const [email_2, setEmail_2] = useState('');
    const [textArea_2, setTextArea_2] = useState('');
    const { addToast } = useToasts();

    const contact = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let formData = new FormData();
        formData.set('text_2', text_2);
        formData.set('email_2', email_2);
        formData.set('textarea_2', textArea_2);
        formData.set('g-recaptcha-response', gRecaptchaResponse);
        formData.set('button_1', '');
        formData.set('_email', '');
        formData.set('_csrf', '72HFHPSRWdcmiJ2Uo89U0vIWJdHx1gRNgdbY4oVCqwynILVsuv8_n0W-ys3ijaLlglN2hICbchLjg7SFwQrGYQ==');

        axios.post(event.currentTarget.action, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json'
                }
            }
        ).then(res => {
            if (res.data['success']) {
                addToast(parseHtml(res.data['message']), {
                    appearance: 'info',
                    autoDismiss: true,
                });
                setText_2('');
                setEmail_2('');
                setTextArea_2('');
            } else {
                const errors = res.data['errors'];
                if (errors.length !== 0) {
                    if (errors[0]['messages'].length !== 0) {
                        addToast(parseHtml(errors[0]['messages'][0]), {
                            appearance: 'error',
                            autoDismiss: true,
                        });
                        return;
                    }
                }
                addToast(parseHtml(res.data['message']), {
                    appearance: 'error',
                    autoDismiss: true,
                });
            }
        }).catch(error => {
            console.log(error);
            addToast('Network error.', {
                appearance: 'error',
                autoDismiss: true
            });
        });
    };

    const refRecaptcha = createRef<ReCAPTCHA>();

    return <div className="page easy-form">
        <div className="row justify-content-center">
            <Col sm="12" md="12" lg="6" className="contact-box panel panel-default">
                <form method="post"
                      action={ environment.TEST_MODE ? "https://mail.house-language.com/app/f?id=3" : "https://mail.house-language.com/app/f?id=4" }
                      onSubmit={contact}
                      encType="multipart/form-data" id="form-app">
                    <fieldset className="row flex-column">
                        <Col xs="12"><h3 className="legend">Contact</h3></Col>
                        <Col xs="12">
                            <div className="form-group required-control">
                                <label className="control-label pb-1" htmlFor="text_2">Your name <span className='required'>*</span></label>
                                <input type="text" id="text_2" name="text_2" data-alias=""
                                       className="form-control" value={text_2} onChange={evt => setText_2(evt.target.value)} required/>
                            </div>
                        </Col>
                        <Col xs="12">
                            <div className="form-group required-control">
                                <label className="control-label pb-1" htmlFor="email_2">Your email <span className='required'>*</span></label>
                                <input type="email" id="email_2" name="email_2" data-alias=""
                                       className="form-control" value={email_2} onChange={evt => setEmail_2(evt.target.value)} required/>
                            </div>
                        </Col>
                        <Col xs="12">
                            <div className="form-group required-control">
                                <label className="control-label pb-1" htmlFor="textarea_2">Message <span className='required'>*</span></label>
                                <textarea id="textarea_2" name="textarea_2" data-alias=""
                                          className="form-control" value={textArea_2} onChange={evt => setTextArea_2(evt.target.value)} rows={3} required/>
                            </div>
                        </Col>
                        <Col xs="12" className="form-group">
                            <ReCAPTCHA
                                ref={refRecaptcha}
                                sitekey="6Ld21uAUAAAAAALDhxe6D4R11xegjSP8zy2Ag5hN"
                                onChange={v => setGRecaptchaResponse(v?v:'')}
                            />
                        </Col>
                        <Col xs="12">
                            <div className="form-action">
                                <Button type="submit" id="button_1"
                                        name="button_1"
                                        className="btn btn-primary">Submit
                                </Button>
                            </div>
                        </Col>
                    </fieldset>
                    <div className="display-none" >
                        <label className="control-label" htmlFor="_email">Excuse me, but leave this field in blank</label>
                        <input type="text" id="_email" className="form-control" name="_email"/>
                    </div>
                </form>
                <div id="progress" className="progress">
                    <div id="bar" className="progress-bar w-0" role="progressbar">
                        <span id="percent" className="sr-only">0% Complete</span>
                    </div>
                </div>
            </Col>
        </div>
    </div>;
}
