export const isValidWidthUnit = (val) =>
  ['px', 'rem', 'em', 'vw', '%', 'vmin', 'vmax'].some(unit =>
    val.endsWith(unit),
  )

export const isValidComponentSize = (val) =>
  ['', 'large', 'medium', 'small', 'mini'].includes(val)
