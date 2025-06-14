
export type TranslationKey = 
  | 'common.backToHome'
  | 'common.backToRoadmap'
  | 'common.play'
  | 'common.pause'
  | 'common.clear'
  | 'common.speed'
  | 'common.error'
  | 'common.success'
  | 'common.skip'
  | 'roadmap.title'
  | 'leaderboard.viewLeaderboard'
  | 'rhythm.title'
  | 'rhythm.subtitle'
  | 'rhythm.instructions'
  | 'rhythm.presets'
  | 'quiz.takeQuiz'
  | 'quiz.complete'
  | 'quiz.finalScore'
  | 'quiz.complete_percentage'
  | 'quiz.yourName'
  | 'quiz.enterName'
  | 'quiz.city'
  | 'quiz.enterCity'
  | 'quiz.submitting'
  | 'quiz.submitScore'
  | 'errors.enterName'
  | 'errors.submitFailed'
  | 'messages.scoreSubmitted'
  | 'notFound.title'
  | 'notFound.message'
  | 'notFound.returnHome'
  | 'concepts.dancingFastVsSlow'
  | 'concepts.dancingSmallVsBig'
  | 'concepts.dancingHighVsLow'
  | 'concepts.dancingCircularVsLinear'
  | 'concepts.withControlVsWithoutControl'
  | 'concepts.fullWeightTransferVsRebounds'
  | 'concepts.expandingVsShrinking'
  | 'concepts.highBodyTensionVsLowBodyTension'
  | 'concepts.feetAlwaysOnFloorVsFeetOffFloor'
  | 'concepts.pushingFloorVsNotPushingFloor'
  | 'concepts.leadingEveryStepVsNotLeadingEveryStep'
  | 'concepts.sameStepsVsDifferentSteps'
  | 'concepts.fewStepsVsManySteps'
  | 'concepts.dancingRhythmVsDancingMelody'
  | 'concepts.facingPartnerVsTurningAway'
  | 'concepts.acceleratingVsDecelerating'
  | 'concepts.dancingRubato'
  | 'concepts.marcatoIn2VsIn4'
  | 'concepts.normalSyncopa'
  | 'concepts.doubleSyncopa'
  | 'concepts.dragSyncopa'
  | 'concepts.dance4To1'
  | 'concepts.danceTriplets'
  | 'concepts.danceLikeJellyfish'
  | 'concepts.danceLikeWater'
  | 'concepts.danceLikeSculptures'
  | 'concepts.danceTheAccents';

export const translations = {
  common: {
    backToHome: {
      en: "Back to Home",
      de: "Zurück zur Startseite"
    },
    backToRoadmap: {
      en: "Back to Roadmap",
      de: "Zurück zur Roadmap"
    },
    play: {
      en: "Play",
      de: "Abspielen"
    },
    pause: {
      en: "Pause",
      de: "Pause"
    },
    clear: {
      en: "Clear",
      de: "Löschen"
    },
    speed: {
      en: "Speed",
      de: "Geschwindigkeit"
    },
    error: {
      en: "Error",
      de: "Fehler"
    },
    success: {
      en: "Success",
      de: "Erfolg"
    },
    skip: {
      en: "Skip",
      de: "Überspringen"
    }
  },
  roadmap: {
    title: {
      en: "ROAD MAP",
      de: "ROAD MAP"
    }
  },
  leaderboard: {
    viewLeaderboard: {
      en: "View Leaderboard",
      de: "Bestenliste anzeigen"
    }
  },
  rhythm: {
    title: {
      en: "Rhythm Lab",
      de: "Rhythmus Labor"
    },
    subtitle: {
      en: "Practice your rhythm",
      de: "Übe deinen Rhythmus"
    },
    instructions: {
      en: "Click the squares to create your rhythm pattern",
      de: "Klicke auf die Quadrate, um dein Rhythmusmuster zu erstellen"
    },
    presets: {
      en: "Presets",
      de: "Voreinstellungen"
    }
  },
  quiz: {
    takeQuiz: {
      en: "Take Quiz",
      de: "Quiz machen"
    },
    complete: {
      en: "Quiz Complete!",
      de: "Quiz abgeschlossen!"
    },
    finalScore: {
      en: "Final Score",
      de: "Endergebnis"
    },
    complete_percentage: {
      en: "% Complete",
      de: "% Abgeschlossen"
    },
    yourName: {
      en: "Your Name",
      de: "Dein Name"
    },
    enterName: {
      en: "Enter your name",
      de: "Gib deinen Namen ein"
    },
    city: {
      en: "City",
      de: "Stadt"
    },
    enterCity: {
      en: "Enter your city",
      de: "Gib deine Stadt ein"
    },
    submitting: {
      en: "Submitting...",
      de: "Übertrage..."
    },
    submitScore: {
      en: "Submit Score",
      de: "Ergebnis übertragen"
    }
  },
  errors: {
    enterName: {
      en: "Please enter your name",
      de: "Bitte gib deinen Namen ein"
    },
    submitFailed: {
      en: "Failed to submit score",
      de: "Ergebnis konnte nicht übertragen werden"
    }
  },
  messages: {
    scoreSubmitted: {
      en: "Score submitted successfully!",
      de: "Ergebnis erfolgreich übertragen!"
    }
  },
  notFound: {
    title: {
      en: "Page Not Found",
      de: "Seite nicht gefunden"
    },
    message: {
      en: "The page you're looking for doesn't exist.",
      de: "Die gesuchte Seite existiert nicht."
    },
    returnHome: {
      en: "Return Home",
      de: "Zur Startseite"
    }
  },
  concepts: {
    dancingFastVsSlow: {
      en: "Dancing Fast vs Slow",
      de: "Schnell vs Langsam tanzen"
    },
    dancingSmallVsBig: {
      en: "Dancing Small vs Big",
      de: "Klein vs Groß tanzen"
    },
    dancingHighVsLow: {
      en: "Dancing High vs Low",
      de: "Hoch vs Tief tanzen"
    },
    dancingCircularVsLinear: {
      en: "Dancing Circular vs Linear",
      de: "Kreisförmig vs Linear tanzen"
    },
    withControlVsWithoutControl: {
      en: "With Control vs Without Control",
      de: "Mit Kontrolle vs Ohne Kontrolle"
    },
    fullWeightTransferVsRebounds: {
      en: "Full Weight Transfer vs Rebounds",
      de: "Vollständige Gewichtsverlagerung vs Rebounds"
    },
    expandingVsShrinking: {
      en: "Expanding vs Shrinking",
      de: "Ausweiten vs Zusammenziehen"
    },
    highBodyTensionVsLowBodyTension: {
      en: "High Body Tension vs Low Body Tension",
      de: "Hohe vs Niedrige Körperspannung"
    },
    feetAlwaysOnFloorVsFeetOffFloor: {
      en: "Feet Always on Floor vs Feet Off Floor",
      de: "Füße immer am Boden vs Füße vom Boden"
    },
    pushingFloorVsNotPushingFloor: {
      en: "Pushing Floor vs Not Pushing Floor",
      de: "Boden drücken vs Nicht drücken"
    },
    leadingEveryStepVsNotLeadingEveryStep: {
      en: "Leading Every Step vs Not Leading Every Step",
      de: "Jeden Schritt führen vs Nicht jeden Schritt führen"
    },
    sameStepsVsDifferentSteps: {
      en: "Same Steps vs Different Steps",
      de: "Gleiche vs Verschiedene Schritte"
    },
    fewStepsVsManySteps: {
      en: "Few Steps vs Many Steps",
      de: "Wenige vs Viele Schritte"
    },
    dancingRhythmVsDancingMelody: {
      en: "Dancing Rhythm vs Dancing Melody",
      de: "Rhythmus vs Melodie tanzen"
    },
    facingPartnerVsTurningAway: {
      en: "Facing Partner vs Turning Away",
      de: "Partner zugewandt vs Abwenden"
    },
    acceleratingVsDecelerating: {
      en: "Accelerating vs Decelerating",
      de: "Beschleunigen vs Verlangsamen"
    },
    dancingRubato: {
      en: "Dancing Rubato",
      de: "Rubato tanzen"
    },
    marcatoIn2VsIn4: {
      en: "Marcato in 2 vs in 4",
      de: "Marcato in 2 vs in 4"
    },
    normalSyncopa: {
      en: "Normal Syncopa",
      de: "Normale Synkope"
    },
    doubleSyncopa: {
      en: "Double Syncopa",
      de: "Doppelte Synkope"
    },
    dragSyncopa: {
      en: "Drag Syncopa",
      de: "Drag Synkope"
    },
    dance4To1: {
      en: "Dance 4 to 1",
      de: "Tanze 4 zu 1"
    },
    danceTriplets: {
      en: "Dance Triplets",
      de: "Triolen tanzen"
    },
    danceLikeJellyfish: {
      en: "Dance Like Jellyfish",
      de: "Wie Quallen tanzen"
    },
    danceLikeWater: {
      en: "Dance Like Water",
      de: "Wie Wasser tanzen"
    },
    danceLikeSculptures: {
      en: "Dance Like Sculptures",
      de: "Wie Skulpturen tanzen"
    },
    danceTheAccents: {
      en: "Dance the Accents",
      de: "Die Akzente tanzen"
    }
  }
};
