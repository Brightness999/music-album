import React, {createRef, useState} from 'react';
import {Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalHeader} from "reactstrap";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import parseHtml from "html-react-parser";
import {useToasts} from "react-toast-notifications";
import {useDispatch, useSelector} from "react-redux";
import {selectPremium} from "../redux/selectors";
import {Premium} from "../types";
import {setPremium} from "../redux/actions";

interface Props {
    isOpen: boolean;
    toggle: () => void;
    className?: string;
}

export default function PremiumPopup(props: Props) {
    const { addToast } = useToasts();
    const premium = useSelector(selectPremium);
    const goPremium = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let formData = new FormData();
        formData.set('text_1', text_1);
        formData.set('email_1', email_1);
        formData.set('text_2', text_2);
        formData.set('radio_1', premium);
        formData.set('button_1', '');
        formData.set('_email', '');
        formData.set('_csrf', '72HFHPSRWdcmiJ2Uo89U0vIWJdHx1gRNgdbY4oVCqwynILVsuv8_n0W-ys3ijaLlglN2hICbchLjg7SFwQrGYQ==');
        formData.set('g-recaptcha-response', gRecaptchaResponse);

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
                setText_1('');
                setEmail_1('');
                setText_2('');
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
    const [gRecaptchaResponse, setGRecaptchaResponse] = useState('');
    const [text_1, setText_1] = useState('');
    const [email_1, setEmail_1] = useState('');
    const [text_2, setText_2] = useState('');
    const refRecaptcha = createRef<ReCAPTCHA>();
    const dispatch = useDispatch();

    const premiums = [Premium.PREMIUM_30, Premium.PREMIUM_50, Premium.PREMIUM_100];
    return (
        <Modal isOpen={props.isOpen} toggle={props.toggle} className={props.className}>
            <ModalHeader toggle={props.toggle}>Premium</ModalHeader>
            <ModalBody>
                <div className="easy-form">
                    <div className="row justify-content-center">
                        <Col sm="12" md="12" lg="12" className="contact-box panel panel-default">
                            <form method="post"
                                  action="https://mail.house-language.com/app/f?id=2"
                                  onSubmit={goPremium}
                                  encType="multipart/form-data" id="form-app">
                                <fieldset className="row flex-column">
                                    <Col xs="12">
                                        <div className="form-group required-control">
                                            <Label className="control-label" htmlFor="text_1">Your name <span className='required'>*</span></Label>
                                            <input type="text" id="text_1" name="text_1" value={text_1} onChange={evt => setText_1(evt.target.value)} data-alias=""
                                                   className="form-control" required/>
                                        </div>
                                    </Col>
                                    <Col xs="12">
                                        <div className="form-group required-control">
                                            <Label htmlFor="email_1" className="control-label">Your email <span className='required'>*</span></Label>
                                            <input type="email" id="email_1" name="email_1" value={email_1} onChange={evt => setEmail_1(evt.target.value)} data-alias=""
                                                   className="form-control" required/>
                                        </div>
                                    </Col>
                                    <Col xs="12">
                                        <div className="form-group required-control">
                                            <Label className="control-label" htmlFor="text_2">DJ profile page</Label>
                                            <input type="text" id="text_2" name="text_2" value={text_2} onChange={evt => setText_2(evt.target.value)} data-alias=""
                                                   className="form-control"/>
                                        </div>
                                    </Col>
                                    <Col xs="12">
                                        <div className="form-group required-control">
                                            <Label className="control-label" htmlFor="radio_1">Select your account <span className='required'>*</span></Label>
                                            <FormGroup className="d-flex flex-column pl-3">
                                                {
                                                    premiums.map(pr => <Label>
                                                        <Input
                                                            type="radio"
                                                            name="radio_1"
                                                            value={pr}
                                                            onClick={() => dispatch && dispatch(setPremium(pr))}
                                                            checked={pr === premium}/>{pr}
                                                    </Label>)
                                                }
                                            </FormGroup>
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
                </div>
            </ModalBody>
        </Modal>
    );
}
