export const Background = () => {
  const circles = [
    { size: 'w-20 h-20', color: 'bg-[#6559ff]', left: 'left-[25%]', delay: 'animate-[float_25s_linear_infinite]' },
    {
      size: 'w-5 h-5',
      color: 'bg-[#ffd700]',
      left: 'left-[10%]',
      delay: 'animate-[float_12s_linear_infinite] delay-2000',
    },
    {
      size: 'w-5 h-5',
      color: 'bg-[#ef2e8b]',
      left: 'left-[70%]',
      delay: 'animate-[float_25s_linear_infinite] delay-4000',
    },
    { size: 'w-14 h-14', color: 'bg-[#00d1ff]', left: 'left-[40%]', delay: 'animate-[float_18s_linear_infinite]' },
    { size: 'w-5 h-5', color: 'bg-[#6559ff]', left: 'left-[65%]', delay: 'animate-[float_25s_linear_infinite]' },
    {
      size: 'w-28 h-28',
      color: 'bg-[#ffd700]',
      left: 'left-[75%]',
      delay: 'animate-[float_25s_linear_infinite] delay-3000',
    },
    {
      size: 'w-36 h-36',
      color: 'bg-[#ef2e8b]',
      left: 'left-[35%]',
      delay: 'animate-[float_25s_linear_infinite] delay-7000',
    },
    {
      size: 'w-6 h-6',
      color: 'bg-[#00d1ff]',
      left: 'left-[50%]',
      delay: 'animate-[float_45s_linear_infinite] delay-15000',
    },
    {
      size: 'w-4 h-4',
      color: 'bg-[#6559ff]',
      left: 'left-[20%]',
      delay: 'animate-[float_35s_linear_infinite] delay-2000',
    },
    { size: 'w-36 h-36', color: 'bg-[#ffd700]', left: 'left-[85%]', delay: 'animate-[float_11s_linear_infinite]' },
  ]

  return (
    <div className="fixed z-[-999] w-full h-screen top-0 left-0 bg-gradient-to-b from-white to-[#f0f0ff] overflow-hidden">
      <ul className="absolute top-0 left-0 w-full h-full">
        {circles.map((circle, index) => (
          <li
            key={index}
            className={`absolute bottom-[-150px] ${circle.size} ${circle.left} ${circle.color} bg-opacity-20 rounded-full ${circle.delay}`}
          />
        ))}
      </ul>
    </div>
  )
}
