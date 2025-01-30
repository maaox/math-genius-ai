'use client'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="py-6">
      <p className="text-sm text-center font-light text-[#293745]">
        &copy; {year} Una iniciativa de <strong>Fluxes</strong>
      </p>
    </footer>
  )
}

export default Footer
