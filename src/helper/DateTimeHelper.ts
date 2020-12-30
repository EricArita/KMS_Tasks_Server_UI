import * as Constants from "../constants";

export const ConvertToISODateTimeStr = (dateStr: string = undefined) => {
    let d = new Date();

    switch (dateStr) {
        case Constants.TODAY:        
            break;
        case Constants.TOMORROW:
            d.setDate(d.getDate() + 1);
            break;
        case Constants.WEEKEND:
            d.setDate(d.getDate() + (6 - d.getDay()));
            break;
        case Constants.THIS_WEEK:
            break;
        case Constants.NEXT_WEEK:
            break;
        default:
            d = dateStr !== undefined ? new Date(dateStr) : d;
    }

    console.log(d.toISOString());
    return d.toUTCString();
}