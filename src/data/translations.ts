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

  // Music Mastery Journey
  roadmap: {
    title: {
      en: "Music Mastery Journey",
      de: "Musik-Meisterschaftsreise"
    },
    subtitle: {
      en: "Unlock your musical potential through our structured learning path. Master rhythm, harmony, melody, and performance skills step by step.",
      de: "Entfalten Sie Ihr musikalisches Potenzial durch unseren strukturierten Lernpfad. Meistern Sie Rhythmus, Harmonie, Melodie und Aufführungsfähigkeiten Schritt für Schritt."
    },
    rhythmLab: {
      title: {
        en: "Rhythm Lab",
        de: "Rhythmus-Labor"
      },
      description: {
        en: "Master the fundamentals of rhythm with interactive beat patterns and timing exercises.",
        de: "Meistern Sie die Grundlagen des Rhythmus mit interaktiven Schlagmustern und Timing-Übungen."
      }
    },
    harmonyStudio: {
      title: {
        en: "Harmony Studio",
        de: "Harmonie-Studio"
      },
      description: {
        en: "Explore chord progressions, scales, and harmonic relationships in music.",
        de: "Erkunden Sie Akkordfolgen, Tonleitern und harmonische Beziehungen in der Musik."
      }
    },
    melodyComposer: {
      title: {
        en: "Melody Composer",
        de: "Melodie-Komponist"
      },
      description: {
        en: "Create beautiful melodies and understand melodic structure and development.",
        de: "Erstellen Sie schöne Melodien und verstehen Sie melodische Struktur und Entwicklung."
      }
    },
    performanceHall: {
      title: {
        en: "Performance Hall",
        de: "Aufführungssaal"
      },
      description: {
        en: "Practice performance skills, stage presence, and musical expression.",
        de: "Üben Sie Aufführungsfähigkeiten, Bühnenpräsenz und musikalischen Ausdruck."
      }
    },
    collaborationSpace: {
      title: {
        en: "Collaboration Space",
        de: "Kollaborationsraum"
      },
      description: {
        en: "Work with other musicians, share compositions, and learn together.",
        de: "Arbeiten Sie mit anderen Musikern, teilen Sie Kompositionen und lernen Sie gemeinsam."
      }
    },
    masterClass: {
      title: {
        en: "Master Class",
        de: "Meisterklasse"
      },
      description: {
        en: "Advanced techniques and professional-level music theory and practice.",
        de: "Fortgeschrittene Techniken und professionelle Musiktheorie und -praxis."
      }
    },
    status: {
      available: {
        en: "Available",
        de: "Verfügbar"
      },
      locked: {
        en: "Locked",
        de: "Gesperrt"
      }
    },
    progress: {
      title: {
        en: "Your Learning Progress",
        de: "Ihr Lernfortschritt"
      },
      available: {
        en: "Available",
        de: "Verfügbar"
      },
      locked: {
        en: "Coming Soon",
        de: "Demnächst"
      },
      description: {
        en: "Complete each module to unlock the next level of your musical journey.",
        de: "Schließen Sie jedes Modul ab, um die nächste Stufe Ihrer musikalischen Reise freizuschalten."
      }
    }
  }
} as const;

export type TranslationKey = string;
