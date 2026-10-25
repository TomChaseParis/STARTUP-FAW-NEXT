"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type TeacherComicBubbleProps = {
  message?: string;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
  showPhoto?: boolean;
  showBubble?: boolean;
};

export default function TeacherComicBubble({
  message = "Clique ici pour écouter la conjugaison",
  imageSrc = "/images/MARIETESTBULLE.PNG",
  imageAlt = "Marie, ta professeure de français",
  className = "",
  showPhoto = true,
  showBubble = true,
}: TeacherComicBubbleProps) {
  const [displayedMessage, setDisplayedMessage] = useState("");

  useEffect(() => {
    if (!showBubble) {
      setDisplayedMessage("");
      return;
    }

    let index = 0;
    setDisplayedMessage("");

    const interval = window.setInterval(() => {
      index += 1;
      setDisplayedMessage(message.slice(0, index));

      if (index >= message.length) {
        window.clearInterval(interval);
      }
    }, 45);

    return () => window.clearInterval(interval);
  }, [showBubble, message]);

  return (
    <div
      className={`relative flex min-h-28 w-full min-w-0 items-end gap-2 sm:min-h-32 ${className}`}
    >
      {/* EMPLACEMENT RÉSERVÉ POUR MARIE */}
      <div className="relative h-24 w-20 shrink-0 sm:h-28 sm:w-24">
        {showPhoto && (
          <div className="absolute inset-0 animate-[teacherAppear_1800ms_ease-out_both]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="96px"
              className="object-contain object-bottom"
            />
          </div>
        )}
      </div>

      {/* EMPLACEMENT RÉSERVÉ POUR LA BULLE */}
      <div className="relative mb-5 h-[76px] min-w-0 flex-1 sm:h-[88px]">
        {showBubble && (
          <div className="absolute inset-x-0 top-0 animate-[bubbleAppear_1450ms_ease-out_both]">
            <div className="relative rounded-[22px] border-2 border-slate-300 bg-white px-3 py-3 shadow-[3px_4px_0_rgba(15,23,42,0.08)] sm:px-4 sm:py-4">
              <p
                aria-label={message}
                aria-live="polite"
                className="break-words text-left text-xs font-bold leading-relaxed text-slate-800 sm:text-sm"
              >
                {displayedMessage}

                {displayedMessage.length < message.length && (
                  <span
                    aria-hidden="true"
                    className="ml-px inline-block h-[1em] w-px translate-y-0.5 animate-pulse bg-slate-500"
                  />
                )}
              </p>

              <span
                aria-hidden="true"
                className="absolute -right-1.5 top-3 h-2.5 w-2.5 rounded-full bg-amber-300"
              />
            </div>

            {/* POINTE DE LA BULLE */}
            <span
              aria-hidden="true"
              className="absolute -bottom-2 left-4 h-4 w-4 rotate-45 border-b-2 border-r-2 border-slate-300 bg-white"
            />

            <span
              aria-hidden="true"
              className="absolute bottom-0 left-[17px] h-2 w-3 bg-white"
            />
          </div>
        )}
      </div>

      {/* ANIMATIONS */}
      <style jsx>{`
        @keyframes teacherAppear {
          from {
            opacity: 0;
            transform: translateY(3px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bubbleAppear {
          from {
            opacity: 0;
            transform: translateY(2px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}