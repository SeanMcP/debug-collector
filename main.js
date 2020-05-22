console.info('Made by SeanMcP – https://seanmcp.com')

import { getExclamation } from './utils.js'

const BUGS = {
    ant: '🐜',
    bee: '🐝',
    butterfly: '🦋',
    caterpillar: '🐛',
    cricket: '🦗',
    ladybug: '🐞'
}

function clearInspector() {
    if (inspector.innerHTML) inspector.innerHTML = ''
}

window.addEventListener('load', () => {
    const params = new URLSearchParams(window.location.search)
    const bug = params.get('inspect')
    if (!bug) {
        // There is no inspect param, so load the page normally
        return clearInspector()
    }
    if (!BUGS[bug]) {
        // The value passed to `inspect` doesn't correspond with any known bugs
        return window.location.replace(window.location.origin)
    }

    inspector.innerHTML = `
    <h2>${getExclamation()}! You caught a ${bug}!</h2>
    <p>{{ Some unique description of the bug }}</p>
    `
})