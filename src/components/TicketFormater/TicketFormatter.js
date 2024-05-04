import moment from 'moment';

function formatDate(dateString) {
  return moment.utc(dateString).format('YYYY-MM-DD');
}


let formatDateTime = (dateString) => {
  return moment.utc(dateString).format('ll LT');
}


export { formatDateTime, formatDate };