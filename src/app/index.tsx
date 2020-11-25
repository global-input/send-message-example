import React, { useState, useCallback } from "react";

import SendMessage from './SendMessage';
import CompanyInfo from './CompanyInfo';
import MessageSent from './MessageSent';
import Home from './Home';
import {ConnectionSettings} from './connection-settings';
import {AppPairing} from './app-pairing';


enum PAGES {
    HOME,
    COMPANY_INFO,
    SEND_MESSAGE,
    MESSAGE_SENT,
    CONNECTION_SETTINGS,
    APP_PAIRING
};
interface EmailMessage {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
};


interface Props {
    sendEmail?: (message: EmailMessage) => void;
}
const SendMessageApp: React.FC<Props> = ({ sendEmail }) => {
    const [page, setPage] = useState(PAGES.HOME);
    const home = useCallback(() => setPage(PAGES.HOME), [setPage]);
    const companyInfo = useCallback(() => setPage(PAGES.COMPANY_INFO), [setPage]);
    const sendMessage = useCallback(() => setPage(PAGES.SEND_MESSAGE), [setPage]);
    const messageSent = useCallback(() => setPage(PAGES.MESSAGE_SENT), [setPage]);
    const pairing = useCallback(() => setPage(PAGES.APP_PAIRING), [setPage]);
    const connectionSettings = useCallback(() => setPage(PAGES.CONNECTION_SETTINGS), [setPage]);

    const onSendMessage = useCallback((firstName: string, lastName: string, email: string, phone: string, message: string) => {
        if (sendEmail) {
            sendEmail({ firstName, lastName, email, phone, message });
        }
        else {
            mockSendEmail({ firstName, lastName, email, phone, message });
        }
        messageSent();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setPage]);


    switch (page) {
        case PAGES.HOME:
            return (<Home companyInfo={companyInfo} sendMessage={sendMessage} connectionSettings={connectionSettings} />);
        case PAGES.COMPANY_INFO:
            return (<CompanyInfo back={home} />);
        case PAGES.SEND_MESSAGE:
            return (<SendMessage back={home} onSendMessage={onSendMessage} />);
        case PAGES.MESSAGE_SENT:
            return (<MessageSent back={home} />);
        case PAGES.APP_PAIRING:
            return (<AppPairing back={home} />);
        case PAGES.CONNECTION_SETTINGS:
            return (<ConnectionSettings back={home} pairing={pairing} />);
        default:
            return null;
    }



}


const mockSendEmail = async ({ firstName, lastName, email, phone, message }) => {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            const messageBlob = { firstName, lastName, email, phone, message };
            console.log("mock message sender completed:" + JSON.stringify(messageBlob));
        }, 1000);
    });
}

export default SendMessageApp;