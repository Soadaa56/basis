// import fontawesome core + icon component
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faCube, faBars } from '@fortawesome/free-solid-svg-icons'
import { faWindowMaximize } from '@fortawesome/free-regular-svg-icons'

// Solid
library.add(faCube, faBars)
// Regular
library.add(faWindowMaximize)

export default FontAwesomeIcon
