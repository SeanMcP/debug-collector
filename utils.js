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

export const BUGS = {
    ant: '🐜',
    bee: '🐝',
    butterfly: '🦋',
    caterpillar: '🐛',
    cricket: '🦗',
    ladybug: '🐞'
}

const VOWELS = ['a', 'e', 'i', 'o', 'u']

export function anItem(item) {
    return `a${VOWELS.includes(item[0]) ? 'n' : ''} ${item}`
}
