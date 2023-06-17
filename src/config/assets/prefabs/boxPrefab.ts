import { GameObjectPrefabConfig } from "src/core";
import { Box } from "../scripts/box";

export const boxPrefab: GameObjectPrefabConfig = {
    prefabID: "boxPrefab",
    prefabComponents: [
        { component: Box }
    ]
}