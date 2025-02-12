import { SearchSharp } from "@mui/icons-material";
import { AxiosError } from "axios";
import api from "../api";
import { useEffect, useState } from "react";
import DateHeader from "../components/DateHeader";

type responseData = {
  message: string;
  status: boolean;
};

type eventData = {
  _id: number;
  createdAt: string;
  author: string;
  action: string;
};

export default function Activities() {
  const [events, setEvents] = useState<eventData[]>([]);

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
      className="flex-1 h-full m-0"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <div className="text-[#000000] shadow-md w-full mx-auto h-full overflow-auto">
        <nav className="flex items-center justify-between px-4 sticky top-0 py-2 bg-white">
          <span className="font-medium text-2xl">Activity</span>
          <div className="flex gap-3 items-center">
            <div className="flex items-center border ps-2">
              <SearchSharp />
              <input
                className="p-2 outline-none text-white"
                placeholder="search..."
                type="text"
              />
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M3 6h18"></path>
                <path d="M7 12h10"></path>
                <path d="M10 18h4"></path>
              </svg>
              <button>Filter</button>
            </div>
          </div>
          <div></div>
        </nav>
        <div className="px-20 pb-20">
          {Object.entries(groupedEvents).map(([date, events]) => (
            <div key={date}>
              <DateHeader date={date} />
              {events.map((event) => (
                <div
                  key={event._id}
                  className="event-item w-[80%] text-lg mx-auto"
                >
                  <div className="bg-[#fafafa] py-4 rounded-sm my-3 flex flex-col gap-3 shadow-lg">
                    <div className="flex justify-between px-3">
                      <div>{event.author} -</div>
                      {event.action}
                    </div>
                    <div className="border-t px-3 border-gray-300 py-3">
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
