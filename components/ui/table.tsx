import React from "react";
import { format } from "date-fns";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import clsx from "clsx";
import ThemedText from "./themed/themed-text";

// can extend these to match Tailwind classnames as we go
type ColSpan = 'col-span-1' | 'col-span-2' | 'col-span-3' | 'col-span-4';
type GridCols =
  | 'grid-cols-1' | 'grid-cols-2' | 'grid-cols-3' | 'grid-cols-4'
  | 'grid-cols-5' | 'grid-cols-6' | 'grid-cols-7' | 'grid-cols-8'
  | 'grid-cols-9' | 'grid-cols-10' | 'grid-cols-11' | 'grid-cols-12';

type ColHeader = {
  display: string;
  allowSort?: boolean;
};

type PropCell = {
  type: 'prop';
  element: string;
  dateFormatting?: string;
  rounding?: number;
  customFormatting?: (v: any) => string | number | React.ReactNode;
  placeholder?: string
};

type ElementCell = {
  type: 'element';
  element: React.ReactNode | ((item: any) => React.ReactNode);
};

type ColCell = PropCell | ElementCell;

type Col = {
  span: ColSpan;
  header: ColHeader;
  cell: ColCell;
};

export interface TableConfigProps {
  gridCols: GridCols;
  cols: Col[];
}

function isNil(v: unknown): v is null | undefined {
  return v === null || v === undefined;
}

function isNumericLike(v: unknown): boolean {
  if (typeof v === 'number') return Number.isFinite(v);
  if (typeof v === 'string' && v.trim() !== '') {
    const n = Number(v);
    return Number.isFinite(n);
  }
  return false;
}

function fmtRounded(v: number | string, decimals: number): string {
  const n = typeof v === 'number' ? v : Number(v);
  return new Intl.NumberFormat(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);
}

export default function Table({
  config,
  rows,
  loading = false,
  emptyMessage = "There are no results",
  rowLink,
  headerClassName = "",
  rowClassName = "",
  hideEmptyState = false
}: {
  config: TableConfigProps;
  rows: any[];
  loading?: boolean;
  emptyMessage?: string;
  rowLink?: (item: any) => string;
  headerClassName?: string;
  rowClassName?: string;
  hideEmptyState?: boolean;
}) {

  const renderPropCell = (cell: PropCell, item: any): React.ReactNode => {
    const raw = item[cell.element];
    
    if (isNil(raw)) return "";

    if (typeof cell.customFormatting === "function" && cell.customFormatting !== undefined) {
        return cell.customFormatting(raw);
    }

    if (cell.dateFormatting) {
      try {
        const d = new Date(raw);
        return isNaN(d.getTime()) ? "" : format(d, cell.dateFormatting);
      } catch {
        return "";
      }
    }

    if (typeof cell.rounding === "number" && isNumericLike(raw)) {
      return fmtRounded(raw as number | string, cell.rounding);
    }

    return raw as React.ReactNode;
  };

  const rowContent = ({ item }: { item: any }) => (
    <div
      className={clsx(
        "grid w-full transition duration-150",
        config.gridCols,
        "hover:bg-neutral-50",
        rowClassName
      )}
    >
      {config.cols.map((col, colIndex) => {
        const cell = col.cell;
        const content =
          cell.type === "prop"
            ? renderPropCell(cell, item)
            : typeof cell.element === "function"
            ? cell.element(item)
            : cell.element;

        return (
          <div key={colIndex} className={clsx(col.span, "text-start p-5 truncate text-ellipsis")}>
            {cell.type === 'prop' ? (
                <ThemedText>
                    {content ?? cell.placeholder ?? '-'}
                </ThemedText>
                ) : (
                content
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="rounded-xl border shadow-xs">
      {/* Header */}
      <div
        className={clsx(
          "flex flex-row min-w-5xl rounded-t-xl border-b",
          "bg-white",
          headerClassName
        )}
      >
        <div className={clsx("grid w-full", config.gridCols)}>
          {config.cols.map((col, index) => (
            <div
              key={index}
              className={clsx(
                col.span,
                "font-semibold text-sm opacity-70 text-start px-5 py-3"
              )}
            >
                <ThemedText>
                    {col.header.display}
                </ThemedText>
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      {!loading ? (
        <div className="flex flex-col divide-y divide-neutral-200 w-full min-w-5xl overflow-y-auto bg-neutral-100 rounded-b-xl">
          {rows?.length > 0 ? (
            rows.map((item, index) =>
              rowLink ? (
                <Link key={index} href={rowLink(item)}>
                  {rowContent({ item })}
                </Link>
              ) : (
                <div key={index}>{rowContent({ item })}</div>
              )
            )
          ) : (
            <div className={`${hideEmptyState ? 'h-16' : 'h-[40vh]'} flex flex-col justify-center items-center`}>
              {!hideEmptyState && <ThemedText className="opacity-60 font-semibold">{emptyMessage}</ThemedText>}
            </div>
          )}
        </div>
      ) : (
        <div className="w-full min-w-5xl">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className={clsx("grid w-full", config.gridCols)}>
              {config.cols.map((col, idx) => (
                <div key={idx} className={clsx(col.span, "text-start p-4")}>
                  <Skeleton />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}