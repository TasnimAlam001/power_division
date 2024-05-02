import moment from 'moment';

export default function formatDate(dateString) {
  return moment(dateString).format('YYYY-MM-DD');
}
