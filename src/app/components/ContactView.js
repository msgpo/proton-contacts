import React from 'react';
import { c } from 'ttag';
import PropTypes from 'prop-types';
import { useModals, PrimaryButton, Button } from 'react-components';
import downloadFile from 'proton-shared/lib/helpers/downloadFile';

import ContactModal from './ContactModal';
import { toICAL } from '../helpers/vcard';
import ContactSummary from './ContactSummary';
import SignedContactProperties from './SignedContactProperties';
import EncryptedContactProperties from './EncryptedContactProperties';

const ContactView = ({ contact, errors }) => {
    const { createModal } = useModals();
    const openContactModal = () => {
        createModal(<ContactModal contact={contact} />);
    };

    const handleExport = () => {
        const vcard = toICAL(contact);
        const blob = new Blob(vcard, { type: 'data:text/plain;charset=utf-8;' });

        downloadFile(blob, 'contact');
    };

    return (
        <>
            <div className="flex flex-spacebetween">
                <h1>{c('Title').t`Contact details`}</h1>
                <div>
                    <PrimaryButton onClick={openContactModal}>{c('Action').t`Edit`}</PrimaryButton>
                    <Button onClick={handleExport}>{c('Action').t`Export`}</Button>
                </div>
            </div>
            <ContactSummary contact={contact} />
            <SignedContactProperties contact={contact} />
            <EncryptedContactProperties contact={contact} />
        </>
    );
};

const ContactPropertyPropTypes = PropTypes.shape({
    values: PropTypes.arrayOf(PropTypes.string),
    type: PropTypes.string,
    group: PropTypes.string
});

const ContactPropertiesPropTypes = PropTypes.oneOfType([
    ContactPropertyPropTypes,
    PropTypes.arrayOf(ContactPropertyPropTypes)
]);

const ContactPropTypes = PropTypes.shape({
    fn: ContactPropertiesPropTypes,
    n: ContactPropertiesPropTypes,
    nickname: ContactPropertiesPropTypes,
    photo: ContactPropertiesPropTypes,
    bday: ContactPropertiesPropTypes,
    anniversary: ContactPropertiesPropTypes,
    gender: ContactPropertiesPropTypes,
    adr: ContactPropertiesPropTypes,
    tel: ContactPropertiesPropTypes,
    email: ContactPropertiesPropTypes,
    impp: ContactPropertiesPropTypes,
    lang: ContactPropertiesPropTypes,
    tz: ContactPropertiesPropTypes,
    geo: ContactPropertiesPropTypes,
    title: ContactPropertiesPropTypes,
    role: ContactPropertiesPropTypes,
    logo: ContactPropertiesPropTypes,
    org: ContactPropertiesPropTypes,
    member: ContactPropertiesPropTypes,
    related: ContactPropertiesPropTypes,
    categories: ContactPropertiesPropTypes,
    note: ContactPropertiesPropTypes,
    prodid: ContactPropertiesPropTypes,
    rev: ContactPropertiesPropTypes,
    sound: ContactPropertiesPropTypes,
    uid: ContactPropertiesPropTypes,
    clientpidmap: ContactPropertiesPropTypes,
    url: ContactPropertiesPropTypes,
    version: ContactPropertiesPropTypes,
    key: ContactPropertiesPropTypes,
    fburl: ContactPropertiesPropTypes,
    caladruri: ContactPropertiesPropTypes,
    caluri: ContactPropertiesPropTypes
});

ContactView.propTypes = {
    contact: ContactPropTypes,
    errors: PropTypes.array
};

export default ContactView;