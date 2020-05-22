console.info('Made by SeanMcP – https://seanmcp.com')

import { getExclamation, STORAGE_KEYS, BUGS } from './utils.js'

const journalEl = document.getElementById('journal')
const summaryEl = journalEl.querySelector('summary')
const tableEl = document.getElementById('table')
const gridEl = document.getElementById('grid')

function clearInspector() {
    if (typeof inspector !== 'undefined') inspector.remove()
}

// Inspector

async function handleInspector() {
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

    clearInspector()

    const inspectorEl = document.createElement('div')
    inspectorEl.id = "inspector"
    inspectorEl.tabIndex = 0
    inspectorEl.addEventListener('click', clearInspector)

    const response = await fetch('./data.json').then(res => res.json())
    const data = response[bug]

    inspectorEl.innerHTML = `
    <h2>${getExclamation()}! You caught a ${bug}!</h2>
    <p>${data.description}.</p>
    <p><b>Fun fact</b>: ${data.fact}!</p>
    `

    document.body.appendChild(inspectorEl)
}

window.addEventListener('load', handleInspector)

// Record

function recordBugInJournal(event) {
    const bug = event.target.getAttribute('aria-label')
    const rawJournal = localStorage.getItem(STORAGE_KEYS.journal)
    let journal = {}
    if (rawJournal) {
        journal = JSON.parse(rawJournal)
    }
    journal[bug] = (journal[bug] || 0) + 1
    localStorage.setItem(STORAGE_KEYS.journal, JSON.stringify(journal))
}

document.querySelectorAll('[href^="?inspect="][aria-label]').forEach(node => node.addEventListener('click', recordBugInJournal))

// Journal

summaryEl.addEventListener('click', () => {
    sessionStorage.setItem(STORAGE_KEYS.isOpen, journalEl.open ? false : true)
})

const headRow = `
<thead>
    <tr>
        <th>Bug</th>
        <th>Count</th>
    </tr>
</thead
`

function handleJournal() {
    if (sessionStorage.getItem(STORAGE_KEYS.isOpen) === 'true') {
        journalEl.open = true
    } else {
        journalEl.removeAttribute('open')
    }

    const rawJournal = localStorage.getItem(STORAGE_KEYS.journal)
    if (!rawJournal) return
    const journal = JSON.parse(localStorage.getItem(STORAGE_KEYS.journal))
    const rows = Object.entries(journal).map(([bug, count]) => `<tr><td>${bug}</td><td>${count}</td></tr>`)

    tableEl.innerHTML = `${headRow}<tbody>${rows.join('\n')}</tbody>`
}

window.addEventListener('load', handleJournal)

// Grid

function createBugAnchor(bug, emoji) {
    const a = document.createElement('a')
    a.setAttribute('aria-label', bug)
    a.href = '?inspect=' + bug
    a.textContent = emoji
    return a
}

function renderBugsInGrid() {
    const gridMap = {}

    for (let [bug, emoji] of Object.entries(BUGS)) {
        let x, y
        let unique = false

        while (!unique) {
            x = Math.floor(Math.random() * 5) + 1
            y = Math.floor(Math.random() * 5) + 1
            const coordinates = `${x},${y}`
            if (!gridMap[coordinates]) {
                unique = true
                gridMap[coordinates] = bug
            }
        }

        const bugAnchor = createBugAnchor(bug, emoji)
        bugAnchor.style.gridColumnStart = x
        bugAnchor.style.gridRowStart = y

        gridEl.appendChild(bugAnchor)
    }
}

window.addEventListener('load', renderBugsInGrid)
