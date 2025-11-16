export const formatTime = (seconds) => {
  if (!seconds || isNaN(seconds)) return "0:00";

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const formatDuration = (timeString) => {
  if (!timeString) return 0;
  const [mins, secs] = timeString.split(":").map(Number);
  return mins * 60 + secs;
};
