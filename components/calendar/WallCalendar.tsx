/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  DateRange,
  Note,
  isSameDay,
  formatDate,
  formatDateKey,
} from "@/lib/calendar";
import CalendarHero from "./CalendarHero";
import CalendarGrid from "./CalendarGrid";
import NotesSection from "./NotesSection";

const TODAY = new Date();

export default function WallCalendar() {
  const [viewYear, setViewYear] = useState(TODAY.getFullYear());
  const [viewMonth, setViewMonth] = useState(TODAY.getMonth());
  const [range, setRange] = useState<DateRange>({ start: null, end: null });
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [selecting, setSelecting] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteInput, setNoteInput] = useState("");
  const [noteTarget, setNoteTarget] = useState<"general" | "range">("general");
  const [monthAnimKey, setMonthAnimKey] = useState(0);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);
  const noteRef = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    setMounted(true);
    const storedNotes = localStorage.getItem("wall-calendar-notes");
    if (storedNotes) setNotes(JSON.parse(storedNotes));

    const storedTheme = localStorage.getItem("wall-calendar-theme");
    if (
      storedTheme === "dark" ||
      (!storedTheme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("wall-calendar-theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("wall-calendar-notes", JSON.stringify(notes));
    localStorage.setItem("wall-calendar-range", JSON.stringify(range));
  }, [notes, range]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const changeMonth = useCallback((delta: number) => {
    setMonthAnimKey((k) => k + 1);
    setViewMonth((prev) => {
      const next = prev + delta;
      if (next < 0) {
        setViewYear((y) => y - 1);
        return 11;
      }
      if (next > 11) {
        setViewYear((y) => y + 1);
        return 0;
      }
      return next;
    });
  }, []);

  const handleDayClick = useCallback(
    (date: Date) => {
      if (!selecting) {
        setRange({ start: date, end: null });
        setSelecting(true);
      } else {
        const start = range.start!;
        if (isSameDay(date, start)) {
          setRange({ start: null, end: null });
          setSelecting(false);
          return;
        }
        setRange({ start, end: date });
        setSelecting(false);
      }
    },
    [selecting, range.start],
  );

  const addNote = useCallback(() => {
    if (!noteInput.trim()) return;
    const note: Note = {
      id: Date.now().toString(),
      text: noteInput.trim(),
      date:
        noteTarget === "range" && range.start
          ? formatDateKey(range.start)
          : undefined,
    };
    setNotes((prev) => [note, ...prev]);
    setNoteInput("");
  }, [noteInput, noteTarget, range.start]);

  const effectiveRange: DateRange =
    selecting && hoverDate ? { start: range.start, end: hoverDate } : range;

  const rangeLabel =
    range.start && range.end
      ? `${formatDate(range.start < range.end ? range.start : range.end)} → ${formatDate(range.start < range.end ? range.end : range.start)}`
      : range.start
        ? selecting
          ? "Select end date…"
          : formatDate(range.start)
        : "No date selected";

  return (
    <div className="w-full max-w-5xl mx-auto relative pt-8 md:pt-4">
      {mounted && (
        <button
          onClick={toggleTheme}
          className="absolute -top-4 right-0 md:-top-8 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-sm border"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border-color)",
            color: "var(--text-main)",
            boxShadow: "var(--shadow-calendar)",
          }}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? "🌙" : "☀️"}
        </button>
      )}

      <div
        className="relative rounded-sm overflow-hidden paper-texture transition-colors duration-300"
        style={{
          backgroundColor: "var(--bg-card)",
          boxShadow: "var(--shadow-calendar)",
        }}
      >
        {/* Binding rings */}
        <div className="absolute top-0 left-0 right-0 flex justify-center gap-5 z-20 py-2 pointer-events-none">
          <div
            className="h-2 w-full absolute top-0 left-0 right-0"
            style={{ background: "var(--border-color)" }}
          />
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="ring-hole" style={{ marginTop: "-3px" }} />
          ))}
        </div>

        <div
          className="flex flex-col lg:flex-row"
          style={{ paddingTop: "20px" }}
        >
          <CalendarHero
            viewYear={viewYear}
            viewMonth={viewMonth}
            onChangeMonth={changeMonth}
          />

          <div className="lg:w-3/5 flex flex-col">
            <CalendarGrid
              viewYear={viewYear}
              viewMonth={viewMonth}
              range={range}
              effectiveRange={effectiveRange}
              hoverDate={hoverDate}
              selecting={selecting}
              rangeLabel={rangeLabel}
              monthAnimKey={monthAnimKey}
              onDayClick={handleDayClick}
              onDayHover={setHoverDate}
              onClearRange={() => {
                setRange({ start: null, end: null });
                setSelecting(false);
              }}
            />
            <NotesSection
              notes={notes}
              noteInput={noteInput}
              noteTarget={noteTarget}
              hasRange={!!(range.start && range.end)}
              rangeLabel={rangeLabel}
              onInputChange={setNoteInput}
              onTargetChange={setNoteTarget}
              onAdd={addNote}
              onDelete={(id) =>
                setNotes((prev) => prev.filter((n) => n.id !== id))
              }
              textareaRef={noteRef as React.RefObject<HTMLTextAreaElement>}
            />
          </div>
        </div>
        <div
          className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none"
          style={{ background: "var(--gradient-curl)" }}
        />
      </div>

      <p
        className="text-center mt-4 text-xs transition-colors"
        style={{
          fontFamily: "var(--font-dm-sans)",
          color: "var(--text-faint)",
          letterSpacing: "0.02em",
        }}
      >
        Click a date to start, click another to set range · Hover to preview
      </p>
    </div>
  );
}
