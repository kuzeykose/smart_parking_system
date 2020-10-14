// try to define is empty/available(undefined)/notAvailable
function checkAvailableStatus(doc, checkInTime, checkOutTime, checkInDate) {
  const parkSlotData = doc.data()
  var date = checkInDate.toLocaleDateString().split("/")
  var myCheckOutDate = date.join("-")
  const dataFromSlot = parkSlotData[myCheckOutDate] || 0;

  if (dataFromSlot === 0) {
    return "empty"
  }

  let checkArray = []
  for (let i = 0; i < dataFromSlot.length; i++) {
    if (
      (checkInTime.toLocaleTimeString('tr') < dataFromSlot[i]["checkInTime"]
        && checkOutTime.toLocaleTimeString('tr') < dataFromSlot[i]["checkInTime"])
      || (checkInTime.toLocaleTimeString('tr') > dataFromSlot[i]["checkOutTime"]
        && checkOutTime.toLocaleTimeString('tr') > dataFromSlot[i]["checkOutTime"])) {
      checkArray.push("available")
    } else {
      checkArray.push("notAvailable")
    }
  }

  for (let i = 0; i < dataFromSlot.length; i++) {
    if (checkArray[i] === "notAvailable") {
      return "NotAvailable"
    }
  }
}

export { checkAvailableStatus }


