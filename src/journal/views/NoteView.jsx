import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

import { useForm } from "../../hooks/useForm";
import { ImageGallery } from "../components";
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal";

export const NoteView = () => {
  // Tomamos la nota activa del store
  const { activeNote, messageSaved, isSaving } = useSelector((state) => state.journal);
  const dispatch = useDispatch();

  // Le ponemos a nuestro formulario como valor inicial nuestra nota
  const { body, title, date, onInputChange, formState } = useForm(activeNote);

  // Ponemos la fecha
  const dateString = useMemo(() => {
    // Reconstruimos la fecha
    const newDate = new Date(date).toUTCString();

    return newDate;
  }, [date]);

  // Simulamos un clic para que se dispare el boton de cargar archivos
  const fileInputRef = useRef();

  useEffect(() => {
    // Activamos la nota que queremos cuando cambia algo en el formState
    dispatch(setActiveNote(formState));
  }, [formState]);

  // Mandamos un aviso que la nota se acutalizo
  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire("Nota actualizada", messageSaved, "success");
    }
  }, [messageSaved]);

  // Creamos la función para guardar una nota
  const onSaveNote = () => {
    dispatch(startSaveNote());
  };

  const onFileInputChange = ({ target }) => {
    // console.log(target.files)

    // Si el hay 0 archivos es porque no quiere subir nada
    if (target.files === 0) return;

    // Si hay archivos es porque queire subir
    // console.log('Subiendo Archivos')
    dispatch(startUploadingFiles(target.files));
  };

  const onDelete = () => {
    dispatch( startDeletingNote() )
  }

  return (
    <Grid
      className="animate__animated animate__fadeIn"
      container
      direction="row"
      justifyContent="space-between"
      sx={{ mb: 1 }}
      alignItems="center"
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateString}
        </Typography>
      </Grid>

      <Grid item>
        <input type="file" multiple ref={fileInputRef} onChange={onFileInputChange} style={{ display: "none" }} />

        <IconButton color="primary" disabled={isSaving} onClick={() => fileInputRef.current.click()}>
          <UploadOutlined />
        </IconButton>

        <Button disabled={isSaving} onClick={onSaveNote} color="primary" sx={{ padding: 2 }}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un título"
          label="Título"
          sx={{ border: "none", mb: 1 }}
          name="title"
          value={title}
          onChange={onInputChange}
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿Que sucedió en el día de hoy?"
          minRows={5}
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </Grid>

      <Grid container justifyContent="end">
        <Button onClick={onDelete} sx={{ mt: 2 }} color="error">
          <DeleteOutline />
          Borrar
        </Button>
      </Grid>

      {/* Galería de imágenes */}
      <ImageGallery images={activeNote.imageUrls} />
    </Grid>
  );
};
