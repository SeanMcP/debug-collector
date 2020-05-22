const EXCLAMATIONS = [
    'Cool',
    'Great',
    'Interesting',
    'Neat',
    'Oh boy',
    'Stellar',
    'Sweet'
]

export function getExclamation() {
    return EXCLAMATIONS[Math.floor(Math.random() * EXCLAMATIONS.length)]
}

export const STORAGE_KEYS = {
    journal: 'journal',
    isOpen: 'isOpen'
}

export const BUGS = {
    ant: '🐜',
    bee: '🐝',
    butterfly: '🦋',
    caterpillar: '🐛',
    cricket: '🦗',
    ladybug: '🐞'
}
