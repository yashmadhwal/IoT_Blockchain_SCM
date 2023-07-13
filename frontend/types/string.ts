import { BigNumber, utils } from 'ethers'

declare global {
  interface String {
    toBigNumber(decimals?: number): BigNumber
    cutZeros(): string
    shortAddress(start?: number, end?: number): string
    validNumber(params?: Parameters<typeof validateNumber>[1]): boolean
  }
}

/**
 * Validate number input. By default, any **positive**, **non-zero** number consisting only of `0-9` and maybe `.` dot character
 * @param num Input string
 * @param params Override default params
 * @returns true / false
 */
export function validateNumber(
  num: string,
  params = {} as {
    /** Forbid float. Default: false */
    nofloat?: boolean
    /** Allow zero value. Default: false */
    allowzero?: boolean
    /** Allow negative value. Default: false */
    allownegative?: boolean
  }
) {
  const n = Number(num)
  console.log({ params })
  return (
    !isNaN(n) &&
    !(n === 0 && !params.allowzero) &&
    !!num.match(
      new RegExp(
        `^${params.allownegative ? '-?' : ''}\\d+${!params.nofloat ? '(\\.\\d+)?' : ''}$`
      )
    )
  )
}

String.prototype.validNumber = function (params?: Parameters<typeof validateNumber>[1]) {
  const str = String(this)
  return validateNumber(str, params)
}
String.prototype.toBigNumber = function (decimals = 0) {
  let s = String(this)
  if (!s) return BigNumber.from(0)
  s = s.replace(',', '.')
  const spl = s.split('.')
  if (spl[1]?.length > decimals) {
    s = [spl[0], spl[1].slice(0, decimals)].join('.')
  }
  return utils.parseUnits(s, decimals)
}
String.prototype.cutZeros = function () {
  return String(this).replace(/\.?0+$/, '')
}
String.prototype.shortAddress = function (start = 6, end = start - 2) {
  const str = String(this)
  return str.slice(0, start) + '...' + str.slice(-end)
}
