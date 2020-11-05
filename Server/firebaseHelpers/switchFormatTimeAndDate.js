// dates and time comes in the string format 
// changing date format helps to split
const switchTimeAndDate = (checkInDate, checkInTime, checkOutTime, currentUserUid, parkId, latitude, longitude) => {

  const date = new Date(checkInDate)
  const dateCheckInDate = date.toLocaleDateString().split("/")
  const selectedCheckInDate = dateCheckInDate.join("-")

  const timeOptions = { hour12: false, hour: '2-digit', minute: '2-digit' }
  const time1 = new Date(checkInTime)
  const timeCheckInTime = time1.toLocaleTimeString('en-US', timeOptions).split("/")
  const selectedCheckInTime = timeCheckInTime.join("-")

  const time2 = new Date(checkOutTime)
  const timeCheckOutTime = time2.toLocaleTimeString('en-US', timeOptions).split("/")
  const selectedCheckOutTime = timeCheckOutTime.join("-")

  return {
    checkInDate: selectedCheckInDate,
    checkInTime: selectedCheckInTime,
    checkOutTime: selectedCheckOutTime,
    parkId: parkId,
    currentUserUid: currentUserUid,
    latitude: latitude,
    longitude: longitude
  }
}

module.exports = switchTimeAndDate