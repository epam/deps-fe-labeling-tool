import { FabricObject } from 'fabric'

const configureFabricDefaults = () => {
  if (!FabricObject || !FabricObject.ownDefaults) {
    return
  }

  FabricObject.ownDefaults.originX = 'left'
  FabricObject.ownDefaults.originY = 'top'
}

configureFabricDefaults()
