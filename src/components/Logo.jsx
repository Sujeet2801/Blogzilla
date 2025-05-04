import React from 'react'

function Logo({ width = '100px' }) {
  return (
    <div
      className="text-3xl font-extrabold text-primary tracking-wide"
      style={{ width }}
    >
      Blogzilla
    </div>
  )
}

export default Logo
