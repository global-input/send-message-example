import React from "react";
import { useGlobalInputApp } from 'global-input-react';
import { P, PageContainer, } from './app-layout';
import DisplayApplicationInfo from './DisplayApplicationInfo';

interface Props {
    back: () => void;
}
const MessageSent: React.FC<Props> = ({ back }) => {

    const mobile = useGlobalInputApp({
        initData: {
            action: "input",
            dataType: "form",
            form: {
                id: "mymessage@company.com",
                title: "Sending a Message",
                label: "contacts",
                fields: Object.values(FIELDS)
            }
        }
    });
    mobile.setOnchange(({ field }) => {

        switch (field.id) {
            case FIELDS.back.id:
                back();
                break;
            default:
        }
    });
    return (
        <PageContainer>

            <mobile.ConnectQR />
            {mobile.isConnected && (<>

                <P>Send Message Complete</P>
                <DisplayApplicationInfo />

            </>)}
        </PageContainer>
    );


};


const FIELDS = {
    info: {
        value: "The message is sent, you may press the 'Back' button to back to the main menu",
        type: "info",
    },
    back: {
        id: "back",
        icon: "back",
        label: "Back",
        type: "button"
    }
}

export default MessageSent;