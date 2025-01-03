import { FGImg } from "~/components/FGImg";
import gameData from "~/game-data";

import type { Route } from "./+types/dump";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Image Dump" }, { name: "description", content: "Dump of the UI images from the game" }];
}

export default function Home() {
  return (
    <div className="">
      <div className="m-2">
        <h2 className="text-4xl mb-2">Items</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {gameData.items
            .values()
            .toArray()
            .map((item) => (
              <div key={item.className} className="flex flex-col w-24 gap-1">
                <FGImg image={item.icon} alt={item.displayName} size={96} className="w-24 h-24" />
                <span className="text-sm text-center text-ellipsis line-clamp-2">{item.displayName}</span>
              </div>
            ))}
        </div>
      </div>

      <div className="m-2">
        <h2 className="text-4xl mb-2 mt-4">Buildings</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {gameData.buildings
            .values()
            .toArray()
            .map((building) => (
              <div key={building.className} className="flex flex-col w-24 gap-1">
                <FGImg image={building.icon} alt={building.buildable.displayName} size={96} className="w-24 h-24" />
                <span className="text-sm text-center text-ellipsis line-clamp-2">{building.buildable.displayName}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
