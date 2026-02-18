"use client";

import React, { useMemo, useRef, useState } from "react";

/**
 * Exercice 2 — Transformation JE -> ELLE
 * - Zone de saisie libre
 * - Vérification : diff mot-à-mot (LCS)
 * - Surlignage :
 *   - Rouge (dans "Votre texte") = mots en trop / mal transcrits
 *   - Vert (dans "Correction attendue") = mots manquants chez l'étudiant
 */

const sourceText = `Le matin, le réveil sonne à 8 heures et demie, mais je me lève seulement à 9 heures. À peine 5 minutes plus tard, je suis déjà dans ma salle de bain. Je me douche et je me brosse les dents. 10 minutes après, je suis dans la cuisine. Là, je bois du thé avec du miel et je mange une tartine de pain avec de la confiture, et des céréales. Après le petit déjeuner, je retourne dans ma chambre pour m’habiller et préparer mes affaires. À dix heures moins le quart, quand je quitte la maison, mon gros chat Gaston dort encore dans son panier. Quel paresseux !
Je vais au travail en métro. Je mets à peu près 25 minutes s’il n’y a pas de problème sur la ligne. Je commence à travailler à 10 heures et quart. Je suis professeur de danse orientale dans une petite école, à Paris, depuis maintenant 8 ans. J’ai une pause entre midi et 2 heures. Souvent, je déjeune avec mon collègue Jamal ou certains de mes élèves dans une petite brasserie du coin. Après, je vais parfois m’asseoir dans un parc pour lire un bon livre et m’aérer l’esprit. Ensuite, je retourne travailler. Je donne des cours jusqu’à 4 heures de l’après-midi. Je finis chaque séance par une session « méditation », parfois assez intense…
Après le travail, j’aime bien me promener un peu dans les rues et flâner devant les vitrines. Juste avant de rentrer, je m’arrête à l’épicerie ou chez Monoprix pour faire quelques courses. Une fois arrivée chez moi, je donne à manger à Gaston. C’est un vrai glouton ! Vers 19 heures, je me prépare à dîner dans la cuisine. Après le dîner, il m’arrive de sortir avec des amis. La semaine dernière, je suis allée voir un spectacle de patinage artistique avec mon cousin Zig. Avant d’aller au lit, j’appelle ma mère ou mon frère pour prendre de leurs nouvelles et bavarder un peu. Je me mets au lit vers 11 heures. Je lis une petite demi-heure et puis j’éteins la lumière.`;

const expectedText = `Le matin, le réveil sonne à 8 heures et demie, mais elle se lève seulement à 9 heures. À peine 5 minutes plus tard, elle est déjà dans sa salle de bain. Elle se douche et se brosse les dents. 10 minutes après, elle est dans la cuisine. Là, elle boit du thé avec du miel et mange une tartine de pain avec de la confiture, et des céréales. Après le petit déjeuner, elle retourne dans sa chambre pour s’habiller et préparer ses affaires. À dix heures moins le quart, quand elle quitte la maison, son gros chat Gaston dort encore dans son panier. Quel paresseux !
Elle va au travail en métro. Elle met à peu près 25 minutes s’il n’y a pas de problème sur la ligne. Elle commence à travailler à 10 heures et quart. Elle est professeur de danse orientale dans une petite école, à Paris, depuis maintenant 8 ans. Elle a une pause entre midi et 2 heures. Souvent, elle déjeune avec son collègue Jamal ou certains de ses élèves dans une petite brasserie du coin. Après, elle va parfois s’asseoir dans un parc pour lire un bon livre et s’aérer l’esprit. Ensuite, elle retourne travailler. Elle donne des cours jusqu’à 4 heures de l’après-midi. Elle finit chaque séance par une session « méditation », parfois assez intense…
Après le travail, elle aime bien se promener un peu dans les rues et flâner devant les vitrines. Juste avant de rentrer, elle s’arrête à l’épicerie ou chez Monoprix pour faire quelques courses. Une fois arrivée chez elle, elle donne à manger à Gaston. C’est un vrai glouton ! Vers 19 heures, elle se prépare à dîner dans la cuisine. Après le dîner, il lui arrive de sortir avec des amis. La semaine dernière, elle est allée voir un spectacle de patinage artistique avec son cousin Zig. Avant d’aller au lit, elle appelle sa mère ou son frère pour prendre de leurs nouvelles et bavarder un peu. Elle se met au lit vers 11 heures. Elle lit une petite demi-heure et puis elle éteint la lumière.`;

// ————— Utils: tokenisation & diff (LCS) —————

/** Découpe en tokens mots + ponctuation. On garde la casse d’origine mais on normalise pour comparaison. */
function tokenize(text: string) {
  // tokens = suite de lettres/chiffres/apostrophes OU un seul caractère non-espace
  const raw = text.match(/\w+’?\w*|[^\s]/g) || [];
  return raw.map((t) => ({ raw: t, norm: t.toLowerCase() }));
}

/** LCS mot-à-mot pour aligner student vs expected */
function diffTokens(student: ReturnType<typeof tokenize>, expected: ReturnType<typeof tokenize>) {
  const n = student.length;
  const m = expected.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      if (student[i].norm === expected[j].norm) dp[i][j] = 1 + dp[i + 1][j + 1];
      else dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  // Backtrack
  const aligned: Array<{ type: "match" | "del" | "ins"; s?: number; e?: number }> = [];
  let i = 0,
    j = 0;
  while (i < n && j < m) {
    if (student[i].norm === expected[j].norm) {
      aligned.push({ type: "match", s: i, e: j });
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      aligned.push({ type: "del", s: i }); // token en trop côté student
      i++;
    } else {
      aligned.push({ type: "ins", e: j }); // token manquant (existe côté expected)
      j++;
    }
  }
  while (i < n) {
    aligned.push({ type: "del", s: i });
    i++;
  }
  while (j < m) {
    aligned.push({ type: "ins", e: j });
    j++;
  }

  return aligned;
}

function buildViews(studentText: string, expectedText: string) {
  const sToks = tokenize(studentText);
  const eToks = tokenize(expectedText);
  const ops = diffTokens(sToks, eToks);

  const studentJSX: JSX.Element[] = [];
  const expectedJSX: JSX.Element[] = [];

  let correctCount = 0;
  let totalExpected = eToks.length;

  ops.forEach((op, idx) => {
    if (op.type === "match" && op.s !== undefined && op.e !== undefined) {
      const sTok = sToks[op.s];
      const eTok = eToks[op.e];
      // affichage normal dans les deux vues
      studentJSX.push(<span key={`s${idx}`}>{sTok.raw}</span>);
      expectedJSX.push(<span key={`e${idx}`}>{eTok.raw}</span>);
      correctCount++;
    } else if (op.type === "del" && op.s !== undefined) {
      const sTok = sToks[op.s];
      // rouge dans la vue étudiant (en trop / incorrect)
      studentJSX.push(
        <span
          key={`s${idx}`}
          className="bg-red-200 text-red-900 rounded px-0.5"
          title="Mot incorrect ou en trop"
        >
          {sTok.raw}
        </span>
      );
    } else if (op.type === "ins" && op.e !== undefined) {
      const eTok = eToks[op.e];
      // vert dans la vue correction (manquant chez l'étudiant)
      expectedJSX.push(
        <span
          key={`e${idx}`}
          className="bg-green-200 text-green-900 rounded px-0.5"
          title="Mot manquant dans votre texte"
        >
          {eTok.raw}
        </span>
      );
    }
    // on remet les espaces si besoin (simple heuristique : espace après mots alphanumériques)
    const needSpaceAfterStudent =
      idx < ops.length - 1 &&
      op.type !== "ins" && // "ins" n'ajoute rien côté student
      /\w|[’]/.test(
        op.type === "match" && op.s !== undefined ? sToks[op.s].raw : op.s !== undefined ? sToks[op.s].raw : ""
      );

    const needSpaceAfterExpected =
      idx < ops.length - 1 &&
      op.type !== "del" && // "del" n'ajoute rien côté expected
      /\w|[’]/.test(
        op.type === "match" && op.e !== undefined ? eToks[op.e].raw : op.e !== undefined ? eToks[op.e].raw : ""
      );

    if (needSpaceAfterStudent) studentJSX.push(<span key={`sspc${idx}`}>{" "}</span>);
    if (needSpaceAfterExpected) expectedJSX.push(<span key={`espc${idx}`}>{" "}</span>);
  });

  const errors = totalExpected - correctCount;
  const coverage = totalExpected > 0 ? Math.max(0, Math.min(100, Math.round((correctCount / totalExpected) * 100))) : 0;

  return { studentJSX, expectedJSX, correctCount, totalExpected, errors, coverage };
}

const Exercice2: React.FC = () => {
  const [showCorr, setShowCorr] = useState(false);
  const [studentText, setStudentText] = useState("");
  const corrRef = useRef<HTMLDivElement | null>(null);

  const {
    studentJSX,
    expectedJSX,
    correctCount,
    totalExpected,
    errors,
    coverage,
  } = useMemo(() => buildViews(studentText, expectedText), [studentText]);

  const onVerify = () => {
    setShowCorr(true);
    setTimeout(() => corrRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  const onReset = () => {
    setStudentText("");
    setShowCorr(false);
  };

  return (
    <section className="bg-white border-t border-black/10">
      <div className="max-w-3xl mx-auto pt-12 pb-16">
     

        {/* Texte original (référence) */}
        <details className="mb-6">
          <summary className="cursor-pointer text-sm text-black/70 hover:text-black/90">Voir le texte original (référence)</summary>
          <div className="mt-3 bg-gray-50 border border-black/10 rounded-lg p-4 text-black leading-relaxed text-justify whitespace-pre-wrap">
            {sourceText}
          </div>
        </details>

        {/* Zone de saisie */}
        <div className="mb-6">
          <label className="block text-black font-medium mb-2">✍️ Votre transformation :</label>
          <textarea
            value={studentText}
            onChange={(e) => setStudentText(e.target.value)}
            className="w-full h-60 border border-black/10 rounded-lg p-3 text-black text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            placeholder="Exemple : Elle se lève seulement à 9 heures..."
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 mb-8">
          <span className="text-xs text-black/60">
            <span className="inline-block align-middle h-3 w-3 rounded-sm bg-red-200 mr-1" /> = erreur / en trop &nbsp;·&nbsp;
            <span className="inline-block align-middle h-3 w-3 rounded-sm bg-green-200 mr-1" /> = manquant dans votre texte
          </span>
          <button
            onClick={onVerify}
            className="rounded-md bg-amber-500 px-4 py-2 text-black font-semibold hover:bg-amber-400"
          >
            ✅ Vérifier la correction
          </button>
          <button
            onClick={onReset}
            className="rounded-md bg-gray-200 px-4 py-2 text-black font-semibold hover:bg-gray-300"
          >
            🔄 Réinitialiser
          </button>
        </div>

        {/* Résultats */}
        {showCorr && (
          <div ref={corrRef}>
            {/* Résumé */}
            <div className="mb-4 text-sm text-black/80">
              <strong>Résumé :</strong>{" "}
              {correctCount} mots corrects sur {totalExpected} · {errors} écarts · Couverture ~ {coverage}%
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Vue Étudiant avec erreurs */}
              <div className="rounded-lg border border-black/10 p-4 bg-white shadow-sm">
                <h4 className="font-semibold text-black mb-2">Votre texte (corrigé visuellement)</h4>
                <div className="text-black leading-7 text-justify">
                  {studentText.trim()
                    ? <p>{studentJSX}</p>
                    : <p className="text-black/50 italic">Rien à comparer. Écrivez votre transformation puis cliquez sur “Vérifier la correction”.</p>}
                </div>
              </div>

              {/* Vue Correction attendue avec manquants */}
              <div className="rounded-lg border border-black/10 p-4 bg-white shadow-sm">
                <h4 className="font-semibold text-black mb-2">Correction attendue (mots manquants en vert)</h4>
                <div className="text-black leading-7 text-justify">
                  <p>{expectedJSX}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Exercice2;
