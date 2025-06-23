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
  | 'common.loading'
  | 'common.startThisTopic'
  | 'common.loginToStart'
  | 'common.allAssignments'
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
  | 'concepts.danceTheAccents'
  | 'exercises.dancingFastSlow.title'
  | 'exercises.dancingFastSlow.introText1'
  | 'exercises.dancingFastSlow.introText2'
  | 'exercises.dancingFastSlow.letStartSimple'
  | 'exercises.dancingFastSlow.simpleText1'
  | 'exercises.dancingFastSlow.typicalStrongBeat'
  | 'exercises.dancingFastSlow.couldNotFindBeat'
  | 'exercises.dancingFastSlow.threeSpeeds'
  | 'exercises.dancingFastSlow.threeSpeedsText'
  | 'exercises.dancingFastSlow.halfSpeed'
  | 'exercises.dancingFastSlow.normalSpeed'
  | 'exercises.dancingFastSlow.doubleSpeed'
  | 'exercises.dancingFastSlow.fullSongText'
  | 'exercises.dancingFastSlow.practicedWalking'
  | 'exercises.dancingFastSlow.musicSpeedChanges'
  | 'exercises.dancingFastSlow.musicSpeedChangesText'
  | 'exercises.dancingFastSlow.rhythmChanges'
  | 'exercises.dancingFastSlow.rhythmChangesText'
  | 'exercises.dancingFastSlow.from2To4Beats'
  | 'exercises.dancingFastSlow.from4To2Beats'
  | 'exercises.dancingFastSlow.melodyChanges'
  | 'exercises.dancingFastSlow.melodyChangesText'
  | 'exercises.dancingFastSlow.legatoToStaccato'
  | 'exercises.dancingFastSlow.staccatoToLegato'
  | 'exercises.dancingFastSlow.weeklyAssignment'
  | 'exercises.dancingFastSlow.assignment1'
  | 'exercises.dancingFastSlow.assignment2'
  | 'exercises.dancingFastSlow.assignment3'
  | 'exercises.dancingFastSlow.assignment4'
  | 'exercises.dancingFastSlow.practiceSongs'
  | 'exercises.dancingFastSlow.practiceSongsText'
  | 'exercises.dancingFastSlow.songs1And2'
  | 'exercises.dancingFastSlow.songs1And2Text'
  | 'exercises.dancingFastSlow.songs3And4'
  | 'exercises.dancingFastSlow.songs3And4Text'
  | 'exercises.dancingFastSlow.songs5And6'
  | 'exercises.dancingFastSlow.songs5And6Text'
  | 'exercises.dancingFastSlow.progressNote'
  | 'exercises.dancingFastSlow.commentsTitle'
  | 'exercises.dancingFastSlow.commentsPlaceholder'
  | 'exercises.dancingFastSlow.rateTitle'
  | 'exercises.dancingFastSlow.ratePlaceholder'
  | 'exercises.dancingFastSlow.allAssignments'
  | 'exercises.dancingFastSlow.assignmentsDescription'
  | 'exercises.dancingFastSlow.weeklyAssignments'
  | 'exercises.dancingFastSlow.seeAllAssignments'
  | 'exercises.dancingFastSlow.daily.title'
  | 'exercises.dancingFastSlow.daily.subtitle'
  | 'exercises.dancingFastSlow.daily.unlockDay'
  | 'exercises.dancingFastSlow.daily.unlockTomorrow'
  | 'exercises.dancingFastSlow.daily.locked'
  | 'exercises.dancingFastSlow.daily.availableTomorrow'
  | 'exercises.dancingFastSlow.daily.day1.content'
  | 'exercises.dancingFastSlow.daily.day1.audioTitle'
  | 'exercises.dancingFastSlow.daily.day1.audioDescription'
  | 'exercises.dancingFastSlow.daily.day1.fullSong'
  | 'exercises.dancingFastSlow.daily.day1.task'
  | 'exercises.dancingFastSlow.daily.day2.content'
  | 'exercises.dancingFastSlow.daily.day2.description'
  | 'exercises.dancingFastSlow.daily.day2.bandonionSolos'
  | 'exercises.dancingFastSlow.daily.day2.violinSolos'
  | 'exercises.dancingFastSlow.daily.day2.singerSolo'
  | 'exercises.dancingFastSlow.daily.day2.task'
  | 'exercises.dancingFastSlow.daily.day3.content'
  | 'exercises.dancingFastSlow.daily.day3.description'
  | 'exercises.dancingFastSlow.daily.day3.task'
  | 'exercises.dancingFastSlow.daily.day4.content'
  | 'exercises.dancingFastSlow.daily.day4.description'
  | 'exercises.dancingFastSlow.daily.day4.task'
  | 'exercises.dancingFastSlow.daily.day5.content'
  | 'exercises.dancingFastSlow.daily.day5.task'
  | 'exercises.dancingFastSlow.daily.day6.content'
  | 'exercises.dancingFastSlow.daily.day6.task'
  | 'exercises.dancingFastSlow.daily.day7.content'
  | 'exercises.dancingFastSlow.daily.day7.task'
  | 'exercises.dancingFastSlow.daily.placeholder'
  | 'exercises.dancingFastSlow.daily.placeholderTask'
  | 'exercises.dancingFastSlow.tips.extremeSlowness'
  | 'exercises.dancingFastSlow.tips.extremeSlownessTip1'
  | 'exercises.dancingFastSlow.tips.extremeSlownessTip2'
  | 'exercises.dancingFastSlow.tips.extremeSlownessTip3'
  | 'exercises.dancingFastSlow.tips.extremeSlownessTip4'
  | 'exercises.dancingFastSlow.tips.extremeSpeed'
  | 'exercises.dancingFastSlow.tips.extremeSpeedTip1'
  | 'exercises.dancingFastSlow.tips.extremeSpeedTip2'
  | 'exercises.dancingFastSlow.tips.backOchoChallenge'
  | 'exercises.dancingFastSlow.tips.backOchoChallengeTitle'
  | 'exercises.dancingFastSlow.tips.backOchoChallengeTip1'
  | 'exercises.dancingFastSlow.tips.backOchoChallengeTip2'
  | 'exercises.dancingFastSlow.tips.backOchoChallengeTip3'
  | 'exercises.dancingFastSlow.tips.backOchoChallengeTip4'
  | 'exercises.dancingFastSlow.tips.ochoCortadoChallenge'
  | 'exercises.dancingFastSlow.tips.ochoCortadoChallengeTitle'
  | 'exercises.dancingFastSlow.tips.ochoCortadoChallengeTip1'
  | 'exercises.dancingFastSlow.tips.ochoCortadoChallengeTip2'
  | 'exercises.dancingFastSlow.tips.ochoCortadoChallengeTip3'
  | 'exercises.dancingFastSlow.tips.ochoCortadoChallengeTip4'
  | 'exercises.dancingFastSlow.tips.ochoCortadoChallengeTip5'
  | 'daily.title'
  | 'daily.subtitle'
  | 'daily.unlockDay'
  | 'daily.unlockTomorrow'
  | 'daily.locked'
  | 'daily.availableTomorrow'
  | 'daily.placeholder'
  | 'daily.placeholderTask'
  | 'daily.dayNotFound'
  | 'daily.topicNotFound'
  | 'progress.trackingTitle'
  | 'progress.levelInfo'
  | 'progress.notStarted'
  | 'progress.notStartedDesc'
  | 'progress.firstAttempt'
  | 'progress.firstAttemptDesc'
  | 'progress.practiceMode'
  | 'progress.practiceModeDesc'
  | 'progress.gettingThere'
  | 'progress.gettingThereDesc'
  | 'progress.mastered'
  | 'progress.masteredDesc';

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
    },
    loading: {
      en: "Loading...",
      de: "Lädt..."
    },
    startThisTopic: {
      en: "Start this topic",
      de: "Dieses Thema starten"
    },
    loginToStart: {
      en: "Login to start",
      de: "Einloggen zum Starten"
    },
    allAssignments: {
      en: "All Assignments",
      de: "Alle Aufgaben"
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
      de: "Übe Deinen Rhythmus"
    },
    instructions: {
      en: "Click the squares to create your rhythm pattern",
      de: "Klick auf die Quadrate, um Dein Rhythmusmuster zu erstellen"
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
      de: "Quiz geschafft!"
    },
    finalScore: {
      en: "Final Score",
      de: "Endergebnis"
    },
    complete_percentage: {
      en: "% Complete",
      de: "% Geschafft"
    },
    yourName: {
      en: "Your Name",
      de: "Dein Name"
    },
    enterName: {
      en: "Enter your name",
      de: "Gib Deinen Namen ein"
    },
    city: {
      en: "City",
      de: "Stadt"
    },
    enterCity: {
      en: "Enter your city",
      de: "Gib Deine Stadt ein"
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
      de: "Bitte gib Deinen Namen ein"
    },
    submitFailed: {
      en: "Failed to submit score",
      de: "Übertragung fehlgeschlagen"
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
      de: "Die gesuchte Seite gibt's leider nicht."
    },
    returnHome: {
      en: "Return Home",
      de: "Zurück nach Hause"
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
  },
  exercises: {
    dancingFastSlow: {
      title: {
        en: "Dancing Fast and Slow",
        de: "Schnell und Langsam Tanzen"
      },
      introText1: {
        en: "Most dancers always dance with the same tempo, but forcing yourself to dance at different speeds is one of the easiest ways to add diversity to your tango life.",
        de: "Die meisten Tänzer*innen tanzen immer im gleichen Tempo. Aber sich selbst zu verschiedenen Geschwindigkeiten zu 'zwingen' ist einer der einfachsten Wege, Abwechslung ins Tangoleben zu bringen."
      },
      introText2: {
        en: "Good beginners dance on the down beat [also known as the strong beat] [numbers 1 and 3 if we count to 4].",
        de: "Brave Anfänger*innen tanzen auf dem Grundschlag [auch als starker Schlag bekannt] [Zahlen 1 und 3, wenn wir bis 4 zählen]."
      },
      letStartSimple: {
        en: "Let's start simple",
        de: "Fangen wir mal ganz einfach an"
      },
      simpleText1: {
        en: "That means without a partner. Do the normal walk and step on 1 and 3 in this song.",
        de: "Das heißt ohne Partner*in. Mach Deinen normalen Gang und tritt auf 1 und 3 in diesem Lied – erstmal solo üben schadet nie!"
      },
      typicalStrongBeat: {
        en: "Typical strong beat 1 and 3",
        de: "Typischer starker Schlag 1 und 3"
      },
      couldNotFindBeat: {
        en: "If you could not find the downbeat, use this simple version instead.",
        de: "Falls Du den Grundschlag nicht finden konntest, nimm einfach diese Version – kein Drama!"
      },
      threeSpeeds: {
        en: "Three Simple Speeds",
        de: "Drei Einfache Geschwindigkeiten"
      },
      threeSpeedsText: {
        en: "Ok, now three simple things you can do:",
        de: "Ok, jetzt drei einfache Dinge, die Du machen kannst:"
      },
      halfSpeed: {
        en: "Half Speed",
        de: "Halbtempo"
      },
      normalSpeed: {
        en: "Normal Speed",
        de: "Normales Tempo"
      },
      doubleSpeed: {
        en: "Double Speed",
        de: "Doppeltes Tempo"
      },
      fullSongText: {
        en: "Do one full song at all three speeds, just walking on your own. Here is a song to do it:",
        de: "Mach ein ganzes Lied in allen drei Geschwindigkeiten – einfach alleine gehen. Hier ist ein Lied dafür:"
      },
      practicedWalking: {
        en: "I practiced walking at all three speeds",
        de: "Ich habe das Gehen in allen drei Geschwindigkeiten geübt"
      },
      musicSpeedChanges: {
        en: "Using Music for Speed Changes",
        de: "Die Musik für Tempowechsel nutzen"
      },
      musicSpeedChangesText: {
        en: "Ok, now you can move at three speeds, time to also use the music. Two simple ways to use music for a change of speed:",
        de: "Ok, jetzt kannst Du Dich in drei Geschwindigkeiten bewegen – Zeit, auch die Musik ins Spiel zu bringen. Zwei einfache Wege für musikalische Tempowechsel:"
      },
      rhythmChanges: {
        en: "When the rhythm changes",
        de: "Wenn sich der Rhythmus ändert"
      },
      rhythmChangesText: {
        en: "Sometimes the music changes from playing all beats loud and the same to playing 2 strong beat and 2 weak beats. This is a clear opportunity to adjust your speed.",
        de: "Manchmal wechselt die Musik von allen Schlägen laut und gleich zu 2 starken und 2 schwachen Schlägen. Das ist eine perfekte Gelegenheit, Dein Tempo anzupassen."
      },
      from2To4Beats: {
        en: "From 2 beats to 4 beats",
        de: "Von 2 zu 4 Schlägen"
      },
      from4To2Beats: {
        en: "From 4 beats to 2 beats",
        de: "Von 4 zu 2 Schlägen"
      },
      melodyChanges: {
        en: "When the melody changes",
        de: "Wenn sich die Melodie ändert"
      },
      melodyChangesText: {
        en: "Old tango songs mostly have a fixed beat system all the time, so a good option is to change it according to the melody. Legato (melody that sounds like singing) for slower speed and Staccato (rhythmic melody) for higher speed.",
        de: "Alte Tango-Lieder haben meist ein festes Schlagsystem, daher ist es clever, nach der Melodie zu wechseln. Legato (Melodie wie Gesang) für langsameres Tempo und Staccato (rhythmische Melodie) für höheres Tempo."
      },
      legatoToStaccato: {
        en: "From Legato to Staccato",
        de: "Von Legato zu Staccato"
      },
      staccatoToLegato: {
        en: "From Staccato to Legato",
        de: "Von Staccato zu Legato"
      },
      allAssignments: {
        en: "All Assignments - Dancing Fast & Slow",
        de: "Alle Aufgaben – Schnell & Langsam Tanzen"
      },
      assignmentsDescription: {
        en: "Complete overview of all weekly and daily assignments for the Dancing Fast & Slow exercise. Track your progress and unlock new challenges as you advance.",
        de: "Vollständige Übersicht aller wöchentlichen und täglichen Aufgaben für die Übung Schnell & Langsam Tanzen. Verfolge Deinen Fortschritt und schalte neue Herausforderungen frei."
      },
      weeklyAssignments: {
        en: "Weekly Assignments",
        de: "Wöchentliche Aufgaben"
      },
      weeklyAssignment: {
        en: "Assignment for the Week",
        de: "Wochenaufgabe (keine Sorge, ist machbar!)"
      },
      assignment1: {
        en: "Walk alone at speeds 1, 2, and 4, without music, just counting, or use the rhythm lab in the app.",
        de: "Gehe alleine in den Geschwindigkeiten 1, 2 und 4 – ohne Musik, nur zählend, oder nutze das Rhythmus-Labor in der App."
      },
      assignment2: {
        en: "Walk alone with music.",
        de: "Gehe alleine mit Musik (endlich wieder mit Sound!)."
      },
      assignment3: {
        en: "When dancing in milonga or practice, listen to the change in rhythm from 2 to 4 and back, and try to use a different speed.",
        de: "Beim Tanzen in der Milonga oder beim Üben höre auf den Rhythmuswechsel von 2 zu 4 und zurück – und probiere verschiedene Geschwindigkeiten aus."
      },
      assignment4: {
        en: "When dancing in milonga or practice, listen to the change in melody from legato to staccato and back, and try to use a different speed.",
        de: "Beim Tanzen in der Milonga oder beim Üben höre auf den Melodiewechsel von Legato zu Staccato und zurück – und wechsle Dein Tempo entsprechend."
      },
      practiceSongs: {
        en: "Practice Songs",
        de: "Übungslieder"
      },
      practiceSongsText: {
        en: "Here are 6 songs to practice speed with music:",
        de: "Hier sind 6 Lieder zum Üben der Geschwindigkeit mit Musik:"
      },
      songs1And2: {
        en: "Songs 1 & 2",
        de: "Lieder 1 & 2"
      },
      songs1And2Text: {
        en: "From Canaro Orquestra - Music playing 4 similar beats all the time. We can change speed with melody, or whenever you want to change speed, but do it with intention and clearly.",
        de: "Von Canaro Orquestra – Musik mit 4 ähnlichen Schlägen die ganze Zeit. Du kannst das Tempo mit der Melodie ändern oder wann immer Du willst – aber mach es bewusst und deutlich."
      },
      songs3And4: {
        en: "Songs 3 & 4",
        de: "Lieder 3 & 4"
      },
      songs3And4Text: {
        en: "From early Di Sarli Orquestra - Music playing 2 strong and 2 weak beats, still very rhythmic compared to the future work of the same artist.",
        de: "Von frühem Di Sarli Orquestra – Musik mit 2 starken und 2 schwachen Schlägen, noch sehr rhythmisch im Vergleich zu späteren Werken des Künstlers."
      },
      songs5And6: {
        en: "Songs 5 & 6",
        de: "Lieder 5 & 6"
      },
      songs5And6Text: {
        en: "From Troilo Orquestra - Music changes between playing 4 similar beats, to strong beats. Many chances to change the speed of the dance.",
        de: "Von Troilo Orquestra – Musik wechselt zwischen 4 ähnlichen Schlägen und starken Schlägen. Viele Gelegenheiten für Tempowechsel – ein Spielplatz für Geschwindigkeitsfreaks!"
      },
      progressNote: {
        en: "At the end of the week, you will be asked how many times you did each assignment. The goal of 5min Tango is three things: repeat, repeat, and repeat. More ideas and assignments will unfold on the same topic during the week.",
        de: "Am Ende der Woche wirst Du gefragt, wie oft Du jede Aufgabe gemacht hast. Das Ziel von 5min Tango sind drei Dinge: wiederholen, wiederholen und... na? Richtig! Weitere Ideen zum Thema folgen während der Woche."
      },
      commentsTitle: {
        en: "Comments & Discussion",
        de: "Kommentare & Diskussion"
      },
      commentsPlaceholder: {
        en: "Comment section coming soon...",
        de: "Kommentarbereich kommt bald..."
      },
      rateTitle: {
        en: "Rate this Exercise",
        de: "Bewerte diese Übung"
      },
      ratePlaceholder: {
        en: "Review system coming soon...",
        de: "Bewertungssystem kommt bald..."
      },
      seeAllAssignments: {
        en: "See All Assignments",
        de: "Alle Aufgaben anzeigen"
      },
      daily: {
        title: {
          en: "Daily Assignments",
          de: "Tägliche Aufgaben"
        },
        subtitle: {
          en: "Progress through 7 days of focused practice",
          de: "7 Tage konzentriertes Üben – Schritt für Schritt zum Ziel"
        },
        unlockDay: {
          en: "Unlock Day",
          de: "Tag freischalten"
        },
        unlockTomorrow: {
          en: "You can unlock this tomorrow",
          de: "Das kannst Du morgen freischalten"
        },
        locked: {
          en: "Locked",
          de: "Noch gesperrt"
        },
        availableTomorrow: {
          en: "Available Tomorrow",
          de: "Morgen verfügbar"
        },
        day1: {
          content: {
            en: "Make a fixed plan to change your speed every 8 beats. For example, 4,1,2,4 or 2,1,4,1 or whatever you wish, just plan in your head and then dance it. If you do it on your own choose older tango music, if you do it in a milonga do it when music is more monotonous, this way all four speed fit well to all part of the music. Make your change is very clear, and at the end of the phrase.",
            de: "Mach einen festen Plan, Dein Tempo alle 8 Schläge zu ändern. Zum Beispiel 4,1,2,4 oder 2,1,4,1 – oder was auch immer Dir gefällt, plane es einfach im Kopf und tanze es dann. Wenn Du alleine übst, nimm ältere Tango-Musik. In der Milonga machst Du es bei monotonerer Musik – so passen alle Tempi gut zu allen Musikteilen. Mach Deine Wechsel schön deutlich und am Ende der Phrase."
          },
          audioTitle: {
            en: "Alma del Bandoneon - Francisco Canaro (30 sec)",
            de: "Alma del Bandoneon – Francisco Canaro (30 Sek)"
          },
          audioDescription: {
            en: "Here is an example with 4 sections:",
            de: "Hier ist ein Beispiel mit 4 Abschnitten:"
          },
          fullSong: {
            en: "Full song:",
            de: "Das ganze Lied:"
          },
          task: {
            en: "I practiced fixed speed changes every 8 beats",
            de: "Ich habe feste Tempowechsel alle 8 Schläge geübt"
          }
        },
        day2: {
          content: {
            en: "Identify solo pieces and slow down on them. Soft solos from singer, violin and Bandonion are a good chance to reduce your speed. A solo in tango is when only one instrument is playing the main melody, there could be still a soft contra bass or piano playing the beat.",
            de: "Erkenne Solo-Stücke und werde bei ihnen langsamer. Sanfte Solos von Sänger*in, Violine und Bandoneon sind perfekte Gelegenheiten, das Tempo zu drosseln. Ein Solo im Tango ist, wenn nur ein Instrument die Hauptmelodie spielt – Kontrabass oder Klavier dürfen trotzdem leise mitspielen."
          },
          description: {
            en: "There are two tango orchestras who very often have a Solo section in their songs. Let's listen to two bandonion and two violin solos, and finally a singer solo to familiarize the ears, then we can also find them when dancing in the milongas.",
            de: "Es gibt zwei Tango-Orchester, die sehr oft Solo-Abschnitte in ihren Liedern haben. Hören wir uns zwei Bandoneon- und zwei Violinsolos an, plus ein Sängersolo – damit sich die Ohren daran gewöhnen und wir sie in der Milonga wiedererkennen."
          },
          bandonionSolos: {
            en: "Bandonion Solos",
            de: "Bandoneon-Solos"
          },
          violinSolos: {
            en: "Violin Solos",
            de: "Violinsolos"
          },
          singerSolo: {
            en: "Singer Solo",
            de: "Sängersolo"
          },
          task: {
            en: "I practiced identifying solos and slowing down during them",
            de: "Ich habe das Erkennen von Solos und Verlangsamen dabei geübt"
          }
        },
        day3: {
          content: {
            en: "Slow down when the singer is almost talking instead of singing. It does not happen often, so it's even more delicious to catch it when it does.",
            de: "Werde langsamer, wenn der/die Sänger*in fast spricht statt singt. Passiert nicht oft, also umso köstlicher, wenn Du es erwischst!"
          },
          description: {
            en: "In this example, listen carefully to how the singer transitions from singing to almost talking. This is your cue to slow down and savor these intimate moments in the music.",
            de: "In diesem Beispiel höre genau zu, wie der Sänger vom Singen zum fast Sprechen übergeht. Das ist Dein Stichwort, langsamer zu werden und diese intimen Momente in der Musik zu genießen."
          },
          task: {
            en: "I practiced identifying and slowing down during talking singer moments",
            de: "Ich habe das Erkennen von 'sprechenden' Sängermomenten und Verlangsamen geübt"
          }
        },
        day4: {
          content: {
            en: "Go extremely slow. Can you take 8 beats for 1 step? What is your slowest humanly possible? Explore your limits, and explore the limit of your partners.",
            de: "Gehe extrem langsam. Schaffst Du 8 Schläge für 1 Schritt? Was ist Dein langsamst mögliches Tempo? Erkunde Deine Grenzen und die Deiner Tanzpartner*innen – wie langsam ist eigentlich zu langsam?"
          },
          description: {
            en: "This exercise pushes you to discover the absolute minimum speed of movement while maintaining connection and intention. It's about finding grace in extreme slowness.",
            de: "Diese Übung bringt Dich dazu, die absolute Mindestgeschwindigkeit zu entdecken, während Du Verbindung und Absicht beibehältst. Es geht darum, Anmut in extremer Langsamkeit zu finden."
          },
          task: {
            en: "I practiced extremely slow movement, taking 8+ beats per step",
            de: "Ich habe extrem langsame Bewegung geübt – 8+ Schläge pro Schritt"
          }
        },
        day5: {
          content: {
            en: "Go extremely fast; fast is hard to do together. Find some separation, lead something fast for the follower, or do something fast yourself, while the follower almost stays. Explore your limits.",
            de: "Gehe extrem schnell – schnell zusammen ist schwer! Finde etwas Trennung, führe etwas Schnelles für den/die Follower*in, oder mach selbst etwas Schnelles, während der/die Partner*in fast stehen bleibt. Erkunde Deine Grenzen."
          },
          task: {
            en: "I practiced extremely fast movements",
            de: "Ich habe extrem schnelle Bewegungen geübt"
          }
        },
        day6: {
          content: {
            en: "Do back ochos in all 3 speeds, without changing the speed in the middle.",
            de: "Mache Rück-ochos in allen 3 Geschwindigkeiten, ohne das Tempo mittendrin zu ändern."
          },
          task: {
            en: "I practiced back ochos at all three speeds without changing speed mid-movement",
            de: "Ich habe Rück-ochos in allen drei Tempi geübt – ohne Tempowechsel mittendrin"
          }
        },
        day7: {
          content: {
            en: "Do ocho cortado in all 3 speeds, without changing the speed in the middle. This is much harder than it sounds because we are used to always doing it with an acceleration in the middle.",
            de: "Mache ocho cortado in allen 3 Geschwindigkeiten, ohne das Tempo mittendrin zu ändern. Das ist viel schwerer als es klingt, weil wir es gewohnt sind, immer mit einer Beschleunigung in der Mitte zu machen – alte Gewohnheiten sind hartnäckig!"
          },
          task: {
            en: "I practiced ocho cortado at all three speeds without changing speed mid-movement",
            de: "Ich habe ocho cortado in allen drei Tempi geübt – ohne Tempowechsel mittendrin"
          }
        },
        placeholder: {
          en: "assignment content will be added here...",
          de: "Aufgabeninhalt kommt hier hin..."
        },
        placeholderTask: {
          en: "practice completed",
          de: "Übung abgeschlossen"
        }
      },
      tips: {
        extremeSlowness: {
          en: "Extreme Slowness Tips:",
          de: "Tipps für extreme Langsamkeit:"
        },
        extremeSlownessTip1: {
          en: "Focus on maintaining balance throughout the entire movement",
          de: "Konzentriere Dich aufs Gleichgewicht während der ganzen Bewegung"
        },
        extremeSlownessTip2: {
          en: "Keep your connection with your partner constant",
          de: "Halte die Verbindung zu Deinem/Deiner Partner*in konstant"
        },
        extremeSlownessTip3: {
          en: "Breathe deeply to help maintain control",
          de: "Atme tief, um die Kontrolle zu behalten"
        },
        extremeSlownessTip4: {
          en: "Challenge yourself: can you go even slower?",
          de: "Fordere Dich heraus: Geht's noch langsamer?"
        },
        extremeSpeed: {
          en: "Extreme Speed Tips:",
          de: "Tipps für extreme Geschwindigkeit:"
        },
        extremeSpeedTip1: {
          en: "Start with small, quick movements before attempting larger ones",
          de: "Beginne mit kleinen, schnellen Bewegungen, bevor Du größere versuchst"
        },
        extremeSpeedTip2: {
          en: "Practice separation - one partner stays while the other moves fast",
          de: "Übe Trennung – eine*r bleibt, während der/die andere schnell bewegt"
        },
        backOchoChallenge: {
          en: "Back Ocho Speed Challenge Tips:",
          de: "Tipps für die Rück-Ocho-Geschwindigkeitsherausforderung:"
        },
        backOchoChallengeTitle: {
          en: "Back Ocho Speed Challenge Tips:",
          de: "Tipps für die Rück-Ocho-Tempo-Challenge:"
        },
        backOchoChallengeTip1: {
          en: "Start with speed 1 (half speed) - focus on smooth, controlled pivots",
          de: "Beginne mit Tempo 1 (halbes Tempo) – konzentriere Dich auf sanfte, kontrollierte Drehungen"
        },
        backOchoChallengeTip2: {
          en: "Progress to speed 2 (normal) - maintain the natural flow without rushing",
          de: "Gehe zu Tempo 2 (normal) über – behalte den natürlichen Fluss ohne Hetze"
        },
        backOchoChallengeTip3: {
          en: "Challenge yourself at speed 4 (double)",
          de: "Fordere Dich bei Tempo 4 (doppelt) heraus"
        },
        backOchoChallengeTip4: {
          en: "As speed increases, make smaller pivot and smaller step",
          de: "Je schneller, desto kleinere Drehungen und Schritte"
        },
        ochoCortadoChallenge: {
          en: "Ocho Cortado Challenge Tips:",
          de: "Tipps für die Ocho-Cortado-Herausforderung:"
        },
        ochoCortadoChallengeTitle: {
          en: "Ocho Cortado Challenge Tips:",
          de: "Tipps für die Ocho-Cortado-Challenge:"
        },
        ochoCortadoChallengeTip1: {
          en: "Practice at speed 1 (half speed) first - maintain consistent slowness throughout",
          de: "Übe zuerst bei Tempo 1 (halbes Tempo) – halte durchgehend konstante Langsamkeit"
        },
        ochoCortadoChallengeTip2: {
          en: "Then speed 2 (normal) - resist the urge to accelerate in the middle",
          de: "Dann Tempo 2 (normal) – widerstehe dem Drang, mittendrin zu beschleunigen"
        },
        ochoCortadoChallengeTip3: {
          en: "Finally speed 4 (double) - keep the energy constant from start to finish",
          de: "Schließlich Tempo 4 (doppelt) – halte die Energie von Anfang bis Ende konstant"
        },
        ochoCortadoChallengeTip4: {
          en: "Focus on maintaining the same tempo for the entire movement sequence",
          de: "Konzentriere Dich darauf, das gleiche Tempo für die ganze Bewegungssequenz zu halten"
        },
        ochoCortadoChallengeTip5: {
          en: "Break the habit of natural acceleration - conscious control is key",
          de: "Durchbrich die Gewohnheit der natürlichen Beschleunigung – bewusste Kontrolle ist der Schlüssel"
        }
      }
    }
  },
  daily: {
    title: {
      en: "Daily Assignments",
      de: "Tägliche Aufgaben"
    },
    subtitle: {
      en: "Progress through 7 days of focused practice",
      de: "7 Tage konzentriertes Üben – Schritt für Schritt zum Ziel"
    },
    unlockDay: {
      en: "Unlock Day",
      de: "Tag freischalten"
    },
    unlockTomorrow: {
      en: "You can unlock this tomorrow",
      de: "Das kannst Du morgen freischalten"
    },
    locked: {
      en: "Locked",
      de: "Noch gesperrt"
    },
    availableTomorrow: {
      en: "Available Tomorrow",
      de: "Morgen verfügbar"
    },
    placeholder: {
      en: "assignment content will be added here...",
      de: "Aufgabeninhalt kommt hier hin..."
    },
    placeholderTask: {
      en: "practice completed",
      de: "Übung abgeschlossen"
    },
    dayNotFound: {
      en: "Day not found",
      de: "Tag nicht gefunden"
    },
    topicNotFound: {
      en: "Topic not found",
      de: "Thema nicht gefunden"
    }
  },
  progress: {
    trackingTitle: {
      en: "Tracking Progress",
      de: "Fortschritt verfolgen"
    },
    levelInfo: {
      en: "Level information",
      de: "Level-Informationen"
    },
    notStarted: {
      en: "Not started:",
      de: "Noch nicht begonnen:"
    },
    notStartedDesc: {
      en: "You haven't tried this yet",
      de: "Das hast Du noch nicht versucht"
    },
    firstAttempt: {
      en: "First attempt:",
      de: "Erster Versuch:"
    },
    firstAttemptDesc: {
      en: "You gave it a try once",
      de: "Du hast es einmal versucht"
    },
    practiceMode: {
      en: "Practice mode:",
      de: "Übungsmodus:"
    },
    practiceModeDesc: {
      en: "You can do it when concentrating, but it needs focus and doesn't work in social dancing yet",
      de: "Du schaffst es beim Konzentrieren, aber es braucht Fokus und klappt beim Socialdancing noch nicht"
    },
    gettingThere: {
      en: "Getting there:",
      de: "Wird langsam:"
    },
    gettingThereDesc: {
      en: "You can use it sometimes at milongas and practicas, but it's not automatic yet",
      de: "Du kannst es manchmal in Milongas und Practicas nutzen, aber es ist noch nicht automatisch"
    },
    mastered: {
      en: "Mastered:",
      de: "Beherrscht:"
    },
    masteredDesc: {
      en: "This comes naturally to you now - you do it effortlessly all the time",
      de: "Das kommt Dir jetzt natürlich – Du machst es mühelos die ganze Zeit"
    }
  }
};

