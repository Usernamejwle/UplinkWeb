import { Shape } from "$lib/enums"
import type { FileInfo } from "$lib/types"


export let mock_files: FileInfo[] = [
    {id: 1, type: "document",  icon: Shape.Document, name: "new wallpaper", size: 982123995679999999999},
    {id: 2, type: "folder",  icon: Shape.Folder, name: "mongaloid", size: 9821999999999},
    {id: 3, type: "document",  icon: Shape.Document, name: "docs", size: 9821239999999999999999},
    {id: 4, type: "folder",  icon: Shape.Folder, name: "item4", size: 98212399978978999999},
    {id: 5, type: "document",  icon: Shape.Document, name: "item4", size: 985678999999},
    {id: 6, type: "document",  icon: Shape.Document, name: "item4", size: 98212399996885999999}
];