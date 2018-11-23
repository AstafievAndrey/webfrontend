import { MatPaginatorIntl } from '@angular/material';

const ruRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length === 0 || pageSize === 0) { return `0 из ${length}`; }
  length = Math.max(length, 0);
  const startIndex = page * pageSize;
  const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} из ${length}`;
};

export function LocalePaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();
  paginatorIntl.itemsPerPageLabel = 'Отображать:';
  paginatorIntl.nextPageLabel = 'Следующий';
  paginatorIntl.previousPageLabel = 'Предыдущий';
  paginatorIntl.getRangeLabel = ruRangeLabel;
  return paginatorIntl;
}
