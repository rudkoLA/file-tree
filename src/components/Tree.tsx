import { FC, useEffect } from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import FolderComponent from "./FolderComponent";
import { useSelector } from "react-redux";
import { fetchFolders, selectFolders } from "../store/foldersSlice";
import { RootState, useAppDispatch } from "../store";

export interface IFolder {
  id: string;
  name: string;
  parentId: string;
}

function getTreeItemsFromData(list: IFolder[], parentId: string): IFolder[] {
  const items = list.filter((item) => item.parentId === parentId);

  return items;
}

export default function Tree() {
  const folders = useSelector((state: RootState) => selectFolders(state));
  const dispatch = useAppDispatch();

  useEffect(() => {
    const asyncFunc = async () => {
      dispatch(fetchFolders());
    };
    asyncFunc();
  }, [dispatch]);

  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: 600, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
    >
      <TreeList folders={folders} />
    </TreeView>
  );
}

interface ITreeListProps {
  folders: IFolder[];
  rootId?: string;
}

const TreeList: FC<ITreeListProps> = ({ folders, rootId = "root" }) => {
  const treeItems = getTreeItemsFromData(folders, rootId);

  if (treeItems.length === 0) {
    return null;
  }

  return (
    <>
      {treeItems.map((item) => (
        <>
          <TreeItem
            key={item.id}
            nodeId={item.id}
            label={
              <>
                <FolderComponent
                  folder={item}
                  hasChildren={!!getTreeItemsFromData(folders, item.id).length}
                />
              </>
            }
          >
            <TreeList folders={folders} rootId={item.id} />
          </TreeItem>
        </>
      ))}
    </>
  );
};
