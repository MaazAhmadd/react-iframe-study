import React from 'react'

export default function Duration({ className, seconds }: {
  className?: string
  seconds: number
}) {
  return (
    <time dateTime={`P${Math.round(seconds)}S`} className={className}>
      {format(seconds)}
    </time>
  )
}

function format(seconds: number) {
  const date = new Date(seconds * 1000)
  const hh = date.getUTCHours()
  const mm = date.getUTCMinutes()
  const ss = pad(String(date.getUTCSeconds()))
  if (hh) {
    return `${hh}:${pad(String(mm))}:${ss}`
  }
  return `${mm}:${ss}`
}

function pad(str: string) {
  return ('0' + str).slice(-2)
}