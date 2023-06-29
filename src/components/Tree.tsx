import { FC, useEffect, useState } from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchFolders } from "../utils/api";

interface IFolder {
  id: string;
  name: string;
  parentId: string;
}

function getTreeItemsFromData(list: IFolder[], parentId: string): IFolder[] {
  const items = list.filter((item) => item.parentId === parentId);

  return items;
}

export default function Tree() {
  const [folders, setFolders] = useState<IFolder[]>([]);

  useEffect(() => {
    const asyncFunc = async () => {
      const folders = await fetchFolders();
      setFolders(folders);
    };
    asyncFunc();
  }, []);

  const treeItems = getTreeItemsFromData(folders, "root");
  console.log("treeItems", treeItems);

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
  console.log("treeItems", treeItems);

  if (treeItems.length === 0) {
    return null;
  }

  return (
    <>
      {treeItems.map((item) => (
        <>
          <TreeItem key={item.id} nodeId={item.id} label={item.name}>
            <TreeList folders={folders} rootId={item.id} />
          </TreeItem>
        </>
      ))}
    </>
  );
};
