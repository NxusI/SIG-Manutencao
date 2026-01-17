import * as React from "react";
import { format, parse, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { DatePickerProps } from "@/shared/types/components.types";
import { Calendar } from "../ui/calendar";

interface ExtendedDatePickerProps<T = Date | string>
  extends Omit<DatePickerProps, "onChange"> {
  dayMonthOnly?: boolean;
  onChange?: (value: T | undefined) => void;
  disableInput?: boolean;
}

const DatePicker = ({
  label,
  className,
  onChange,
  value,
  disable,
  from,
  to,
  dayMonthOnly = false,
  disableInput,
}: ExtendedDatePickerProps) => {
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(
    value
  );
  const [inputValue, setInputValue] = React.useState(
    value ? format(value, dayMonthOnly ? "dd/MM" : "dd/MM/yyyy") : ""
  );

  React.useEffect(() => {
    setInternalDate(value);
    setInputValue(
      value ? format(value, dayMonthOnly ? "dd/MM" : "dd/MM/yyyy") : ""
    );
  }, [value, dayMonthOnly]);

  const handleSelect = (selectedDate: Date | undefined) => {
    setInternalDate(selectedDate);
    setInputValue(
      selectedDate
        ? format(selectedDate, dayMonthOnly ? "dd/MM" : "dd/MM/yyyy")
        : ""
    );

    if (dayMonthOnly && selectedDate) {
      const formatted = format(selectedDate, "dd/MM");
      onChange?.(formatted);
    } else {
      onChange?.(selectedDate);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "");

    if (val.length >= 3) val = val.slice(0, 2) + "/" + val.slice(2);
    if (!dayMonthOnly && val.length >= 6)
      val = val.slice(0, 5) + "/" + val.slice(5);

    val = dayMonthOnly ? val.slice(0, 5) : val.slice(0, 10);

    setInputValue(val);

    if (
      (dayMonthOnly && val.length === 5) ||
      (!dayMonthOnly && val.length === 10)
    ) {
      const parsed = parse(
        val,
        dayMonthOnly ? "dd/MM" : "dd/MM/yyyy",
        new Date()
      );
      if (isValid(parsed)) {
        setInternalDate(parsed);
        if (dayMonthOnly) {
          onChange?.(format(parsed, "dd/MM"));
        } else {
          onChange?.(parsed);
        }
      }
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "flex items-center border rounded-md px-3 py-2 min-w-[250px]",
            className,
            disableInput && "opacity-50 cursor-not-allowed"
          )}
        >
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={label}
            className="flex-1 outline-none text-sm bg-transparent"
            disabled={disableInput}
          />
          <CalendarIcon className="ml-2 h-4 w-4 text-muted-foreground" />
        </div>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start" className="w-auto p-0">
        <Calendar
          mode="single"
          selected={internalDate}
          onSelect={handleSelect}
          disabled={disable}
          className="rounded-md border bg-[var(--card)]"
          locale={ptBR}
          startMonth={from}
          endMonth={to}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;