import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { deleteFolder, updateFolder } from "../utils/api";
import { useState, KeyboardEvent } from "react";
import { Input } from "@mui/material";
import { useDispatch } from "react-redux";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function FolderComponent({ folder }: any) {
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    await deleteFolder(folder);
    dispatch({ type: "DELETE_FOLDER", payload: folder });
  };

  const handleEdit = (e: any) => {
    e.stopPropagation();
    setEditing(true);
  };

  const handleEditKeyDown = (
    event: KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      const newFolder = {
        ...folder,
        name: (event.target as HTMLInputElement).value,
      };
      dispatch({ type: "UPDATE_FOLDER", payload: newFolder });
      updateFolder(newFolder);
      setEditing(false);
    }
    if (event.key === "Escape") {
      setEditing(false);
    }
  };

  return (
    <div className="FolderComponent">
      {editing ? (
        <Input
          onKeyDown={handleEditKeyDown}
          defaultValue={folder.name}
          autoFocus
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        folder.name
      )}

      <AddIcon fontSize="inherit" onClick={(e) => e.stopPropagation()} />
      <EditIcon fontSize="inherit" onClick={handleEdit} />
      <DeleteIcon fontSize="inherit" onClick={handleDelete} />
    </div>
  );
}
