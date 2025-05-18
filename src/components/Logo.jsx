import React from 'react'

function Logo({ width = 'auto', className = '' }) {
  return (
    <div
      className={`text-3xl ml-10 md:text-4xl font-extrabold tracking-wide text-black ${className}`}
      style={{ width }}
      aria-label="Blogzilla Logo"
    >
      Blogzilla
    </div>
  )
}

export default Logo
