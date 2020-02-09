import * as moment from 'moment';

export const formatDate = (dateString, currentDate) => {

  if(!currentDate) {
    return null;
  }
  
  const date = moment(dateString);

  const seconds = currentDate.diff(date, 'seconds');

  if(seconds < 60) {
    if(seconds === 1) {
      return `${seconds} second ago`  
    }

    return `${seconds} seconds ago`
  }

  const minutes = currentDate.diff(date, 'minutes');

  if(minutes < 60) {
    if(minutes === 1) {
      return `${minutes} minute ago`  
    }

    return `${minutes} minutes ago`
  }

  const hours = currentDate.diff(date, 'hours');

  if(hours < 24) {
    if(hours === 1) {
      return `${hours} hour ago`  
    }

    return `${hours} hours ago`
  }

  const days = currentDate.diff(date, 'days');

  if(days <= 30) {
    if(days === 1) {
      return `${days} day ago`  
    }

    return `${days} days ago`
  }

  return null;
}