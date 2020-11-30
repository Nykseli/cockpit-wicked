/*
 * Copyright (c) [2020] SUSE LLC
 *
 * All Rights Reserved.
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of version 2 of the GNU General Public License as published
 * by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, contact SUSE LLC.
 *
 * To contact SUSE LLC about this file by physical or electronic mail, you may
 * find current contact information at www.suse.com.
 */

import React, { useState } from 'react';
import cockpit from 'cockpit';
import ModalConfirm from './ModalConfirm';
import { Button } from '@patternfly/react-core';

const _ = cockpit.gettext;

const DeleteConnection = ({ connection, deleteConnection }) => {
    const [isConfirmationOpen, setConfirmationOpen] = useState(false);

    const onClose = () => setConfirmationOpen(false);

    const deleteConnectionConfig = () => {
        deleteConnection(connection);
        onClose();
    };

    const deleteLabel = connection.virtual ? _("Delete") : _("Reset");

    return (
        <>
            <Button variant="danger" className="pf-m-danger" onClick={() => setConfirmationOpen(true)}>{deleteLabel}</Button>
            { isConfirmationOpen &&
                <ModalConfirm
                    title={cockpit.format(_("Delete '$0' configuration"), connection?.name)}
                    isOpen={isConfirmationOpen}
                    onCancel={onClose}
                    onConfirm={deleteConnectionConfig}
                >
                    {_("Please, confirm that you really want to the delete the interface configuration.")}
                </ModalConfirm>}
        </>
    );
};

export default DeleteConnection;
