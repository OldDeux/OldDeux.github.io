const display = document.getElementById('display')
const operators = ['+', '-', '/', 'x', '.']

document.querySelectorAll('.btn').forEach(btn => {
    btn.onclick = () => {
        const value = btn.textContent.trim()
        const lastChar = display.textContent.slice(-1)

        if (value === 'C') {
            display.textContent = ''
        } else if (value === '<') {
            display.textContent = display.textContent.slice(0, -1)
        } else if (value === '=') {
            display.textContent = eval(display.textContent.replace(/x/g, '*'))
        } else {
            if (operators.includes(value) && operators.includes(lastChar)) return
            display.textContent += value;
        }
    }
})
