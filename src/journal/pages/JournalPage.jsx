import { AddOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startNewNote } from "../../store/journal";
import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedViews } from "../views";

export const JournalPage = () => {
  // usamos el dispatch para despachar una acción
  const dispatch = useDispatch();

  // buscamos el estado del boton para hacer visible o no segun se esta o no guradno una nota
  const { isSaving, activeNote } = useSelector((state) => state.journal);

  // Creamos la función para agragear una nueva nota
  const onClickNewNote = () => {
    // Mandamos a crear la nueva nota
    dispatch(startNewNote());
  };

  return (
    <JournalLayout>

      {/* Si hay nota mostramos la view de las notas */}
      {
        !!activeNote ? <NoteView /> : <NothingSelectedViews />
      }

      {/* <NothingSelectedViews /> */}
      {/* <NoteView /> */}

      {/* NothingSelected */}

      <IconButton
        onClick={onClickNewNote}
        disabled={ isSaving }
        size="large"
        sx={{
          color: "white",
          backgroundColor: "error.main",
          ":hover": { backgroundColor: "error.main", opacity: 0.9 },
          position: "fixed",
          right: 50,
          bottom: 50,
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
      {/* NoteView */}
    </JournalLayout>
  );
};
