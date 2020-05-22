console.info('Made by SeanMcP – https://seanmcp.com')

import { getExclamation, STORAGE_KEYS, BUGS } from './utils.js'

const inspectorEl = document.getElementById('inspector')
const journalEl = document.getElementById('journal')
const summaryEl = journalEl.querySelector('summary')
const tableEl = document.getElementById('table')

function clearInspector() {
    if (inspectorEl.innerHTML) inspectorEl.innerHTML = ''
}

// Inspector

function handleInspector() {
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

    inspectorEl.innerHTML = `
    <h2>${getExclamation()}! You caught a ${bug}!</h2>
    <p>{{ Some unique description of the bug }}</p>
    `
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
