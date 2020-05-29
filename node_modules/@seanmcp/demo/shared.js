console.info('Made by SeanMcP – https://seanmcp.com')

// Title
document.title = document.title + ' – SeanMcP'

// Footer
const footer = document.createElement('footer')
footer.id = '__seanmcp-demo__footer'
footer.innerHTML = '<small>Made by <a href="https://seanmcp.com">SeanMcP</a></small>'
document.body.appendChild(footer)
