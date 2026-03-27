

export const timezones = Intl.supportedValuesOf("timeZone").map((tz) => {
  const date = new Date()
  const formatter = new Intl.DateTimeFormat("pt-BR", {
    timeZone: tz,
    timeZoneName: "short"
  })

  const parts = formatter.formatToParts(date)
  const tzName = parts.find(p => p.type === "timeZoneName")?.value

  return {
    value: tz,
    label: `${tz} (${tzName})`
  }
})