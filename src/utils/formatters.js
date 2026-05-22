import dayjs from 'dayjs';

export const formatCurrency = (value, currency = 'INR') =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency, maximumFractionDigits: 0 }).format(value);

export const formatNumber = (value) =>
  new Intl.NumberFormat('en-IN').format(value);

export const formatDate = (date, format = 'DD MMM YYYY') =>
  dayjs(date).format(format);

export const formatDateTime = (date) =>
  dayjs(date).format('DD MMM YYYY, hh:mm A');

export const formatPercent = (value, decimals = 1) =>
  `${Number(value).toFixed(decimals)}%`;

export const truncate = (str, len = 40) =>
  str?.length > len ? `${str.slice(0, len)}...` : str;
