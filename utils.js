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

export const STORAGE_KEY = 'journal'

export const BUGS = {
    ant: '🐜',
    bee: '🐝',
    butterfly: '🦋',
    caterpillar: '🐛',
    cricket: '🦗',
    ladybug: '🐞'
}
