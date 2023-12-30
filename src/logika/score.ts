export function calculateScore(row: string[], secret: string[]) {
  const result = {correctPosition: 0, correctColor: 0}
  const _row = [...row], _secret = [...secret]
  row.forEach((c, i) => {
    if (c == _secret[i]) {
      result.correctPosition++
      _secret[i] = ''
      _row[i] = ' '
    }
  })
  _row.forEach((c) => {
    const j = _secret.indexOf(c)
    if (j >= 0) {
      result.correctColor++
      _secret[j] = ''
    }
  })
  return result
}
