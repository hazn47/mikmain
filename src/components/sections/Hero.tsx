import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type DayPhase = "sabah" | "ogle" | "ikindi" | "aksam" | "yatsi";

const phaseBackgrounds: Record<DayPhase, string> = {
  sabah: "/sabah.png",
  ogle: "/" + encodeURIComponent("öglen.png"),
  ikindi: "/ikindi.png",
  aksam: "/aksam.png",
  yatsi: "/yatsi.png",
};

// Grobe Zeitbereiche, angelehnt an typische Gebetszeiten (lokale Uhrzeit)
// Diese können später durch echte Gebetszeiten / Sonnenstände ersetzt werden.
const getPhaseForDate = (date: Date): DayPhase => {
  const hour = date.getHours() + date.getMinutes() / 60;

  if (hour >= 4 && hour < 8) {
    return "sabah"; // Morgendämmerung / Sonnenaufgang
  }
  if (hour >= 8 && hour < 13) {
    return "ogle"; // Mittagszeit
  }
  if (hour >= 13 && hour < 17.5) {
    return "ikindi"; // Nachmittag nach Sonnenhöhepunkt
  }
  if (hour >= 17.5 && hour < 21) {
    return "aksam"; // Sonnenuntergang / frühe Nacht
  }
  return "yatsi"; // Späte Nacht / volle Dunkelheit
};

export const Hero = () => {
  const [phase, setPhase] = useState<DayPhase>(() => getPhaseForDate(new Date()));

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase(getPhaseForDate(new Date()));
    }, 5 * 60 * 1000); // alle 5 Minuten prüfen

    return () => clearInterval(interval);
  }, []);

  const currentBackground = phaseBackgrounds[phase];

  return (
    <section id="hero" className="relative overflow-hidden min-h-screen">
      {/* Vollflächiges Hintergrundbild */}
      <motion.div
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url("${currentBackground}")`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/25" />
      </motion.div>

      <div className="relative container min-h-screen flex items-center justify-center pt-32 lg:pt-36 pb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center justify-center space-y-6"
        >
          {/* Logo */}
          <img
            src="/flamingo2.png"
            alt="MikMain Logo"
            className="max-w-[500px] w-full h-auto"
          />
          
          {/* Text darunter - Platzhalter für später */}
          <div className="text-center">
            {/* Hier kann Text hinzugefügt werden */}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
