// dates and time comes in the string format 
// changing date format helps to split

// get all data and return with unchanging name in object
const switchTimeAndDate = (bookData) => {


  const date = new Date(bookData.checkInDate)
  const dateCheckInDate = date.toLocaleDateString().split("/")
  const selectedCheckInDate = dateCheckInDate.join("-")

  const timeOptions = { hour12: false, hour: '2-digit', minute: '2-digit' }
  const time1 = new Date(bookData.checkInTime)
  const timeCheckInTime = time1.toLocaleTimeString('en-US', timeOptions).split("/")
  const selectedCheckInTime = timeCheckInTime.join("-")

  const time2 = new Date(bookData.checkOutTime)
  const timeCheckOutTime = time2.toLocaleTimeString('en-US', timeOptions).split("/")
  const selectedCheckOutTime = timeCheckOutTime.join("-")

  return {
    checkInDate: selectedCheckInDate,
    checkInTime: selectedCheckInTime,
    checkOutTime: selectedCheckOutTime,
    parkId: bookData.parkId,
    currentUserUid: bookData.currentUserUid,
    latitude: bookData.latitude,
    longitude: bookData.longitude
  }
}

module.exports = switchTimeAndDate