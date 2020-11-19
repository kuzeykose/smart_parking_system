function checkAvailableStatus(doc, bookDataInformation) {

  const parkSlotData = doc.data()
  const dataFromSlot = parkSlotData[bookDataInformation.checkInDate] || 0;

  if (dataFromSlot === 0) {
    return "empty"
  }

  let checkArray = []
  for (let i = 0; i < dataFromSlot.length; i++) {
    if (
      (bookDataInformation.checkInTime < dataFromSlot[i]["checkInTime"] && bookDataInformation.checkOutTime < dataFromSlot[i]["checkInTime"])
      || (bookDataInformation.checkInTime > dataFromSlot[i]["checkOutTime"] && bookDataInformation.checkOutTime > dataFromSlot[i]["checkOutTime"])) {
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