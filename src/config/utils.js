export function formatTousands (num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

export function randomHexColor () {
  let n = 6; let s = '#'
  while (n--) {
    s += (Math.random() * 16 | 0).toString(16)
  }
  return s
}
