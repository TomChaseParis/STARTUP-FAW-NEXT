"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type Props = {
  language?: string;
  onResult: (text: string) => void;
};

export function useSpeechRecognition({
  language = "fr-FR",
  onResult,
}: Props) {
  const recognitionRef =
    useRef<any>(null);

  /*
   * On conserve toujours la dernière version
   * de onResult sans recréer l'instance
   * SpeechRecognition.
   */
  const onResultRef =
    useRef(onResult);

  const [
    isListening,
    setIsListening,
  ] = useState(false);

  const [
    isSupported,
    setIsSupported,
  ] = useState(false);

  /*
   * ==================================================
   * MISE À JOUR DU CALLBACK
   * ==================================================
   */

  useEffect(() => {
    onResultRef.current =
      onResult;
  }, [onResult]);

  /*
   * ==================================================
   * INITIALISATION SPEECH RECOGNITION
   * ==================================================
   */

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      recognitionRef.current =
        null;
      return;
    }

    setIsSupported(true);

    const recognition =
      new SpeechRecognition();

    recognition.lang =
      language;

    recognition.continuous =
      false;

    recognition.interimResults =
      false;

    recognition.maxAlternatives =
      1;

    /*
     * ==================================================
     * RESULTAT VOCAL
     * ==================================================
     */

    recognition.onresult = (
      event: any,
    ) => {
      const transcript =
        event?.results?.[
          event.results.length - 1
        ]?.[0]?.transcript;

      if (!transcript) {
        return;
      }

      console.log(
        "[SpeechRecognition] Réponse détectée :",
        transcript,
      );

      onResultRef.current(
        transcript,
      );
    };

    /*
     * ==================================================
     * FIN DE RECONNAISSANCE
     * ==================================================
     */

    recognition.onend = () => {
      console.log(
        "[SpeechRecognition] Reconnaissance terminée.",
      );

      setIsListening(false);
    };

    /*
     * ==================================================
     * ERREUR
     * ==================================================
     */

    recognition.onerror = (
      event: any,
    ) => {
      console.error(
        "[SpeechRecognition] Erreur :",
        event?.error,
      );

      setIsListening(false);
    };

    recognitionRef.current =
      recognition;

    /*
     * ==================================================
     * CLEANUP
     * ==================================================
     */

    return () => {
      try {
        recognition.onresult =
          null;

        recognition.onend =
          null;

        recognition.onerror =
          null;

        recognition.stop();
      } catch {
        // Rien à faire si SpeechRecognition
        // est déjà arrêté.
      }

      if (
        recognitionRef.current ===
        recognition
      ) {
        recognitionRef.current =
          null;
      }

      setIsListening(false);
    };
  }, [language]);

  /*
   * ==================================================
   * START LISTENING
   * ==================================================
   */

  const startListening =
    useCallback(() => {
      const recognition =
        recognitionRef.current;

      if (!recognition) {
        console.warn(
          "[SpeechRecognition] Speech Recognition non disponible.",
        );

        return;
      }

      if (isListening) {
        return;
      }

      try {
        setIsListening(true);

        recognition.start();

        console.log(
          "[SpeechRecognition] Écoute démarrée.",
        );
      } catch (error) {
        /*
         * Le navigateur peut lever une exception
         * si start() est appelé alors que la reconnaissance
         * est déjà active.
         */

        console.error(
          "[SpeechRecognition] Impossible de démarrer :",
          error,
        );

        setIsListening(false);
      }
    }, [isListening]);

  /*
   * ==================================================
   * STOP LISTENING
   * ==================================================
   */

  const stopListening =
    useCallback(() => {
      const recognition =
        recognitionRef.current;

      if (!recognition) {
        return;
      }

      try {
        recognition.stop();
      } catch {
        // SpeechRecognition déjà arrêté.
      }

      setIsListening(false);
    }, []);

  /*
   * ==================================================
   * CLEANUP GLOBAL
   * ==================================================
   */

  useEffect(() => {
    return () => {
      const recognition =
        recognitionRef.current;

      if (!recognition) {
        return;
      }

      try {
        recognition.stop();
      } catch {
        // Rien à faire.
      }
    };
  }, []);

  return {
    isListening,

    isSupported,

    startListening,

    stopListening,
  };
}