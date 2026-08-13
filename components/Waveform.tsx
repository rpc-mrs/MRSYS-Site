export default function Waveform({ className = "" }: { className?: string }) {
  // A free induction decay curve — the characteristic signal shape of an NMR
  // measurement (fast oscillation, exponentially damped). Used as the site's
  // one signature graphic rather than a generic chart or icon.
  return (
    <svg
      viewBox="0 0 900 260"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <line x1="0" y1="130" x2="900" y2="130" stroke="#E2E5EA" strokeWidth="1" />
      <path
        className="waveform-path"
        d="M0,130
           C10,60 20,200 30,130
           C40,70 50,190 60,130
           C70,80 80,180 90,130
           C100,85 110,175 120,130
           C135,90 150,170 165,130
           C180,95 195,165 210,130
           C230,100 250,160 270,130
           C295,105 320,155 345,130
           C375,110 405,150 435,130
           C470,115 505,145 540,130
           C580,118 620,142 660,130
           C700,121 740,139 780,130
           C815,124 850,136 900,130"
        stroke="#0E7C86"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
