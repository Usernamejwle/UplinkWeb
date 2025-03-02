import { OperationState, type FileInfo } from "$lib/types"
import { Shape } from "$lib/enums"

export let mock_files: FileInfo[] = [
    {
        id: "1",
        type: "file",
        source: "",
        name: "ExampleFile.mp4",
        displayName: "ExampleFile.mp4",
        icon: Shape.Document,
        isRenaming: OperationState.Initial,
        size: 982199999,
        items: [],
        parentId: "",
        remotePath: "",
    },
    {
        id: "2",
        type: "folder",
        source: "",
        icon: Shape.Folder,
        isRenaming: OperationState.Initial,
        name: "Downloads",
        displayName: "Downloads",
        size: 9821999999999,
        items: [
            {
                id: "21",
                type: "folder",
                source: "",
                icon: Shape.Folder,
                isRenaming: OperationState.Initial,
                name: "Panda",
                displayName: "Panda",
                size: 789456123,
                items: [
                    {
                        id: "45",
                        type: "file",
                        source: "",
                        name: "ExampleFile.mp4",
                        displayName: "ExampleFile.mp4",
                        icon: Shape.Document,
                        isRenaming: OperationState.Initial,
                        size: 982199999,
                        items: [],
                        parentId: "21",
                        remotePath: "",
                    },
                    {
                        id: "555",
                        type: "folder",
                        source: "",
                        icon: Shape.Document,
                        isRenaming: OperationState.Initial,
                        name: "ExampleFile.mp4",
                        displayName: "ExampleFile.mp4",
                        size: 982199999,
                        parentId: "21",
                        items: [
                            {
                                id: "145",
                                type: "file",
                                source: "",
                                icon: Shape.Document,
                                isRenaming: OperationState.Initial,
                                name: "Exame.mp4",
                                displayName: "Exame.mp4",
                                size: 982199999,
                                items: [],
                                parentId: "555",
                                remotePath: "",
                            },
                        ],
                        remotePath: "",
                    },
                ],
                parentId: "2",
                remotePath: "",
            },
            {
                id: "343",
                type: "file",
                source: "",
                icon: Shape.Document,
                isRenaming: OperationState.Initial,
                name: "Test123.7z",
                displayName: "Test123.7z",
                size: 98299,
                items: [],
                parentId: "2",
                remotePath: "",
            },
            {
                id: "4",
                type: "folder",
                source: "",
                icon: Shape.Folder,
                isRenaming: OperationState.Initial,
                name: "Temp",
                displayName: "Temp",
                size: 98212999,
                items: [
                    {
                        id: "69",
                        type: "folder",
                        source: "",
                        icon: Shape.Folder,
                        isRenaming: OperationState.Initial,
                        name: "Efoldere.mp4",
                        displayName: "Efoldere.mp4",
                        size: 982199999,
                        items: [
                            {
                                id: "65",
                                type: "folder",
                                source: "",
                                icon: Shape.Folder,
                                isRenaming: OperationState.Initial,
                                name: "Temp",
                                displayName: "Temp",
                                size: 98212999,
                                items: [
                                    {
                                        id: "4675",
                                        type: "image",
                                        icon: Shape.Image,
                                        isRenaming: OperationState.Initial,
                                        source: "/assets/mock/library.avif",
                                        name: "Wildlife.png",
                                        displayName: "Wildlife.png",
                                        size: 987654321,
                                        items: [
                                            {
                                                id: "66",
                                                type: "folder",
                                                source: "",
                                                icon: Shape.Folder,
                                                isRenaming: OperationState.Initial,
                                                name: "Temparters",
                                                displayName: "Temparters",
                                                size: 98212999,
                                                items: [
                                                    {
                                                        id: "46",
                                                        type: "folder",
                                                        source: "",
                                                        icon: Shape.Folder,
                                                        isRenaming: OperationState.Initial,
                                                        name: "oofka",
                                                        displayName: "oofka",
                                                        size: 987654321,
                                                        items: [
                                                            {
                                                                id: "32",
                                                                type: "folder",
                                                                source: "",
                                                                icon: Shape.Folder,
                                                                isRenaming: OperationState.Initial,
                                                                name: "Temper",
                                                                displayName: "Temper",
                                                                size: 98212999,
                                                                items: [
                                                                    {
                                                                        id: "50",
                                                                        type: "image",
                                                                        source: "/assets/mock/library.avif",
                                                                        icon: Shape.Image,
                                                                        isRenaming: OperationState.Initial,
                                                                        name: "life.png",
                                                                        displayName: "life.png",
                                                                        size: 987654321,
                                                                        items: [],
                                                                        parentId: "32",
                                                                        remotePath: "",
                                                                    },
                                                                ],
                                                                parentId: "46",
                                                                remotePath: "",
                                                            },
                                                        ],
                                                        parentId: "66",
                                                        remotePath: "",
                                                    },
                                                ],
                                                parentId: "45",
                                                remotePath: "",
                                            },
                                        ],
                                        parentId: "65",
                                        remotePath: "",
                                    },
                                ],
                                parentId: "69",
                                remotePath: "",
                            },
                        ],
                        parentId: "4",
                        remotePath: "",
                    },
                    {
                        id: "17",
                        type: "file",
                        source: "",
                        icon: Shape.Document,
                        isRenaming: OperationState.Initial,
                        name: "ExampleFile.mp4",
                        displayName: "ExampleFile.mp4",
                        size: 982199999,
                        items: [],
                        parentId: "4",
                        remotePath: "",
                    },
                ],
                parentId: "2",
                remotePath: "",
            },
        ],
        parentId: "",
        remotePath: "",
    },
    {
        id: "22",
        type: "image",
        source: "/assets/mock/library.avif",
        icon: Shape.Image,
        isRenaming: OperationState.Initial,
        name: "Wildlife.png",
        displayName: "Wildlife.png",
        size: 987654321,
        items: [],
        parentId: "",
        remotePath: "",
    },
    {
        id: "3",
        type: "file",
        source: "",
        icon: Shape.Document,
        isRenaming: OperationState.Initial,
        name: "Test123.7z",
        displayName: "Test123.7z",
        size: 98299,
        items: [],
        parentId: "",
        remotePath: "",
    },
    {
        id: "64",
        type: "folder",
        source: "",
        icon: Shape.Folder,
        isRenaming: OperationState.Initial,
        name: "Temp",
        displayName: "Temp",
        size: 98212999,
        items: [
            {
                id: "242",
                type: "image",
                icon: Shape.Image,
                isRenaming: OperationState.Initial,
                source: "/assets/mock/library.avif",
                name: "Wildlife.png",
                displayName: "Wildlife.png",
                size: 987654321,
                items: [],
                parentId: "64",
                remotePath: "",
            },
        ],
        parentId: "",
        remotePath: "",
    },
]
