import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Pagination as BsPagination } from 'react-bootstrap';
import SelectTextInput from '../atoms/SelectTextInput';

interface PaginationProps {
  offset?: number;
  onOffsetChange?: (offset: number) => void;
  limit?: number;
  onLimitChange?: (limit: number) => void;
  total?: number;
  limitOptions?: number[];
}

const Pagination: React.FC<PaginationProps> = ({
  offset = 0,
  onOffsetChange,
  limit = 10,
  onLimitChange,
  total = 1,
  limitOptions = [10, 25, 50, 100],
}) => {
  const page = Math.floor(offset / limit) + 1;
  const pages = Math.max(1, Math.ceil(total / limit));

  const goToPage = (p: number) => {
    onOffsetChange?.((p - 1) * limit);
  };

  return (
    <BsPagination>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          gap: 25,
        }}
      >
        <BsPagination.First disabled={page === 1} onClick={() => goToPage(1)}>
          <ChevronFirst />
        </BsPagination.First>
        <BsPagination.Prev
          disabled={page === 1}
          onClick={() => goToPage(page - 1)}
        >
          <ChevronLeft />
        </BsPagination.Prev>
        Strona {page} z {pages}
        <BsPagination.Next
          disabled={page === pages}
          onClick={() => goToPage(page + 1)}
        >
          <ChevronRight />
        </BsPagination.Next>
        <BsPagination.Last
          disabled={page === pages}
          onClick={() => goToPage(pages)}
        >
          <ChevronLast />
        </BsPagination.Last>
        <SelectTextInput
          value={limit.toString()}
          options={limitOptions.map((o) => o.toString())}
          onChange={(l) => onLimitChange?.(Number(l))}
        />
      </div>
    </BsPagination>
  );
};

export default Pagination;
