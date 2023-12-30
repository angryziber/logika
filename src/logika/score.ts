export function calculateScore(row: string[], secret: string[]) {
  const result = {correctPosition: 0, correctColor: 0}
  const visited = new Set()
  row.forEach((c, i) => {
    if (c == secret[i]) {
      result.correctPosition++
      visited.add(i)
    }
  })
  row.forEach((c, i) => {
    if (visited.has(i)) return
    const j = secret.indexOf(c)
    if (j >= 0 && !visited.has(j)) {
      result.correctColor++
      visited.add(j)
    }
  })
  return result
}
