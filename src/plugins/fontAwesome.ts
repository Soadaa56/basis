// import fontawesome core + icon component
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faCube,
  faBars,
  faShield,
  faGears,
  faMugSaucer,
  faPlus,
  faMinus,
} from '@fortawesome/free-solid-svg-icons'
import { faWindowMaximize } from '@fortawesome/free-regular-svg-icons'

// Solid
library.add(faCube, faBars, faShield, faGears, faMugSaucer, faPlus, faMinus)
// Regular
library.add(faWindowMaximize)

export default FontAwesomeIcon
