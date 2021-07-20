export const intValueOf = (el) => {
  return parseInt(el.replace('translateX(', '').replace('px)',''), 10)
} 