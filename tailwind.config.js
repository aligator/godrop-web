module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primaryBg: 'var(--color-primary-bg)',
        primaryBgSoft: 'var(--color-primary-bg-soft)',
        primaryBgSofter: 'var(--color-primary-bg-softer)',
        onPrimaryBg: 'var(--color-on-primary-bg)',
        onPrimaryBgSoft: 'var(--color-on-primary-bg-soft)',
        onPrimaryBgSofter: 'var(--color-on-primary-bg-softer)',

        neutralBg: 'var(--color-neutral-bg)',
        neutralBgSoft: 'var(--color-neutral-bg-soft)',
        neutralBgSofter: 'var(--color-neutral-bg-softer)',
        onNeutralBg: 'var(--color-on-neutral-bg)',
        onNeutralBgSoft: 'var(--color-on-neutral-bg-soft)',
        onNeutralBgSofter: 'var(--color-on-neutral-bg-softer)',
      },
      fontFamily: {
        // Shown in the SocialBar component as font-open-sans
        logo: 'var(--font-logo)',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [],
}
