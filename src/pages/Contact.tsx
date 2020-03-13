import React from 'react';

export default function ContactPage() {
    return <div className="page contact">
        <div className="row justify-content-center">
            <div className="col-sm-10 col-sm-offset-2 col-md-6 col-md-offset-3 contact-box">
                <div className="form-view">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">
                                <a href="https://mail.house-language.com/"
                                ><span className="app-name">Mail</span></a>
                            </h3>
                        </div>
                        <div className="panel-body">
                            <div className="form-container">
                                <div id="messages"/>
                                <form action="https://mail.house-language.com/app/f?id=3" method="post"
                                      encType="multipart/form-data" id="form-app">
                                    <fieldset className="row">
                                        <div className="col-xs-12">
                                            <h3 className="legend">Contact</h3>
                                        </div>
                                        <div className="col-xs-12">
                                            <div className="form-group required-control">
                                                <label className="control-label" htmlFor="text_2">Your name</label>
                                                <input type="text" id="text_2" name="text_2" data-alias=""
                                                       className="form-control" required/>
                                            </div>
                                        </div>
                                        <div className="col-xs-12">
                                            <div className="form-group required-control">
                                                <label className="control-label" htmlFor="email_2">Your email</label>
                                                <input type="email" id="email_2" name="email_2" data-alias=""
                                                       className="form-control" required/>
                                            </div>
                                        </div>
                                        <div className="col-xs-12">
                                            <div className="form-group required-control">
                                                <label className="control-label" htmlFor="textarea_2">Message</label>
                                                <textarea id="textarea_2" name="textarea_2" data-alias=""
                                                          className="form-control" rows={3} required/>
                                            </div>
                                        </div>
                                        <div className="form-group col-xs-12">
                                            <div id="recaptcha_1" className="g-recaptcha"
                                                 data-sitekey="6Ld21uAUAAAAAALDhxe6D4R11xegjSP8zy2Ag5hN"
                                                 data-theme="light" data-size="normal"/>
                                        </div>
                                        <div className="col-xs-12">
                                            <div className="form-action">
                                                <button type="submit" id="button_1" name="button_1"
                                                        className="btn btn-primary">Submit
                                                </button>
                                            </div>
                                        </div>
                                    </fieldset>
                                    <div className="display-none" ><label className="control-label"
                                                                          htmlFor="_email">Excuse
                                        me, but leave this field in blank</label><input type="text" id="_email"
                                                                                        className="form-control"
                                                                                        name="_email"/></div>
                                </form>
                                <div id="progress" className="progress">
                                    <div id="bar" className="progress-bar w-0" role="progressbar">
                                        <span id="percent" className="sr-only">0% Complete</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}
