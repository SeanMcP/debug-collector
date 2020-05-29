console.info('Made by SeanMcP – https://seanmcp.com')

import { anItem, getExclamation, BUGS } from './utils.js'

const bugCountEl = document.getElementById('bug-count')
const inspectorEl = document.getElementById('inspector')
const resetJournalEl = document.getElementById('reset-journal')
const searchEl = document.getElementById('search')
const tableEl = document.getElementById('table')

let bugJournal = {}

function clearInspector() {
    inspectorEl.innerHTML = ''
}

// Inspector

async function handleSearch() {
    clearInspector()

    const bugs = Object.keys(BUGS)
    const bug = bugs[Math.floor(Math.random() * bugs.length)]

    recordBugInJournal(bug)
    const response = await fetch('./data.json').then(res => res.json())
    const data = response[bug]

    inspectorEl.innerHTML = `
    <div>
        <span role="img">${BUGS[bug]}</span>
        <h2>${getExclamation()}! You caught ${anItem(bug)}!</h2>
        <p>${data.description}.</p>
        <small><b>Fun fact</b>: ${data.fact}!</small>
    </div>
    `

    inspectorEl.removeAttribute('hidden')
}

searchEl.addEventListener('click', handleSearch)
inspectorEl.addEventListener('click', () => {
    inspectorEl.hidden = true
    clearInspector()
})

// Record

function recordBugInJournal(bug) {
    bugJournal[bug] = (bugJournal[bug] || 0) + 1
    renderJournal()
}

// Journal

const headRow = `
<thead>
    <tr>
        <th>Image</th>
        <th>Name</th>
        <th>Count</th>
    </tr>
</thead
`

function renderJournal() {
    const journalEntries = Object.entries(bugJournal)
    
    if (journalEntries.length > 0) {
        const rows = journalEntries.map(([bug, count]) => `<tr data-bug="${bug}"><td class="image">${BUGS[bug]}</td><td class="name">${bug}</td><td class="count">${count}</td></tr>`)
        bugCountEl.textContent = `${journalEntries.length}`

        if (resetJournalEl.hidden) resetJournalEl.removeAttribute('hidden')
        tableEl.innerHTML = `${headRow}<tbody>${rows.join('\n')}</tbody>`
    } else {
        resetJournalEl.hidden = true
        bugCountEl.textContent = ''
        tableEl.innerHTML = ''
    }
}

window.addEventListener('load', renderJournal)

function resetJournal() {
    bugJournal = {}
    renderJournal()
}

resetJournalEl.addEventListener('click', resetJournal)
