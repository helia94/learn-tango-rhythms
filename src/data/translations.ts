export interface TranslationItem {
  en: string;
  de: string;
  context: string;
  description?: string;
}

export const translations = {
  // Common terms used throughout the app
  common: {
    play: {
      en: "PLAY",
      de: "ABSPIELEN",
      context: "Play button text"
    },
    pause: {
      en: "PAUSE", 
      de: "PAUSE",
      context: "Pause button text"
    },
    clear: {
      en: "CLEAR",
      de: "LÖSCHEN",
      context: "Clear button text"
    },
    speed: {
      en: "SPEED",
      de: "TEMPO",
      context: "Speed control label"
    },
    continue: {
      en: "Continue",
      de: "Weiter",
      context: "General continue button"
    },
    submit: {
      en: "Submit",
      de: "Absenden", 
      context: "Submit button text"
    },
    skip: {
      en: "Skip",
      de: "Überspringen",
      context: "Skip button text"
    },
    loading: {
      en: "Loading...",
      de: "Laden...",
      context: "Loading state text"
    },
    error: {
      en: "Error",
      de: "Fehler",
      context: "Generic error label"
    },
    success: {
      en: "Success!",
      de: "Erfolg!",
      context: "Success message"
    },
    backToHome: {
      en: "Back to Home",
      de: "Zurück zur Startseite",
      context: "Back to home navigation button"
    }
  },

  // Road Map page content
  roadmap: {
    title: {
      en: "ROAD MAP",
      de: "ROADMAP",
      context: "Road Map page title"
    },
    subtitle: {
      en: "🎯 Your Tango Mastery Journey",
      de: "🎯 Deine Tango Meisterschafts-Reise",
      context: "Road Map page subtitle"
    },
    description: {
      en: "Follow the winding path through fundamental concepts and advanced techniques",
      de: "Folge dem gewundenen Pfad durch grundlegende Konzepte und fortgeschrittene Techniken",
      context: "Road Map page description"
    },
    readyToStart: {
      en: "🚀 READY TO START YOUR JOURNEY?",
      de: "🚀 BEREIT, DEINE REISE ZU BEGINNEN?",
      context: "Call to action title"
    },
    startPracticeDescription: {
      en: "Begin practicing and unlock new concepts as you progress along the path",
      de: "Beginne zu üben und schalte neue Konzepte frei, während du auf dem Pfad voranschreitest",
      context: "Practice description text"
    },
    startPractice: {
      en: "🎵 START PRACTICE",
      de: "🎵 ÜBUNG STARTEN",
      context: "Start practice button"
    },
    takeQuiz: {
      en: "🧠 TAKE QUIZ",
      de: "🧠 QUIZ MACHEN",
      context: "Take quiz button"
    }
  },

  // Rhythm Grid page content
  rhythm: {
    title: {
      en: "TANGO RHYTHM LAB",
      de: "TANGO RHYTHM LAB",
      context: "Main page title - keeping tango terminology unchanged"
    },
    subtitle: {
      en: "CREATE TANGO BEATS • CLICK SQUARES FOR MAIN BEATS • CLICK DOTS FOR HALF BEATS",
      de: "ERSTELLE TANGO BEATS • KLICKE QUADRATE FÜR HAUPTSCHLÄGE • KLICKE PUNKTE FÜR HALBE SCHLÄGE",
      context: "Instructions under main title"
    },
    instructions: {
      en: "TANGO RHYTHM MACHINE • SQUARES = MAIN BEATS • DOTS = HALF BEATS\nSECOND SET MIRRORS FIRST • MANUAL EDITS BREAK MIRROR\nPRESS PLAY AND FEEL THE BEAT!",
      de: "TANGO RHYTHMUS MASCHINE • QUADRATE = HAUPTSCHLÄGE • PUNKTE = HALBE SCHLÄGE\nZWEITE REIHE SPIEGELT ERSTE • MANUELLE ÄNDERUNGEN BRECHEN SPIEGELUNG\nDRÜCKE PLAY UND FÜHLE DEN BEAT!",
      context: "Detailed instructions at bottom of page"
    },
    presets: {
      en: "STRONG BEAT PRESETS",
      de: "STARKE BEAT PRESETS",
      context: "Preset panel title"
    }
  },

  // Quiz related content
  quiz: {
    takeQuiz: {
      en: "Take The Quiz!",
      de: "Nimm am Quiz teil!",
      context: "Quiz button text"
    },
    complete: {
      en: "🎉 Quiz Complete! 🎉",
      de: "🎉 Quiz abgeschlossen! 🎉", 
      context: "Quiz completion title"
    },
    finalScore: {
      en: "Final Score",
      de: "Endergebnis",
      context: "Final score label"
    },
    complete_percentage: {
      en: "% Complete",
      de: "% Abgeschlossen",
      context: "Percentage complete label"
    },
    yourName: {
      en: "Your Name",
      de: "Dein Name",
      context: "Name input label"
    },
    city: {
      en: "City (Optional)",
      de: "Stadt (Optional)",
      context: "City input label"
    },
    enterName: {
      en: "Enter your name",
      de: "Gib deinen Namen ein",
      context: "Name input placeholder"
    },
    enterCity: {
      en: "Enter your city", 
      de: "Gib deine Stadt ein",
      context: "City input placeholder"
    },
    submitScore: {
      en: "Submit Score",
      de: "Punktzahl senden",
      context: "Submit score button"
    },
    submitting: {
      en: "Submitting...",
      de: "Wird gesendet...",
      context: "Submitting state text"
    },
    startQuiz: {
      en: "Start Quiz",
      de: "Quiz starten", 
      context: "Start quiz button"
    },
    tryToBeat: {
      en: "Try to Beat the Top Score!",
      de: "Versuche die Bestpunktzahl zu schlagen!",
      context: "Call to action on leaderboard"
    }
  },

  // Leaderboard content
  leaderboard: {
    title: {
      en: "Leaderboard",
      de: "Bestenliste",
      context: "Leaderboard page title"
    },
    backToRhythm: {
      en: "Back to Rhythm Grid",
      de: "Zurück zum Rhythmus Grid",
      context: "Back button text"
    },
    topPlayers: {
      en: "Top Players",
      de: "Top Spieler",
      context: "Leaderboard section title"
    },
    noScores: {
      en: "No scores yet! Be the first to complete the quiz.",
      de: "Noch keine Punktzahlen! Sei der erste, der das Quiz abschließt.",
      context: "Empty leaderboard message"
    },
    viewLeaderboard: {
      en: "View Leaderboard",
      de: "Bestenliste anzeigen",
      context: "View leaderboard button"
    }
  },

  // Error messages
  errors: {
    enterName: {
      en: "Please enter your name",
      de: "Bitte gib deinen Namen ein",
      context: "Name validation error"
    },
    submitFailed: {
      en: "Failed to submit your score. Please try again.",
      de: "Punktzahl konnte nicht gesendet werden. Bitte versuche es erneut.",
      context: "Score submission error"
    },
    loadFailed: {
      en: "Failed to load leaderboard data",
      de: "Bestenliste konnte nicht geladen werden",
      context: "Leaderboard load error"
    }
  },

  // Success messages
  messages: {
    scoreSubmitted: {
      en: "Your score has been added to the leaderboard!",
      de: "Deine Punktzahl wurde zur Bestenliste hinzugefügt!",
      context: "Score submission success"
    }
  },

  // 404 page
  notFound: {
    title: {
      en: "404",
      de: "404",
      context: "404 error code"
    },
    message: {
      en: "Oops! Page not found",
      de: "Oops! Seite nicht gefunden",
      context: "404 error message"
    },
    returnHome: {
      en: "Return to Home",
      de: "Zurück zur Startseite",
      context: "Return home button"
    }
  },

  // Concept names for the roadmap
  concepts: {
    dancingFastVsSlow: {
      en: "Dancing fast vs slow",
      de: "Schnell vs langsam tanzen",
      context: "First concept in roadmap"
    },
    dancingSmallVsBig: {
      en: "Dancing small vs big", 
      de: "Klein vs groß tanzen",
      context: "Second concept in roadmap"
    },
    dancingHighVsLow: {
      en: "Dancing high vs low",
      de: "Hoch vs tief tanzen", 
      context: "Third concept in roadmap"
    },
    dancingCircularVsLinear: {
      en: "Dancing circular vs linear",
      de: "Kreisförmig vs linear tanzen",
      context: "Fourth concept in roadmap"
    },
    withControlVsWithoutControl: {
      en: "With control vs without control",
      de: "Mit Kontrolle vs ohne Kontrolle",
      context: "Fifth concept in roadmap"
    },
    fullWeightTransferVsRebounds: {
      en: "Full weight transfer vs rebounds",
      de: "Vollständige Gewichtsverlagerung vs Rückprall",
      context: "Sixth concept in roadmap"
    },
    expandingVsShrinking: {
      en: "Expanding vs shrinking",
      de: "Ausdehnen vs schrumpfen",
      context: "Seventh concept in roadmap"
    },
    highBodyTensionVsLowBodyTension: {
      en: "High body tension vs low body tension",
      de: "Hohe Körperspannung vs niedrige Körperspannung",
      context: "Eighth concept in roadmap"
    },
    feetAlwaysOnFloorVsFeetOffFloor: {
      en: "Feet always on the floor vs feet off the floor",
      de: "Füße immer am Boden vs Füße vom Boden",
      context: "Ninth concept in roadmap"
    },
    pushingFloorVsNotPushingFloor: {
      en: "Pushing the floor vs not pushing the floor",
      de: "Den Boden drücken vs den Boden nicht drücken",
      context: "Tenth concept in roadmap"
    },
    leadingEveryStepVsNotLeadingEveryStep: {
      en: "Leading every step vs not leading every step",
      de: "Jeden Schritt führen vs nicht jeden Schritt führen",
      context: "Eleventh concept in roadmap"
    },
    sameStepsVsDifferentSteps: {
      en: "Same steps vs different steps",
      de: "Gleiche Schritte vs verschiedene Schritte",
      context: "Twelfth concept in roadmap"
    },
    fewStepsVsManySteps: {
      en: "Few steps vs many steps",
      de: "Wenige Schritte vs viele Schritte",
      context: "Thirteenth concept in roadmap"
    },
    dancingRhythmVsDancingMelody: {
      en: "Dancing rhythm vs dancing melody",
      de: "Rhythmus tanzen vs Melodie tanzen",
      context: "Fourteenth concept in roadmap"
    },
    facingPartnerVsTurningAway: {
      en: "Facing partner vs turning away",
      de: "Partner zugewandt vs sich abwenden",
      context: "Fifteenth concept in roadmap"
    },
    acceleratingVsDecelerating: {
      en: "Accelerating vs decelerating",
      de: "Beschleunigen vs verlangsamen",
      context: "Sixteenth concept in roadmap"
    },
    dancingRubato: {
      en: "Dancing rubato",
      de: "Rubato tanzen",
      context: "Seventeenth concept in roadmap"
    },
    marcatoIn2VsIn4: {
      en: "Marcato in 2 vs in 4",
      de: "Marcato in 2 vs in 4",
      context: "Eighteenth concept in roadmap"
    },
    normalSyncopa: {
      en: "The normal syncopa",
      de: "Die normale Synkope",
      context: "Nineteenth concept in roadmap"
    },
    doubleSyncopa: {
      en: "The double syncopa",
      de: "Die doppelte Synkope",
      context: "Twentieth concept in roadmap"
    },
    dragSyncopa: {
      en: "The drag syncopa",
      de: "Die Zieh-Synkope",
      context: "Twenty-first concept in roadmap"
    },
    dance4To1: {
      en: "Dance 4-1",
      de: "Tanze 4-1",
      context: "Twenty-second concept in roadmap"
    },
    danceTriplets: {
      en: "Dance triplets",
      de: "Tanze Triolen",
      context: "Twenty-third concept in roadmap"
    },
    danceLikeJellyfish: {
      en: "Dance like a jellyfish",
      de: "Tanze wie eine Qualle",
      context: "Twenty-fourth concept in roadmap"
    },
    danceLikeWater: {
      en: "Dance like water",
      de: "Tanze wie Wasser",
      context: "Twenty-fifth concept in roadmap"
    },
    danceLikeSculptures: {
      en: "Dance like sculptures",
      de: "Tanze wie Skulpturen",
      context: "Twenty-sixth concept in roadmap"
    },
    danceTheAccents: {
      en: "Dance the accents",
      de: "Tanze die Akzente",
      context: "Twenty-seventh concept in roadmap"
    }
  }
};

export type TranslationKey = string;
