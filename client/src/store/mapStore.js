import { extendObservable, action } from "mobx";
import remotedev from "mobx-remotedev/lib";

class Map {
  constructor() {
    extendObservable(this, {
      coordinates: null,
      get getCoordinates() {
        return this.coordinates;
      },
      setCoordinates: action(newCoordinates => {
        this.coordinates = newCoordinates;
      })
    });
  }
}

export default remotedev(new Map());
