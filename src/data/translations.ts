import { en } from './translations/en';
import { de } from './translations/de';

export type TranslationKey = 
  | 'common.title'
  | 'common.subtitle'
  | 'common.backToRoadmap'
  | 'common.loading'
  | 'common.error'
  | 'common.yes'
  | 'common.no'
  | 'common.cancel'
  | 'common.save'
  | 'common.edit'
  | 'common.delete'
  | 'common.close'
  | 'common.back'
  | 'common.next'
  | 'common.previous'
  | 'common.search'
  | 'common.filter'
  | 'common.sort'
  | 'common.view'
  | 'common.add'
  | 'common.remove'
  | 'common.update'
  | 'common.create'
  | 'common.submit'
  | 'common.reset'
  | 'common.clear'
  | 'common.confirm'
  | 'common.language'
  | 'common.english'
  | 'common.german'
  | 'common.selectLanguage'
  | 'common.success'
  | 'common.skip'
  | 'home.title'
  | 'home.subtitle'
  | 'home.description'
  | 'home.startLearning'
  | 'home.howItWorks'
  | 'home.step1Title'
  | 'home.step1Description'
  | 'home.step2Title'
  | 'home.step2Description'
  | 'home.step3Title'
  | 'home.step3Description'
  | 'home.features'
  | 'home.feature1Title'
  | 'home.feature1Description'
  | 'home.feature2Title'
  | 'home.feature2Description'
  | 'home.feature3Title'
  | 'home.feature3Description'
  | 'home.getStarted'
  | 'home.viewRoadmap'
  | 'home.tryRhythmLab'
  | 'navigation.home'
  | 'navigation.roadmap'
  | 'navigation.rhythmlab'
  | 'navigation.profile'
  | 'navigation.logout'
  | 'rhythmlab.title'
  | 'rhythmlab.subtitle'
  | 'rhythmlab.playButton'
  | 'rhythmlab.stopButton'
  | 'rhythmlab.resetButton'
  | 'rhythmlab.clearButton'
  | 'rhythmlab.tempo'
  | 'rhythmlab.bpm'
  | 'rhythmlab.volume'
  | 'rhythmlab.presets'
  | 'rhythmlab.customPattern'
  | 'rhythmlab.instructions'
  | 'rhythmlab.instructionsText'
  | 'rhythmlab.tips'
  | 'rhythmlab.tip1'
  | 'rhythmlab.tip2'
  | 'rhythmlab.tip3'
  | 'quiz.title'
  | 'quiz.subtitle'
  | 'quiz.question'
  | 'quiz.startButton'
  | 'quiz.nextButton'
  | 'quiz.submitButton'
  | 'quiz.playAgainButton'
  | 'quiz.score'
  | 'quiz.correctAnswers'
  | 'quiz.timeElapsed'
  | 'quiz.difficulty'
  | 'quiz.easy'
  | 'quiz.medium'
  | 'quiz.hard'
  | 'quiz.congratulations'
  | 'quiz.tryAgain'
  | 'quiz.complete'
  | 'quiz.finalScore'
  | 'quiz.complete_percentage'
  | 'quiz.yourName'
  | 'quiz.enterName'
  | 'quiz.city'
  | 'quiz.enterCity'
  | 'quiz.submitting'
  | 'quiz.submitScore'
  | 'leaderboard.title'
  | 'leaderboard.subtitle'
  | 'leaderboard.rank'
  | 'leaderboard.player'
  | 'leaderboard.score'
  | 'leaderboard.city'
  | 'leaderboard.submitScore'
  | 'leaderboard.playerName'
  | 'leaderboard.playerCity'
  | 'leaderboard.submit'
  | 'leaderboard.submitting'
  | 'leaderboard.success'
  | 'leaderboard.error'
  | 'leaderboard.viewLeaderboard'
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
  | 'topic.loginToStart'
  | 'topic.startTopic'
  | 'topic.activating'
  | 'topic.activationSuccess'
  | 'topic.activationError'
  | 'topic.alreadyActivated'
  | 'daily.title'
  | 'daily.subtitle'
  | 'daily.unlockTomorrow'
  | 'daily.dayNumber'
  | 'daily.completed'
  | 'daily.locked'
  | 'daily.current'
  | 'daily.description'
  | 'daily.objectives'
  | 'daily.tips'
  | 'daily.practice'
  | 'daily.completeDay'
  | 'daily.markComplete'
  | 'daily.nextDay'
  | 'daily.backToDays'
  | 'daily.day1.content'
  | 'daily.day1.audioDescription'
  | 'daily.day1.audioTitle'
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
  | 'progress.levelInfo'
  | 'progress.trackingTitle'
  | 'progress.notStarted'
  | 'progress.notStartedDesc'
  | 'progress.firstAttempt'
  | 'progress.firstAttemptDesc'
  | 'progress.practiceMode'
  | 'progress.practiceModeDesc'
  | 'progress.gettingThere'
  | 'progress.gettingThereDesc'
  | 'progress.mastered'
  | 'progress.masteredDesc'
  | 'errors.enterName'
  | 'errors.submitFailed'
  | 'messages.scoreSubmitted'
  | 'tips.extremeSpeed'
  | 'tips.extremeSpeedTip1'
  | 'tips.extremeSpeedTip2'
  | 'tips.extremeSlowness'
  | 'tips.extremeSlownessTip1'
  | 'tips.extremeSlownessTip2'
  | 'tips.extremeSlownessTip3'
  | 'tips.extremeSlownessTip4'
  | 'tips.backOchoChallengeTitle'
  | 'tips.backOchoChallengeTip1'
  | 'tips.backOchoChallengeTip2'
  | 'tips.backOchoChallengeTip3'
  | 'tips.backOchoChallengeTip4'
  | 'tips.ochoCortadoChallengeTitle'
  | 'tips.ochoCortadoChallengeTip1'
  | 'tips.ochoCortadoChallengeTip2'
  | 'tips.ochoCortadoChallengeTip3'
  | 'tips.ochoCortadoChallengeTip4'
  | 'tips.ochoCortadoChallengeTip5';

export const translations = {
  common: {
    title: {
      en: "Rhythm Lab",
      de: "Rhythmus Labor"
    },
    subtitle: {
      en: "Explore and create rhythms",
      de: "Erkunde und kreiere Rhythmen"
    },
    backToRoadmap: {
      en: "Back to Roadmap",
      de: "Zurück zur Roadmap"
    },
    loading: {
      en: "Loading...",
      de: "Laden..."
    },
    error: {
      en: "Error",
      de: "Fehler"
    },
    yes: {
      en: "Yes",
      de: "Ja"
    },
    no: {
      en: "No",
      de: "Nein"
    },
    cancel: {
      en: "Cancel",
      de: "Abbrechen"
    },
    save: {
      en: "Save",
      de: "Speichern"
    },
    edit: {
      en: "Edit",
      de: "Bearbeiten"
    },
    delete: {
      en: "Delete",
      de: "Löschen"
    },
    close: {
      en: "Close",
      de: "Schließen"
    },
    back: {
      en: "Back",
      de: "Zurück"
    },
    next: {
      en: "Next",
      de: "Weiter"
    },
    previous: {
      en: "Previous",
      de: "Vorherige"
    },
    search: {
      en: "Search",
      de: "Suchen"
    },
    filter: {
      en: "Filter",
      de: "Filtern"
    },
    sort: {
      en: "Sort",
      de: "Sortieren"
    },
    view: {
      en: "View",
      de: "Anzeigen"
    },
    add: {
      en: "Add",
      de: "Hinzufügen"
    },
    remove: {
      en: "Remove",
      de: "Entfernen"
    },
    update: {
      en: "Update",
      de: "Aktualisieren"
    },
    create: {
      en: "Create",
      de: "Erstellen"
    },
    submit: {
      en: "Submit",
      de: "Absenden"
    },
    reset: {
      en: "Reset",
      de: "Zurücksetzen"
    },
    clear: {
      en: "Clear",
      de: "Leeren"
    },
    confirm: {
      en: "Confirm",
      de: "Bestätigen"
    },
    language: {
      en: "Language",
      de: "Sprache"
    },
    english: {
      en: "English",
      de: "Englisch"
    },
    german: {
      en: "German",
      de: "Deutsch"
    },
    selectLanguage: {
      en: "Select Language",
      de: "Sprache auswählen"
    },
  },
  home: {
    title: {
      en: "Welcome to Rhythm Village",
      de: "Willkommen im Rhythmus-Dorf"
    },
    subtitle: {
      en: "Your journey to rhythm mastery starts here.",
      de: "Deine Reise zur Rhythmus-Meisterschaft beginnt hier."
    },
    description: {
      en: "Explore our roadmap, practice in the Rhythm Lab, and challenge yourself with quizzes.",
      de: "Erkunde unsere Roadmap, übe im Rhythmus-Labor und fordere dich mit Quizzen heraus."
    },
    startLearning: {
      en: "Start Learning",
      de: "Starte das Lernen"
    },
    howItWorks: {
      en: "How it Works",
      de: "Wie es funktioniert"
    },
    step1Title: {
      en: "Explore the Roadmap",
      de: "Erkunde die Roadmap"
    },
    step1Description: {
      en: "Follow our structured learning path to understand rhythm concepts step by step.",
      de: "Folge unserem strukturierten Lernpfad, um Rhythmuskonzepte Schritt für Schritt zu verstehen."
    },
    step2Title: {
      en: "Practice in the Rhythm Lab",
      de: "Übe im Rhythmus-Labor"
    },
    step2Description: {
      en: "Experiment with different sounds and patterns to create your own rhythms.",
      de: "Experimentiere mit verschiedenen Klängen und Mustern, um deine eigenen Rhythmen zu erstellen."
    },
    step3Title: {
      en: "Challenge Yourself",
      de: "Fordere dich selbst heraus"
    },
    step3Description: {
      en: "Test your knowledge with quizzes and climb the leaderboard.",
      de: "Teste dein Wissen mit Quizzen und erklimme die Bestenliste."
    },
    features: {
      en: "Key Features",
      de: "Hauptmerkmale"
    },
    feature1Title: {
      en: "Structured Roadmap",
      de: "Strukturierte Roadmap"
    },
    feature1Description: {
      en: "A clear learning path to guide you from beginner to expert.",
      de: "Ein klarer Lernpfad, der dich vom Anfänger zum Experten führt."
    },
    feature2Title: {
      en: "Interactive Rhythm Lab",
      de: "Interaktives Rhythmus-Labor"
    },
    feature2Description: {
      en: "A sandbox environment to create and experiment with rhythms.",
      de: "Eine Sandbox-Umgebung zum Erstellen und Experimentieren mit Rhythmen."
    },
    feature3Title: {
      en: "Engaging Quizzes",
      de: "Fesselnde Quizze"
    },
    feature3Description: {
      en: "Test your knowledge and compete with others on the leaderboard.",
      de: "Teste dein Wissen und konkurriere mit anderen auf der Bestenliste."
    },
    getStarted: {
      en: "Get Started",
      de: "Loslegen"
    },
    viewRoadmap: {
      en: "View Roadmap",
      de: "Roadmap ansehen"
    },
    tryRhythmLab: {
      en: "Try Rhythm Lab",
      de: "Rhythmus-Labor ausprobieren"
    }
  },
  navigation: {
    home: {
      en: "Home",
      de: "Startseite"
    },
    roadmap: {
      en: "Roadmap",
      de: "Roadmap"
    },
    rhythmlab: {
      en: "Rhythm Lab",
      de: "Rhythmus-Labor"
    },
    profile: {
      en: "Profile",
      de: "Profil"
    },
    logout: {
      en: "Logout",
      de: "Abmelden"
    }
  },
  rhythmlab: {
    title: {
      en: "Rhythm Lab",
      de: "Rhythmuslabor"
    },
    subtitle: {
      en: "Create and explore rhythms",
      de: "Erstelle und erkunde Rhythmen"
    },
    playButton: {
      en: "Play",
      de: "Abspielen"
    },
    stopButton: {
      en: "Stop",
      de: "Stopp"
    },
    resetButton: {
      en: "Reset",
      de: "Zurücksetzen"
    },
    clearButton: {
      en: "Clear",
      de: "Leeren"
    },
    tempo: {
      en: "Tempo",
      de: "Tempo"
    },
    bpm: {
      en: "BPM",
      de: "BPM"
    },
    volume: {
      en: "Volume",
      de: "Lautstärke"
    },
    presets: {
      en: "Presets",
      de: "Voreinstellungen"
    },
    customPattern: {
      en: "Custom Pattern",
      de: "Eigenes Muster"
    },
    instructions: {
      en: "Instructions",
      de: "Anleitung"
    },
    instructionsText: {
      en: "Click on the grid to create your own rhythm pattern. Adjust the tempo and volume to your liking.",
      de: "Klicke auf das Raster, um dein eigenes Rhythmusmuster zu erstellen. Passe das Tempo und die Lautstärke nach deinen Wünschen an."
    },
    tips: {
      en: "Tips",
      de: "Tipps"
    },
    tip1: {
      en: "Try different combinations of sounds to create unique rhythms.",
      de: "Probiere verschiedene Klangkombinationen aus, um einzigartige Rhythmen zu erstellen."
    },
    tip2: {
      en: "Adjust the tempo to change the speed of the rhythm.",
      de: "Passe das Tempo an, um die Geschwindigkeit des Rhythmus zu ändern."
    },
    tip3: {
      en: "Use the presets to quickly load common rhythm patterns.",
      de: "Verwende die Voreinstellungen, um schnell gängige Rhythmusmuster zu laden."
    }
  },
  quiz: {
    title: {
      en: "Rhythm Quiz",
      de: "Rhythmus-Quiz"
    },
    subtitle: {
      en: "Test your rhythm knowledge",
      de: "Teste dein Rhythmuswissen"
    },
    question: {
      en: "Question",
      de: "Frage"
    },
    startButton: {
      en: "Start Quiz",
      de: "Quiz starten"
    },
    nextButton: {
      en: "Next",
      de: "Weiter"
    },
    submitButton: {
      en: "Submit",
      de: "Absenden"
    },
    playAgainButton: {
      en: "Play Again",
      de: "Nochmal spielen"
    },
    score: {
      en: "Score",
      de: "Punktzahl"
    },
    correctAnswers: {
      en: "Correct Answers",
      de: "Richtige Antworten"
    },
    timeElapsed: {
      en: "Time Elapsed",
      de: "Verstrichene Zeit"
    },
    difficulty: {
      en: "Difficulty",
      de: "Schwierigkeit"
    },
    easy: {
      en: "Easy",
      de: "Leicht"
    },
    medium: {
      en: "Medium",
      de: "Mittel"
    },
    hard: {
      en: "Hard",
      de: "Schwer"
    },
    congratulations: {
      en: "Congratulations!",
      de: "Herzlichen Glückwunsch!"
    },
    tryAgain: {
      en: "Try Again",
      de: "Nochmal versuchen"
    },
    complete: {
      en: "Complete",
      de: "Abgeschlossen"
    },
    finalScore: {
      en: "Final Score",
      de: "Endpunktzahl"
    },
    complete_percentage: {
      en: "Complete %",
      de: "Abgeschlossen %"
    },
    yourName: {
      en: "Your Name",
      de: "Dein Name"
    },
    enterName: {
      en: "Enter your name",
      de: "Deinen Namen eingeben"
    },
    city: {
      en: "Your City",
      de: "Deine Stadt"
    },
    enterCity: {
      en: "Enter your city",
      de: "Deine Stadt eingeben"
    },
    submitting: {
      en: "Submitting...",
      de: "Wird eingereicht..."
    },
    submitScore: {
      en: "Submit Your Score",
      de: "Punktzahl einreichen"
    }
  },
  leaderboard: {
    title: {
      en: "Leaderboard",
      de: "Bestenliste"
    },
    subtitle: {
      en: "Top rhythm masters",
      de: "Top Rhythmus-Meister"
    },
    rank: {
      en: "Rank",
      de: "Rang"
    },
    player: {
      en: "Player",
      de: "Spieler"
    },
    score: {
      en: "Score",
      de: "Punktzahl"
    },
    city: {
      en: "City",
      de: "Stadt"
    },
    submitScore: {
      en: "Submit Your Score",
      de: "Punktzahl einreichen"
    },
    playerName: {
      en: "Your Name",
      de: "Dein Name"
    },
    playerCity: {
      en: "Your City",
      de: "Deine Stadt"
    },
    submit: {
      en: "Submit",
      de: "Einreichen"
    },
    submitting: {
      en: "Submitting...",
      de: "Wird eingereicht..."
    },
    success: {
      en: "Score submitted successfully!",
      de: "Punktzahl erfolgreich eingereicht!"
    },
    error: {
      en: "Failed to submit score. Please try again.",
      de: "Punktzahl konnte nicht eingereicht werden. Bitte versuche es erneut."
    },
    viewLeaderboard: {
      en: "View Leaderboard",
      de: "Bestenliste ansehen"
    }
  },
  exercises: {
    dancingFastSlow: {
      title: {
        en: "Dancing Fast and Slow",
        de: "Schnell und langsam tanzen"
      },
      introText1: {
        en: "In tango, the music is not always constant. It changes speed, going from fast to slow and back again.",
        de: "Im Tango ist die Musik nicht immer gleichbleibend. Sie ändert die Geschwindigkeit, indem sie von schnell zu langsam und wieder zurück wechselt."
      },
      introText2: {
        en: "This exercise will help you recognize these changes and adjust your dancing accordingly.",
        de: "Diese Übung hilft dir, diese Veränderungen zu erkennen und dein Tanzen entsprechend anzupassen."
      },
      letStartSimple: {
        en: "Let's start simple",
        de: "Fangen wir einfach an"
      },
      simpleText1: {
        en: "Let's start by listening to a typical tango with a strong beat. Can you hear the beat?",
        de: "Beginnen wir mit dem Anhören eines typischen Tangos mit einem starken Beat. Kannst du den Beat hören?"
      },
      typicalStrongBeat: {
        en: "Typical tango with a strong beat",
        de: "Typischer Tango mit einem starken Beat"
      },
      couldNotFindBeat: {
        en: "If you couldn't find the beat, don't worry. Here's a simple rhythm player to help you.",
        de: "Wenn du den Beat nicht finden konntest, keine Sorge. Hier ist ein einfacher Rhythmus-Player, der dir hilft."
      },
      threeSpeeds: {
        en: "Three Speeds",
        de: "Drei Geschwindigkeiten"
      },
      threeSpeedsText: {
        en: "In tango, there are three common speeds: half speed, normal speed, and double speed. Let's listen to a song that uses all three speeds.",
        de: "Im Tango gibt es drei gängige Geschwindigkeiten: halbe Geschwindigkeit, normale Geschwindigkeit und doppelte Geschwindigkeit. Hören wir uns ein Lied an, das alle drei Geschwindigkeiten verwendet."
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
        en: "Here's a full song that uses all three speeds. Try to identify when the music changes speed.",
        de: "Hier ist ein ganzes Lied, das alle drei Geschwindigkeiten verwendet. Versuche zu erkennen, wann die Musik die Geschwindigkeit ändert."
      },
      musicSpeedChanges: {
        en: "Music Speed Changes",
        de: "Änderungen der Musikgeschwindigkeit"
      },
      musicSpeedChangesText: {
        en: "In tango, the music doesn't just change speed, it also changes rhythm and melody. Let's explore these changes.",
        de: "Im Tango ändert die Musik nicht nur die Geschwindigkeit, sondern auch den Rhythmus und die Melodie. Lass uns diese Änderungen erforschen."
      },
      rhythmChanges: {
        en: "Rhythm Changes",
        de: "Rhythmusänderungen"
      },
      rhythmChangesText: {
        en: "Sometimes the music will change from 2 beats to 4 beats, or from 4 beats to 2 beats. This can be a subtle change, but it's important to recognize.",
        de: "Manchmal wechselt die Musik von 2 Takten zu 4 Takten oder von 4 Takten zu 2 Takten. Dies kann eine subtile Änderung sein, aber es ist wichtig, sie zu erkennen."
      },
      from2To4Beats: {
        en: "From 2 to 4 Beats",
        de: "Von 2 zu 4 Takten"
      },
      from4To2Beats: {
        en: "From 4 to 2 Beats",
        de: "Von 4 zu 2 Takten"
      },
      melodyChanges: {
        en: "Melody Changes",
        de: "Melodieänderungen"
      },
      melodyChangesText: {
        en: "The melody can also change, going from legato (smooth) to staccato (short and detached) and back again.",
        de: "Die Melodie kann sich auch ändern und von Legato (weich) zu Staccato (kurz und getrennt) und wieder zurück wechseln."
      },
      legatoToStaccato: {
        en: "Legato to Staccato",
        de: "Legato zu Staccato"
      },
      staccatoToLegato: {
        en: "Staccato to Legato",
        de: "Staccato zu Legato"
      },
      weeklyAssignment: {
        en: "Weekly Assignment",
        de: "Wöchentliche Aufgabe"
      },
      practiceSongs: {
        en: "Practice Songs",
        de: "Übungslieder"
      },
      practiceSongsText: {
        en: "Here are some songs to practice with. Try to identify the speed changes, rhythm changes, and melody changes.",
        de: "Hier sind einige Lieder zum Üben. Versuche, die Geschwindigkeitsänderungen, Rhythmusänderungen und Melodieänderungen zu erkennen."
      },
      songs1And2: {
        en: "Songs 1 and 2",
        de: "Lieder 1 und 2"
      },
      songs1And2Text: {
        en: "These songs have a clear and consistent beat, making them good for practicing the basic steps.",
        de: "Diese Lieder haben einen klaren und gleichmäßigen Beat, wodurch sie sich gut zum Üben der grundlegenden Schritte eignen."
      },
      songs3And4: {
        en: "Songs 3 and 4",
        de: "Lieder 3 und 4"
      },
      songs3And4Text: {
        en: "These songs have more complex rhythms, making them good for practicing the rhythm changes.",
        de: "Diese Lieder haben komplexere Rhythmen, wodurch sie sich gut zum Üben der Rhythmusänderungen eignen."
      },
      songs5And6: {
        en: "Songs 5 and 6",
        de: "Lieder 5 und 6"
      },
      songs5And6Text: {
        en: "These songs have more complex melodies, making them good for practicing the melody changes.",
        de: "Diese Lieder haben komplexere Melodien, wodurch sie sich gut zum Üben der Melodieänderungen eignen."
      },
      progressNote: {
        en: "As you progress, try to identify the speed changes, rhythm changes, and melody changes in other tango songs.",
        de: "Versuche im Laufe der Zeit, die Geschwindigkeitsänderungen, Rhythmusänderungen und Melodieänderungen in anderen Tangoliedern zu erkennen."
      },
      commentsTitle: {
        en: "Comments",
        de: "Kommentare"
      },
      commentsPlaceholder: {
        en: "Share your thoughts on this exercise",
        de: "Teile deine Gedanken zu dieser Übung"
      },
      rateTitle: {
        en: "Rate this exercise",
        de: "Bewerte diese Übung"
      },
      ratePlaceholder: {
        en: "How would you rate this exercise?",
        de: "Wie würdest du diese Übung bewerten?"
      },
      allAssignments: {
        en: "All Assignments",
        de: "Alle Aufgaben"
      },
      assignmentsDescription: {
        en: "Here you'll find a comprehensive list of assignments to deepen your understanding and skills.",
        de: "Hier findest du eine umfassende Liste von Aufgaben, um dein Verständnis und deine Fähigkeiten zu vertiefen."
      },
      weeklyAssignments: {
        en: "Weekly Assignments",
        de: "Wöchentliche Aufgaben"
      },
      seeAllAssignments: {
        en: "See All Assignments",
        de: "Alle Aufgaben ansehen"
      },
      fullSongText: {
        en: "Here's a full song that uses all three speeds. Try to identify when the music changes speed.",
        de: "Hier ist ein ganzes Lied, das alle drei Geschwindigkeiten verwendet. Versuche zu erkennen, wann die Musik die Geschwindigkeit ändert."
      },
    }
  },
  topic: {
    loginToStart: {
      en: "Login to start",
      de: "Anmelden zum Starten"
    },
    startTopic: {
      en: "Start this topic",
      de: "Dieses Thema starten"
    },
    activating: {
      en: "Starting...",
      de: "Wird gestartet..."
    },
    activationSuccess: {
      en: "Topic started successfully!",
      de: "Thema erfolgreich gestartet!"
    },
    activationError: {
      en: "Failed to start topic. Please try again.",
      de: "Thema konnte nicht gestartet werden. Bitte versuchen Sie es erneut."
    },
    alreadyActivated: {
      en: "You have already started this topic!",
      de: "Sie haben dieses Thema bereits gestartet!"
    }
  },
  daily: {
    title: {
      en: "Daily Practice",
      de: "Tägliche Übung"
    },
    subtitle: {
      en: "A new practice routine every day",
      de: "Jeden Tag eine neue Übungsroutine"
    },
    unlockTomorrow: {
      en: "Unlock tomorrow's practice",
      de: "Schalte die morgige Übung frei"
    },
    dayNumber: {
      en: "Day {day}",
      de: "Tag {day}"
    },
    completed: {
      en: "Completed",
      de: "Abgeschlossen"
    },
    locked: {
      en: "Locked",
      de: "Gesperrt"
    },
    current: {
      en: "Current",
      de: "Aktuell"
    },
    description: {
      en: "Today's practice will focus on {focus}.",
      de: "Die heutige Übung konzentriert sich auf {focus}."
    },
    objectives: {
      en: "Objectives",
      de: "Ziele"
    },
    tips: {
      en: "Tips",
      de: "Tipps"
    },
    practice: {
      en: "Practice",
      de: "Üben"
    },
    completeDay: {
      en: "Complete Day {day}",
      de: "Schließe Tag {day} ab"
    },
    markComplete: {
      en: "Mark as Complete",
      de: "Als abgeschlossen markieren"
    },
    nextDay: {
      en: "Next Day",
      de: "Nächster Tag"
    },
    backToDays: {
      en: "Back to All Days",
      de: "Zurück zu allen Tagen"
    },
    day1: {
      content: {
        en: "Day 1",
        de: "Tag 1"
      },
      audioDescription: {
        en: "Listen to the audio and follow the instructions.",
        de: "Höre den Audio und folge den Anweisungen."
      },
      audioTitle: {
        en: "Audio",
        de: "Audio"
      },
      fullSong: {
        en: "Full Song",
        de: "Ganzes Lied"
      },
      task: {
        en: "Task",
        de: "Aufgabe"
      }
    },
    day2: {
      content: {
        en: "Day 2",
        de: "Tag 2"
      },
      description: {
        en: "Listen to the audio and follow the instructions.",
        de: "Höre den Audio und folge den Anweisungen."
      },
      banandonionSolos: {
        en: "Bandonion Solos",
        de: "Bandonion Solo"
      },
      violinSolos: {
        en: "Violin Solos",
        de: "Violin Solo"
      },
      singerSolo: {
        en: "Singer Solo",
        de: "Singer Solo"
      },
      task: {
        en: "Task",
        de: "Aufgabe"
      }
    },
    day3: {
      content: {
        en: "Day 3",
        de: "Tag 3"
      },
      description: {
        en: "Listen to the audio and follow the instructions.",
        de: "Höre den Audio und folge den Anweisungen."
      },
      task: {
        en: "Task",
        de: "Aufgabe"
      }
    },
    day4: {
      content: {
        en: "Day 4",
        de: "Tag 4"
      },
      description: {
        en: "Listen to the audio and follow the instructions.",
        de: "Höre den Audio und folge den Anweisungen."
      },
      task: {
        en: "Task",
        de: "Aufgabe"
      }
    },
    day5: {
      content: {
        en: "Day 5",
        de: "Tag 5"
      },
      task: {
        en: "Task",
        de: "Aufgabe"
      }
    },
    day6: {
      content: {
        en: "Day 6",
        de: "Tag 6"
      },
      task: {
        en: "Task",
        de: "Aufgabe"
      }
    },
    day7: {
      content: {
        en: "Day 7",
        de: "Tag 7"
      },
      task: {
        en: "Task",
        de: "Aufgabe"
      }
    }
  },
  progress: {
    levelInfo: {
      en: "Level Info",
      de: "Level-Info"
    },
    trackingTitle: {
      en: "Progress Tracking",
      de: "Fortschrittstracking"
    },
    notStarted: {
      en: "Not Started",
      de: "Nicht gestartet"
    },
    notStartedDesc: {
      en: "You haven't started this level yet.",
      de: "Du hast dieses Level noch nicht gestartet."
    },
    firstAttempt: {
      en: "First Attempt",
      de: "Erster Versuch"
    },
    firstAttemptDesc: {
      en: "You've started this level once.",
      de: "Du hast dieses Level einmal gestartet."
    },
    practiceMode: {
      en: "Practice Mode",
      de: "Übungsmodus"
    },
    practiceModeDesc: {
      en: "You're practicing this level.",
      de: "Du prüfst dieses Level."
    },
    gettingThere: {
      en: "Getting There",
      de: "Bist du da?"
    },
    gettingThereDesc: {
      en: "You're making progress.",
      de: "Du machst Fortschritt."
    },
    mastered: {
      en: "Mastered",
      de: "Meistert"
    },
    masteredDesc: {
      en: "You've mastered this level.",
      de: "Du hast dieses Level meistert."
    }
  },
  errors: {
    enterName: {
      en: "Please enter your name",
      de: "Bitte gib deinen Namen ein"
    },
    submitFailed: {
      en: "Failed to submit. Please try again.",
      de: "Fehler beim Absenden. Bitte versuche es erneut."
    }
  },
  messages: {
    scoreSubmitted: {
      en: "Score submitted successfully!",
      de: "Punktzahl erfolgreich eingereicht!"
    }
  },
  tips: {
    extremeSpeed: {
      en: "Extreme Speed",
      de: "Extremer Tempo"
    },
    extremeSpeedTip1: {
      en: "Try to keep up with the fast tempo.",
      de: "Versuche, mit dem schnellen Tempo zu verfolgen."
    },
    extremeSpeedTip2: {
      en: "Be careful not to get too tired.",
      de: "Beachte, dass du nicht zu müde bist."
    },
    extremeSlowness: {
      en: "Extreme Slowness",
      de: "Extremer Tempo"
    },
    extremeSlownessTip1: {
      en: "Try to keep up with the slow tempo.",
      de: "Versuche, mit dem langsamen Tempo zu verfolgen."
    },
    extremeSlownessTip2: {
      en: "Be careful not to get too tired.",
      de: "Beachte, dass du nicht zu müde bist."
    },
    extremeSlownessTip3: {
      en: "Try to keep up with the slow tempo.",
      de: "Versuche, mit dem langsamen Tempo zu verfolgen."
    },
    extremeSlownessTip4: {
      en: "Be careful not to get too tired.",
      de: "Beachte, dass du nicht zu müde bist."
    },
    backOchoChallengeTitle: {
      en: "Back Ocho Challenge",
      de: "Back Ocho Herausforderung"
    },
    backOchoChallengeTip1: {
      en: "Try to keep up with the fast tempo.",
      de: "Versuche, mit dem schnellen Tempo zu verfolgen."
    },
    backOchoChallengeTip2: {
      en: "Be careful not to get too tired.",
      de: "Beachte, dass du nicht zu müde bist."
    },
    backOchoChallengeTip3: {
      en: "Try to keep up with the fast tempo.",
      de: "Versuche, mit dem schnellen Tempo zu verfolgen."
    },
    backOchoChallengeTip4: {
      en: "Be careful not to get too tired.",
      de: "Beachte, dass du nicht zu müde bist."
    },
    ochoCortadoChallengeTitle: {
      en: "Ocho Cortado Challenge",
      de: "Ocho Cortado Herausforderung"
    },
    ochoCortadoChallengeTip1: {
      en: "Try to keep up with the fast tempo.",
      de: "Versuche, mit dem schnellen Tempo zu verfolgen."
    },
    ochoCortadoChallengeTip2: {
      en: "Be careful not to get too tired.",
      de: "Beachte, dass du nicht zu müde bist."
    },
    ochoCortadoChallengeTip3: {
      en: "Try to keep up with the fast tempo.",
      de: "Versuche, mit dem schnellen Tempo zu verfolgen."
    },
    ochoCortadoChallengeTip4: {
      en: "Be careful not to get too tired.",
      de: "Beachte, dass du nicht zu müde bist."
    },
    ochoCortadoChallengeTip5: {
      en: "Try to keep up with the fast tempo.",
      de: "Versuche, mit dem schnellen Tempo zu verfolgen."
    }
  }
};
