console.info('Made by SeanMcP – https://seanmcp.com')

import { getExclamation, STORAGE_KEY, BUGS } from './utils.js'

const tableEl = document.getElementById('table')
const gridEl = document.getElementById('grid')

function clearInspector() {
    if (typeof inspector !== 'undefined') inspector.remove()
}

// Inspector

async function handleInspector(bug) {
    clearInspector()

    const inspectorEl = document.createElement('div')
    inspectorEl.id = "inspector"
    inspectorEl.tabIndex = 0
    inspectorEl.addEventListener('click', clearInspector)

    const response = await fetch('./data.json').then(res => res.json())
    const data = response[bug]

    inspectorEl.innerHTML = `
    <span role="img">${BUGS[bug]}</span>
    <h2>${getExclamation()}! You caught a ${bug}!</h2>
    <p>${data.description}.</p>
    <p><b>Fun fact</b>: ${data.fact}!</p>
    `

    document.body.appendChild(inspectorEl)
}

// Record

function recordBugInJournal(bug) {
    const rawJournal = localStorage.getItem(STORAGE_KEY)
    let journal = {}
    if (rawJournal) {
        journal = JSON.parse(rawJournal)
    }
    journal[bug] = (journal[bug] || 0) + 1
    localStorage.setItem(STORAGE_KEY, JSON.stringify(journal))
    renderJournal()
}

// Journal

const headRow = `
<thead>
    <tr>
        <th>Bug</th>
        <th>Count</th>
    </tr>
</thead
`

function renderJournal() {
    const rawJournal = localStorage.getItem(STORAGE_KEY)
    if (!rawJournal) return
    const journal = JSON.parse(localStorage.getItem(STORAGE_KEY))
    const rows = Object.entries(journal).map(([bug, count]) => `<tr><td>${bug}</td><td>${count}</td></tr>`)

    tableEl.innerHTML = `${headRow}<tbody>${rows.join('\n')}</tbody>`
}

window.addEventListener('load', renderJournal)

// Grid

function handleBugClick(bug) {
    recordBugInJournal(bug)
    handleInspector(bug)
    renderBugsInGrid()
}

function createBugButton(bug, emoji) {
    const button = document.createElement('button')
    button.setAttribute('aria-label', bug)
    button.dataset.type = 'bug'
    button.textContent = emoji
    button.addEventListener('click', () =>
        handleBugClick(bug)
    )
    return button
}

function renderBugsInGrid() {
    if (gridEl.innerHTML) gridEl.innerHTML = ''
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

        const bugButton = createBugButton(bug, emoji)
        bugButton.style.gridColumnStart = x
        bugButton.style.gridRowStart = y

        gridEl.appendChild(bugButton)
    }
}

window.addEventListener('load', renderBugsInGrid)
