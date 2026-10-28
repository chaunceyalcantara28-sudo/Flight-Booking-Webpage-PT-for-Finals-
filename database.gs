function doPost(e) {
  try {
    const data = e.parameter;
    const formType = data.formType || "";

    Logger.log(JSON.stringify(data));
    Logger.log("Trip Type received: " + data.tripType);

    const spreadsheet = SpreadsheetApp.openById("1mfzIS3Gnlfk7DtIlTHwDmnEfh5nZ4CTaJYy_oZEkENM");

    let sheet;
    let row;

    if (formType === "Passengers") {
      sheet = spreadsheet.getSheetByName("Passenger Registration");
      row = [
        new Date(),
        data.firstName || "",
        data.lastName || "",
        data.email || "",
        data.phone || "",
        data.birthdate || "",
        data.gender || "",
        data.nationality || "",
        data.passportNo || ""
      ];
    }
    else if (formType === "Reservations") {
      sheet = spreadsheet.getSheetByName("Flight Reservation");
      row = [
        new Date(),
        data.email || "",
        data.tripType || "",
        data.origin || "",
        data.destination || "",
        data.departDate || "",
        data.returnDate || "",
        data.travelClass || "",
        data.passengers || "",
        data.remarks || ""
      ];
    }
    else if (formType === "Contact") {
      sheet = spreadsheet.getSheetByName("Contact Us");
      row = [
        new Date(),
        data.name || "",
        data.email || "",
        data.subject || "",
        data.message || ""
      ];
    }
    else {
      return ContentService.createTextOutput("Invalid form type");
    }

    if (sheet.getLastRow() === 0) {
      let headers = [];

      if (formType === "Passengers") {
        headers = ["Timestamp", "First Name", "Last Name", "Email", "Phone Number", "Birthdate", "Gender", "Nationality", "Passport / ID Number"];
      } else if (formType === "Reservations") {
        headers = ["Timestamp", "Registered Email", "Trip Type", "From", "To", "Departure Date", "Return Date", "Class", "Passengers", "Remarks"];
      } else if (formType === "Contact") {
        headers = ["Timestamp", "Full Name", "Email", "Subject", "Message"];
      }

      sheet.appendRow(headers);
    }

    sheet.appendRow(row);
    return ContentService.createTextOutput("Success");
  } catch (err) {
    return ContentService.createTextOutput("Error: " + err.message);
  }
}