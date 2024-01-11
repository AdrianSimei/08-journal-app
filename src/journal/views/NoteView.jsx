import { DeleteOutline, SaveAltOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components"
import { useForm } from "../../hooks/useForm"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useMemo, useRef } from "react"
// import { setActionNote } from "../../store/journal/journalSlice"
import { setActionNote, startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'

export const NoteView = () => {
    const dispatch = useDispatch();
    const { active: note, messageSaved, isSaving } = useSelector(state => state.journal)

    const { body, title, date, onInputChange, formState } = useForm(note);

    const dateString = useMemo(() => {
        const NewDate = new Date(date)
        return NewDate.toUTCString();
    }, [date])


    const fileInputRef = useRef();


    useEffect(() => {
        dispatch(setActionNote(formState));
    }, [formState])

    useEffect(() => {
        if (messageSaved.length > 0) {
            Swal.fire('Nota actualizada', messageSaved, 'success');
        }
    }, [messageSaved])


    const onSaveNote = () => {
        dispatch(startSaveNote());
    }

    const onFileInputChange = ({ target }) => {
        if (target.files === 0) return;

        dispatch(startUploadingFiles(target.files));
    }

    const onDelete = () => {
        dispatch(startDeletingNote());
    }

    return (
        <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}
            className='animate__animated animate__fadeIn '
        >
            <Grid item>
                <Typography fontSize={39} fontWeight='light'> {dateString} </Typography>
            </Grid>

            <input
                type="file"
                multiple
                ref={fileInputRef}
                onChange={onFileInputChange}
                style={{ display: 'none' }}
            />

            <IconButton
                color='primary'
                disabled={isSaving}
                onClick={() => fileInputRef.current.click()}
            >
                <UploadOutlined />
            </IconButton>


            <Grid item>
                <Button
                    disabled={isSaving}
                    onClick={onSaveNote}
                    color="primary"
                    sx={{ padding: 2 }}>
                    <SaveAltOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un titulo"
                    label='Titulo'
                    sx={{ border: 'none', mb: 1 }}
                    name="title"
                    value={title}
                    onChange={onInputChange}
                />

                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Qué sucedio en el día de hoy?"
                    minRows={5}
                    name="body"
                    value={body}
                    onChange={onInputChange}
                />
            </Grid>

            <Grid container justifyContent='end'>
                <Button
                    onClick={onDelete}
                    sx={{ mt: 2 }}
                    color="error"
                >
                    <DeleteOutline />
                </Button>

            </Grid>

            {/* Imagenes gallery */}
            <ImageGallery
                images={note.imageUrls}
            />
        </Grid>
    )
}