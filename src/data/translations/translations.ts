export type TranslationKey = 
  | 'common.back'
  | 'common.next'
  | 'common.previous'
  | 'common.close'
  | 'common.save'
  | 'common.cancel'
  | 'common.confirm'
  | 'common.delete'
  | 'common.edit'
  | 'common.loading'
  | 'common.startThisTopic'
  | 'common.loginToStart'
  | 'common.allAssignments'
  | 'common.availableOn'
  | 'common.signInToUnlock'
  | 'roadmap.title'
  | 'leaderboard.viewLeaderboard'
  | 'rhythm.title'
  | 'rhythm.subtitle'
  | 'rhythm.instructions'
  | 'rhythm.preset.slowWalking'
  | 'rhythm.preset.normalWalking'
  | 'rhythm.preset.fastWalking'
  | 'rhythm.preset.rumba'
  | 'rhythm.preset.chacha'
  | 'rhythm.preset.samba'
  | 'rhythm.preset.tango'
  | 'rhythm.preset.waltz'
  | 'rhythm.preset.foxtrot'
  | 'rhythm.preset.quickstep'
  | 'rhythm.preset.jive'
  | 'rhythm.preset.pasodoble'
  | 'rhythm.preset.vienneseWaltz'
  | 'rhythm.preset.bolero'
  | 'rhythm.preset.milonga'
  | 'rhythm.controls.play'
  | 'rhythm.controls.pause'
  | 'rhythm.controls.stop'
  | 'rhythm.controls.clear'
  | 'rhythm.controls.speed'
  | 'rhythm.controls.bpm'
  | 'rhythm.controls.volume'
  | 'rhythm.grid.beat'
  | 'rhythm.grid.clickToToggle'
  | 'rhythm.grid.measure'
  | 'daily.title'
  | 'daily.subtitle'
  | 'daily.locked'
  | 'daily.unlockDay'
  | 'daily.availableTomorrow'
  | 'daily.dayNotFound'
  | 'daily.topicNotFound'
  | 'profile.title'
  | 'profile.subtitle'
  | 'profile.username'
  | 'profile.fullName'
  | 'profile.bio'
  | 'profile.memberSince'
  | 'profile.editProfile'
  | 'profile.saveChanges'
  | 'profile.cancel'
  | 'profile.signOut'
  | 'profile.profileUpdated'
  | 'profile.usernameTaken'
  | 'profile.updateFailed'
  | 'profile.unexpectedError'
  | 'profile.signedOut'
  | 'profile.signOutFailed'
  | 'exercises.dancingFastSlow.title'
  | 'exercises.dancingFastSlow.introText1'
  | 'exercises.dancingFastSlow.introText2'
  | 'exercises.dancingFastSlow.introText3'
  | 'exercises.dancingFastSlow.musicalConnectionTitle'
  | 'exercises.dancingFastSlow.musicalConnectionText1'
  | 'exercises.dancingFastSlow.musicalConnectionText2'
  | 'exercises.dancingFastSlow.allAssignments'
  | 'exercises.dancingFastSlow.assignmentsDescription'
  | 'exercises.dancingFastSlow.practiceTitle'
  | 'exercises.dancingFastSlow.practiceDescription'
  | 'exercises.dancingFastSlow.extremeSlownessExampleTitle'
  | 'exercises.dancingFastSlow.extremeSpeedExampleTitle'
  | 'exercises.dancingFastSlow.daily.day1.content'
  | 'exercises.dancingFastSlow.daily.day1.task'
  | 'exercises.dancingFastSlow.daily.day2.content'
  | 'exercises.dancingFastSlow.daily.day2.task'
  | 'exercises.dancingFastSlow.daily.day3.content'
  | 'exercises.dancingFastSlow.daily.day3.task'
  | 'exercises.dancingFastSlow.daily.day4.content'
  | 'exercises.dancingFastSlow.daily.day4.task'
  | 'exercises.dancingFastSlow.daily.day5.content'
  | 'exercises.dancingFastSlow.daily.day5.task'
  | 'exercises.dancingFastSlow.daily.day6.content'
  | 'exercises.dancingFastSlow.daily.day6.task'
  | 'exercises.dancingFastSlow.daily.day7.content'
  | 'exercises.dancingFastSlow.daily.day7.task'
  | 'exercises.dancingFastSlow.assignment1'
  | 'exercises.dancingFastSlow.assignment2'
  | 'exercises.dancingFastSlow.assignment3'
  | 'exercises.dancingFastSlow.assignment4'
  | 'quiz.title'
  | 'quiz.subtitle'
  | 'quiz.welcomeTitle'
  | 'quiz.welcomeSubtitle'
  | 'quiz.question'
  | 'quiz.questionProgress'
  | 'quiz.nextQuestion'
  | 'quiz.submitQuiz'
  | 'quiz.resultsTitle'
  | 'quiz.score'
  | 'quiz.correctAnswers'
  | 'quiz.personalityType'
  | 'quiz.retakeQuiz'
  | 'quiz.viewLeaderboard'
  | 'quiz.submitToLeaderboard'
  | 'quiz.submitting'
  | 'quiz.submitSuccess'
  | 'quiz.submitError'
  | 'quiz.enterNickname'
  | 'quiz.nicknameRequired'
  | 'quiz.submit'
  | 'quiz.cancel'
  | 'quiz.leaderboardTitle'
  | 'quiz.rank'
  | 'quiz.nickname'
  | 'quiz.points'
  | 'quiz.completedAt'
  | 'quiz.personalityTypes.rhythmMaster'
  | 'quiz.personalityTypes.beatExplorer'
  | 'quiz.personalityTypes.grooveSeeker'
  | 'quiz.personalityTypes.tempoTracker'
  | 'leaderboard.title'
  | 'leaderboard.subtitle'
  | 'leaderboard.rank'
  | 'leaderboard.user'
  | 'leaderboard.score'
  | 'leaderboard.completedAt'
  | 'leaderboard.personality'
  | 'leaderboard.viewQuiz'
  | 'leaderboard.noEntries'
  | 'leaderboard.loading'
  | 'leaderboard.error';

export const translations = {
  common: {
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
      de: "Zurück"
    },
    close: {
      en: "Close",
      de: "Schließen"
    },
    save: {
      en: "Save",
      de: "Speichern"
    },
    cancel: {
      en: "Cancel",
      de: "Abbrechen"
    },
    confirm: {
      en: "Confirm",
      de: "Bestätigen"
    },
    delete: {
      en: "Delete",
      de: "Löschen"
    },
    edit: {
      en: "Edit",
      de: "Bearbeiten"
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
      de: "Anmelden um zu starten"
    },
    allAssignments: {
      en: "All Assignments",
      de: "Alle Aufgaben"
    },
    availableOn: {
      en: "Available on",
      de: "Verfügbar am"
    },
    signInToUnlock: {
      en: "Sign in to unlock daily topics",
      de: "Anmelden um tägliche Themen freizuschalten"
    }
  },
  roadmap: {
    title: {
      en: "Roadmap",
      de: "Fahrplan"
    }
  },
  rhythm: {
    title: {
      en: "Rhythm",
      de: "Rhythmus"
    },
    subtitle: {
      en: "Feel the beat",
      de: "Fühle den Beat"
    },
    instructions: {
      en: "Follow the rhythm and dance along.",
      de: "Folge dem Rhythmus und tanze mit."
    },
    controls: {
      play: {
        en: "Play",
        de: "Spielen"
      },
      pause: {
        en: "Pause",
        de: "Pause"
      },
      stop: {
        en: "Stop",
        de: "Stopp"
      },
      clear: {
        en: "Clear",
        de: "Löschen"
      },
      speed: {
        en: "Speed",
        de: "Geschwindigkeit"
      },
      bpm: {
        en: "BPM",
        de: "BPM"
      },
      volume: {
        en: "Volume",
        de: "Lautstärke"
      }
    },
    grid: {
      beat: {
        en: "Beat",
        de: "Schlag"
      },
      clickToToggle: {
        en: "Click to toggle",
        de: "Klicken zum Umschalten"
      },
      measure: {
        en: "Measure",
        de: "Takt"
      }
    }
  },
  daily: {
    title: {
      en: "Daily Assignments",
      de: "Tägliche Aufgaben"
    },
    subtitle: {
      en: "Unlock new topics every day!",
      de: "Jeden Tag neue Themen freischalten!"
    },
    locked: {
      en: "Locked",
      de: "Gesperrt"
    },
    unlockDay: {
      en: "Unlock Day",
      de: "Tag freischalten"
    },
    availableTomorrow: {
      en: "Available tomorrow",
      de: "Morgen verfügbar"
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
  profile: {
    title: {
      en: "Profile",
      de: "Profil"
    },
    subtitle: {
      en: "Manage your profile",
      de: "Verwalte dein Profil"
    },
    username: {
      en: "Username",
      de: "Benutzername"
    },
    fullName: {
      en: "Full Name",
      de: "Vollständiger Name"
    },
    bio: {
      en: "Bio",
      de: "Biografie"
    },
    memberSince: {
      en: "Member since",
      de: "Mitglied seit"
    },
    editProfile: {
      en: "Edit Profile",
      de: "Profil bearbeiten"
    },
    saveChanges: {
      en: "Save Changes",
      de: "Änderungen speichern"
    },
    cancel: {
      en: "Cancel",
      de: "Abbrechen"
    },
    signOut: {
      en: "Sign Out",
      de: "Abmelden"
    },
    profileUpdated: {
      en: "Profile updated successfully",
      de: "Profil erfolgreich aktualisiert"
    },
    usernameTaken: {
      en: "Username is already taken",
      de: "Benutzername ist bereits vergeben"
    },
    updateFailed: {
      en: "Update failed",
      de: "Aktualisierung fehlgeschlagen"
    },
    unexpectedError: {
      en: "An unexpected error occurred",
      de: "Ein unerwarteter Fehler ist aufgetreten"
    },
    signedOut: {
      en: "You have signed out",
      de: "Du hast dich abgemeldet"
    },
    signOutFailed: {
      en: "Sign out failed",
      de: "Abmelden fehlgeschlagen"
    }
  },
  exercises: {
    dancingFastSlow: {
      title: {
        en: "Dancing Fast and Slow",
        de: "Schnelles und langsames Tanzen"
      },
      introText1: {
        en: "Learn to control your speed.",
        de: "Lerne, deine Geschwindigkeit zu kontrollieren."
      },
      introText2: {
        en: "Practice with different tempos.",
        de: "Übe mit verschiedenen Tempi."
      },
      introText3: {
        en: "Feel the rhythm in your body.",
        de: "Fühle den Rhythmus in deinem Körper."
      },
      musicalConnectionTitle: {
        en: "Musical Connection",
        de: "Musikalische Verbindung"
      },
      musicalConnectionText1: {
        en: "Connect with the music.",
        de: "Verbinde dich mit der Musik."
      },
      musicalConnectionText2: {
        en: "Let the music guide your movements.",
        de: "Lass die Musik deine Bewegungen leiten."
      },
      allAssignments: {
        en: "All Assignments",
        de: "Alle Aufgaben"
      },
      assignmentsDescription: {
        en: "Complete the following assignments.",
        de: "Vervollständige die folgenden Aufgaben."
      },
      practiceTitle: {
        en: "Practice",
        de: "Üben"
      },
      practiceDescription: {
        en: "Practice your skills daily.",
        de: "Übe deine Fähigkeiten täglich."
      },
      extremeSlownessExampleTitle: {
        en: "Extreme Slowness",
        de: "Extreme Langsamkeit"
      },
      extremeSpeedExampleTitle: {
        en: "Extreme Speed",
        de: "Extreme Geschwindigkeit"
      },
      daily: {
        day1: {
          content: {
            en: "Day 1 content",
            de: "Inhalt für Tag 1"
          },
          task: {
            en: "Day 1 task",
            de: "Aufgabe für Tag 1"
          }
        },
        day2: {
          content: {
            en: "Day 2 content",
            de: "Inhalt für Tag 2"
          },
          task: {
            en: "Day 2 task",
            de: "Aufgabe für Tag 2"
          }
        },
        day3: {
          content: {
            en: "Day 3 content",
            de: "Inhalt für Tag 3"
          },
          task: {
            en: "Day 3 task",
            de: "Aufgabe für Tag 3"
          }
        },
        day4: {
          content: {
            en: "Day 4 content",
            de: "Inhalt für Tag 4"
          },
          task: {
            en: "Day 4 task",
            de: "Aufgabe für Tag 4"
          }
        },
        day5: {
          content: {
            en: "Day 5 content",
            de: "Inhalt für Tag 5"
          },
          task: {
            en: "Day 5 task",
            de: "Aufgabe für Tag 5"
          }
        },
        day6: {
          content: {
            en: "Day 6 content",
            de: "Inhalt für Tag 6"
          },
          task: {
            en: "Day 6 task",
            de: "Aufgabe für Tag 6"
          }
        },
        day7: {
          content: {
            en: "Day 7 content",
            de: "Inhalt für Tag 7"
          },
          task: {
            en: "Day 7 task",
            de: "Aufgabe für Tag 7"
          }
        },
        assignment1: {
          en: "Assignment 1",
          de: "Aufgabe 1"
        },
        assignment2: {
          en: "Assignment 2",
          de: "Aufgabe 2"
        },
        assignment3: {
          en: "Assignment 3",
          de: "Aufgabe 3"
        },
        assignment4: {
          en: "Assignment 4",
          de: "Aufgabe 4"
        }
      }
    }
  },
  quiz: {
    title: {
      en: "Quiz",
      de: "Quiz"
    },
    subtitle: {
      en: "Test your knowledge",
      de: "Teste dein Wissen"
    },
    welcomeTitle: {
      en: "Welcome to the Quiz",
      de: "Willkommen beim Quiz"
    },
    welcomeSubtitle: {
      en: "Let's see how much you know!",
      de: "Lass uns sehen, wie viel du weißt!"
    },
    question: {
      en: "Question",
      de: "Frage"
    },
    questionProgress: {
      en: "Question {current} of {total}",
      de: "Frage {current} von {total}"
    },
    nextQuestion: {
      en: "Next Question",
      de: "Nächste Frage"
    },
    submitQuiz: {
      en: "Submit Quiz",
      de: "Quiz einreichen"
    },
    resultsTitle: {
      en: "Your Results",
      de: "Deine Ergebnisse"
    },
    score: {
      en: "Score",
      de: "Punktzahl"
    },
    correctAnswers: {
      en: "Correct Answers",
      de: "Richtige Antworten"
    },
    personalityType: {
      en: "Your Personality Type",
      de: "Dein Persönlichkeitstyp"
    },
    retakeQuiz: {
      en: "Retake Quiz",
      de: "Quiz erneut machen"
    },
    viewLeaderboard: {
      en: "View Leaderboard",
      de: "Bestenliste anzeigen"
    },
    submitToLeaderboard: {
      en: "Submit to Leaderboard",
      de: "In die Bestenliste eintragen"
    },
    submitting: {
      en: "Submitting...",
      de: "Eintragen..."
    },
    submitSuccess: {
      en: "Successfully submitted!",
      de: "Erfolgreich eingereicht!"
    },
    submitError: {
      en: "Error submitting. Please try again.",
      de: "Fehler beim Einreichen. Bitte versuche es erneut."
    },
    enterNickname: {
      en: "Enter your nickname",
      de: "Gib deinen Spitznamen ein"
    },
    nicknameRequired: {
      en: "Nickname is required",
      de: "Spitzname ist erforderlich"
    },
    submit: {
      en: "Submit",
      de: "Einreichen"
    },
    cancel: {
      en: "Cancel",
      de: "Abbrechen"
    },
    leaderboardTitle: {
      en: "Leaderboard",
      de: "Bestenliste"
    },
    rank: {
      en: "Rank",
      de: "Rang"
    },
    nickname: {
      en: "Nickname",
      de: "Spitzname"
    },
    points: {
      en: "Points",
      de: "Punkte"
    },
    completedAt: {
      en: "Completed at",
      de: "Abgeschlossen am"
    },
    personalityTypes: {
      rhythmMaster: {
        en: "Rhythm Master",
        de: "Rhythmusmeister"
      },
      beatExplorer: {
        en: "Beat Explorer",
        de: "Beat-Entdecker"
      },
      grooveSeeker: {
        en: "Groove Seeker",
        de: "Groove-Sucher"
      },
      tempoTracker: {
        en: "Tempo Tracker",
        de: "Tempo-Tracker"
      }
    }
  },
  leaderboard: {
    title: {
      en: "Leaderboard",
      de: "Bestenliste"
    },
    subtitle: {
      en: "See how you rank",
      de: "Sieh, wie du abschneidest"
    },
    rank: {
      en: "Rank",
      de: "Rang"
    },
    user: {
      en: "User",
      de: "Benutzer"
    },
    score: {
      en: "Score",
      de: "Punktzahl"
    },
    completedAt: {
      en: "Completed at",
      de: "Abgeschlossen am"
    },
    personality: {
      en: "Personality",
      de: "Persönlichkeit"
    },
    viewQuiz: {
      en: "View Quiz",
      de: "Quiz anzeigen"
    },
    noEntries: {
      en: "No entries yet",
      de: "Noch keine Einträge"
    },
    loading: {
      en: "Loading...",
      de: "Lädt..."
    },
    error: {
      en: "Error loading leaderboard",
      de: "Fehler beim Laden der Bestenliste"
    }
  }
};
