import {ChangeEvent, useState} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CreateIcon from '@mui/icons-material/Create';

type Props = {
    value: string
    onChange: (newTitle: string) => void
    entityStatus?: boolean
};

export const EditableSpan = ({value, onChange, entityStatus}: Props) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(value)

    const activateEditModeHandler = () => {
        if (entityStatus) {
            setEditMode(false)
        } else { setEditMode(true) }
    }

    const deactivateEditModeHandler = () => {
        setEditMode(false)
        onChange(title)
    }

    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return (
        <>
            {editMode
                ?
                <TextField
                    variant={'outlined'}
                    value={title}
                    size={'small'}
                    onChange={changeTitleHandler}
                    onBlur={deactivateEditModeHandler}
                    autoFocus
                    disabled={entityStatus}
                />
                : <>
                   {value}
                    <Button onClick={activateEditModeHandler} variant={'text'}>
                        <CreateIcon/>
                    </Button>
                </>
            }
        </>
    );
};
