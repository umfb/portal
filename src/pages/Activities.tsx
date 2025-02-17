import { SearchSharp } from "@mui/icons-material";
import { AxiosError } from "axios";
import api from "../api";
import { useEffect, useRef, useState } from "react";
import DateHeader from "../components/DateHeader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type responseData = {
  message: string;
  status: boolean;
};

type eventData = {
  _id: number;
  createdAt: string;
  author: string;
  action: string;
  resource: string;
};

export default function Activities() {
  const [events, setEvents] = useState<eventData[]>([]);
  const [originalEvents, setOriginalEvents] = useState<eventData[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const generateDate = (timestamp: string): string => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const inputDate = new Date(timestamp);
    inputDate.setHours(0, 0, 0, 0);

    if (inputDate.getTime() === today.getTime()) return "Today";
    if (inputDate.getTime() === yesterday.getTime()) return "Yesterday";

    return inputDate.toLocaleDateString("en-GB");
  };

  const extractTime = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const searchEvent = () => {
    if (!inputRef.current) return;

    const searchedTerm = inputRef.current.value.trim();

    if (searchedTerm === "") {
      setEvents(originalEvents);
      return;
    }

    const filteredEvent = originalEvents.filter(
      (event: eventData) =>
        event.author.toLowerCase().includes(searchedTerm.toLowerCase()) ||
        event.action.toLowerCase().includes(searchedTerm.toLowerCase()) ||
        event.resource.toLowerCase().includes(searchedTerm.toLowerCase())
    );

    setEvents(filteredEvent);
  };

  const filterByDate = (date: Date | null) => {
    if (!date) {
      setEvents(originalEvents);
      return;
    }
    setSelectedDate(date);
    const formattedDate = date.toLocaleDateString("en-GB");
    const filteredEvent = originalEvents.filter(
      (event: eventData) =>
        new Date(event.createdAt).toLocaleDateString("en-GB") === formattedDate
    );

    setEvents(filteredEvent);
  };

  const fetchEvents = async () => {
    try {
      const response = await api.post(
        "/events/fetch-events",
        {},
        {
          headers: {
            contentType: "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (response) {
        console.log(response.data.events);
        setEvents(response.data.events);
        setOriginalEvents(response.data.events);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      const resData = axiosError.response?.data as responseData;
      console.log(resData);
    }
  };

  const groupEventsByDate = (events: eventData[]) => {
    return events.reduce((acc, event) => {
      const formattedDate = generateDate(event.createdAt);

      if (!acc[formattedDate]) {
        acc[formattedDate] = [];
      }

      acc[formattedDate].push(event);
      return acc;
    }, {} as Record<string, typeof events>);
  };

  const groupedEvents = groupEventsByDate(events);

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div
      className="flex-1 h-[95%] m-0 bg-gray-50"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <div className="text-[#000000] shadow-md w-full mx-auto h-full overflow-auto">
        <nav className="flex flex-col md:flex-row gap-2 items-center justify-between px-4 sticky top-0 py-3 bg-white">
          <span className="font-medium text-2xl">Activity</span>
          <div className="flex gap-3 items-center">
            <div className="flex items-center border ps-2">
              <SearchSharp />
              <input
                ref={inputRef}
                onInput={searchEvent}
                className="p-2 outline-none text-[#2e3333] w-full"
                placeholder="search..."
                type="text"
              />
            </div>
            <div>
              <DatePicker
                className="placeholder:text-sm border px-3 py-2 w-full text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholderText="Search by date..."
                selected={selectedDate}
                onChange={(date) => filterByDate(date)}
                dateFormat="dd/MM/yyyy"
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
              />
            </div>
          </div>
          <div></div>
        </nav>
        <div className="md:px-20 md:pb-20 px-4">
          {Object.entries(groupedEvents).map(([date, events]) => (
            <div key={date}>
              <DateHeader date={date} />
              {events.map((event) => (
                <div
                  key={event._id}
                  className="event-item w-full md:w-[80%] text-lg mx-auto"
                >
                  <div className="bg-[#fafafa] py-4 rounded-sm my-3 flex flex-col gap-3 shadow-md">
                    <div className="flex justify-between px-3">
                      <div>{event.author} -</div>
                      <span className="text-green-500">{event.action}</span>
                    </div>
                    <div className="border-t px-3 border-gray-300 text-gray-600 text-sm py-3">
                      {extractTime(event.createdAt)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
