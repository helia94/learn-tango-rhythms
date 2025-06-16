
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import AudioPlayer from '@/components/AudioPlayer';

const DailyAssignments = () => {
  const assignments = [
    {
      day: 1,
      title: "Fixed Speed Pattern",
      content: (
        <div className="space-y-6">
          <p className="text-gray-700 leading-relaxed">
            Make a fixed plan to change your speed every 8 beats. For example, 4,1,2,4 or 2,1,4,1 or whatever you wish, just plan in your head and then dance it. If you do it on your own choose older tango music, if you do it in a milonga do it when music is more monotonous, this way all four speed fit well to all part of the music. Make your change is very clear, and at the end of the phrase.
          </p>
          
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-gray-700">Here is an example with 4 sections:</h4>
            <AudioPlayer 
              title="Alma del Bandoneon - 4 Speed Sections Example"
              audioUrl="https://res.cloudinary.com/dl9xg597r/video/upload/v1750080593/ALMA_DEL_BANDONEON_ORQUESTA_TIPICA_FRANCISCO_CANARO-30_sec_nrc3lj.mp3"
              colorChanges={[
                { timestamp: 7000, color: 'bg-golden-yellow' },
                { timestamp: 15000, color: 'bg-dusty-rose' },
                { timestamp: 23500, color: 'bg-terracotta' }
              ]}
              colorEvents={[
                { timestamp: 2510, color: 'bg-sage-green' },
                { timestamp: 2970, color: 'bg-sage-green' },
                { timestamp: 3450, color: 'bg-sage-green' },
                { timestamp: 3930, color: 'bg-sage-green' },
                { timestamp: 4410, color: 'bg-sage-green' },
                { timestamp: 4910, color: 'bg-sage-green' },
                { timestamp: 5380, color: 'bg-sage-green' },
                { timestamp: 5870, color: 'bg-sage-green' },
                { timestamp: 6360, color: 'bg-sage-green' },
                { timestamp: 6870, color: 'bg-sage-green' },
                { timestamp: 7360, color: 'bg-sage-green' },
                { timestamp: 7860, color: 'bg-sage-green' },
                { timestamp: 8350, color: 'bg-sage-green' },
                { timestamp: 8840, color: 'bg-sage-green' },
                { timestamp: 9320, color: 'bg-sage-green' },
                { timestamp: 9810, color: 'bg-sage-green' },
                { timestamp: 10290, color: 'bg-sage-green' },
                { timestamp: 10790, color: 'bg-sage-green' },
                { timestamp: 11260, color: 'bg-sage-green' },
                { timestamp: 11730, color: 'bg-sage-green' },
                { timestamp: 12210, color: 'bg-sage-green' },
                { timestamp: 12700, color: 'bg-sage-green' },
                { timestamp: 13180, color: 'bg-sage-green' },
                { timestamp: 13690, color: 'bg-sage-green' },
                { timestamp: 14180, color: 'bg-sage-green' },
                { timestamp: 14670, color: 'bg-sage-green' },
                { timestamp: 15150, color: 'bg-sage-green' },
                { timestamp: 15660, color: 'bg-sage-green' },
                { timestamp: 16180, color: 'bg-sage-green' },
                { timestamp: 16680, color: 'bg-sage-green' },
                { timestamp: 17160, color: 'bg-sage-green' },
                { timestamp: 17640, color: 'bg-sage-green' },
                { timestamp: 18150, color: 'bg-sage-green' },
                { timestamp: 18620, color: 'bg-sage-green' },
                { timestamp: 19090, color: 'bg-sage-green' },
                { timestamp: 19580, color: 'bg-sage-green' },
                { timestamp: 20070, color: 'bg-sage-green' },
                { timestamp: 20540, color: 'bg-sage-green' },
                { timestamp: 21020, color: 'bg-sage-green' },
                { timestamp: 21510, color: 'bg-sage-green' },
                { timestamp: 22000, color: 'bg-sage-green' },
                { timestamp: 22500, color: 'bg-sage-green' },
                { timestamp: 22990, color: 'bg-sage-green' },
                { timestamp: 23480, color: 'bg-sage-green' },
                { timestamp: 23970, color: 'bg-sage-green' },
                { timestamp: 24470, color: 'bg-sage-green' },
                { timestamp: 24940, color: 'bg-sage-green' },
                { timestamp: 25450, color: 'bg-sage-green' },
                { timestamp: 25930, color: 'bg-sage-green' },
                { timestamp: 26420, color: 'bg-sage-green' },
                { timestamp: 26930, color: 'bg-sage-green' },
                { timestamp: 27420, color: 'bg-sage-green' },
                { timestamp: 27900, color: 'bg-sage-green' },
                { timestamp: 28390, color: 'bg-sage-green' },
                { timestamp: 28870, color: 'bg-sage-green' },
                { timestamp: 29360, color: 'bg-sage-green' },
                { timestamp: 29840, color: 'bg-sage-green' },
                { timestamp: 30330, color: 'bg-sage-green' },
                { timestamp: 30820, color: 'bg-sage-green' },
                { timestamp: 31360, color: 'bg-sage-green' }
              ]}
            />
          </div>

          <div className="mt-6">
            <h4 className="text-lg font-medium text-gray-700 mb-4">Full Song:</h4>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <iframe 
                style={{borderRadius: '12px'}} 
                src="https://open.spotify.com/embed/track/1WhutMc7bnEoTMdfvCyXit?utm_source=generator&theme=0" 
                width="100%" 
                height="352" 
                frameBorder="0" 
                allowFullScreen 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )
    },
    {
      day: 2,
      title: "Coming Soon",
      content: (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">Day 2 assignment will be unlocked tomorrow</p>
        </div>
      )
    },
    {
      day: 3,
      title: "Coming Soon", 
      content: (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">Day 3 assignment will be unlocked in 2 days</p>
        </div>
      )
    },
    {
      day: 4,
      title: "Coming Soon",
      content: (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">Day 4 assignment will be unlocked in 3 days</p>
        </div>
      )
    },
    {
      day: 5,
      title: "Coming Soon",
      content: (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">Day 5 assignment will be unlocked in 4 days</p>
        </div>
      )
    },
    {
      day: 6,
      title: "Coming Soon",
      content: (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">Day 6 assignment will be unlocked in 5 days</p>
        </div>
      )
    },
    {
      day: 7,
      title: "Coming Soon",
      content: (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">Day 7 assignment will be unlocked in 6 days</p>
        </div>
      )
    }
  ];

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-display text-gray-800 mb-8 text-center">Daily Assignments</h2>
      <p className="text-gray-600 text-lg mb-8 text-center leading-relaxed">
        Complete one assignment each day to deepen your understanding of dancing at different speeds.
      </p>
      
      <Accordion type="single" collapsible className="space-y-4">
        {assignments.map((assignment) => (
          <AccordionItem 
            key={assignment.day}
            value={`day-${assignment.day}`}
            className="bg-warm-brown/10 backdrop-blur-sm rounded-2xl border border-cream/20 overflow-hidden"
          >
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-cream font-bold ${
                  assignment.day === 1 ? 'bg-terracotta' : 'bg-gray-400'
                }`}>
                  {assignment.day}
                </div>
                <div className="text-left">
                  <div className="text-lg font-display text-gray-800">Day {assignment.day}</div>
                  <div className="text-sm text-gray-600">{assignment.title}</div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              {assignment.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default DailyAssignments;
