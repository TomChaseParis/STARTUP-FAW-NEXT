"use client";

import Image from "next/image";

type Props = {
  onStart?: () => void;
};

function SoundIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor" />
      <path
        d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MicIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="9"
        y="3"
        width="6"
        height="12"
        rx="3"
        fill="currentColor"
      />
      <path
        d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3m-4 0h8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ExerciseInstructionPreview({ onStart }: Props) {
  return (
    <main className="w-full bg-white p-0 font-[Arial,Helvetica,sans-serif] text-[#09264a]">
      <section
        aria-labelledby="faw-exercise-title"
        className="relative isolate mx-auto grid min-h-[760px] w-[calc(100%-36px)] max-w-[1370px] grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] items-center gap-[42px] overflow-hidden rounded-[28px] border border-[#f3d982] bg-[linear-gradient(135deg,#fffdf7_0%,#fff9e9_48%,#fff3cf_100%)] p-[34px] shadow-[0_18px_48px_rgba(36,47,66,0.08)] max-[1100px]:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] max-[1100px]:gap-[25px] max-[760px]:min-h-0 max-[760px]:w-[calc(100%-20px)] max-[760px]:max-w-[560px] max-[760px]:grid-cols-1 max-[760px]:gap-[5px] max-[760px]:rounded-[20px] max-[760px]:p-[14px]"
      >
        {/* Décoration de fond */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[110px] -top-[180px] -z-10 h-[440px] w-[58%] rotate-[-7deg] rounded-b-[55%_45%] bg-[linear-gradient(135deg,rgba(255,221,116,0.24),rgba(255,244,208,0.04))]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-[210px] -right-[100px] -z-10 h-[400px] w-[55%] rounded-full bg-[radial-gradient(ellipse,rgba(255,211,89,0.13),rgba(255,247,221,0))]"
        />

        {/* Illustration du tableau et de la souris */}
        <div className="flex min-w-0 items-center justify-center max-[760px]:p-0">
          <Image
            src="/images/listenspeak.png"
            alt="Tableau d’exercice de prononciation avec une souris qui invite l’apprenant à écouter et prononcer la phrase"
            width={640}
            height={750}
            priority
            className="block h-auto w-full max-w-[640px] object-contain max-[760px]:w-full"
          />
        </div>

        {/* Panneau d'instructions */}
        <div className="min-w-0 py-[34px] pr-[8px] max-[1100px]:pr-[8px] max-[760px]:px-[12px] max-[760px]:pb-[28px] max-[760px]:pt-[24px]">
          {/* Catégorie */}
          <div className="mb-[22px] flex items-center gap-[17px] text-[13px] font-extrabold tracking-[0.22em] text-[#748198] max-[760px]:mb-[17px] max-[760px]:gap-[12px] max-[760px]:text-[11px]">
            <span className="grid h-[58px] w-[58px] flex-[0_0_58px] place-items-center rounded-full bg-[#fff0c9] text-[#ef9900] max-[760px]:h-[46px] max-[760px]:w-[46px] max-[760px]:flex-[0_0_46px]">
              <SoundIcon size={27} />
            </span>
            <span>PRONONCIATION</span>
          </div>

          {/* Titre */}
          <h1
            id="faw-exercise-title"
            className="m-0 font-serif text-[clamp(36px,3.5vw,59px)] font-bold leading-[1.04] tracking-[-0.045em] text-[#09264a] max-[760px]:text-[clamp(32px,8vw,43px)]"
          >
            Je suis, tu as, elle fait,
            <br className="max-[760px]:hidden" /> nous allons...
          </h1>

          <div className="mb-[13px] mt-[24px] h-[6px] w-[100px] rounded-[6px] bg-[#ffb91f]" />

          {/* Description */}
          <p className="mb-[24px] mt-0 text-[clamp(16px,1.32vw,21px)] leading-[1.55] text-[#152f50] max-[760px]:text-[16px]">
            Pour chaque verbe, écoute la conjugaison au présent, puis choisis
            la bonne forme verbale du verbe pour chaque phrase qui t’est
            proposée.
          </p>

          {/* Exemple */}
          <div className="mb-[17px] flex min-h-[78px] items-center gap-[17px] rounded-[12px] border-l-[6px] border-[#ffb91f] bg-[linear-gradient(90deg,#fff5dd,#fffaf0)] px-[20px] py-[13px] text-[#152f50] max-[760px]:flex-wrap max-[760px]:gap-[10px] max-[760px]:p-[13px]">
            <span className="flex-none whitespace-nowrap rounded-[30px] bg-[#ffe9b5] px-[17px] py-[9px] text-[16px]">
              Exemple
            </span>

            <span
              aria-hidden="true"
              className="grid h-[48px] w-[48px] flex-[0_0_48px] place-items-center rounded-full border border-[#ffcb58] bg-white text-[#f29b00]"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M5 3.2 12 8l-7 4.8V3.2Z" fill="currentColor" />
              </svg>
            </span>

            <span className="text-[clamp(14px,1.1vw,18px)] leading-[1.4] max-[760px]:basis-full">
              « Qui est étudiant ? Qui travaille ? »
            </span>
          </div>

          {/* Étapes */}
          <div className="grid grid-cols-2 gap-[22px] max-[760px]:gap-[10px] max-[380px]:grid-cols-1">
            <article className="relative min-h-[215px] min-w-0 rounded-[19px] border border-[#172a4110] bg-white px-[20px] pb-[19px] pt-[18px] shadow-[0_3px_12px_#1a2c4010] max-[1100px]:px-[14px] max-[1100px]:py-[16px] max-[760px]:min-h-[190px] max-[760px]:px-[11px] max-[760px]:py-[13px] max-[380px]:min-h-0">
              <div className="mb-[10px] grid h-[67px] w-[67px] place-items-center rounded-full bg-[#ffedbd] text-[#e99100] max-[760px]:h-[48px] max-[760px]:w-[48px]">
                <SoundIcon size={28} />
              </div>

              <span className="absolute left-[100px] top-[28px] grid h-[40px] w-[40px] place-items-center rounded-full border-[1.5px] border-[#ffb51c] text-[23px] font-bold text-[#ef9900] max-[1100px]:left-[86px] max-[760px]:left-[67px] max-[760px]:top-[21px] max-[760px]:h-[30px] max-[760px]:w-[30px] max-[760px]:text-[17px] max-[380px]:left-[67px]">
                1
              </span>

              <h3 className="mb-[7px] mt-0 font-serif text-[25px] leading-[1.2] text-[#09264a] max-[760px]:text-[20px]">
                Écoute
              </h3>

              <p className="m-0 text-[clamp(14px,1.15vw,18px)] leading-[1.55] text-[#183352] max-[760px]:text-[13px]">
                Utilise le bouton{" "}
                <span className="mx-[2px] inline-flex h-[28px] w-[28px] items-center justify-center align-middle rounded-full bg-white text-[#ed9700] shadow-[0_2px_7px_#00000012]">
                  <SoundIcon size={16} />
                </span>{" "}
                pour écouter la conjugaison.
              </p>
            </article>

            <article className="relative min-h-[215px] min-w-0 rounded-[19px] border border-[#172a4110] bg-white px-[20px] pb-[19px] pt-[18px] shadow-[0_3px_12px_#1a2c4010] max-[1100px]:px-[14px] max-[1100px]:py-[16px] max-[760px]:min-h-[190px] max-[760px]:px-[11px] max-[760px]:py-[13px] max-[380px]:min-h-0">
              <div className="mb-[10px] grid h-[67px] w-[67px] place-items-center rounded-full bg-[#ffedbd] text-[#e99100] max-[760px]:h-[48px] max-[760px]:w-[48px]">
                <MicIcon size={28} />
              </div>

              <span className="absolute left-[100px] top-[28px] grid h-[40px] w-[40px] place-items-center rounded-full border-[1.5px] border-[#ffb51c] text-[23px] font-bold text-[#ef9900] max-[1100px]:left-[86px] max-[760px]:left-[67px] max-[760px]:top-[21px] max-[760px]:h-[30px] max-[760px]:w-[30px] max-[760px]:text-[17px] max-[380px]:left-[67px]">
                2
              </span>

              <h3 className="mb-[7px] mt-0 font-serif text-[25px] leading-[1.2] text-[#09264a] max-[760px]:text-[20px]">
                Réponds
              </h3>

              <p className="m-0 text-[clamp(14px,1.15vw,18px)] leading-[1.55] text-[#183352] max-[760px]:text-[13px]">
                Appuie sur le bouton{" "}
                <span className="mx-[2px] inline-flex h-[28px] w-[28px] items-center justify-center align-middle rounded-full bg-white text-[#ed9700] shadow-[0_2px_7px_#00000012]">
                  <MicIcon size={16} />
                </span>{" "}
                avant de prononcer ta phrase.
              </p>
            </article>
          </div>

          {/* Séparateur */}
          <div className="mx-[8px] mb-[17px] mt-[27px] flex items-center gap-[20px] text-[#748198] max-[760px]:mb-[17px] max-[760px]:mt-[23px] max-[760px]:gap-[9px]">
            <span className="h-px flex-1 bg-[#cfd4dc]" />
            <p className="m-0 whitespace-nowrap text-[12px] font-extrabold tracking-[0.19em] max-[760px]:text-[9px] max-[760px]:tracking-[0.12em]">
              PRÊT À COMMENCER ?
            </p>
            <span className="h-px flex-1 bg-[#cfd4dc]" />
          </div>

          {/* Bouton de démarrage */}
          <button
            type="button"
            onClick={onStart}
            className="mx-auto flex min-h-[82px] w-full max-w-[455px] cursor-pointer items-center justify-between gap-[20px] rounded-[40px] border-0 bg-[linear-gradient(100deg,#ffd74f_0%,#ffbd14_65%,#ffb913_100%)] py-[10px] pl-[35px] pr-[15px] font-serif text-[clamp(18px,1.5vw,25px)] font-bold text-[#09264a] shadow-[0_7px_0_#f2ad0b20] transition-[transform,box-shadow] duration-200 hover:-translate-y-[2px] hover:shadow-[0_10px_18px_#d99b182b] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#183b60] focus-visible:outline-offset-4 motion-reduce:transition-none max-[760px]:min-h-[65px] max-[760px]:pl-[20px] max-[760px]:text-[17px]"
          >
            <span>Commencer l’exercice</span>

            <span className="grid h-[63px] w-[63px] flex-[0_0_63px] place-items-center rounded-full bg-[#06264b] text-white max-[760px]:h-[47px] max-[760px]:w-[47px] max-[760px]:flex-[0_0_47px]">
              <svg
                width="27"
                height="27"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 12h15m-6-6 6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>
      </section>
    </main>
  );
}
