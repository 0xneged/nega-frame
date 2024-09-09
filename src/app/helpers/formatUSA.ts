const intl = new Intl.NumberFormat('en-US')

export default function formatUSA(num: number) {
  return intl.format(num)
}
