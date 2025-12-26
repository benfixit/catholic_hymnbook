import { useState, createContext, ReactNode, useEffect, useContext } from 'react';
import { Romcal } from "romcal";
import { formatRomcalColors, formatRomcalSeasons, formatRomcalId } from '@/utils';

type CalendarDataType = {
    title: string,
    season: string,
    color: string,
    rank: string,
    date: string
}

type Props = {
  calendar: CalendarDataType;
  setCalendar: Function;
};

const defaultCalendar = {
    title: "",
    season: "",
    color: "",
    rank: "",
    date: ""
}

const SeasonContext = createContext<Props>({ calendar: defaultCalendar, setCalendar: () => {} });

export default function SeasonProvider({ children }: { children: ReactNode }) {
    const [calendar, setCalendar] = useState<CalendarDataType>(defaultCalendar);

    useEffect(() => {
        const generateCalendar = async () => {
            const init = new Romcal();
            const response = await init.generateCalendar();

            // Get today's date in ISO format (YYYY-MM-DD)
            const date = new Date();
            const todayISO = date.toISOString().split('T')[0];
            
            // Find today's entry
            const todayInfo = response[todayISO].at(0);

            if (!todayInfo) {
                setCalendar(defaultCalendar);
                return;
            }

            const options = {
              weekday: 'long', // Full name of the day (e.g., "Thursday")
              year: 'numeric',
              month: 'long',   // Full name of the month (e.g., "December")
              day: 'numeric'   // Day of the month (e.g., "25")
            };

            //@ts-ignore
            const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

            const data = {
                title: formatRomcalId(todayInfo.id),
                season: formatRomcalSeasons(todayInfo.seasons),
                color: formatRomcalColors(todayInfo.colors),
                rank: todayInfo.rank,
                date: formattedDate
            };

            setCalendar(data);
        }

        generateCalendar();
    }, []);

    return (
    <SeasonContext.Provider value={{ calendar, setCalendar }}>{children}</SeasonContext.Provider>
  );
}

export function useCalendar() {
  const { calendar, ...rest } = useContext(SeasonContext);

  if (!calendar) {
    throw new Error(
      "Couldn't find a calendar. Is your component inside SeasonContext?"
    );
  }

  return { calendar, ...rest };
}
