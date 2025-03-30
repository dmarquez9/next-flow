import StarterKit from '@tiptap/starter-kit'

import Heading from './Heading'
import Spacing from './Spacing'

const extensions = [Heading, StarterKit.configure({ heading: false }), Spacing]

export default extensions
