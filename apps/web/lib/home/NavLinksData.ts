interface NavLink {
    href: string;
    label: string;
}

export const NAV_LINKS: readonly NavLink[] = [
    { href: '#vision', label: 'Vision' },
    { href: '#programme', label: 'Programme' },
    { href: '#rejoindre', label: 'Rejoindre' },
    { href: '#dons', label: 'Dons' },
] as const;
