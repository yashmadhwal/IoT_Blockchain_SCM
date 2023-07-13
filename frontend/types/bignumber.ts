import { BigNumber, utils } from 'ethers'

declare module 'ethers' {
  interface BigNumber {
    formatString(decimals: number, precision?: number): string
    formatNumber(decimals: number, precision?: number): number
  }
}

BigNumber.prototype.formatString = function (decimals: number, precision = decimals) {
  const bn = this
  const spl = utils.formatUnits(bn, decimals).split('.')
  if (precision === 0) return spl[0]
  return [spl[0], (spl[1] || '').padEnd(precision, '0')].join('.')
}

BigNumber.prototype.formatNumber = function (decimals: number, precision = decimals) {
  const str = this.formatString(decimals, precision)
  return Number(str)
}
