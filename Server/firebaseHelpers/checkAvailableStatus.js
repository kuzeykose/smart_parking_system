function checkAvailableStatus(doc, checkInTime, checkOutTime, checkInDate) {

  const parkSlotData = doc.data()
  const dataFromSlot = parkSlotData[checkInDate] || 0;

  if (dataFromSlot === 0) {
    return "empty"
  }

  let checkArray = []
  for (let i = 0; i < dataFromSlot.length; i++) {
    if (
      (checkInTime < dataFromSlot[i]["checkInTime"] && checkOutTime < dataFromSlot[i]["checkInTime"])
      || (checkInTime > dataFromSlot[i]["checkOutTime"] && checkOutTime > dataFromSlot[i]["checkOutTime"])) {
      checkArray.push("available")
    } else {
      checkArray.push("notAvailable")
    }
  }

  for (let i = 0; i < dataFromSlot.length; i++) {
    if (checkArray[i] === "notAvailable") {
      return "notAvailable"
    }
  }
}

module.exports = checkAvailableStatus