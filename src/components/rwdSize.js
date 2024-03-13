const size = {
    mobile: '767.99px',
    tabletMin: '768px',
    tabletMax: '1023.99px',
    laptopMin: '1024px',
}

export const device = {
    mobile: `(max-width: ${size.mobile})`,
    tablet: `(min-width: ${size.tabletMin}) and (max-width: ${size.tabletMax})`,
    laptop: `(min-width: ${size.laptopMin})`,
}