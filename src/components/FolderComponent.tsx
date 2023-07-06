import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { createFolder, deleteFolder, updateFolder } from "../utils/api";
import { useState, KeyboardEvent } from "react";
import { Input } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  createFolder as createFolderAction,
  deleteFolder as deleteFolderAction,
  updateFolder as updateFolderAction,
} from "../store/foldersSlice";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function FolderComponent({ folder, hasChildren }: any) {
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDelete = async (e: any) => {
    if (editing) return;
    e.stopPropagation();

    if (hasChildren) {
      alert("You can't delete a folder with children!");
      return;
    }

    await deleteFolder(folder);
    dispatch(deleteFolderAction(folder));
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      dispatch(updateFolderAction(newFolder));
      updateFolder(newFolder);
      setEditing(false);
    }
    if (event.key === "Escape") {
      setEditing(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCreate = async (e: any) => {
    e.stopPropagation();
    const newFolder = {
      name: "New Folder",
      id: Math.trunc(Math.random() * 100000).toString(),
      isFolder: true,
      parentId: folder.id,
    };

    const addedFolder = await createFolder(newFolder);
    dispatch(createFolderAction(addedFolder));
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
        <span>{folder.name}</span>
      )}

      <AddIcon fontSize="inherit" onClick={handleCreate} />
      <EditIcon fontSize="inherit" onClick={handleEdit} />
      <DeleteIcon fontSize="inherit" onClick={handleDelete} />
    </div>
  );
}
