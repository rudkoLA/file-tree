import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { useState, KeyboardEvent } from "react";
import { Input } from "@mui/material";
import { useAppDispatch } from "../store";
import {
  createFolder as createFolderAction,
  deleteFolder as deleteFolderAction,
  updateFolder as updateFolderAction,
} from "../store/foldersSlice";
import { IFolder } from "./Tree";

interface IFolderProps {
  folder: IFolder;
  hasChildren: boolean;
}

export default function FolderComponent({ folder, hasChildren }: IFolderProps) {
  const [editing, setEditing] = useState(false);
  const dispatch = useAppDispatch();

  const handleDelete = async (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    if (editing) return;
    e.stopPropagation();

    if (hasChildren) {
      alert("You can't delete a folder with children!");
      return;
    }

    dispatch(deleteFolderAction(folder));
  };
  const handleEdit = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
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
      setEditing(false);
    }
    if (event.key === "Escape") {
      setEditing(false);
    }
  };

  const handleCreate = async (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.stopPropagation();
    const newFolder = {
      name: "New Folder",
      id: Math.trunc(Math.random() * 100000).toString(),
      isFolder: true,
      parentId: folder.id,
    };

    dispatch(createFolderAction(newFolder));
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
