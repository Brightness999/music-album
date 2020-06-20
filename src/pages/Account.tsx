import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestUserInfo } from '../redux/actions';
import { selectUserInfo } from '../redux/selectors';
import { formatSimpleDate } from '../utils';

export default function AccountPage() {
    const dispatch = useDispatch();
    const userInfo = useSelector(selectUserInfo);
    const expireDate = new Date(userInfo.expirationDate * 1000);

    useEffect(() => {
        dispatch(requestUserInfo());
    }, [dispatch]);
    return (<div className="page">
        <div className="pt-5 pb-3">User Name: { userInfo.name }</div>
        <div className="pb-3">Expiration Date: { formatSimpleDate(expireDate.toString()) }</div>
        <div className="pb-3">Download: { userInfo.downloadedData }Mb / { userInfo.downloadLimit }Mb</div>
        <div>Special Download: { userInfo.specialDownloadedData }Mb / { userInfo.specialDownloadLimit }Mb</div>
    </div>);
}
