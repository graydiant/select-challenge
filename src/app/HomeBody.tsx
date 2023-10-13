'use client'

import React, { useEffect, useState } from 'react'
import Datepicker, { DateRangeType } from 'react-tailwindcss-datepicker'
import dayjs, { ManipulateType } from 'dayjs'

import Dropdown from '../components/Dropdown'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

const rangeOptions: Record<string, {
  label: string;
  count: number;
  unit: ManipulateType;
}> = {
  'last7Days': {
    label: 'Last 7 Days',
    count: 7,
    unit: 'day',
  },
  'last14Days': {
    label: 'Last 14 Days',
    count: 14,
    unit: 'day',
  },
  'lastMonth': {
    label: 'Last Month',
    count: 1,
    unit: 'month',
  },
  'last6Months': {
    label: 'Last 6 Months',
    count: 6,
    unit: 'month',
  },
}

type InitialParams = {
  startDate?: string;
  endDate?: string;
  dateRange?: string;
}

const getDatesFromParams = ({ startDate, endDate, dateRange }: InitialParams) => {
  if (startDate && endDate) {
    return {
      startDate: dayjs(startDate).toDate(),
      endDate: dayjs(endDate).toDate(),
    }
  }
  if (dateRange && rangeOptions[dateRange]) {
    const range = rangeOptions[dateRange]

    return {
      startDate: dayjs().subtract(range.count, range.unit).toDate(),
      endDate: dayjs().toDate(),
    }
  }
  return {
    startDate: dayjs().subtract(7, 'day').toDate(),
    endDate: dayjs().toDate(),
  }
}

const getRangeFromParams = ({ startDate, endDate, dateRange }: InitialParams) => {
  if (startDate && endDate) {
    return 'custom'
  }
  if (dateRange && rangeOptions[dateRange]) {
    return dateRange
  }
  return 'last7Days'
}

const HomeBody = () => {
  const { push } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const initialParams = {
    startDate: searchParams.get('startDate'),
    endDate: searchParams.get('endDate'),
    dateRange: searchParams.get('dateRange'),
  }

  const initialDates = getDatesFromParams(initialParams)
  const initialRange = getRangeFromParams(initialParams)

  const [dates, setDates] = useState<DateRangeType>(initialDates)
  const [selectedRange, setSelectedRange] = useState<string>(initialRange)

  useEffect(() => {
    const nextParams = {
      startDate: searchParams.get('startDate'),
      endDate: searchParams.get('endDate'),
      dateRange: searchParams.get('dateRange'),
    }

    const nextDates = getDatesFromParams(nextParams)
    const initialRange = getRangeFromParams(nextParams)

    setDates(nextDates)
    setSelectedRange(initialRange)

  }, [searchParams])

  const handleDatesChange = (newDates: DateRangeType) => {
    const params = new URLSearchParams();
    // if (newDates.startDate && newDates.endDate) {
    params.set('startDate', dayjs(newDates.startDate).format('YYYY-MM-DD'))
    params.set('endDate', dayjs(newDates.endDate).format('YYYY-MM-DD'))

    setDates(() => ({
      startDate: newDates.startDate,
      endDate: newDates.endDate,
    })
    )
    setSelectedRange('custom')
    push(pathname + '?' + params.toString())
  }

  const handleItemClick = ({ key }: { key: string }) => {
    const params = new URLSearchParams()
    params.set('dateRange', key)

    const range = rangeOptions[key]

    if (!range) return false;

    const nextStart = dayjs().subtract(range.count, range.unit).toDate();
    const nextEnd = dayjs().toDate();

    setDates({ startDate: nextStart, endDate: nextEnd })
    setSelectedRange(key)
    push(pathname + '?' + params.toString())
  }

  return (
    <>
      <main>
        <div className="mt-12 text-center text-xl">hello there!</div>
        <div className="mt-12 flex shrink-0 items-center justify-center gap-3">
          <Dropdown
            onItemClick={handleItemClick}
            selectedItem={selectedRange || 'custom'}
            options={[
              ...Object.keys(rangeOptions).map((key) => ({
                key,
                label: rangeOptions[key].label,
              })),
              {
                key: 'custom', label: 'Custom',
              }
            ]}
          />
          <div className="w-1/5">
            <Datepicker
              value={dates}
              onChange={handleDatesChange}
              showShortcuts={true}
            />
          </div>
        </div>
      </main>
    </>
  )
}

export default HomeBody;
