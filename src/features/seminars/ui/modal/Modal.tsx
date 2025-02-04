import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useRemoveSeminarsMutation, useUpdateSeminarMutation} from "../../api/seminarsApi";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {UpdateModel} from "../../api/seminarsApi.types";
import {useState} from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 6,
};

type Props = {
    model: UpdateModel
}


export const Modals = ({model}: Props) => {
    const [open, setOpen] = useState(false);
    const [editedSeminar, setEditedSeminar] = useState<UpdateModel>(model)
    const handleOpen = () => setOpen(true);

    const [deleteSeminar] = useRemoveSeminarsMutation()

    const [updateSeminar] = useUpdateSeminarMutation();


    const deleteSeminarHandler = () => {
        deleteSeminar(model.id)
        setOpen(false)
    }

    const handleUpdateTitle = (title: string) => {
        setEditedSeminar(prev => ({ ...prev, title }));
    };

    const handleUpdateDescription = (description: string) => {
        setEditedSeminar(prev => ({ ...prev, description }));
    };

    const handleSaveChanges = () => {
        updateSeminar({model: editedSeminar});
        setOpen(false);
    };

    return (
        <div>
            <Button onClick={handleOpen}>Редактирование</Button>
            <Modal
                open={open}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <EditableSpan value={editedSeminar.title} onChange={handleUpdateTitle}/>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2, wordWrap: 'break-word' }}  component="p">
                        <EditableSpan value={editedSeminar.description} onChange={handleUpdateDescription}/>
                    </Typography>
                    <Button variant="outlined" color='error'
                            onClick={deleteSeminarHandler} sx={{mt: '30px'}}>Удалить</Button>
                    <Button variant="outlined" sx={{ml: '10px', mt: '30px'}} onClick={handleSaveChanges}>Применить</Button>
                </Box>
            </Modal>
        </div>
    );
}
