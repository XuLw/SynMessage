const dateToBDate = function (dateTime) {
  return {
    "__type": "Date",
    "iso": dateTime
  }
}

exports.dateToBDate = dateToBDate;