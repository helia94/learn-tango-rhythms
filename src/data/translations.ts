import { Language } from '@/contexts/LanguageContext';

export type TranslationKey = string;

interface TranslationValue {
  en: string;
  de: string;
}

export const translations = {
  common: {
    backToRoadmap: {
      en: 'Back to Roadmap',
      de: 'Zurück zur Roadmap'
    }
  },
  exercises: {
    dancingFastSlow: {
      title: {
        en: 'Dancing Fast & Slow',
        de: 'Schnell & Langsam Tanzen'
      },
      introText1: {
        en: 'One of the most beautiful aspects of tango is how it can express both fast and slow movements.',
        de: 'Einer der schönsten Aspekte des Tangos ist, wie er sowohl schnelle als auch langsame Bewegungen ausdrücken kann.'
      },
      introText2: {
        en: 'In this exercise, we will explore how to dance to different speeds in the music, and how to transition between them.',
        de: 'In dieser Übung werden wir erkunden, wie man zu verschiedenen Geschwindigkeiten in der Musik tanzt und wie man zwischen ihnen wechselt.'
      },
      letStartSimple: {
        en: "Let's Start Simple",
        de: 'Fangen wir einfach an'
      },
      simpleText1: {
        en: 'Most tango music has a clear beat that you can count: 1, 2, 3, 4. Listen to this example:',
        de: 'Die meiste Tangomusik hat einen klaren Takt, den du zählen kannst: 1, 2, 3, 4. Höre dir dieses Beispiel an:'
      },
      typicalStrongBeat: {
        en: 'Typical Strong Beat Pattern',
        de: 'Typisches starkes Taktmuster'
      },
      couldNotFindBeat: {
        en: "If you couldn't find the beat, try using this simple rhythm player to practice:",
        de: 'Wenn du den Takt nicht finden konntest, versuche es mit diesem einfachen Rhythmus-Player zum Üben:'
      },
      threeSpeeds: {
        en: 'Three Speeds to Dance',
        de: 'Drei Tanzgeschwindigkeiten'
      },
      threeSpeedsText: {
        en: 'In tango, we typically dance at three different speeds, depending on the music:',
        de: 'Im Tango tanzen wir typischerweise in drei verschiedenen Geschwindigkeiten, abhängig von der Musik:'
      },
      halfSpeed: {
        en: 'Half Speed (One step every 2 beats)',
        de: 'Halbe Geschwindigkeit (Ein Schritt alle 2 Takte)'
      },
      normalSpeed: {
        en: 'Normal Speed (One step per beat)',
        de: 'Normale Geschwindigkeit (Ein Schritt pro Takt)'
      },
      doubleSpeed: {
        en: 'Double Speed (Two steps per beat)',
        de: 'Doppelte Geschwindigkeit (Zwei Schritte pro Takt)'
      },
      fullSongText: {
        en: 'Listen to this full song and try to identify when you would dance at each speed:',
        de: 'Höre dir diesen vollständigen Song an und versuche zu erkennen, wann du in welcher Geschwindigkeit tanzen würdest:'
      },
      musicSpeedChanges: {
        en: 'Music Speed Changes',
        de: 'Änderungen der Musikgeschwindigkeit'
      },
      musicSpeedChangesText: {
        en: 'The orchestra often changes the speed or feeling within a song. Learning to recognize these changes will make your dancing more musical.',
        de: 'Das Orchester ändert oft die Geschwindigkeit oder das Gefühl innerhalb eines Songs. Diese Änderungen erkennen zu lernen, macht dein Tanzen musikalischer.'
      },
      rhythmChanges: {
        en: 'Rhythm Changes',
        de: 'Rhythmusänderungen'
      },
      rhythmChangesText: {
        en: 'Sometimes the orchestra will double the rhythm or cut it in half. Listen to these examples:',
        de: 'Manchmal verdoppelt das Orchester den Rhythmus oder halbiert ihn. Höre dir diese Beispiele an:'
      },
      from2To4Beats: {
        en: 'From 2 beats to 4 beats (slow to fast)',
        de: 'Von 2 auf 4 Schläge (langsam zu schnell)'
      },
      from4To2Beats: {
        en: 'From 4 beats to 2 beats (fast to slow)',
        de: 'Von 4 auf 2 Schläge (schnell zu langsam)'
      },
      melodyChanges: {
        en: 'Melody Changes',
        de: 'Melodieänderungen'
      },
      melodyChangesText: {
        en: 'The melody can also change from smooth (legato) to choppy (staccato), which affects how we move:',
        de: 'Die Melodie kann auch von fließend (legato) zu abgehackt (staccato) wechseln, was beeinflusst, wie wir uns bewegen:'
      },
      legatoToStaccato: {
        en: 'From smooth to choppy (legato to staccato)',
        de: 'Von fließend zu abgehackt (legato zu staccato)'
      },
      staccatoToLegato: {
        en: 'From choppy to smooth (staccato to legato)',
        de: 'Von abgehackt zu fließend (staccato zu legato)'
      },
      weeklyAssignment: {
        en: 'Weekly Assignment',
        de: 'Wöchentliche Aufgabe'
      },
      assignment1: {
        en: 'Practice walking to the beat with a partner, changing between normal and half speed.',
        de: 'Übe mit einem Partner im Takt zu gehen und zwischen normaler und halber Geschwindigkeit zu wechseln.'
      },
      assignment2: {
        en: 'Listen to at least 3 songs from the practice playlist and identify the speed changes.',
        de: 'Höre dir mindestens 3 Songs aus der Übungsplaylist an und identifiziere die Geschwindigkeitsänderungen.'
      },
      assignment3: {
        en: 'Practice dancing to staccato parts with shorter, more precise steps.',
        de: 'Übe das Tanzen zu Staccato-Teilen mit kürzeren, präziseren Schritten.'
      },
      assignment4: {
        en: 'Practice dancing to legato parts with smoother, more flowing movements.',
        de: 'Übe das Tanzen zu Legato-Teilen mit fließenderen, geschmeidigeren Bewegungen.'
      },
      practicedWalking: {
        en: 'I practiced walking to different speeds this week.',
        de: 'Ich habe diese Woche das Gehen in verschiedenen Geschwindigkeiten geübt.'
      },
      practiceSongs: {
        en: 'Practice Songs',
        de: 'Übungslieder'
      },
      practiceSongsText: {
        en: 'Here are some songs to practice with. They all contain changes in speed or feeling that you can dance to:',
        de: 'Hier sind einige Lieder zum Üben. Sie alle enthalten Änderungen in Geschwindigkeit oder Gefühl, zu denen du tanzen kannst:'
      },
      songs1And2: {
        en: 'Songs 1 & 2',
        de: 'Lieder 1 & 2'
      },
      songs1And2Text: {
        en: 'These songs have clear sections with different speeds.',
        de: 'Diese Lieder haben klare Abschnitte mit unterschiedlichen Geschwindigkeiten.'
      },
      songs3And4: {
        en: 'Songs 3 & 4',
        de: 'Lieder 3 & 4'
      },
      songs3And4Text: {
        en: 'These songs alternate between legato and staccato sections.',
        de: 'Diese Lieder wechseln zwischen Legato- und Staccato-Abschnitten.'
      },
      songs5And6: {
        en: 'Songs 5 & 6',
        de: 'Lieder 5 & 6'
      },
      songs5And6Text: {
        en: 'These songs have dramatic changes in both speed and feeling.',
        de: 'Diese Lieder haben dramatische Änderungen sowohl in Geschwindigkeit als auch im Gefühl.'
      },
      progressNote: {
        en: 'Remember, learning to dance to different speeds takes time. Focus on one aspect at a time, and gradually combine them as you get more comfortable.',
        de: 'Denk daran, dass es Zeit braucht, zu verschiedenen Geschwindigkeiten tanzen zu lernen. Konzentriere dich auf einen Aspekt nach dem anderen und kombiniere sie allmählich, wenn du dich wohler fühlst.'
      },
      commentsTitle: {
        en: 'Comments',
        de: 'Kommentare'
      },
      commentsPlaceholder: {
        en: 'Comments section coming soon...',
        de: 'Kommentarbereich kommt bald...'
      },
      rateTitle: {
        en: 'Rate This Exercise',
        de: 'Bewerte diese Übung'
      },
      ratePlaceholder: {
        en: 'Rating system coming soon...',
        de: 'Bewertungssystem kommt bald...'
      }
    }
  },
  daily: {
    day1: {
      content: {
        en: 'Listen to "La vida me engaño" by Carlos Di Sarli and identify the strong beats.',
        de: 'Höre "La vida me engaño" von Carlos Di Sarli und identifiziere die starken Taktschläge.'
      },
      audioTitle: {
        en: 'La vida me engaño - Carlos Di Sarli',
        de: 'La vida me engaño - Carlos Di Sarli'
      },
      audioDescription: {
        en: 'Listen for the strong beats in this classic tango.',
        de: 'Achte auf die starken Taktschläge in diesem klassischen Tango.'
      },
      fullSong: {
        en: 'Full Song',
        de: 'Vollständiges Lied'
      },
      task: {
        en: 'Identify the strong beats',
        de: 'Identifiziere die starken Taktschläge'
      }
    },
    day2: {
      content: {
        en: 'Listen to "Invierno" by Francisco Canaro and identify the different instruments.',
        de: 'Höre "Invierno" von Francisco Canaro und identifiziere die verschiedenen Instrumente.'
      },
      description: {
        en: 'In this exercise, try to distinguish between the different instruments playing in the orchestra.',
        de: 'Versuche in dieser Übung, zwischen den verschiedenen Instrumenten zu unterscheiden, die im Orchester spielen.'
      },
      bandonionSolos: {
        en: 'Bandonion Solos',
        de: 'Bandoneon-Soli'
      },
      violinSolos: {
        en: 'Violin Solos',
        de: 'Geigen-Soli'
      },
      singerSolo: {
        en: 'Singer Solo',
        de: 'Sänger-Solo'
      },
      task: {
        en: 'Identify the instruments',
        de: 'Identifiziere die Instrumente'
      }
    },
    day3: {
      content: {
        en: 'Practice walking to "Poema" by Francisco Canaro, alternating between normal and half speed.',
        de: 'Übe das Gehen zu "Poema" von Francisco Canaro, abwechselnd in normaler und halber Geschwindigkeit.'
      },
      description: {
        en: 'This song has clear sections where you can practice changing your walking speed.',
        de: 'Dieses Lied hat klare Abschnitte, in denen du das Ändern deiner Gehgeschwindigkeit üben kannst.'
      },
      task: {
        en: 'Practice walking speeds',
        de: 'Übe Gehgeschwindigkeiten'
      }
    },
    day4: {
      content: {
        en: 'Listen to "El once" by Juan D\'Arienzo and identify the staccato sections.',
        de: 'Höre "El once" von Juan D\'Arienzo und identifiziere die Staccato-Abschnitte.'
      },
      description: {
        en: 'D\'Arienzo is known for his strong, rhythmic style with many staccato sections.',
        de: 'D\'Arienzo ist bekannt für seinen starken, rhythmischen Stil mit vielen Staccato-Abschnitten.'
      },
      task: {
        en: 'Identify staccato sections',
        de: 'Identifiziere Staccato-Abschnitte'
      }
    },
    day5: {
      content: {
        en: 'Practice dancing to "Remembranzas" by Carlos Di Sarli, focusing on the legato sections.',
        de: 'Übe das Tanzen zu "Remembranzas" von Carlos Di Sarli, konzentriere dich auf die Legato-Abschnitte.'
      },
      task: {
        en: 'Practice legato movements',
        de: 'Übe Legato-Bewegungen'
      }
    },
    day6: {
      content: {
        en: 'Listen to "Bahía Blanca" by Osvaldo Pugliese and identify the dramatic changes in speed and intensity.',
        de: 'Höre "Bahía Blanca" von Osvaldo Pugliese und identifiziere die dramatischen Änderungen in Geschwindigkeit und Intensität.'
      },
      task: {
        en: 'Identify speed changes',
        de: 'Identifiziere Geschwindigkeitsänderungen'
      }
    },
    day7: {
      content: {
        en: 'Practice all the skills you\'ve learned this week with a partner to any song from the practice playlist.',
        de: 'Übe alle Fähigkeiten, die du diese Woche gelernt hast, mit einem Partner zu einem beliebigen Lied aus der Übungsplaylist.'
      },
      task: {
        en: 'Practice with a partner',
        de: 'Übe mit einem Partner'
      }
    }
  },
  assignments: {
    level0: {
      en: "You did not do it yet",
      de: "Du hast es noch nicht gemacht"
    },
    level1: {
      en: "You did it once",
      de: "Du hast es einmal gemacht"
    },
    level2: {
      en: "You did it many times and focused on it this week, but it works only if you focus, and not in the milonga",
      de: "Du hast es oft gemacht und dich diese Woche darauf konzentriert, aber es funktioniert nur, wenn du dich konzentrierst, nicht in der Milonga"
    },
    level3: {
      en: "You can do it sometime in the milonga/practica, but not automatically yet",
      de: "Du kannst es manchmal in der Milonga/Practica, aber noch nicht automatisch"
    },
    level4: {
      en: "You do it all the time easily already",
      de: "Du machst es bereits die ganze Zeit mühelos"
    },
    levelInfo: {
      en: "Assignment Levels",
      de: "Aufgaben-Level"
    }
  }
};

export const getTranslation = (key: TranslationKey, language: Language): string => {
  try {
    // Split the key by dots to navigate nested object
    const keys = key.split('.');
    let value: any = translations;
    
    // Navigate through the nested structure
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key; // Return the key itself if translation not found
      }
    }
    
    // Check if we have a translation object with the current language
    if (value && typeof value === 'object' && language in value) {
      return value[language];
    }
    
    console.warn(`Translation not found for key: ${key}, language: ${language}`);
    return key; // Return the key itself if translation not found
  } catch (error) {
    console.error(`Error translating key: ${key}`, error);
    return key;
  }
};
