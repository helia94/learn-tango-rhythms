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
  | 'daily.title'
  | 'daily.subtitle'
  | 'daily.unlockTomorrow'
  | 'daily.locked'
  | 'daily.availableTomorrow'
  | 'daily.day1.content'
  | 'daily.day1.audioTitle'
  | 'daily.day1.audioDescription'
  | 'daily.day1.fullSong'
  | 'daily.day1.task'
  | 'daily.day2.content'
  | 'daily.day2.description'
  | 'daily.day2.bandonionSolos'
  | 'daily.day2.violinSolos'
  | 'daily.day2.singerSolo'
  | 'daily.day2.task'
  | 'daily.day3.content'
  | 'daily.day3.description'
  | 'daily.day3.task'
  | 'daily.day4.content'
  | 'daily.day4.description'
  | 'daily.day4.task'
  | 'daily.day5.content'
  | 'daily.day5.task'
  | 'daily.day6.content'
  | 'daily.day6.task'
  | 'daily.day7.content'
  | 'daily.day7.task'
  | 'daily.placeholder'
  | 'daily.placeholderTask'
  | 'tips.extremeSlowness'
  | 'tips.extremeSlownessTip1'
  | 'tips.extremeSlownessTip2'
  | 'tips.extremeSlownessTip3'
  | 'tips.extremeSlownessTip4'
  | 'tips.extremeSpeed'
  | 'tips.extremeSpeedTip1'
  | 'tips.extremeSpeedTip2'
  | 'tips.backOchoChallenge'
  | 'tips.backOchoChallengeTitle'
  | 'tips.backOchoChallengeTip1'
  | 'tips.backOchoChallengeTip2'
  | 'tips.backOchoChallengeTip3'
  | 'tips.backOchoChallengeTip4'
  | 'tips.ochoCortadoChallenge'
  | 'tips.ochoCortadoChallengeTitle'
  | 'tips.ochoCortadoChallengeTip1'
  | 'tips.ochoCortadoChallengeTip2'
  | 'tips.ochoCortadoChallengeTip3'
  | 'tips.ochoCortadoChallengeTip4'
  | 'tips.ochoCortadoChallengeTip5';

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
  },
  exercises: {
    dancingFastSlow: {
      title: {
        en: "Dancing Fast and Slow",
        de: "Schnell und Langsam Tanzen"
      },
      introText1: {
        en: "Most dancers always dance with the same tempo, but forcing yourself to dance at different speeds is one of the easiest ways to add diversity to your tango life.",
        de: "Die meisten Tänzer tanzen immer im gleichen Tempo, aber sich zu zwingen in verschiedenen Geschwindigkeiten zu tanzen ist einer der einfachsten Wege, Vielfalt in Ihr Tangoleben zu bringen."
      },
      introText2: {
        en: "Good beginners dance on the down beat [also known as the strong beat] [numbers 1 and 3 if we count to 4].",
        de: "Gute Anfänger tanzen auf dem Grundschlag [auch als starker Schlag bekannt] [Zahlen 1 und 3, wenn wir bis 4 zählen]."
      },
      letStartSimple: {
        en: "Let's start simple",
        de: "Fangen wir einfach an"
      },
      simpleText1: {
        en: "That means without a partner. Do the normal walk and step on 1 and 3 in this song.",
        de: "Das bedeutet ohne Partner. Machen Sie den normalen Gang und treten Sie auf 1 und 3 in diesem Lied."
      },
      typicalStrongBeat: {
        en: "Typical strong beat 1 and 3",
        de: "Typischer starker Schlag 1 und 3"
      },
      couldNotFindBeat: {
        en: "If you could not find the downbeat, use this simple version instead.",
        de: "Wenn Sie den Grundschlag nicht finden konnten, verwenden Sie stattdessen diese einfache Version."
      },
      threeSpeeds: {
        en: "Three Simple Speeds",
        de: "Drei Einfache Geschwindigkeiten"
      },
      threeSpeedsText: {
        en: "Ok, now two simple things you can do:",
        de: "Ok, jetzt zwei einfache Dinge, die Sie tun können:"
      },
      halfSpeed: {
        en: "Half Speed",
        de: "Halbe Geschwindigkeit"
      },
      normalSpeed: {
        en: "Normal Speed",
        de: "Normale Geschwindigkeit"
      },
      doubleSpeed: {
        en: "Double Speed",
        de: "Doppelte Geschwindigkeit"
      },
      fullSongText: {
        en: "Do one full song at all three speeds, just walking on your own. Here is a song to do it:",
        de: "Machen Sie ein ganzes Lied in allen drei Geschwindigkeiten, nur alleine gehend. Hier ist ein Lied dafür:"
      },
      practicedWalking: {
        en: "I practiced walking at all three speeds",
        de: "Ich habe das Gehen in allen drei Geschwindigkeiten geübt"
      },
      musicSpeedChanges: {
        en: "Using Music for Speed Changes",
        de: "Musik für Geschwindigkeitswechsel verwenden"
      },
      musicSpeedChangesText: {
        en: "Ok, now you can move at three speeds, time to also use the music. Two simple ways to use music for a change of speed:",
        de: "Ok, jetzt können Sie sich in drei Geschwindigkeiten bewegen, Zeit auch die Musik zu nutzen. Zwei einfache Wege, Musik für einen Geschwindigkeitswechsel zu nutzen:"
      },
      rhythmChanges: {
        en: "When the rhythm changes",
        de: "Wenn sich der Rhythmus ändert"
      },
      rhythmChangesText: {
        en: "Sometimes the music changes from playing all beats loud and the same to playing 2 strong beat and 2 weak beats. This is a clear opportunity to adjust your speed.",
        de: "Manchmal wechselt die Musik von allen Schlägen laut und gleich zu 2 starken Schlägen und 2 schwache Schlägen. Das ist eine klare Gelegenheit, Ihre Geschwindigkeit anzupassen."
      },
      from2To4Beats: {
        en: "From 2 beats to 4 beats",
        de: "Von 2 Schlägen zu 4 Schlägen"
      },
      from4To2Beats: {
        en: "From 4 beats to 2 beats",
        de: "Von 4 Schlägen zu 2 Schlägen"
      },
      melodyChanges: {
        en: "When the melody changes",
        de: "Wenn sich die Melodie ändert"
      },
      melodyChangesText: {
        en: "Old tango songs mostly have a fixed beat system all the time, so a good option is to change it according to the melody. Legato (melody that sounds like singing) for slower speed and Staccato (rhythmic melody) for higher speed.",
        de: "Alte Tango-Lieder haben meist die ganze Zeit ein festes Schlagsystem, daher ist eine gute Option, es entsprechend der Melodie zu ändern. Legato (Melodie, die wie Gesang klingt) für langsamere Geschwindigkeit und Staccato (rhythmische Melodie) für höhere Geschwindigkeit."
      },
      legatoToStaccato: {
        en: "From Legato to Staccato",
        de: "Von Legato zu Staccato"
      },
      staccatoToLegato: {
        en: "From Staccato to Legato",
        de: "Von Staccato zu Legato"
      },
      weeklyAssignment: {
        en: "Assignment for the Week",
        de: "Aufgabe für die Woche"
      },
      assignment1: {
        en: "Walk alone at speeds 1, 2, and 4, without music, just counting, or use the rhythm lab in the app.",
        de: "Gehen Sie alleine in den Geschwindigkeiten 1, 2 und 4, ohne Musik, nur zählend, oder verwenden Sie das Rhythmus-Labor in der App."
      },
      assignment2: {
        en: "Walk alone with music.",
        de: "Gehen Sie alleine mit Musik."
      },
      assignment3: {
        en: "When dancing in milonga or practice, listen to the change in rhythm from 2 to 4 and back, and try to use a different speed.",
        de: "Beim Tanzen in der Milonga oder beim Üben, hören Sie auf den Rhythmuswechsel von 2 zu 4 und zurück, und versuchen Sie eine andere Geschwindigkeit zu verwenden."
      },
      assignment4: {
        en: "When dancing in milonga or practice, listen to the change in melody from legato to staccato and back, and try to use a different speed.",
        de: "Beim Tanzen in der Milonga oder beim Üben, hören Sie auf den Melodiewechsel von Legato zu Staccato und zurück, und versuchen Sie eine andere Geschwindigkeit zu verwenden."
      },
      practiceSongs: {
        en: "Practice Songs",
        de: "Übungslieder"
      },
      practiceSongsText: {
        en: "Here are 6 songs to practice speed with music:",
        de: "Hier sind 6 Lieder, um Geschwindigkeit mit Musik zu üben:"
      },
      songs1And2: {
        en: "Songs 1 & 2",
        de: "Lieder 1 & 2"
      },
      songs1And2Text: {
        en: "From Canaro Orquestra - Music playing 4 similar beats all the time. We can change speed with melody, or whenever you want to change speed, but do it with intention and clearly.",
        de: "Von Canaro Orquestra - Musik spielt die ganze Zeit 4 ähnliche Schläge. Wir können die Geschwindigkeit mit der Melodie ändern, oder wann immer Sie die Geschwindigkeit ändern möchten, aber tun Sie es mit Absicht und klar."
      },
      songs3And4: {
        en: "Songs 3 & 4",
        de: "Lieder 3 & 4"
      },
      songs3And4Text: {
        en: "From early Di Sarli Orquestra - Music playing 2 strong and 2 weak beats, still very rhythmic compared to the future work of the same artist.",
        de: "Von frühem Di Sarli Orquestra - Musik spielt 2 starke und 2 schwache Schläge, immer noch sehr rhythmisch im Vergleich zu späteren Arbeiten desselben Künstlers."
      },
      songs5And6: {
        en: "Songs 5 & 6",
        de: "Lieder 5 & 6"
      },
      songs5And6Text: {
        en: "From Troilo Orquestra - Music changes between playing 4 similar beats, to strong beats. Many chances to change the speed of the dance.",
        de: "Von Troilo Orquestra - Musik wechselt zwischen 4 ähnlichen Schlägen und starken Schlägen. Viele Gelegenheiten, die Geschwindigkeit des Tanzes zu ändern."
      },
      progressNote: {
        en: "At the end of the week, you will be asked how many times you did each assignment. The goal of 5min tango is three things: repeat, repeat, and repeat. More ideas and assignments will unfold on the same topic during the week.",
        de: "Am Ende der Woche werden Sie gefragt, wie oft Sie jede Aufgabe gemacht haben. Das Ziel von 5min Tango sind drei Dinge: wiederholen, wiederholen und wiederholen. Weitere Ideen und Aufgaben zum gleichen Thema werden während der Woche folgen."
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
        de: "Bewerten Sie diese Übung"
      },
      ratePlaceholder: {
        en: "Review system coming soon...",
        de: "Bewertungssystem kommt bald..."
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
      de: "Durchlaufe 7 Tage konzentriertes Üben"
    },
    unlockTomorrow: {
      en: "You can unlock this tomorrow",
      de: "Du kannst das morgen freischalten"
    },
    locked: {
      en: "Locked",
      de: "Gesperrt"
    },
    availableTomorrow: {
      en: "Available Tomorrow",
      de: "Morgen verfügbar"
    },
    day1: {
      content: {
        en: "Make a fixed plan to change your speed every 8 beats. For example, 4,1,2,4 or 2,1,4,1 or whatever you wish, just plan in your head and then dance it. If you do it on your own choose older tango music, if you do it in a milonga do it when music is more monotonous, this way all four speed fit well to all part of the music. Make your change is very clear, and at the end of the phrase.",
        de: "Mache einen festen Plan, deine Geschwindigkeit alle 8 Schläge zu ändern. Zum Beispiel 4,1,2,4 oder 2,1,4,1 oder was auch immer du möchtest, plane es einfach in deinem Kopf und tanze es dann. Wenn du alleine übst, wähle ältere Tango-Musik, wenn du es in einer Milonga machst, tue es wenn die Musik monotoner ist, so passen alle vier Geschwindigkeiten gut zu allen Teilen der Musik. Mache deine Änderung sehr deutlich und am Ende der Phrase."
      },
      audioTitle: {
        en: "Alma del Bandoneon - Francisco Canaro (30 sec)",
        de: "Alma del Bandoneon - Francisco Canaro (30 Sek)"
      },
      audioDescription: {
        en: "Here is an example with 4 sections:",
        de: "Hier ist ein Beispiel mit 4 Abschnitten:"
      },
      fullSong: {
        en: "Full song:",
        de: "Ganzes Lied:"
      },
      task: {
        en: "I practiced fixed speed changes every 8 beats",
        de: "Ich habe feste Geschwindigkeitsänderungen alle 8 Schläge geübt"
      }
    },
    day2: {
      content: {
        en: "Identify solo pieces and slow down on them. Soft solos from singer, violin and Bandonion are a good chance to reduce your speed. A solo in tango is when only one instrument is playing the main melody, there could be still a soft contra bass or piano playing the beat.",
        de: "Erkenne Solo-Stücke und verlangsame bei ihnen. Sanfte Solos von Sänger, Violine und Bandoneon sind eine gute Gelegenheit, deine Geschwindigkeit zu reduzieren. Ein Solo im Tango ist, wenn nur ein Instrument die Hauptmelodie spielt, es könnte immer noch einen sanften Kontrabass oder ein Klavier geben, das den Takt spielt."
      },
      description: {
        en: "There are two tango orchestras who very often have a Solo section in their songs. Let's listen to two bandonion and two violin solos, and finally a singer solo to familiarize the ears, then we can also find them when dancing in the milongas.",
        de: "Es gibt zwei Tango-Orchester, die sehr oft einen Solo-Abschnitt in ihren Liedern haben. Hören wir uns zwei Bandoneon- und zwei Violinsolos an und schließlich ein Sängersolo, um die Ohren zu gewöhnen, dann können wir sie auch beim Tanzen in den Milongas finden."
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
        de: "Ich habe das Erkennen von Solos und das Verlangsamen dabei geübt"
      }
    },
    day3: {
      content: {
        en: "Slow down when the singer is almost talking instead of singing. It does not happen often, so it's even more delicious to catch it when it does.",
        de: "Verlangsame, wenn der Sänger fast spricht anstatt zu singen. Es passiert nicht oft, deshalb ist es umso köstlicher, es zu erwischen, wenn es passiert."
      },
      description: {
        en: "In this example, listen carefully to how the singer transitions from singing to almost talking. This is your cue to slow down and savor these intimate moments in the music.",
        de: "In diesem Beispiel höre sorgfältig zu, wie der Sänger vom Singen zum fast Sprechen übergeht. Das ist dein Zeichen, langsamer zu werden und diese intimen Momente in der Musik zu genießen."
      },
      task: {
        en: "I practiced identifying and slowing down during talking singer moments",
        de: "Ich habe das Erkennen und Verlangsamen während sprechender Sängermomente geübt"
      }
    },
    day4: {
      content: {
        en: "Go extremely slow. Can you take 8 beats for 1 step? What is your slowest humanly possible? Explore your limits, and explore the limit of your partners.",
        de: "Gehe extrem langsam. Kannst du 8 Schläge für 1 Schritt brauchen? Was ist dein langsamster menschlich möglicher Zustand? Erkunde deine Grenzen und erkunde die Grenzen deiner Partner."
      },
      description: {
        en: "This exercise pushes you to discover the absolute minimum speed of movement while maintaining connection and intention. It's about finding grace in extreme slowness.",
        de: "Diese Übung drängt dich dazu, die absolute Mindestgeschwindigkeit der Bewegung zu entdecken, während du Verbindung und Absicht aufrechterhältst. Es geht darum, Anmut in extremer Langsamkeit zu finden."
      },
      task: {
        en: "I practiced extremely slow movement, taking 8+ beats per step",
        de: "Ich habe extrem langsame Bewegung geübt und 8+ Schläge pro Schritt gebraucht"
      }
    },
    day5: {
      content: {
        en: "Go extremely fast; fast is hard to do together. Find some separation, lead something fast for the follower, or do something fast yourself, while the follower almost stays. Explore your limits.",
        de: "Gehe extrem schnell; schnell ist schwer zusammen zu machen. Finde etwas Trennung, führe etwas Schnelles für den Follower, oder mache selbst etwas Schnelles, während der Follower fast bleibt. Erkunde deine Grenzen."
      },
      task: {
        en: "I practiced extremely fast movements",
        de: "Ich habe extrem schnelle Bewegungen geübt"
      }
    },
    day6: {
      content: {
        en: "Do back ochos in all 3 speeds, without changing the speed in the middle. Like the ocho cortado from Day 7, this challenges your ability to maintain consistent speed throughout the entire movement.",
        de: "Mache Rück-Ochos in allen 3 Geschwindigkeiten, ohne die Geschwindigkeit in der Mitte zu ändern. Wie das Ocho Cortado von Tag 7 fordert dies deine Fähigkeit heraus, eine konstante Geschwindigkeit während der gesamten Bewegung aufrechtzuerhalten."
      },
      task: {
        en: "I practiced back ochos at all three speeds without changing speed mid-movement",
        de: "Ich habe Rück-Ochos in allen drei Geschwindigkeiten geübt, ohne die Geschwindigkeit mitten in der Bewegung zu ändern"
      }
    },
    day7: {
      content: {
        en: "Do ocho cortado in all 3 speeds, without changing the speed in the middle. This is much harder than it sounds because we are used to always doing it with an acceleration in the middle.",
        de: "Mache Ocho Cortado in allen 3 Geschwindigkeiten, ohne die Geschwindigkeit in der Mitte zu ändern. Das ist viel schwerer als es klingt, weil wir es gewohnt sind, es immer mit einer Beschleunigung in der Mitte zu machen."
      },
      task: {
        en: "I practiced ocho cortado at all three speeds without changing speed mid-movement",
        de: "Ich habe Ocho Cortado in allen drei Geschwindigkeiten geübt, ohne die Geschwindigkeit mitten in der Bewegung zu ändern"
      }
    },
    placeholder: {
      en: "assignment content will be added here...",
      de: "Aufgabeninhalt wird hier hinzugefügt..."
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
      de: "Konzentriere dich darauf, das Gleichgewicht während der gesamten Bewegung zu halten"
    },
    extremeSlownessTip2: {
      en: "Keep your connection with your partner constant",
      de: "Halte deine Verbindung zu deinem Partner konstant"
    },
    extremeSlownessTip3: {
      en: "Breathe deeply to help maintain control",
      de: "Atme tief, um die Kontrolle zu behalten"
    },
    extremeSlownessTip4: {
      en: "Challenge yourself: can you go even slower?",
      de: "Fordere dich heraus: Kannst du noch langsamer gehen?"
    },
    extremeSpeed: {
      en: "Extreme Speed Tips:",
      de: "Tipps für extreme Geschwindigkeit:"
    },
    extremeSpeedTip1: {
      en: "Start with small, quick movements before attempting larger ones",
      de: "Beginne mit kleinen, schnellen Bewegungen, bevor du größere versuchst"
    },
    extremeSpeedTip2: {
      en: "Practice separation - one partner stays while the other moves fast",
      de: "Übe Trennung - ein Partner bleibt, während der andere sich schnell bewegt"
    },
    backOchoChallenge: {
      en: "Back Ocho Speed Challenge Tips:",
      de: "Tipps für die Rück-Ocho-Geschwindigkeitsherausforderung:"
    },
    backOchoChallengeTitle: {
      en: "Back Ocho Speed Challenge Tips:",
      de: "Tipps für die Rück-Ocho-Geschwindigkeitsherausforderung:"
    },
    backOchoChallengeTip1: {
      en: "Start with speed 1 (half speed) - focus on smooth, controlled pivots",
      de: "Beginne mit Geschwindigkeit 1 (halbe Geschwindigkeit) - konzentriere dich auf sanfte, kontrollierte Drehungen"
    },
    backOchoChallengeTip2: {
      en: "Progress to speed 2 (normal) - maintain the natural flow without rushing",
      de: "Gehe zu Geschwindigkeit 2 (normal) über - erhalte den natürlichen Fluss ohne zu hetzen"
    },
    backOchoChallengeTip3: {
      en: "Challenge yourself at speed 4 (double)",
      de: "Fordere dich bei Geschwindigkeit 4 (doppelt) heraus"
    },
    backOchoChallengeTip4: {
      en: "As speed increases, make smaller pivot and smaller step",
      de: "Wenn die Geschwindigkeit zunimmt, mache kleinere Drehungen und kleinere Schritte"
    },
    ochoCortadoChallenge: {
      en: "Ocho Cortado Challenge Tips:",
      de: "Tipps für die Ocho-Cortado-Herausforderung:"
    },
    ochoCortadoChallengeTitle: {
      en: "Ocho Cortado Challenge Tips:",
      de: "Tipps für die Ocho-Cortado-Herausforderung:"
    },
    ochoCortadoChallengeTip1: {
      en: "Practice at speed 1 (half speed) first - maintain consistent slowness throughout",
      de: "Übe zuerst bei Geschwindigkeit 1 (halbe Geschwindigkeit) - halte durchgehend konstante Langsamkeit"
    },
    ochoCortadoChallengeTip2: {
      en: "Then speed 2 (normal) - resist the urge to accelerate in the middle",
      de: "Dann Geschwindigkeit 2 (normal) - widerstehe dem Drang, in der Mitte zu beschleunigen"
    },
    ochoCortadoChallengeTip3: {
      en: "Finally speed 4 (double) - keep the energy constant from start to finish",
      de: "Schließlich Geschwindigkeit 4 (doppelt) - halte die Energie vom Anfang bis zum Ende konstant"
    },
    ochoCortadoChallengeTip4: {
      en: "Focus on maintaining the same tempo for the entire movement sequence",
      de: "Konzentriere dich darauf, das gleiche Tempo für die gesamte Bewegungssequenz beizubehalten"
    },
    ochoCortadoChallengeTip5: {
      en: "Break the habit of natural acceleration - conscious control is key",
      de: "Durchbrich die Gewohnheit der natürlichen Beschleunigung - bewusste Kontrolle ist der Schlüssel"
    }
  }
};
